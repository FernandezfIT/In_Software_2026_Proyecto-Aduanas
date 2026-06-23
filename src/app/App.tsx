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
import type { Page, User, UserRole } from './components/types';
import { C } from './components/types';

/* v2.0.2 — Role-based permissions per page */
const ROLE_PERMISSIONS: Record<UserRole, Page[]> = {
  operador:      ['operador-dashboard', 'nuevo-expediente', 'alertas', 'sistemas-externos', 'version-historial'],
  supervisor:    ['supervisor-dashboard', 'alertas', 'reportes', 'sistemas-externos', 'version-historial'],
  administrador: ['admin-dashboard', 'reportes', 'sistemas-externos', 'version-historial'],
};

const DASHBOARD_BY_ROLE: Record<UserRole, Page> = {
  operador: 'operador-dashboard',
  supervisor: 'supervisor-dashboard',
  administrador: 'admin-dashboard',
};

/* Pages accessible without login */
const PUBLIC: Page[] = ['home', 'login'];

function AuthGuard({
  page, currentUser, navigate, children,
}: { page: Page; currentUser: User | null; navigate: (p: Page) => void; children: React.ReactNode }) {

  /* 1. Not logged in — trying to access a protected page */
  if (!PUBLIC.includes(page) && !currentUser) {
    const isSistemas = page === 'sistemas-externos';
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: C.bgPage, fontFamily: 'system-ui' }}>
        <div style={{ background: C.white, borderRadius: 12, padding: '40px 48px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', maxWidth: 440, width: '90%' }}>
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

  /* 2. Logged in — trying to access a page not allowed for this role */
  if (currentUser && !PUBLIC.includes(page)) {
    const allowed = ROLE_PERMISSIONS[currentUser.role];
    if (!allowed.includes(page)) {
      const dashboard = DASHBOARD_BY_ROLE[currentUser.role];
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: C.bgPage, fontFamily: 'system-ui' }}>
          <div style={{ background: C.white, borderRadius: 12, padding: '40px 48px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', maxWidth: 440, width: '90%' }}>
            <div style={{ width: 56, height: 56, background: '#FFF8E1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 28 }}>⛔</div>
            <h2 style={{ color: C.tertiary, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Sin permisos</h2>
            <p role="alert" aria-live="assertive" style={{ color: C.grayA, fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
              No tiene permisos para acceder a este módulo.
            </p>
            <button onClick={() => navigate(dashboard)} style={{ background: C.primary, color: C.white, border: 'none', padding: '10px 28px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Volver a mi dashboard
            </button>
          </div>
        </div>
      );
    }
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
    navigate(DASHBOARD_BY_ROLE[user.role]);
  };

  const logout = () => {
    setCurrentUser(null);
    navigate('login');
  };

  const common = { navigate, currentUser, logout };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <AuthGuard page={currentPage} currentUser={currentUser} navigate={navigate}>
        {currentPage === 'home'               && <HomePage          {...common} />}
        {currentPage === 'login'              && <LoginPage         {...common} onLogin={login} />}
        {currentPage === 'operador-dashboard' && <OperadorDashboard {...common} />}
        {currentPage === 'nuevo-expediente'   && <NuevoExpediente   {...common} />}
        {currentPage === 'supervisor-dashboard' && <SupervisorDashboard {...common} />}
        {currentPage === 'admin-dashboard'    && <AdminDashboard    {...common} />}
        {currentPage === 'reportes'           && <Reportes          {...common} />}
        {currentPage === 'sistemas-externos'  && <SistemasExternos  {...common} />}
        {currentPage === 'alertas'            && <Alertas           {...common} />}
        {currentPage === 'version-historial'  && <VersionHistorial  {...common} />}
      </AuthGuard>
    </div>
  );
}
