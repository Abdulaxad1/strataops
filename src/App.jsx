import React, { useState, useEffect, useCallback } from 'react';
import { ClinicHeader } from './components/ClinicHeader.jsx';
import { ClinicSidebar } from './components/ClinicSidebar.jsx';
import { DashboardView } from './components/DashboardView.jsx';
import { PatientsView } from './components/PatientsView.jsx';
import { AppointmentsView } from './components/AppointmentsView.jsx';
import { DoctorsView } from './components/DoctorsView.jsx';
import { MedicalRecordsView } from './components/MedicalRecordsView.jsx';
import { PrescriptionsView } from './components/PrescriptionsView.jsx';
import { LabTestsView } from './components/LabTestsView.jsx';
import { BillingView } from './components/BillingView.jsx';
import { WardsView } from './components/WardsView.jsx';
import { PharmacyView } from './components/PharmacyView.jsx';
import { ServicesView } from './components/ServicesView.jsx';
import { PracticeLogView } from './components/PracticeLogView.jsx';
import { StandaloneBundleView } from './components/StandaloneBundleView.jsx';
import { AnalyticsView } from './components/AnalyticsView.jsx';
import { DentalChartView } from './components/DentalChartView.jsx';
import { NotificationCenterView } from './components/NotificationCenterView.jsx';
import { QueueTvModal } from './components/QueueTvModal.jsx';
import { Patient360Modal } from './components/Patient360Modal.jsx';
import { PrintDocModal } from './components/PrintDocModal.jsx';
import { ToastContainer } from './components/Toast.jsx';
import { ShieldAlert, RotateCcw } from 'lucide-react';
import { medicalApi } from './services/api.js';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Modal states for advanced features
  const [isQueueTvOpen, setIsQueueTvOpen] = useState(false);
  const [patient360, setPatient360] = useState(null);

  // Clinical Data States
  const [stats, setStats] = useState(null);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [wards, setWards] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [services, setServices] = useState([]);
  const [logs, setLogs] = useState([]);

  // Triggers for directly opening creation modals
  const [addPatientTrigger, setAddPatientTrigger] = useState(false);
  const [addAppointmentTrigger, setAddAppointmentTrigger] = useState(false);
  const [preselectedPatient, setPreselectedPatient] = useState(null);
  const [preselectedDoctor, setPreselectedDoctor] = useState(null);

  // Reset database confirmation modal
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Print Document Modal State
  const [printModalState, setPrintModalState] = useState({
    isOpen: false,
    type: 'prescription',
    data: null
  });

  const showToast = useCallback((type, title, message) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch all clinic data from backend
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        statsData,
        patientsData,
        doctorsData,
        appointmentsData,
        recordsData,
        prescriptionsData,
        labTestsData,
        invoicesData,
        wardsData,
        inventoryData,
        servicesData
      ] = await Promise.all([
        medicalApi.getStats(),
        medicalApi.getPatients(),
        medicalApi.getDoctors(),
        medicalApi.getAppointments(),
        medicalApi.getMedicalRecords(),
        medicalApi.getPrescriptions(),
        medicalApi.getLabTests(),
        medicalApi.getInvoices(),
        medicalApi.getWards(),
        medicalApi.getInventory(),
        medicalApi.getServices()
      ]);

      setStats(statsData);
      setPatients(patientsData);
      setDoctors(doctorsData);
      setAppointments(appointmentsData);
      setRecords(recordsData);
      setPrescriptions(prescriptionsData);
      setLabTests(labTestsData);
      setInvoices(invoicesData);
      setWards(wardsData);
      setInventory(inventoryData);
      setServices(servicesData);

      // Audit jurnali - faqat administrator/xodim uchun; muvaffaqiyatsiz bo'lsa
      // butun boshqaruv panelini bloklamasin
      medicalApi.getLogs().then(setLogs).catch(() => setLogs([]));
    } catch (err) {
      console.error('Error loading clinic data:', err);
      showToast('error', 'Ma\'lumotlarni yuklashda xatolik', err.message);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Reset sample seed data
  const handleConfirmResetSeed = async () => {
    setIsResetConfirmOpen(false);
    try {
      await medicalApi.resetSampleData();
      await loadData();
      showToast('success', 'Baza yangilandi', 'Namunaviy ma\'lumotlar muvaffaqiyatli tiklandi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  // Quick action from header & dashboard
  const handleQuickAction = (action) => {
    if (action === 'new_patient') {
      setCurrentTab('patients');
      setAddPatientTrigger((prev) => !prev);
    } else if (action === 'new_appointment') {
      setCurrentTab('appointments');
      setPreselectedPatient(null);
      setPreselectedDoctor(null);
      setAddAppointmentTrigger((prev) => !prev);
    }
  };

  // 1. Patients Handlers
  const handleAddPatient = async (data) => {
    try {
      await medicalApi.createPatient(data);
      await loadData();
      showToast('success', 'Bemor qo\'shildi', `${data.fullName} ro'yxatga olindi`);
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleUpdatePatient = async (id, data) => {
    try {
      await medicalApi.updatePatient(id, data);
      await loadData();
      showToast('success', 'Yangilandi', 'Bemor ma\'lumotlari saqlandi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await medicalApi.deletePatient(id);
      await loadData();
      showToast('success', 'O\'chirildi', 'Bemor bazadan o\'chirildi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  // 2. Doctors Handlers
  const handleAddDoctor = async (data) => {
    try {
      await medicalApi.createDoctor(data);
      await loadData();
      showToast('success', 'Shifokor qo\'shildi', `${data.name} bazaga kiritildi`);
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleUpdateDoctor = async (id, data) => {
    try {
      await medicalApi.updateDoctor(id, data);
      await loadData();
      showToast('success', 'Yangilandi', 'Shifokor ma\'lumotlari yangilandi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await medicalApi.deleteDoctor(id);
      await loadData();
      showToast('success', 'O\'chirildi', 'Shifokor o\'chirildi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  // 3. Appointments Handlers
  const handleCreateAppointment = async (data) => {
    try {
      const created = await medicalApi.createAppointment(data);
      await loadData();
      showToast('success', 'Qabulga yozildi', `${created.patientName} uchun navbat kuponi #${created.queueNumber}`);
      setPrintModalState({ isOpen: true, type: 'ticket', data: created });
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleUpdateAppointmentStatus = async (id, status) => {
    try {
      await medicalApi.updateAppointment(id, { status });
      await loadData();
      const statusLabels = {
        in_progress: 'Bemor qabulda',
        completed: 'Qabul yakunlandi',
        cancelled: 'Qabul bekor qilindi',
        pending: 'Kutilmoqda'
      };
      showToast('success', 'Holat yangilandi', statusLabels[status] || status);
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await medicalApi.deleteAppointment(id);
      await loadData();
      showToast('success', 'O\'chirildi', 'Qabul ro\'yxatdan olib tashlandi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  // 4. Medical Records Handlers
  const handleCreateRecord = async (data) => {
    try {
      const rec = await medicalApi.createMedicalRecord(data);
      await loadData();
      showToast('success', 'Tashxis saqlandi', `${data.patientName} ambulator kartasiga yozildi`);
      setPrintModalState({ isOpen: true, type: 'record', data: rec });
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleUpdateRecord = async (id, data) => {
    try {
      await medicalApi.updateMedicalRecord(id, data);
      await loadData();
      showToast('success', 'Yangilandi', 'Tibbiy karta ma\'lumotlari saqlandi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      await medicalApi.deleteMedicalRecord(id);
      await loadData();
      showToast('success', 'O\'chirildi', 'Tibbiy karta yozuvi o\'chirildi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  // 5. Prescriptions Handlers
  const handleCreatePrescription = async (data) => {
    try {
      const rx = await medicalApi.createPrescription(data);
      await loadData();
      showToast('success', 'Retsept berildi', `${rx.patientName} uchun ${rx.medications.length} ta dori yozildi`);
      setPrintModalState({ isOpen: true, type: 'prescription', data: rx });
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleUpdatePrescription = async (id, data) => {
    try {
      await medicalApi.updatePrescription(id, data);
      await loadData();
      showToast('success', 'Retsept yangilandi', 'Retsept holati saqlandi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleDeletePrescription = async (id) => {
    try {
      await medicalApi.deletePrescription(id);
      await loadData();
      showToast('success', 'O\'chirildi', 'Retsept o\'chirildi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  // 6. Lab Tests Handlers
  const handleCreateLabTest = async (data) => {
    try {
      await medicalApi.createLabTest(data);
      await loadData();
      showToast('success', 'Tahlil buyurtma qilindi', `${data.patientName} - ${data.testName}`);
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleUpdateLabTest = async (id, data) => {
    try {
      const updated = await medicalApi.updateLabTest(id, data);
      await loadData();
      showToast('success', 'Natijalar tayyor', 'Tahlil xulosasi saqlandi');
      setPrintModalState({ isOpen: true, type: 'lab', data: updated });
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleDeleteLabTest = async (id) => {
    try {
      await medicalApi.deleteLabTest(id);
      await loadData();
      showToast('success', 'O\'chirildi', 'Tahlil o\'chirildi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  // 7. Invoices Handlers
  const handleCreateInvoice = async (data) => {
    try {
      const inv = await medicalApi.createInvoice(data);
      await loadData();
      showToast('success', 'Kassa cheki berildi', `${inv.total?.toLocaleString()} so'm to'lov qabul qilindi`);
      setPrintModalState({ isOpen: true, type: 'invoice', data: inv });
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleUpdateInvoice = async (id, data) => {
    try {
      await medicalApi.updateInvoice(id, data);
      await loadData();
      showToast('success', 'To\'lov yangilandi', 'Kassa hisobi holati saqlandi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleDeleteInvoice = async (id) => {
    try {
      await medicalApi.deleteInvoice(id);
      await loadData();
      showToast('success', 'O\'chirildi', 'Hisob o\'chirildi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  // 8. Wards Handlers
  const handleCreateWard = async (data) => {
    try {
      await medicalApi.createWard(data);
      await loadData();
      showToast('success', 'Palata qo\'shildi', `${data.roomNumber} bazaga kiritildi`);
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleAdmitToWard = async (wardId, patientData) => {
    try {
      await medicalApi.admitToWard(wardId, patientData);
      await loadData();
      showToast('success', 'Bemor yotqizildi', `${patientData.patientName} statsionarga qabul qilindi`);
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleDischargeFromWard = async (wardId, patientId) => {
    try {
      await medicalApi.dischargeFromWard(wardId, patientId);
      await loadData();
      showToast('success', 'Bemor chiqarildi', 'Bemor statsionardan chiqarildi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleDeleteWard = async (id) => {
    try {
      await medicalApi.deleteWard(id);
      await loadData();
      showToast('success', 'O\'chirildi', 'Palata o\'chirildi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  // 9. Pharmacy Inventory Handlers
  const handleCreateInventoryItem = async (data) => {
    try {
      await medicalApi.createInventoryItem(data);
      await loadData();
      showToast('success', 'Preparat qabul qilindi', `${data.name} omborga qo'shildi`);
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleUpdateInventoryItem = async (id, data) => {
    try {
      await medicalApi.updateInventoryItem(id, data);
      await loadData();
      showToast('success', 'Ombor yangilandi', 'Dori vositasi ma\'lumotlari saqlandi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleDeleteInventoryItem = async (id) => {
    try {
      await medicalApi.deleteInventoryItem(id);
      await loadData();
      showToast('success', 'O\'chirildi', 'Dori vositasi o\'chirildi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  // 10. Services Price List Handlers
  const handleCreateService = async (data) => {
    try {
      await medicalApi.createService(data);
      await loadData();
      showToast('success', 'Xizmat qo\'shildi', `${data.name} ro'yxatga kiritildi`);
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleUpdateService = async (id, data) => {
    try {
      await medicalApi.updateService(id, data);
      await loadData();
      showToast('success', 'Tarif yangilandi', 'Xizmat narxi saqlandi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await medicalApi.deleteService(id);
      await loadData();
      showToast('success', 'O\'chirildi', 'Xizmat o\'chirildi');
    } catch (err) {
      showToast('error', 'Xatolik', err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans antialiased selection:bg-teal-500 selection:text-slate-950">
      
      {/* Top Clinical Header */}
      <ClinicHeader
        stats={stats}
        onRefresh={loadData}
        onResetSeed={() => setIsResetConfirmOpen(true)}
        onQuickAction={handleQuickAction}
        onGoToDashboard={() => {
          setCurrentTab('dashboard');
          setSearchTerm('');
        }}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoading={isLoading}
        patients={patients}
        doctors={doctors}
        appointments={appointments}
        invoices={invoices}
        onNavigate={setCurrentTab}
      />

      {/* Main Workspace: Sidebar + Module Views */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Navigation Sidebar */}
        <ClinicSidebar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          stats={stats}
          onOpenQueueTv={() => setIsQueueTvOpen(true)}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              stats={stats}
              appointments={appointments}
              patients={patients}
              invoices={invoices}
              logs={logs}
              onNavigate={setCurrentTab}
              onQuickAction={handleQuickAction}
            />
          )}

          {currentTab === 'patients' && (
            <PatientsView
              patients={patients}
              onAddPatient={handleAddPatient}
              onUpdatePatient={handleUpdatePatient}
              onDeletePatient={handleDeletePatient}
              onView360={(p) => setPatient360(p)}
              onOpenRecord={(p) => {
                setCurrentTab('records');
                setSearchTerm(p.fullName);
              }}
              onScheduleAppointment={(p) => {
                setPreselectedPatient(p);
                setPreselectedDoctor(null);
                setCurrentTab('appointments');
                setAddAppointmentTrigger((prev) => !prev);
              }}
              searchTerm={searchTerm}
              triggerAddModal={addPatientTrigger}
            />
          )}

          {currentTab === 'appointments' && (
            <AppointmentsView
              appointments={appointments}
              doctors={doctors}
              patients={patients}
              onCreateAppointment={handleCreateAppointment}
              onUpdateStatus={handleUpdateAppointmentStatus}
              onDeleteAppointment={handleDeleteAppointment}
              onPrintTicket={(app) => setPrintModalState({ isOpen: true, type: 'ticket', data: app })}
              searchTerm={searchTerm}
              preselectedPatient={preselectedPatient}
              preselectedDoctor={preselectedDoctor}
              triggerAddModal={addAppointmentTrigger}
            />
          )}

          {currentTab === 'doctors' && (
            <DoctorsView
              doctors={doctors}
              onAddDoctor={handleAddDoctor}
              onUpdateDoctor={handleUpdateDoctor}
              onDeleteDoctor={handleDeleteDoctor}
              onScheduleForDoctor={(doc) => {
                setPreselectedDoctor(doc);
                setPreselectedPatient(null);
                setCurrentTab('appointments');
                setAddAppointmentTrigger((prev) => !prev);
              }}
              searchTerm={searchTerm}
            />
          )}

          {currentTab === 'records' && (
            <MedicalRecordsView
              records={records}
              patients={patients}
              doctors={doctors}
              onCreateRecord={handleCreateRecord}
              onUpdateRecord={handleUpdateRecord}
              onDeleteRecord={handleDeleteRecord}
              onPrintRecord={(rec) => setPrintModalState({ isOpen: true, type: 'record', data: rec })}
              searchTerm={searchTerm}
            />
          )}

          {currentTab === 'prescriptions' && (
            <PrescriptionsView
              prescriptions={prescriptions}
              patients={patients}
              doctors={doctors}
              onCreatePrescription={handleCreatePrescription}
              onUpdatePrescription={handleUpdatePrescription}
              onDeletePrescription={handleDeletePrescription}
              onPrintPrescription={(rx) => setPrintModalState({ isOpen: true, type: 'prescription', data: rx })}
              searchTerm={searchTerm}
            />
          )}

          {currentTab === 'lab-tests' && (
            <LabTestsView
              labTests={labTests}
              patients={patients}
              doctors={doctors}
              onCreateTest={handleCreateLabTest}
              onUpdateTest={handleUpdateLabTest}
              onDeleteTest={handleDeleteLabTest}
              onPrintTest={(test) => setPrintModalState({ isOpen: true, type: 'lab', data: test })}
              searchTerm={searchTerm}
            />
          )}

          {currentTab === 'billing' && (
            <BillingView
              invoices={invoices}
              patients={patients}
              services={services}
              onCreateInvoice={handleCreateInvoice}
              onUpdateInvoice={handleUpdateInvoice}
              onDeleteInvoice={handleDeleteInvoice}
              onPrintInvoice={(inv) => setPrintModalState({ isOpen: true, type: 'invoice', data: inv })}
              searchTerm={searchTerm}
            />
          )}

          {currentTab === 'wards' && (
            <WardsView
              wards={wards}
              patients={patients}
              doctors={doctors}
              onCreateWard={handleCreateWard}
              onAdmitPatient={handleAdmitToWard}
              onDischargePatient={handleDischargeFromWard}
              onDeleteWard={handleDeleteWard}
              searchTerm={searchTerm}
            />
          )}

          {currentTab === 'pharmacy' && (
            <PharmacyView
              inventory={inventory}
              onCreateItem={handleCreateInventoryItem}
              onUpdateItem={handleUpdateInventoryItem}
              onDeleteItem={handleDeleteInventoryItem}
              searchTerm={searchTerm}
            />
          )}

          {currentTab === 'services' && (
            <ServicesView
              services={services}
              onCreateService={handleCreateService}
              onUpdateService={handleUpdateService}
              onDeleteService={handleDeleteService}
              searchTerm={searchTerm}
            />
          )}

          {currentTab === 'dental' && (
            <DentalChartView
              patients={patients}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView
              invoices={invoices}
              doctors={doctors}
              appointments={appointments}
              patients={patients}
            />
          )}

          {currentTab === 'notifications' && (
            <NotificationCenterView
              patients={patients}
              appointments={appointments}
              onSendNotification={(msg) => showToast('success', 'Xabar Yuborildi', `${msg.recipient} (${msg.phone}) ga yetkazildi`)}
            />
          )}

          {currentTab === 'logs' && (
            <PracticeLogView
              logs={logs}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'standalone' && (
            <StandaloneBundleView />
          )}
        </main>

      </div>

      {/* Database Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400">
              <RotateCcw className="w-6 h-6" />
              <h3 className="font-bold text-white text-base">Namunaviy bazani tiklash</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Klinika ma'lumotlar bazasini boshlang'ich namunaviy holatga qaytarmoqchimisiz? Barcha yangi yozuvlar standart demo ma'lumotlar bilan almashtiriladi.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleConfirmResetSeed}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
              >
                Ha, qayta tiklansin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Queue TV Display Modal */}
      {isQueueTvOpen && (
        <QueueTvModal
          appointments={appointments}
          doctors={doctors}
          onClose={() => setIsQueueTvOpen(false)}
        />
      )}

      {/* Patient 360-Degree Comprehensive Dossier Modal */}
      {patient360 && (
        <Patient360Modal
          patient={patient360}
          records={records}
          appointments={appointments}
          prescriptions={prescriptions}
          labTests={labTests}
          invoices={invoices}
          onClose={() => setPatient360(null)}
          onScheduleAppointment={(p) => {
            setPreselectedPatient(p);
            setCurrentTab('appointments');
            setAddAppointmentTrigger(prev => !prev);
          }}
          onPrintRecord={(rec) => setPrintModalState({ isOpen: true, type: 'record', data: rec })}
          onPrintPrescription={(rx) => setPrintModalState({ isOpen: true, type: 'prescription', data: rx })}
          onPrintTest={(test) => setPrintModalState({ isOpen: true, type: 'lab', data: test })}
          onPrintInvoice={(inv) => setPrintModalState({ isOpen: true, type: 'invoice', data: inv })}
          onSendSms={(phone, text, name) => showToast('success', 'SMS Yuborildi', `${name} (${phone}) ga xabar jo'natildi`)}
        />
      )}

      {/* Printable Modal (Prescription, Receipt, Lab Result, Epicrisis, Queue Ticket) */}
      {printModalState.isOpen && (
        <PrintDocModal
          type={printModalState.type}
          data={printModalState.data}
          onClose={() => setPrintModalState({ isOpen: false, type: 'prescription', data: null })}
        />
      )}

      {/* Floating Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
}
