/**
 * ShifoMed ERP - Ma'lumotlarni saqlash qatlami (Postgres)
 *
 * Yondashuv: butun klinika holati (bemorlar, shifokorlar, ... , foydalanuvchilar)
 * bitta JSONB "snapshot" sifatida saqlanadi. Har bir o'zgarishdan keyin
 * (yaratish/tahrirlash/o'chirish) holat debounce bilan (500ms) Postgres'ga yoziladi.
 * Server qayta ishga tushganda oxirgi saqlangan holat qayta yuklanadi.
 *
 * DATABASE_URL muhit o'zgaruvchisi berilmasa, tizim shunchaki xotirada
 * ishlashda davom etadi (funksiyalar hech narsa qilmaydi) - lokal ishlab
 * chiqish uchun baza shart emas.
 */
import pg from 'pg';

const { Pool } = pg;

let pool = null;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // lokal Postgres SSL'ni qo'llamaydi; Render kabi bulut bazalari talab qiladi
    ssl: /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL) ? false : { rejectUnauthorized: false },
  });
  pool.on('error', (err) => console.error('Postgres pool xatosi:', err.message));
}

export const isPersistenceEnabled = () => !!pool;

let getStateFn = null;
export function registerStateProvider(fn) {
  getStateFn = fn;
}

let tableReady = null;
async function ensureTable() {
  if (!pool) return;
  if (!tableReady) {
    tableReady = pool.query(`
      CREATE TABLE IF NOT EXISTS shifomed_snapshot (
        id INT PRIMARY KEY DEFAULT 1,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT now()
      )
    `);
  }
  await tableReady;
}

// Yozish faqat bazadan muvaffaqiyatli o'qilgandan keyin yoqiladi.
// (Ulanish uzilganda bo'sh namunaviy ma'lumot haqiqiy bazani ustiga yozib yubormasligi uchun)
let writesEnabled = false;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * @returns {Promise<{status: 'loaded'|'empty'|'error'|'disabled', data?: object}>}
 */
export async function loadSnapshot(attempts = 4) {
  if (!pool) return { status: 'disabled' };
  for (let i = 1; i <= attempts; i++) {
    try {
      await ensureTable();
      const { rows } = await pool.query('SELECT data FROM shifomed_snapshot WHERE id = 1');
      writesEnabled = true;
      return rows[0] ? { status: 'loaded', data: rows[0].data } : { status: 'empty' };
    } catch (err) {
      tableReady = null;
      console.error(`Postgres'dan o'qishda xatolik (urinish ${i}/${attempts}):`, err.message);
      if (i < attempts) await sleep(2000);
    }
  }
  return { status: 'error' };
}

let saveTimer = null;
export function scheduleSave() {
  if (!pool || !getStateFn || !writesEnabled) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      await ensureTable();
      const state = getStateFn();
      await pool.query(
        `INSERT INTO shifomed_snapshot (id, data, updated_at) VALUES (1, $1, now())
         ON CONFLICT (id) DO UPDATE SET data = $1, updated_at = now()`,
        [JSON.stringify(state)],
      );
    } catch (err) {
      console.error("Postgres'ga saqlashda xatolik:", err.message);
    }
  }, 500);
}

// Darhol saqlash (masalan, boshlang'ich namunaviy ma'lumotni yozish uchun) - kutib bo'ladi
export async function saveNow() {
  if (!pool || !getStateFn || !writesEnabled) return false;
  clearTimeout(saveTimer);
  try {
    await ensureTable();
    const state = getStateFn();
    await pool.query(
      `INSERT INTO shifomed_snapshot (id, data, updated_at) VALUES (1, $1, now())
       ON CONFLICT (id) DO UPDATE SET data = $1, updated_at = now()`,
      [JSON.stringify(state)],
    );
    return true;
  } catch (err) {
    console.error("Postgres'ga saqlashda xatolik:", err.message);
    return false;
  }
}
