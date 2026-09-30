/**
 * ShifoMed ERP - Tibbiyot Markazi & Xususiy Klinika Tizimi
 * Data Types & Schemas (JSDoc typedef ko'rinishida)
 *
 * Ushbu fayl runtime'da hech narsa eksport qilmaydi — faqat IDE (VS Code)
 * avtomatik to'ldirishi uchun. Ishlatish: @type {import('./types/index.js').Patient}
 */

/** @typedef {'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'} BloodGroup */

/** @typedef {'active' | 'inpatient' | 'discharged' | 'consultation'} PatientStatus */

/**
 * @typedef {Object} Patient
 * @property {string} id - e.g. PAT-1001
 * @property {string} fullName
 * @property {string} birthDate - YYYY-MM-DD
 * @property {'Erkak' | 'Ayol'} gender
 * @property {string} phone
 * @property {string} passport - e.g. AA 1234567 or JSHSHIR
 * @property {BloodGroup} bloodGroup
 * @property {string} address
 * @property {string} [allergies]
 * @property {string} [chronicDiseases]
 * @property {string} registeredAt
 * @property {PatientStatus} status
 * @property {string} [notes]
 * @property {string} [emergencyContact]
 */

/** @typedef {'Kardiolog' | 'Nevropatolog' | 'Umumiy jarroh' | 'Terapevt' | 'Pediatr' | 'Ginekolog' | 'Oftalmolog' | 'Stomatolog' | 'UZI / Rentgenolog' | 'LOR (Otorinolaringolog)'} DoctorSpecialty */

/**
 * @typedef {Object} Doctor
 * @property {string} id - e.g. DOC-201
 * @property {string} name
 * @property {DoctorSpecialty} specialty
 * @property {string} qualification - e.g. 'Oliy toifali shifokor', 'Tibbiyot fanlari nomzodi'
 * @property {number} experienceYears
 * @property {string} phone
 * @property {string} email
 * @property {string} room - e.g. 'Xona 204'
 * @property {string} workHours - e.g. '08:30 - 15:00'
 * @property {number} consultationFee - in so'm (UZS)
 * @property {string} avatar
 * @property {'active' | 'on_leave' | 'busy'} status
 * @property {number} rating - 4.5 - 5.0
 * @property {number} activePatientsCount
 */

/** @typedef {'pending' | 'in_progress' | 'completed' | 'cancelled'} AppointmentStatus */

/** @typedef {'consultation' | 'follow_up' | 'emergency' | 'procedure'} AppointmentType */

/**
 * @typedef {Object} Appointment
 * @property {string} id - e.g. APP-301
 * @property {number} queueNumber - Daily ticket e.g. 1, 2, 3
 * @property {string} patientId
 * @property {string} patientName
 * @property {string} patientPhone
 * @property {string} doctorId
 * @property {string} doctorName
 * @property {string} department
 * @property {string} date - YYYY-MM-DD
 * @property {string} timeSlot - HH:MM
 * @property {AppointmentType} type
 * @property {AppointmentStatus} status
 * @property {string} [complaint]
 * @property {string} room
 * @property {string} createdAt
 */

/**
 * @typedef {Object} VitalSigns
 * @property {string} bloodPressure - e.g. 120/80
 * @property {number} heartRate - bpm
 * @property {number} temperature - °C
 * @property {number} weight - kg
 * @property {number} [spo2] - %
 */

/**
 * @typedef {Object} MedicalRecord
 * @property {string} id - e.g. REC-501
 * @property {string} patientId
 * @property {string} patientName
 * @property {string} doctorId
 * @property {string} doctorName
 * @property {string} doctorSpecialty
 * @property {string} visitDate
 * @property {string} complaints
 * @property {string} anamnesis - Kasallik tarixi
 * @property {string} objectiveStatus - Ob'yektiv ko'rik
 * @property {VitalSigns} vitals
 * @property {string} diagnosis - Asosiy tashxis (ICD-10 mos)
 * @property {string} [concomitantDiagnosis] - Hamroh kasalliklar
 * @property {string} treatmentPlan
 * @property {string} recommendations
 * @property {string} createdAt
 */

/**
 * @typedef {Object} PrescriptionItem
 * @property {string} id
 * @property {string} medicineName
 * @property {string} dosage - e.g. '500 mg'
 * @property {string} frequency - e.g. 'Kunda 2 mahal ovqatdan so\'ng'
 * @property {number} durationDays
 * @property {string} [instruction]
 */

/**
 * @typedef {Object} Prescription
 * @property {string} id - e.g. RX-701
 * @property {string} patientId
 * @property {string} patientName
 * @property {number} patientAge
 * @property {string} doctorId
 * @property {string} doctorName
 * @property {string} specialty
 * @property {string} diagnosis
 * @property {string} issueDate
 * @property {number} validDays
 * @property {PrescriptionItem[]} medications
 * @property {string} [notes]
 * @property {'active' | 'dispensed' | 'expired'} status
 */

