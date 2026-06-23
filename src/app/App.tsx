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
import { C } from './components/types';

/* v2.0.1 — pages that require an active session */
const PROTECTED: Page[] = [
  'operador-dashboard', 'nuevo-expediente',
  'supervisor-dashboard', 'admin-dashboard',
  'reportes', 'alertas', 'sistemas-externos',
];

function AuthGuard({
  page, currentUser, navigate, children,
}: { page: Page; currentUser: User | null; navigate: (p: Page) => void; children: React.ReactNode }) {
  if (PROTECTED.includes(page) && !currentUser) {
    const isSistemas = page === 'sistemas-externos';
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: C.bgPage, fontFamily: 'system-ui' }}>
        <div style={{ background: C.white, borderRadius: 12, padding: '40px 48px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', maxWidth: 420, width: '90%' }}>
          <div style={{ width: 56, height: 56, background: C.lightRed, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 28 }}>🔒</div>
          <h2 style={{ color: C.tertiary, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Acceso restringido</h2>
          <p role="alert" aria-live="assertive" style={{ color: C.grayA, fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
            {isSistemas
              ? 'Para acceder a los sistemas externos integrados debe iniciar sesión.'
              : 'Debe iniciar sesión para acceder a módulos internos del sistema.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => navigate('home')} style={{ background: C.neutral, color: C.grayA, border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Volver al inicio
            </button>
            <button onClick={() => navigate('login')} style={{ background: C.primary, color: C.white, border: 'none', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

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
      <AuthGuard page={currentPage} currentUser={currentUser} navigate={navigate}>
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
      </AuthGuard>
    </div>
  );
}
