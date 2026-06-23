import { useState } from 'react';
import {
  Home, FileText, Globe, Bell, BarChart2,
  Settings, LogOut, Shield, UserCheck, AlertTriangle, ClipboardList, History,
  Users, Menu, X, Car, FileCheck,
} from 'lucide-react';
import { C } from '../types';
import type { NavProps, Page } from '../types';

interface SidebarProps extends NavProps { active: Page; }

const OPERADOR_ITEMS = [
  { label: 'Inicio',                 icon: Home,        page: 'operador-dashboard' as Page },
  { label: 'Expedientes',            icon: FileText,    page: 'operador-dashboard' as Page },
  { label: 'Nuevo expediente',       icon: ClipboardList, page: 'nuevo-expediente' as Page },
  { label: 'Documentación de menor', icon: FileCheck,   page: 'operador-dashboard' as Page },
  { label: 'Vehículos',              icon: Car,         page: 'operador-dashboard' as Page },
  { label: 'Validaciones externas',  icon: Globe,       page: 'sistemas-externos' as Page },
  { label: 'Alertas',                icon: Bell,        page: 'alertas' as Page },
  { label: 'Sistemas externos',      icon: Shield,      page: 'sistemas-externos' as Page },
];

const SUPERVISOR_ITEMS = [
  { label: 'Inicio',                  icon: Home,          page: 'supervisor-dashboard' as Page },
  { label: 'Alertas y observaciones', icon: AlertTriangle, page: 'alertas' as Page },
  { label: 'Revisión manual',         icon: UserCheck,     page: 'supervisor-dashboard' as Page },
  { label: 'Expedientes',             icon: FileText,      page: 'supervisor-dashboard' as Page },
  { label: 'Reportes',                icon: BarChart2,     page: 'reportes' as Page },
  { label: 'Sistemas externos',       icon: Globe,         page: 'sistemas-externos' as Page },
];

const ADMIN_ITEMS = [
  { label: 'Inicio',                  icon: Home,     page: 'admin-dashboard' as Page },
  { label: 'Usuarios',               icon: Users,    page: 'admin-dashboard' as Page },
  { label: 'Roles y permisos',       icon: Shield,   page: 'admin-dashboard' as Page },
  { label: 'Integraciones externas', icon: Globe,    page: 'sistemas-externos' as Page },
  { label: 'Auditoría',              icon: History,  page: 'admin-dashboard' as Page },
  { label: 'Reportes',               icon: BarChart2, page: 'reportes' as Page },
  { label: 'Configuración',          icon: Settings, page: 'admin-dashboard' as Page },
];

export function Sidebar({ navigate, currentUser, logout, active }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  /* v2.0.1 — never default to admin when no user */
  if (!currentUser) return null;

  const items =
    currentUser.role === 'operador'   ? OPERADOR_ITEMS :
    currentUser.role === 'supervisor' ? SUPERVISOR_ITEMS :
    ADMIN_ITEMS;

  const NavItems = () => (
    <>
      <nav aria-label="Navegación principal" style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {items.map((item) => {
          const isActive = active === item.page;
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => { navigate(item.page); setMobileOpen(false); }}
              aria-current={isActive ? 'page' : undefined}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 20px', background: isActive ? C.primary : 'none',
                border: 'none', color: isActive ? C.white : C.accent,
                cursor: 'pointer', textAlign: 'left', fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                borderLeft: isActive ? `3px solid ${C.white}` : '3px solid transparent',
                transition: 'background 0.15s',
              }}
            >
              <Icon size={16} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '12px 0' }}>
        <button
          onClick={() => { navigate('version-historial'); setMobileOpen(false); }}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px', background: 'none', border: 'none', color: C.grayB, cursor: 'pointer', fontSize: '12px' }}
        >
          <History size={14} aria-hidden="true" />
          Historial de versiones
        </button>
        <button
          onClick={logout}
          aria-label="Cerrar sesión"
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px', background: 'none', border: 'none', color: C.secondary, cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}
        >
          <LogOut size={16} aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside
        aria-label="Panel de navegación"
        style={{ width: '240px', minWidth: '240px', backgroundColor: C.tertiary, color: C.white, display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: '8px' }}
        className="sidebar-desktop"
      >
        <NavItems />
      </aside>

      {/* Mobile hamburger */}
      <button
        aria-label="Abrir menú de navegación"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
        className="mobile-menu-btn"
        style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 900, background: C.primary, border: 'none', borderRadius: '50%', width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <Menu size={24} color={C.white} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div role="dialog" aria-modal="true" aria-label="Menú de navegación" style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex' }}>
          <div onClick={() => setMobileOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <aside style={{ position: 'relative', width: 260, background: C.tertiary, color: C.white, display: 'flex', flexDirection: 'column', paddingTop: 8, boxShadow: '4px 0 24px rgba(0,0,0,0.3)' }}>
            <button aria-label="Cerrar menú" onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: C.accent, cursor: 'pointer' }}>
              <X size={22} />
            </button>
            <div style={{ marginTop: 40, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <NavItems />
            </div>
          </aside>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .mobile-menu-btn { display: none !important; } }
        @media (max-width: 767px) { .sidebar-desktop { display: none !important; } }
      `}</style>
    </>
  );
}