/** @typedef {'pending' | 'processing' | 'completed' | 'cancelled'} LabTestStatus */

/**
 * @typedef {Object} LabResultItem
 * @property {string} parameter
 * @property {string} value
 * @property {string} unit
 * @property {string} referenceRange
 * @property {boolean} isAbnormal
 */

/**
 * @typedef {Object} LabTest
 * @property {string} id - e.g. LAB-801
 * @property {string} patientId
 * @property {string} patientName
 * @property {string} testName - e.g. 'Umumiy qon tahlili (UQT)'
 * @property {'Qon tahlili' | 'Biokimyo' | 'Siydik tahlili' | 'Gormonlar' | 'Instrumental (UZI/Rentgen)'} category
 * @property {string} orderedByDoctorId
 * @property {string} orderedByDoctorName
 * @property {string} orderDate
 * @property {string} [resultDate]
 * @property {LabTestStatus} status
 * @property {number} price
 * @property {LabResultItem[]} results
 * @property {string} [doctorConclusion]
 * @property {string} [laboratoryTech]
 */

/**
 * @typedef {Object} InvoiceItem
 * @property {string} id
 * @property {string} description
 * @property {'konsultatsiya' | 'tahlil' | 'palata' | 'dori' | 'muolaja'} category
 * @property {number} quantity
 * @property {number} unitPrice
 * @property {number} amount
 */

/** @typedef {'Naqd' | 'Uzcard / Humo' | 'Payme / Click' | 'Tibbiy Sug\'urta'} PaymentMethod */

/** @typedef {'paid' | 'partial' | 'unpaid'} PaymentStatus */

/**
 * @typedef {Object} Invoice
 * @property {string} id - e.g. INV-901
 * @property {string} receiptNumber
 * @property {string} patientId
 * @property {string} patientName
 * @property {string} date
 * @property {InvoiceItem[]} items
 * @property {number} subtotal
 * @property {number} discount
 * @property {number} total
 * @property {number} paidAmount
 * @property {PaymentMethod} paymentMethod
 * @property {PaymentStatus} paymentStatus
 * @property {string} cashierName
 * @property {string} [notes]
 */

/**
 * @typedef {Object} WardPatient
 * @property {string} patientId
 * @property {string} patientName
 * @property {number} bedNumber
 * @property {string} admittedDate
 * @property {string} attendingDoctor
 * @property {string} diagnosis
 */

/**
 * @typedef {Object} Ward
 * @property {string} id - e.g. WRD-101
 * @property {string} roomNumber - 'Palata 201'
 * @property {number} floor
 * @property {'Standart' | 'VIP' | 'Reanimatsiya / ITB' | 'Pediatriya'} wardType
 * @property {number} totalBeds
 * @property {number} occupiedBeds
 * @property {number} dailyRate - so'm/kun
 * @property {string[]} amenities
 * @property {WardPatient[]} patients
 */

/**
 * @typedef {Object} InventoryItem
 * @property {string} id - e.g. MED-401
 * @property {string} name
 * @property {'Antibiotik' | 'Kardiologik' | 'Og\'riqsizlantiruvchi' | 'Vitaminlar' | 'Shprits & Sarflov' | 'Antiseptik'} category
 * @property {string} manufacturer
 * @property {string} batchNumber
 * @property {number} stockQuantity
 * @property {number} minThreshold
 * @property {'quti' | 'ampula' | 'flakon' | 'dona' | 'o\'ram'} unit
 * @property {number} unitCost - Xarid narxi
 * @property {number} salePrice - Sotuv narxi
 * @property {string} expiryDate
 * @property {string} supplier
 */

/**
 * @typedef {Object} ClinicService
 * @property {string} id - e.g. SRV-01
 * @property {string} code
 * @property {string} name
 * @property {'Konsultatsiya' | 'Diagnostika' | 'Muolaja' | 'Jarrohlik' | 'Stomatologiya'} category
 * @property {number} price
 * @property {number} durationMinutes
 * @property {string} description
 * @property {boolean} isActive
 */

/**
 * @typedef {Object} ClinicStats
 * @property {number} totalPatients
 * @property {number} todayAppointments
 * @property {number} queueWaiting
 * @property {number} activeDoctors
 * @property {number} todayRevenue
 * @property {number} monthlyRevenue
 * @property {number} occupiedBeds
 * @property {number} totalBeds
 * @property {number} lowStockItemsCount
 * @property {number} completedTestsToday
 */

/**
 * @typedef {Object} ActivityLog
 * @property {string} id
 * @property {string} timestamp
 * @property {string} module
 * @property {'CREATE' | 'UPDATE' | 'DELETE' | 'DISCHARGE' | 'PAYMENT'} action
 * @property {string} description
 * @property {string} user
 */

export {};
