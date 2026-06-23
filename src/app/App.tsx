import { useState } from 'react';
import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { OperadorDashboard } from './components/pages/OperadorDashboard';
import { NuevoExpediente } from './components/pages/NuevoExpediente';
import { SupervisorDashboard } from './components/pages/SupervisorDashboard';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { Reportes } from './components/pages/Reportes';
import { SistemasExternos } from './components/pages/SistemasExternos';
import { Alertas } from './components/pages/Alertas';
import { VersionHistorial } from './components/pages/VersionHistorial';
import type { Page, User } from './components/types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const navigate = (page: Page, _params?: Record<string, unknown>) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  };

  const login = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'operador') navigate('operador-dashboard');
    else if (user.role === 'supervisor') navigate('supervisor-dashboard');
    else navigate('admin-dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    navigate('login');
  };

  const common = { navigate, currentUser, logout };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      {currentPage === 'home' && <HomePage {...common} />}
      {currentPage === 'login' && <LoginPage {...common} onLogin={login} />}
      {currentPage === 'operador-dashboard' && <OperadorDashboard {...common} />}
      {currentPage === 'nuevo-expediente' && <NuevoExpediente {...common} />}
      {currentPage === 'supervisor-dashboard' && <SupervisorDashboard {...common} />}
      {currentPage === 'admin-dashboard' && <AdminDashboard {...common} />}
      {currentPage === 'reportes' && <Reportes {...common} />}
      {currentPage === 'sistemas-externos' && <SistemasExternos {...common} />}
      {currentPage === 'alertas' && <Alertas {...common} />}
      {currentPage === 'version-historial' && <VersionHistorial {...common} />}
    </div>
  );
}
