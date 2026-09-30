import { SystemModel } from '../models/system.model.js';
import { handle, ok } from '../utils/http.js';

export const SystemController = {
  stats: handle((_req, res) => ok(res, { data: SystemModel.getStats() })),
  logs: handle((_req, res) => ok(res, { data: SystemModel.getLogs() })),
  seed: handle((_req, res) => {
    SystemModel.resetToSample();
    ok(res, { message: "Klinika ma'lumotlar bazasi namunaviy holatga qaytarildi" });
  }),
};
