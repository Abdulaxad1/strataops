import React, { useEffect, useRef, useState } from 'react';
import App from './App.jsx';
import { AuthProvider, useAuth } from './auth/AuthContext.jsx';
import { LandingPage } from './auth/LandingPage.jsx';
import { AuthPage } from './auth/AuthPage.jsx';
import { PatientPortal } from './auth/PatientPortal.jsx';

const Gate = () => {
  const { user, loading } = useAuth();
  // 'landing' -> 'login' -> 'register' : oldin bosh sahifa, keyingina kirish/ro'yxatdan o'tish
  const [screen, setScreen] = useState('landing');
  const wasLoggedIn = useRef(false);

  useEffect(() => {
    if (wasLoggedIn.current && !user) setScreen('landing'); // chiqishdan keyin bosh sahifaga qaytadi
    wasLoggedIn.current = Boolean(user);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-400 flex items-center justify-center">
        Yuklanmoqda...
      </div>
    );
  }

  if (!user) {
    if (screen === 'landing') {
      return <LandingPage onGoLogin={() => setScreen('login')} onGoRegister={() => setScreen('register')} />;
    }
    return <AuthPage initialMode={screen} onBack={() => setScreen('landing')} />;
  }

  return user.role === 'patient' ? <PatientPortal /> : <App />;
};

export default function Root() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
