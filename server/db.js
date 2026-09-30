/**
 * ShifoMed ERP - Medical Database & Store
 * Provides clinical storage with 25+ CRUD helper methods.
 * Postgres mavjud bo'lsa (DATABASE_URL), har bir o'zgarish avtomatik saqlanadi.
 */
import { scheduleSave } from './persistence.js';
const doctorSurgeonAvatar = '/src/assets/images/doctor_surgeon_avatar_1790262450169.jpg';
const doctorFemaleAvatar = '/src/assets/images/doctor_female_avatar_1790262515535.jpg';
// Initial Patients Seed Data
const initialPatients = [
  {
    id: 'PAT-1001',
    fullName: 'Alisher Rustamovich Karimov',
    birthDate: '1984-05-14',
    gender: 'Erkak',
    phone: '+998 90 123-45-67',
    passport: 'AB 7129841',
    bloodGroup: 'A+',
    address: 'Toshkent sh., Yunusobod tumani, 14-mavze, 22-uy',
    allergies: 'Penitsillin qatori antibiotiklari',
    chronicDiseases: 'Arterial gipertoniya II bosqich',
    registeredAt: '2026-08-10',
    status: 'active',
    notes: 'Muntazam qon bosimini nazorat qilib boradi.',
    emergencyContact: "+998 93 456-78-90 (Turmush o'rtog'i)",
  },
  {
    id: 'PAT-1002',
    fullName: 'Nilufar Baxtiyorovna Saidova',
    birthDate: '1992-11-20',
    gender: 'Ayol',
    phone: '+998 93 555-12-34',
    passport: 'AC 4819203',
    bloodGroup: 'O+',
    address: "Toshkent sh., Mirzo Ulug'bek tumani, Qorasuv-4, 5-uy",
    allergies: "Yo'q",
    chronicDiseases: 'Mavsumiy allergik rinit',
    registeredAt: '2026-08-15',
    status: 'inpatient',
    notes: 'Palata 202 da statsionar kuzatuvda.',
    emergencyContact: '+998 90 999-88-77 (Onasi)',
  },
  {
    id: 'PAT-1003',
    fullName: 'Jasur Shavkatovich Mirzayev',
    birthDate: '1976-03-08',
    gender: 'Erkak',
    phone: '+998 97 780-33-22',
    passport: 'AA 9031254',
    bloodGroup: 'B+',
    address: 'Toshkent viloyati, Zangiota tumani, Guliston MFY',
    allergies: 'Aspirin',
    chronicDiseases: 'Qandli diabet 2-tur, IHD',
    registeredAt: '2026-09-01',
    status: 'active',
    notes: 'Endokrinolog va kardiolog nazoratida.',
    emergencyContact: "+998 97 123-99-88 (O'g'li)",
  },
  {
    id: 'PAT-1004',
    fullName: "Dilnoza O'ktamovna Umarova",
    birthDate: '1998-07-25',
    gender: 'Ayol',
    phone: '+998 99 821-44-11',
    passport: 'AB 3148762',
    bloodGroup: 'AB+',
    address: 'Toshkent sh., Chilonzor tumani, 9-mavze, 18-uy',
    allergies: 'Sitrus mevalar',
    chronicDiseases: 'Surunkali gastrit',
    registeredAt: '2026-09-12',
    status: 'active',
    notes: 'Rejali oshqozon tekshiruvi tavsiya etilgan.',
    emergencyContact: '+998 99 300-22-11 (Akasi)',
  },
  {
    id: 'PAT-1005',
    fullName: 'Shavkatbek Anvarovich Xoliqov',
    birthDate: '1965-09-12',
    gender: 'Erkak',
    phone: '+998 90 444-67-89',
    passport: 'AA 6543219',
    bloodGroup: 'O-',
    address: "Toshkent sh., Shayxontohur tumani, Labzak ko'chasi, 44",
    allergies: 'Novokain',
    chronicDiseases: "Bel umurtqa pog'onasi churrasi (grija)",
    registeredAt: '2026-09-18',
    status: 'inpatient',
    notes: 'Nevropatologiya statsionarida reabilitatsiya olmoqda.',
    emergencyContact: '+998 90 555-00-11 (Qizi)',
  },
  {
    id: 'PAT-1006',
    fullName: 'Malika Jamoliddin qizi Tursunova',
    birthDate: '2003-02-14',
    gender: 'Ayol',
    phone: '+998 91 234-56-78',
    passport: 'AD 1098234',
    bloodGroup: 'B-',
    address: 'Toshkent sh., Yashnobod tumani, Tuzel-1, 12-uy',
    allergies: "Yo'q",
    chronicDiseases: "Yo'q",
    registeredAt: '2026-09-22',
    status: 'consultation',
    notes: "Profilaktik tibbiy ko'rikdan o'tmoqda.",
    emergencyContact: '+998 91 777-66-55 (Otasi)',
  },
];
// Initial Doctors Seed Data
const initialDoctors = [
  {
    id: 'DOC-201',
    name: 'Dr. Jahongir Nodirovich Qodirov',
    specialty: 'Umumiy jarroh',
    qualification: 'Tibbiyot fanlari nomzodi, Oliy toifali jarroh',
    experienceYears: 18,
    phone: '+998 90 911-22-33',
    email: 'j.qodirov@shifomed.uz',
    room: 'Xona 305 (Jarrohlik bloki)',
    workHours: '08:30 - 16:00',
    consultationFee: 200000,
    avatar: doctorSurgeonAvatar,
    status: 'active',
    rating: 4.9,
    activePatientsCount: 14,
  },
  {
    id: 'DOC-202',
    name: 'Dr. Ziyoda Axmedovna Rahmonova',
    specialty: 'Kardiolog',
    qualification: 'Oliy toifali kardiolog, Dotsent',
    experienceYears: 15,
    phone: '+998 93 322-44-55',
    email: 'z.rahmonova@shifomed.uz',
    room: 'Xona 204 (Yurak-qon tomir markazi)',
    workHours: '09:00 - 17:00',
    consultationFee: 180000,
    avatar: doctorFemaleAvatar,
    status: 'active',
    rating: 4.8,
    activePatientsCount: 19,
  },
  {
    id: 'DOC-203',
    name: "Dr. Botir Erkinovich Yo'ldoshev",
    specialty: 'Nevropatolog',
    qualification: 'Oliy toifali nevrolog',
    experienceYears: 12,
    phone: '+998 97 101-20-30',
    email: 'b.yoldoshev@shifomed.uz',
    room: "Xona 210 (Nevrologiya bo'limi)",
    workHours: '09:00 - 15:30',
    consultationFee: 170000,
    avatar: doctorSurgeonAvatar,
    status: 'active',
    rating: 4.7,
    activePatientsCount: 11,
  },
  {
    id: 'DOC-204',
    name: 'Dr. Nodira Muxtorovna Yusupova',
    specialty: 'Pediatr',
    qualification: 'Bolalar shifokori, 1-toifali pediatr',
    experienceYears: 10,
    phone: '+998 99 777-88-99',
    email: 'n.yusupova@shifomed.uz',
    room: 'Xona 108 (Pediatriya)',
    workHours: '08:00 - 14:00',
    consultationFee: 150000,
    avatar: doctorFemaleAvatar,
    status: 'active',
    rating: 4.9,
    activePatientsCount: 16,
  },
  {
    id: 'DOC-205',
    name: 'Dr. Sardorbek Azizovich Saidov',
    specialty: 'Terapevt',
    qualification: 'Umumiy amaliyot shifokori',
    experienceYears: 8,
    phone: '+998 90 333-11-22',
    email: 's.saidov@shifomed.uz',
    room: "Xona 102 (Qabul bo'limi)",
    workHours: '08:00 - 17:00',
    consultationFee: 120000,
    avatar: doctorSurgeonAvatar,
    status: 'active',
    rating: 4.6,
    activePatientsCount: 22,
  },
  {
    id: 'DOC-206',
    name: 'Dr. Lola Komilovna Rahimova',
    specialty: 'UZI / Rentgenolog',
    qualification: 'Ultratovush va funksional diagnostika mutaxassisi',
    experienceYears: 14,
    phone: '+998 94 654-32-10',
    email: 'l.rahimova@shifomed.uz',
    room: 'Xona 114 (Diagnostika markazi)',
    workHours: '09:00 - 16:30',
    consultationFee: 140000,
    avatar: doctorFemaleAvatar,
    status: 'active',
    rating: 4.9,
    activePatientsCount: 25,
  },
];
// Initial Appointments
const initialAppointments = [
  {
    id: 'APP-301',
    queueNumber: 1,
    patientId: 'PAT-1001',
    patientName: 'Alisher Rustamovich Karimov',
    patientPhone: '+998 90 123-45-67',
    doctorId: 'DOC-202',
    doctorName: 'Dr. Ziyoda Axmedovna Rahmonova',
    department: 'Kardiologiya',
    date: '2026-09-24',
    timeSlot: '09:30',
    type: 'follow_up',
    status: 'in_progress',
    complaint: 'Qon bosimi oshishi (150/95), bosh aylanishi',
    room: 'Xona 204',
    createdAt: '2026-09-24T08:15:00.000Z',
  },
  {
    id: 'APP-302',
    queueNumber: 2,
    patientId: 'PAT-1003',
    patientName: 'Jasur Shavkatovich Mirzayev',
    patientPhone: '+998 97 780-33-22',
    doctorId: 'DOC-202',
    doctorName: 'Dr. Ziyoda Axmedovna Rahmonova',
    department: 'Kardiologiya',
    date: '2026-09-24',
    timeSlot: '10:15',
    type: 'consultation',
    complaint: "Yurak sohasida jismoniy zo'riqishda simillagan og'riq",
    room: 'Xona 204',
    status: 'pending',
    createdAt: '2026-09-24T08:45:00.000Z',
  },
  {
    id: 'APP-303',
    queueNumber: 3,
    patientId: 'PAT-1004',
    patientName: "Dilnoza O'ktamovna Umarova",
    patientPhone: '+998 99 821-44-11',
    doctorId: 'DOC-205',
    doctorName: 'Dr. Sardorbek Azizovich Saidov',
    department: 'Terapiya',
    date: '2026-09-24',
    timeSlot: '11:00',
    type: 'consultation',
    complaint: 'Epidastral sohada ovqatdan keyin achishish va noqulaylik',
    room: 'Xona 102',
    status: 'pending',
    createdAt: '2026-09-24T09:00:00.000Z',
  },
  {
    id: 'APP-304',
    queueNumber: 4,
    patientId: 'PAT-1006',
    patientName: 'Malika Jamoliddin qizi Tursunova',
    patientPhone: '+998 91 234-56-78',
    doctorId: 'DOC-206',
    doctorName: 'Dr. Lola Komilovna Rahimova',
    department: 'UZI Diagnostika',
    date: '2026-09-24',
    timeSlot: '11:30',
    type: 'procedure',
    complaint: "Qorin bo'shlig'i a'zolari kompleks UZI tekshiruvi",
    room: 'Xona 114',
    status: 'pending',
    createdAt: '2026-09-24T09:10:00.000Z',
  },
  {
    id: 'APP-305',
    queueNumber: 5,
    patientId: 'PAT-1005',
    patientName: 'Shavkatbek Anvarovich Xoliqov',
    patientPhone: '+998 90 444-67-89',
    doctorId: 'DOC-203',
    doctorName: "Dr. Botir Erkinovich Yo'ldoshev",
    department: 'Nevrologiya',
    date: '2026-09-24',
    timeSlot: '08:45',
    type: 'consultation',
    complaint: "Bel sohasidan o'ng oyoqqa uzatiluvchi o'tkir og'riq",
    room: 'Xona 210',
    status: 'completed',
    createdAt: '2026-09-24T08:00:00.000Z',
  },
];
// Initial Medical Records (EHR)
const initialMedicalRecords = [
  {
    id: 'REC-501',
    patientId: 'PAT-1001',
    patientName: 'Alisher Rustamovich Karimov',
    doctorId: 'DOC-202',
    doctorName: 'Dr. Ziyoda Axmedovna Rahmonova',
    doctorSpecialty: 'Kardiolog',
    visitDate: '2026-09-24',
    complaints: "Bosh og'rig'i, ko'z oldida qorayish, charchoq.",
    anamnesis: '5 yildan buyon gipertoniya bilan hisobda turadi. Dori vositalarini tartibsiz qabul qilgan.',
    objectiveStatus: "Umumiy holati qoniqarli. Teri qoplami me'yorda. O'pkalarda vezikulyar nafas.",
    vitals: {
      bloodPressure: '150/95',
      heartRate: 78,
      temperature: 36.6,
      weight: 84,
      spo2: 98,
    },
    diagnosis: 'I10 - Essensial (birlamchi) arterial gipertenziya, II bosqich, xavf darajasi 3.',
    concomitantDiagnosis: 'Semizlik I daraja.',
    treatmentPlan: 'Kombinatsiyalangan gipotenziv terapiya: Perindopril + Indapamid 5/1.25 mg ertalab.',
    recommendations:
      "Tuz iste'molini 4g gacha cheklash, har kuni 30 daqiqa piyoda yurish, arterial qon bosimi kundaligi yuritish.",
    createdAt: '2026-09-24T09:40:00.000Z',
  },
  {
    id: 'REC-502',
    patientId: 'PAT-1005',
    patientName: 'Shavkatbek Anvarovich Xoliqov',
    doctorId: 'DOC-203',
    doctorName: "Dr. Botir Erkinovich Yo'ldoshev",
    doctorSpecialty: 'Nevropatolog',
    visitDate: '2026-09-24',
    complaints: "Bel va o'ng dumba sohasida og'riq, oyoqda uvishish hissi.",
    anamnesis: "Og'ir yuk ko'targandan so'ng og'riq kuchaygan. MRT da L5-S1 disk churrasi 6.5 mm aniqlangan.",
    objectiveStatus: "Laseg simptomi o'ng tomonda 45 gradusda musbat. Pay reflekslari susaygan.",
    vitals: {
      bloodPressure: '130/80',
      heartRate: 72,
      temperature: 36.5,
      weight: 79,
      spo2: 99,
    },
    diagnosis: "M51.1 - Bel umurtqa diski churrasi (L5-S1) asorati, o'ng tomonlama radikulopatiya.",
    concomitantDiagnosis: '',
    treatmentPlan: "Yallig'lanishga qarshi va analgetik ingibitorlar, B guruhi vitaminlari, fizioterapiya.",
    recommendations: 'Statsionar sharoitda 5 kunlik medikamentoz blokada va dam olish rejimi.',
    createdAt: '2026-09-24T09:10:00.000Z',
  },
];
// Initial Prescriptions
const initialPrescriptions = [
  {
    id: 'RX-701',
    patientId: 'PAT-1001',
    patientName: 'Alisher Rustamovich Karimov',
    patientAge: 42,
    doctorId: 'DOC-202',
    doctorName: 'Dr. Ziyoda Axmedovna Rahmonova',
    specialty: 'Kardiologiya',
    diagnosis: 'Arterial gipertoniya II daraja',
    issueDate: '2026-09-24',
    validDays: 30,
    status: 'active',
    notes: "Qon bosimi 140/90 dan oshsa qo'shimcha Kaptopril 25mg til ostiga.",
    medications: [
      {
        id: 'MED-ITM-1',
        medicineName: 'Koprenessa (Perindopril/Indapamid) 4mg/1.25mg',
        dosage: '1 tabletka',
        frequency: 'Ertalab nonushtadan oldin, 1 mahal',
        durationDays: 30,
        instruction: 'Suv bilan ichilsin',
      },
      {
        id: 'MED-ITM-2',
        medicineName: 'Kardiomagnil 75mg',
        dosage: '1 tabletka',
        frequency: "Kechki ovqatdan so'ng, 1 mahal",
        durationDays: 30,
        instruction: 'Chaynamasdan ichilsin',
      },
      {
        id: 'MED-ITM-3',
        medicineName: 'Atorvastatin 20mg',
        dosage: '1 tabletka',
        frequency: 'Kechqurun yotishdan oldin, 1 mahal',
        durationDays: 60,
        instruction: 'Lipid spektrini nazorat qilish sharti bilan',
      },
    ],
  },
  {
    id: 'RX-702',
    patientId: 'PAT-1005',
    patientName: 'Shavkatbek Anvarovich Xoliqov',
    patientAge: 61,
    doctorId: 'DOC-203',
    doctorName: "Dr. Botir Erkinovich Yo'ldoshev",
    specialty: 'Nevrologiya',
    diagnosis: "L5-S1 umurtqa churrasi, o'ng radikulopatiya",
    issueDate: '2026-09-24',
    validDays: 14,
    status: 'active',
    notes: 'Oshqozonni himoya qilish uchun Omez bilan birga ichilsin.',
    medications: [
      {
        id: 'MED-ITM-4',
        medicineName: 'Meloksikam 15mg/1.5ml ampula',
        dosage: '1 ampula mushak orasiga',
        frequency: 'Kunda 1 mahal tushlikdan keyin',
        durationDays: 5,
        instruction: 'Mushak ichiga chuqur yuborilsin',
      },
      {
        id: 'MED-ITM-5',
        medicineName: 'Milgamma (Vitamin B1, B6, B12)',
        dosage: '1 ampula 2ml',
        frequency: 'Kun ora mushak ichiga',
        durationDays: 10,
        instruction: 'Kechki payt',
      },
      {
        id: 'MED-ITM-6',
        medicineName: 'Middokalim 150mg',
        dosage: '1 tabletka',
        frequency: 'Kuniga 2 mahal',
        durationDays: 14,
        instruction: "Ovqatdan so'ng",
      },
    ],
  },
];
// Initial Lab Tests
const initialLabTests = [
  {
    id: 'LAB-801',
    patientId: 'PAT-1001',
    patientName: 'Alisher Rustamovich Karimov',
    testName: 'Umumiy qon tahlili (UQT + Leykoformula)',
    category: 'Qon tahlili',
    orderedByDoctorId: 'DOC-202',
    orderedByDoctorName: 'Dr. Ziyoda Axmedovna Rahmonova',
    orderDate: '2026-09-24',
    resultDate: '2026-09-24',
    status: 'completed',
    price: 65000,
    doctorConclusion: "Gemoglobin va eritrotsitlar me'yor chegarasida. ECHT biroz oshgan.",
    laboratoryTech: 'Katta laborant N. Akbarova',
    results: [
      { parameter: 'Gemoglobin (Hb)', value: '148', unit: 'g/l', referenceRange: '130 - 165', isAbnormal: false },
      {
        parameter: 'Eritrotsitlar (RBC)',
        value: '4.8',
        unit: '10^12/l',
        referenceRange: '4.0 - 5.5',
        isAbnormal: false,
      },
      { parameter: 'Leykotsitlar (WBC)', value: '7.2', unit: '10^9/l', referenceRange: '4.0 - 9.0', isAbnormal: false },
      {
        parameter: 'Trombotsitlar (PLT)',
        value: '230',
        unit: '10^9/l',
        referenceRange: '180 - 320',
        isAbnormal: false,
      },
      { parameter: 'ECHT (SOE)', value: '18', unit: 'mm/soat', referenceRange: '2 - 15', isAbnormal: true },
    ],
  },
  {
    id: 'LAB-802',
    patientId: 'PAT-1003',
    patientName: 'Jasur Shavkatovich Mirzayev',
    testName: 'Biokimyoviy qon tahlili (Glyukoza, Xolesterin, Kreatinin)',
    category: 'Biokimyo',
    orderedByDoctorId: 'DOC-202',
    orderedByDoctorName: 'Dr. Ziyoda Axmedovna Rahmonova',
    orderDate: '2026-09-24',
    resultDate: '2026-09-24',
    status: 'completed',
    price: 110000,
    doctorConclusion:
      'Qon glyukozasi va past zichlikdagi lipidlar oshgan. Qandli diabet nazoratida parhez talab qilinadi.',
    laboratoryTech: 'Laborant F. Usmonov',
    results: [
      {
        parameter: 'Glyukoza (och qoringa)',
        value: '7.4',
        unit: 'mmol/l',
        referenceRange: '3.9 - 6.1',
        isAbnormal: true,
      },
      { parameter: 'Umumiy xolesterin', value: '6.2', unit: 'mmol/l', referenceRange: '3.2 - 5.2', isAbnormal: true },
      { parameter: 'Kreatinin', value: '88', unit: 'mkmol/l', referenceRange: '62 - 115', isAbnormal: false },
      { parameter: 'Mochevina', value: '5.8', unit: 'mmol/l', referenceRange: '2.5 - 8.3', isAbnormal: false },
    ],
  },
  {
    id: 'LAB-803',
    patientId: 'PAT-1006',
    patientName: 'Malika Jamoliddin qizi Tursunova',
    testName: "Qorin bo'shlig'i kompleks UZI tekshiruvi",
    category: 'Instrumental (UZI/Rentgen)',
    orderedByDoctorId: 'DOC-205',
    orderedByDoctorName: 'Dr. Sardorbek Azizovich Saidov',
    orderDate: '2026-09-24',
    status: 'processing',
    price: 140000,
    results: [],
    doctorConclusion: 'Tekshiruv jarayoni olib borilmoqda.',
  },
];
// Initial Invoices & Billing
const initialInvoices = [
  {
    id: 'INV-901',
    receiptNumber: 'CHK-2026-0901',
    patientId: 'PAT-1001',
    patientName: 'Alisher Rustamovich Karimov',
    date: '2026-09-24',
    items: [
      {
        id: '1',
        description: 'Kardiolog qabuli (Dr. Rahmonova)',
        category: 'konsultatsiya',
        quantity: 1,
        unitPrice: 180000,
        amount: 180000,
      },
      {
        id: '2',
        description: 'Umumiy qon tahlili (UQT)',
        category: 'tahlil',
        quantity: 1,
        unitPrice: 65000,
        amount: 65000,
      },
      {
        id: '3',
        description: 'Elektrokardiogramma (EKG)',
        category: 'muolaja',
        quantity: 1,
        unitPrice: 50000,
        amount: 50000,
      },
    ],
    subtotal: 295000,
    discount: 15000,
    total: 280000,
    paidAmount: 280000,
    paymentMethod: 'Uzcard / Humo',
    paymentStatus: 'paid',
    cashierName: 'Gulzoda Karimova (Kassa-1)',
    notes: 'Kassa cheki berildi',
  },
  {
    id: 'INV-902',
    receiptNumber: 'CHK-2026-0902',
    patientId: 'PAT-1003',
    patientName: 'Jasur Shavkatovich Mirzayev',
    date: '2026-09-24',
    items: [
      {
        id: '1',
        description: 'Kardiolog konsultatsiyasi',
        category: 'konsultatsiya',
        quantity: 1,
        unitPrice: 180000,
        amount: 180000,
      },
      {
        id: '2',
        description: 'Biokimyoviy qon tahlili kengaytirilgan',
        category: 'tahlil',
        quantity: 1,
        unitPrice: 110000,
        amount: 110000,
      },
    ],
    subtotal: 290000,
    discount: 0,
    total: 290000,
    paidAmount: 290000,
    paymentMethod: 'Payme / Click',
    paymentStatus: 'paid',
    cashierName: 'Gulzoda Karimova (Kassa-1)',
  },
  {
    id: 'INV-903',
    receiptNumber: 'CHK-2026-0903',
    patientId: 'PAT-1002',
    patientName: 'Nilufar Baxtiyorovna Saidova',
    date: '2026-09-24',
    items: [
      {
        id: '1',
        description: "Palata 202 (VIP) yotish to'lovi (3 kun)",
        category: 'palata',
        quantity: 3,
        unitPrice: 350000,
        amount: 1050000,
      },
      {
        id: '2',
        description: 'Kunlik parvarish va v/i inyeksiya',
        category: 'muolaja',
        quantity: 3,
        unitPrice: 80000,
        amount: 240000,
      },
    ],
    subtotal: 1290000,
    discount: 50000,
    total: 1240000,
    paidAmount: 800000,
    paymentMethod: 'Naqd',
    paymentStatus: 'partial',
    cashierName: 'Gulzoda Karimova (Kassa-1)',
    notes: "Qolgan 440,000 so'm chiqarilish kunida to'lanadi",
  },
];
// Initial Wards & Beds
const initialWards = [
  {
    id: 'WRD-101',
    roomNumber: 'Palata 201',
    floor: 2,
    wardType: 'Standart',
    totalBeds: 3,
    occupiedBeds: 2,
    dailyRate: 180000,
    amenities: ['Konditsioner', 'Wi-Fi', 'Dush & Hojatxona', 'Televizor'],
    patients: [
      {
        patientId: 'PAT-1005',
        patientName: 'Shavkatbek Anvarovich Xoliqov',
        bedNumber: 1,
        admittedDate: '2026-09-22',
        attendingDoctor: "Dr. Botir Yo'ldoshev",
        diagnosis: 'L5-S1 disk churrasi reabilitatsiyasi',
      },
    ],
  },
  {
    id: 'WRD-102',
    roomNumber: 'Palata 202',
    floor: 2,
    wardType: 'VIP',
    totalBeds: 1,
    occupiedBeds: 1,
    dailyRate: 350000,
    amenities: [
      'Alohida lyuks dush',
      'Smart TV',
      'Muzlatgich',
      'Bemor qarovchisi uchun divan',
      'Wi-Fi',
      'Konditsioner',
    ],
    patients: [
      {
        patientId: 'PAT-1002',
        patientName: 'Nilufar Baxtiyorovna Saidova',
        bedNumber: 1,
        admittedDate: '2026-09-23',
        attendingDoctor: 'Dr. Jahongir Qodirov',
        diagnosis: 'Operatsiyadan keyingi tiklanish',
      },
    ],
  },
  {
    id: 'WRD-103',
    roomNumber: 'Palata 301',
    floor: 3,
    wardType: 'Reanimatsiya / ITB',
    totalBeds: 4,
    occupiedBeds: 1,
    dailyRate: 600000,
    amenities: ['IVL apparati', "Ko'p funksiyali bemor monitori", 'Markaziy kislorod tizimi', 'Defibrillyator'],
    patients: [],
  },
  {
    id: 'WRD-104',
    roomNumber: 'Palata 204',
    floor: 2,
    wardType: 'Pediatriya',
    totalBeds: 2,
    occupiedBeds: 0,
    dailyRate: 220000,
    amenities: ['Bolalar kravati', 'Ona uchun joy', "O'yinchoqlar burchagi", 'Konditsioner'],
    patients: [],
  },
];
// Initial Pharmacy / Medicine Inventory
const initialInventory = [
  {
    id: 'MED-401',
    name: 'Seftriakson 1.0 g flakon',
    category: 'Antibiotik',
    manufacturer: 'Nobel Pharmsanoat',
    batchNumber: 'CEF-2604',
    stockQuantity: 120,
    minThreshold: 30,
    unit: 'flakon',
    unitCost: 12000,
    salePrice: 18000,
    expiryDate: '2027-06-30',
    supplier: 'Grand Pharm MChJ',
  },
  {
    id: 'MED-402',
    name: 'Koprenessa 4mg/1.25mg tab №30',
    category: 'Kardiologik',
    manufacturer: 'KRKA',
    batchNumber: 'KOP-8812',
    stockQuantity: 45,
    minThreshold: 15,
    unit: 'quti',
    unitCost: 65000,
    salePrice: 85000,
    expiryDate: '2028-01-15',
    supplier: 'Dori-Darmon AK',
  },
  {
    id: 'MED-403',
    name: 'Meloksikam 15mg/1.5ml №5 amp',
    category: "Og'riqsizlantiruvchi",
    manufacturer: 'Jurabek Laboratories',
    batchNumber: 'MEL-1923',
    stockQuantity: 18,
    minThreshold: 20, // Low stock warning
    unit: 'quti',
    unitCost: 28000,
    salePrice: 38000,
    expiryDate: '2027-04-20',
    supplier: 'Jurabek Med',
  },
  {
    id: 'MED-404',
    name: 'Kardiomagnil 75mg №100 tab',
    category: 'Kardiologik',
    manufacturer: 'Takeda Pharma',
    batchNumber: 'KM-7721',
    stockQuantity: 62,
    minThreshold: 15,
    unit: 'quti',
    unitCost: 52000,
    salePrice: 68000,
    expiryDate: '2028-05-10',
    supplier: 'Grand Pharm MChJ',
  },
  {
    id: 'MED-405',
    name: 'Bir martalik shprits 5 ml №100',
    category: 'Shprits & Sarflov',
    manufacturer: 'MedPlast Uzbekistan',
    batchNumber: 'SHP-9021',
    stockQuantity: 450,
    minThreshold: 100,
    unit: 'dona',
    unitCost: 600,
    salePrice: 1200,
    expiryDate: '2029-12-31',
    supplier: 'MedSnab Servis',
  },
  {
    id: 'MED-406',
    name: 'Xlorgeksidin 0.05% 100 ml eritma',
    category: 'Antiseptik',
    manufacturer: 'Nika Pharm',
    batchNumber: 'XLR-4432',
    stockQuantity: 8,
    minThreshold: 25, // Critical low
    unit: 'flakon',
    unitCost: 4500,
    salePrice: 7000,
    expiryDate: '2026-12-31',
    supplier: 'Grand Pharm MChJ',
  },
];
// Initial Clinic Services Catalog
const initialServices = [
  {
    id: 'SRV-01',
    code: 'CNS-01',
    name: 'Birlamchi kardiolog qabuli',
    category: 'Konsultatsiya',
    price: 180000,
    durationMinutes: 30,
    description: "Ko'rik, anamnez, puls va qon bosimi tahlili",
    isActive: true,
  },
  {
    id: 'SRV-02',
    code: 'CNS-02',
    name: "Jarroh qabuli va ko'rigi",
    category: 'Konsultatsiya',
    price: 200000,
    durationMinutes: 30,
    description: 'Pre-operatsion va umumiy jarrohlik tekshiruvi',
    isActive: true,
  },
  {
    id: 'SRV-03',
    code: 'CNS-03',
    name: 'Nevropatolog konsultatsiyasi',
    category: 'Konsultatsiya',
    price: 170000,
    durationMinutes: 30,
    description: 'Nevrologik status va reflekslar tekshiruvi',
    isActive: true,
  },
  {
    id: 'SRV-04',
    code: 'CNS-04',
    name: 'Umumiy terapevt qabuli',
    category: 'Konsultatsiya',
    price: 120000,
    durationMinutes: 25,
    description: "Standart tibbiy tekshiruv va yo'llanma",
    isActive: true,
  },
  {
    id: 'SRV-05',
    code: 'DIA-01',
    name: 'Elektrokardiografiya (EKG 12 kanalli)',
    category: 'Diagnostika',
    price: 50000,
    durationMinutes: 15,
    description: "Yurak ritmi va o'tkazuvchanligi yozib olinadi",
    isActive: true,
  },
  {
    id: 'SRV-06',
    code: 'DIA-02',
    name: "Qorin a'zolari kompleks UZI",
    category: 'Diagnostika',
    price: 140000,
    durationMinutes: 25,
    description: "Jigar, o't pufagi, oshqozon osti bezi va taloq tekshiruvi",
    isActive: true,
  },
  {
    id: 'SRV-07',
    code: 'DIA-03',
    name: 'Yurak exokardiografiyasi (ExoKG / UZI)',
    category: 'Diagnostika',
    price: 220000,
    durationMinutes: 30,
    description: 'Yurak klapanlari va qorinchalari funksiyasi tekshiruvi',
    isActive: true,
  },
  {
    id: 'SRV-08',
    code: 'LAB-01',
    name: 'Umumiy qon tahlili (UQT)',
    category: 'Diagnostika',
    price: 65000,
    durationMinutes: 20,
    description: 'Avtomatlashtirilgan 24 parametrli analizator',
    isActive: true,
  },
  {
    id: 'SRV-09',
    code: 'LAB-02',
    name: 'Biokimyoviy qon tahlili (Standart panel)',
    category: 'Diagnostika',
    price: 110000,
    durationMinutes: 30,
    description: 'Glyukoza, kreatinin, mochevina, ALT, AST',
    isActive: true,
  },
  {
    id: 'SRV-10',
    code: 'PRO-01',
    name: 'Vena ichiga dori tomchilash (Sistema)',
    category: 'Muolaja',
    price: 45000,
    durationMinutes: 45,
    description: 'Steril bir martalik tizimda shifokor nazorati ostida',
    isActive: true,
  },
];
// Initial Audit Logs
const initialLogs = [
  {
    id: 'LOG-1',
    timestamp: '2026-09-24T08:15:20.000Z',
    module: 'Qabullar',
    action: 'CREATE',
    description: 'Alisher Karimov uchun kardiolog qabuliga navbat ochildi (Bilet #1)',
    user: 'Registratura',
  },
  {
    id: 'LOG-2',
    timestamp: '2026-09-24T08:30:10.000Z',
    module: 'Kassa',
    action: 'PAYMENT',
    description: "CHK-2026-0901 kassa cheki to'landi: 280,000 so'm (Uzcard)",
    user: 'Gulzoda K.',
  },
  {
    id: 'LOG-3',
    timestamp: '2026-09-24T09:12:44.000Z',
    module: 'Tibbiy karta',
    action: 'CREATE',
    description: "PAT-1005 uchun nevropatolog ko'rik xulosasi kiritildi (REC-502)",
    user: "Dr. Botir Yo'ldoshev",
  },
  {
    id: 'LOG-4',
    timestamp: '2026-09-24T09:35:00.000Z',
    module: 'Retseptlar',
    action: 'CREATE',
    description: 'PAT-1001 uchun gipertoniyaga qarshi elektron retsept yozildi (RX-701)',
    user: 'Dr. Ziyoda Rahmonova',
  },
];
// Initial Staff (HR) Seed Data
const initialStaff = [
  {
    id: 'STF-1',
    fullName: 'Dr. Ziyoda Axmedovna Rahmonova',
    position: 'Kardiolog (bosh shifokor)',
    department: 'Kardiologiya',
    phone: '+998 90 111-22-33',
    salary: 12000000,
    shift: 'Kunduzgi (09:00-18:00)',
    hiredAt: '2023-02-01',
    status: 'active',
  },
  {
    id: 'STF-2',
    fullName: "Dilnoza O'ktamovna Yusupova",
    position: 'Hamshira',
    department: 'Statsionar',
    phone: '+998 91 222-33-44',
    salary: 5500000,
    shift: 'Kechki (18:00-08:00)',
    hiredAt: '2024-06-15',
    status: 'active',
  },
  {
    id: 'STF-3',
    fullName: "Sardorbek G'anijonovich Qodirov",
    position: 'Kassir',
    department: 'Moliya',
    phone: '+998 93 333-44-55',
    salary: 4500000,
    shift: 'Kunduzgi (09:00-18:00)',
    hiredAt: '2025-01-10',
    status: 'active',
  },
];
// Class managing database
export class MedicalClinicDB {
  constructor() {
    this.patients = [...initialPatients];
    this.doctors = [...initialDoctors];
    this.appointments = [...initialAppointments];
    this.records = [...initialMedicalRecords];
    this.prescriptions = [...initialPrescriptions];
    this.labTests = [...initialLabTests];
    this.invoices = [...initialInvoices];
    this.wards = [...initialWards];
    this.inventory = [...initialInventory];
    this.services = [...initialServices];
    this.logs = [...initialLogs];
    this.staff = [...initialStaff];
  }
  logActivity(module, action, description, user = 'Tizim administratori') {
    const newLog = {
      id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      module,
      action,
      description,
      user,
    };
    this.logs.unshift(newLog);
    if (this.logs.length > 100) this.logs.pop();
    scheduleSave();
  }
  // Postgres'dan tiklangan holatni joriy state'ga qo'llash
  restore(snap) {
    if (!snap) return;
    this.patients = snap.patients ?? this.patients;
    this.doctors = snap.doctors ?? this.doctors;
    this.appointments = snap.appointments ?? this.appointments;
    this.records = snap.records ?? this.records;
    this.prescriptions = snap.prescriptions ?? this.prescriptions;
    this.labTests = snap.labTests ?? this.labTests;
    this.invoices = snap.invoices ?? this.invoices;
    this.wards = snap.wards ?? this.wards;
    this.inventory = snap.inventory ?? this.inventory;
    this.services = snap.services ?? this.services;
    this.staff = snap.staff ?? this.staff;
    this.logs = snap.logs ?? this.logs;
  }
  // --- PATIENTS CRUD ---
  getPatients() {
    return [...this.patients];
  }
  getPatientById(id) {
    return this.patients.find((p) => p.id === id);
  }
  createPatient(data) {
    const nextNumber = this.patients.length + 1001;
    const newPatient = {
      ...data,
      id: `PAT-${nextNumber}`,
      registeredAt: new Date().toISOString().split('T')[0],
    };
    this.patients.unshift(newPatient);
    this.logActivity('Bemorlar', 'CREATE', `Yangi bemor ro'yxatga olindi: ${newPatient.fullName} (${newPatient.id})`);
    return newPatient;
  }
  updatePatient(id, updates) {
    const index = this.patients.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.patients[index] = { ...this.patients[index], ...updates };
    this.logActivity('Bemorlar', 'UPDATE', `Bemor ma'lumotlari yangilandi: ${this.patients[index].fullName} (${id})`);
    return this.patients[index];
  }
  deletePatient(id) {
    const index = this.patients.findIndex((p) => p.id === id);
    if (index === -1) return false;
    const deleted = this.patients[index];
    this.patients.splice(index, 1);
    this.logActivity('Bemorlar', 'DELETE', `Bemor bazadan o'chirildi: ${deleted.fullName} (${id})`);
    return true;
  }
  // --- DOCTORS CRUD ---
  getDoctors() {
    return [...this.doctors];
  }
  getDoctorById(id) {
    return this.doctors.find((d) => d.id === id);
  }
  createDoctor(data) {
    const nextId = `DOC-${200 + this.doctors.length + 1}`;
    const newDoc = {
      ...data,
      id: nextId,
      rating: 4.8,
      activePatientsCount: 0,
      avatar: data.avatar || doctorSurgeonAvatar,
    };
    this.doctors.unshift(newDoc);
    this.logActivity('Shifokorlar', 'CREATE', `Yangi shifokor qo'shildi: ${newDoc.name} (${newDoc.specialty})`);
    return newDoc;
  }
  updateDoctor(id, updates) {
    const index = this.doctors.findIndex((d) => d.id === id);
    if (index === -1) return null;
    this.doctors[index] = { ...this.doctors[index], ...updates };
    this.logActivity('Shifokorlar', 'UPDATE', `Shifokor ma'lumotlari tahrirlandi: ${this.doctors[index].name}`);
    return this.doctors[index];
  }
  deleteDoctor(id) {
    const index = this.doctors.findIndex((d) => d.id === id);
    if (index === -1) return false;
    const deleted = this.doctors[index];
    this.doctors.splice(index, 1);
    this.logActivity('Shifokorlar', 'DELETE', `Shifokor o'chirildi: ${deleted.name} (${id})`);
    return true;
  }
  // --- APPOINTMENTS CRUD ---
  getAppointments() {
    return [...this.appointments];
  }
  createAppointment(data) {
    const todayAppointments = this.appointments.filter((a) => a.date === data.date);
    const queueNumber = todayAppointments.length + 1;
    const nextId = `APP-${300 + this.appointments.length + 1}`;
    const newApp = {
      ...data,
      id: nextId,
      queueNumber,
      createdAt: new Date().toISOString(),
    };
    this.appointments.unshift(newApp);
    this.logActivity(
      'Qabullar',
      'CREATE',
      `Navbat olindi: ${newApp.patientName} -> ${newApp.doctorName} (#${newApp.queueNumber})`,
    );
    return newApp;
  }
  updateAppointment(id, updates) {
    const index = this.appointments.findIndex((a) => a.id === id);
    if (index === -1) return null;
    this.appointments[index] = { ...this.appointments[index], ...updates };
    this.logActivity('Qabullar', 'UPDATE', `Qabul holati o'zgartirildi: ${id} (${updates.status || 'Tahrir'})`);
    return this.appointments[index];
  }
  deleteAppointment(id) {
    const index = this.appointments.findIndex((a) => a.id === id);
    if (index === -1) return false;
    const deleted = this.appointments[index];
    this.appointments.splice(index, 1);
    this.logActivity('Qabullar', 'DELETE', `Qabul bekor qilindi/o'chirildi: ${deleted.patientName} (${id})`);
    return true;
  }
  // --- MEDICAL RECORDS CRUD ---
  getMedicalRecords() {
    return [...this.records];
  }
  createMedicalRecord(data) {
    const nextId = `REC-${500 + this.records.length + 1}`;
    const newRec = {
      ...data,
      id: nextId,
      createdAt: new Date().toISOString(),
    };
    this.records.unshift(newRec);
    this.logActivity(
      'Tibbiy karta',
      'CREATE',
      `Yangi tashxis & ko'rik xulosasi kiritildi: ${newRec.patientName} (${newRec.diagnosis})`,
    );
    return newRec;
  }
  updateMedicalRecord(id, updates) {
    const index = this.records.findIndex((r) => r.id === id);
    if (index === -1) return null;
    this.records[index] = { ...this.records[index], ...updates };
    this.logActivity('Tibbiy karta', 'UPDATE', `Tibbiy karta tahrirlandi: ${id}`);
    return this.records[index];
  }
  deleteMedicalRecord(id) {
    const index = this.records.findIndex((r) => r.id === id);
    if (index === -1) return false;
    this.records.splice(index, 1);
    this.logActivity('Tibbiy karta', 'DELETE', `Tibbiy yozuv o'chirildi: ${id}`);
    return true;
  }
  // --- PRESCRIPTIONS CRUD ---
  getPrescriptions() {
    return [...this.prescriptions];
  }
  createPrescription(data) {
    const nextId = `RX-${700 + this.prescriptions.length + 1}`;
    const newRx = {
      ...data,
      id: nextId,
    };
    this.prescriptions.unshift(newRx);
    this.logActivity(
      'Retseptlar',
      'CREATE',
      `Elektron retsept yozildi: ${newRx.patientName} (${newRx.medications.length} ta dori)`,
    );
    return newRx;
  }
  updatePrescription(id, updates) {
    const index = this.prescriptions.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.prescriptions[index] = { ...this.prescriptions[index], ...updates };
    this.logActivity('Retseptlar', 'UPDATE', `Retsept yangilandi: ${id}`);
    return this.prescriptions[index];
  }
  deletePrescription(id) {
    const index = this.prescriptions.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.prescriptions.splice(index, 1);
    this.logActivity('Retseptlar', 'DELETE', `Retsept bekor qilindi: ${id}`);
    return true;
  }
  // --- LAB TESTS CRUD ---
  getLabTests() {
    return [...this.labTests];
  }
  createLabTest(data) {
    const nextId = `LAB-${800 + this.labTests.length + 1}`;
    const newTest = {
      ...data,
      id: nextId,
    };
    this.labTests.unshift(newTest);
    this.logActivity('Laboratoriya', 'CREATE', `Yangi tahlil buyurtmasi: ${newTest.patientName} - ${newTest.testName}`);
    return newTest;
  }
  updateLabTest(id, updates) {
    const index = this.labTests.findIndex((t) => t.id === id);
    if (index === -1) return null;
    this.labTests[index] = { ...this.labTests[index], ...updates };
    this.logActivity('Laboratoriya', 'UPDATE', `Tahlil natijalari kiritildi: ${id} (${updates.status || 'Natija'})`);
    return this.labTests[index];
  }
  deleteLabTest(id) {
    const index = this.labTests.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.labTests.splice(index, 1);
    this.logActivity('Laboratoriya', 'DELETE', `Tahlil buyurtmasi o'chirildi: ${id}`);
    return true;
  }
  // --- INVOICES CRUD ---
  getInvoices() {
    return [...this.invoices];
  }
  createInvoice(data) {
    const count = this.invoices.length + 901;
    const nextId = `INV-${count}`;
    const receiptNumber = `CHK-2026-${count}`;
    const newInvoice = {
      ...data,
      id: nextId,
      receiptNumber,
    };
    this.invoices.unshift(newInvoice);
    this.logActivity(
      'Kassa',
      'PAYMENT',
      `To'lov qabul qilindi / Hisob ochildi: ${receiptNumber} (${newInvoice.total.toLocaleString()} so'm)`,
    );
    return newInvoice;
  }
  updateInvoice(id, updates) {
    const index = this.invoices.findIndex((i) => i.id === id);
    if (index === -1) return null;
    this.invoices[index] = { ...this.invoices[index], ...updates };
    this.logActivity('Kassa', 'UPDATE', `Hisob-faktura o'zgartirildi: ${id}`);
    return this.invoices[index];
  }
  deleteInvoice(id) {
    const index = this.invoices.findIndex((i) => i.id === id);
    if (index === -1) return false;
    this.invoices.splice(index, 1);
    this.logActivity('Kassa', 'DELETE', `Hisob-faktura o'chirildi: ${id}`);
    return true;
  }
  // --- WARDS & BEDS CRUD ---
  getWards() {
    return [...this.wards];
  }
  createWard(data) {
    const nextId = `WRD-${100 + this.wards.length + 1}`;
    const newWard = {
      ...data,
      id: nextId,
      occupiedBeds: 0,
      patients: [],
    };
    this.wards.push(newWard);
    this.logActivity('Statsionar', 'CREATE', `Yangi palata qo'shildi: ${newWard.roomNumber} (${newWard.wardType})`);
    return newWard;
  }
  updateWard(id, updates) {
    const index = this.wards.findIndex((w) => w.id === id);
    if (index === -1) return null;
    this.wards[index] = { ...this.wards[index], ...updates };
    this.logActivity('Statsionar', 'UPDATE', `Palata ma'lumotlari tahrirlandi: ${this.wards[index].roomNumber}`);
    return this.wards[index];
  }
  admitPatientToWard(wardId, patientData) {
    const ward = this.wards.find((w) => w.id === wardId);
    if (!ward) return null;
    if (ward.occupiedBeds >= ward.totalBeds) {
      throw new Error("Ushbu palatada bo'sh o'rin mavjud emas");
    }
    const newBedNum = ward.patients.length + 1;
    ward.patients.push({
      ...patientData,
      bedNumber: newBedNum,
      admittedDate: new Date().toISOString().split('T')[0],
    });
    ward.occupiedBeds = ward.patients.length;
    this.updatePatient(patientData.patientId, { status: 'inpatient' });
    this.logActivity(
      'Statsionar',
      'UPDATE',
      `Bemor palataga yotqizildi: ${patientData.patientName} -> ${ward.roomNumber}`,
    );
    return ward;
  }
  dischargePatientFromWard(wardId, patientId) {
    const ward = this.wards.find((w) => w.id === wardId);
    if (!ward) return null;
    const pIdx = ward.patients.findIndex((p) => p.patientId === patientId);
    if (pIdx === -1) return null;
    const discharged = ward.patients[pIdx];
    ward.patients.splice(pIdx, 1);
    ward.occupiedBeds = ward.patients.length;
    this.updatePatient(patientId, { status: 'discharged' });
    this.logActivity(
      'Statsionar',
      'DISCHARGE',
      `Bemor palatadan chiqarildi: ${discharged.patientName} (${ward.roomNumber})`,
    );
    return ward;
  }
  deleteWard(id) {
    const index = this.wards.findIndex((w) => w.id === id);
    if (index === -1) return false;
    this.wards.splice(index, 1);
    this.logActivity('Statsionar', 'DELETE', `Palata o'chirildi: ${id}`);
    return true;
  }
  // --- INVENTORY CRUD ---
  getInventory() {
    return [...this.inventory];
  }
  createInventoryItem(data) {
    const nextId = `MED-${400 + this.inventory.length + 1}`;
    const newItem = {
      ...data,
      id: nextId,
    };
    this.inventory.unshift(newItem);
    this.logActivity(
      'Dorixona',
      'CREATE',
      `Omborga yangi preparat kiritildi: ${newItem.name} (${newItem.stockQuantity} ${newItem.unit})`,
    );
    return newItem;
  }
  updateInventoryItem(id, updates) {
    const index = this.inventory.findIndex((i) => i.id === id);
    if (index === -1) return null;
    this.inventory[index] = { ...this.inventory[index], ...updates };
    this.logActivity('Dorixona', 'UPDATE', `Ombor zaxirasi yangilandi: ${this.inventory[index].name}`);
    return this.inventory[index];
  }
  deleteInventoryItem(id) {
    const index = this.inventory.findIndex((i) => i.id === id);
    if (index === -1) return false;
    this.inventory.splice(index, 1);
    this.logActivity('Dorixona', 'DELETE', `Preparat ombordan o'chirildi: ${id}`);
    return true;
  }
  // --- SERVICES CRUD ---
  getServices() {
    return [...this.services];
  }
  createService(data) {
    const num = this.services.length + 1;
    const newService = {
      ...data,
      id: `SRV-${num < 10 ? '0' + num : num}`,
      code: `XIZ-${100 + num}`,
    };
    this.services.push(newService);
    this.logActivity(
      'Xizmatlar',
      'CREATE',
      `Yangi tibbiy xizmat qo'shildi: ${newService.name} (${newService.price.toLocaleString()} so'm)`,
    );
    return newService;
  }
  updateService(id, updates) {
    const index = this.services.findIndex((s) => s.id === id);
    if (index === -1) return null;
    this.services[index] = { ...this.services[index], ...updates };
    this.logActivity('Xizmatlar', 'UPDATE', `Xizmat tarifi yangilandi: ${this.services[index].name}`);
    return this.services[index];
  }
  deleteService(id) {
    const index = this.services.findIndex((s) => s.id === id);
    if (index === -1) return false;
    this.services.splice(index, 1);
    this.logActivity('Xizmatlar', 'DELETE', `Xizmat o'chirildi: ${id}`);
    return true;
  }
  // --- ACTIVITY LOGS ---
  getLogs() {
    return [...this.logs];
  }
  // --- CLINIC STATS ---
  getClinicStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayAppts = this.appointments.filter((a) => a.date === today);
    const queueWaiting = todayAppts.filter((a) => a.status === 'pending').length;
    // Revenue calculations
    const todayRevenue = this.invoices
      .filter((inv) => inv.date === today)
      .reduce((sum, inv) => sum + (inv.paidAmount || 0), 0);
    const monthlyRevenue = this.invoices.reduce((sum, inv) => sum + (inv.paidAmount || 0), 0);
    const totalBeds = this.wards.reduce((acc, w) => acc + w.totalBeds, 0);
    const occupiedBeds = this.wards.reduce((acc, w) => acc + w.occupiedBeds, 0);
    const lowStockItemsCount = this.inventory.filter((i) => i.stockQuantity <= i.minThreshold).length;
    const completedTestsToday = this.labTests.filter((t) => t.status === 'completed').length;
    return {
      totalPatients: this.patients.length,
      todayAppointments: todayAppts.length,
      queueWaiting,
      activeDoctors: this.doctors.filter((d) => d.status === 'active').length,
      todayRevenue,
      monthlyRevenue,
      totalBeds,
      occupiedBeds,
      lowStockItemsCount,
      completedTestsToday,
    };
  }
  // --- RESET / SEED DATA ---
  // --- STAFF / HR CRUD ---
  getStaff() {
    return [...this.staff];
  }
  getStaffById(id) {
    return this.staff.find((s) => s.id === id);
  }
  createStaff(data) {
    const newStaff = {
      ...data,
      id: `STF-${this.staff.length + 1}`,
      hiredAt: data.hiredAt || new Date().toISOString().split('T')[0],
      status: data.status || 'active',
    };
    this.staff.push(newStaff);
    this.logActivity('Xodimlar', 'CREATE', `Yangi xodim qo'shildi: ${newStaff.fullName} (${newStaff.id})`);
    return newStaff;
  }
  updateStaff(id, updates) {
    const index = this.staff.findIndex((s) => s.id === id);
    if (index === -1) return null;
    this.staff[index] = { ...this.staff[index], ...updates };
    this.logActivity('Xodimlar', 'UPDATE', `Xodim ma'lumotlari yangilandi: ${this.staff[index].fullName} (${id})`);
    return this.staff[index];
  }
  deleteStaff(id) {
    const index = this.staff.findIndex((s) => s.id === id);
    if (index === -1) return false;
    const deleted = this.staff[index];
    this.staff.splice(index, 1);
    this.logActivity('Xodimlar', 'DELETE', `Xodim bo'shatildi: ${deleted.fullName} (${id})`);
    return true;
  }
  resetToSampleData() {
    this.patients = [...initialPatients];
    this.doctors = [...initialDoctors];
    this.appointments = [...initialAppointments];
    this.records = [...initialMedicalRecords];
    this.prescriptions = [...initialPrescriptions];
    this.labTests = [...initialLabTests];
    this.invoices = [...initialInvoices];
    this.wards = [...initialWards];
    this.inventory = [...initialInventory];
    this.services = [...initialServices];
    this.logs = [...initialLogs];
    this.staff = [...initialStaff];
    this.logActivity('Tizim', 'UPDATE', 'Baza namunaviy holatga qayta tiklandi (Seed data restored)');
  }
}
export const clinicDB = new MedicalClinicDB();
