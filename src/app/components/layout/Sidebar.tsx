import {
  Home, FileText, Users, Globe, Bell, BarChart2,
  Settings, LogOut, Shield, UserCheck, AlertTriangle, ClipboardList, History,
} from 'lucide-react';
import { C } from '../types';
import type { NavProps, Page } from '../types';

interface SidebarProps extends NavProps {
  active: Page;
}

const OPERADOR_ITEMS = [
  { label: 'Inicio',               icon: Home,          page: 'operador-dashboard' as Page },
  { label: 'Expedientes',          icon: FileText,       page: 'operador-dashboard' as Page },
  { label: 'Nuevo expediente',     icon: ClipboardList,  page: 'nuevo-expediente' as Page },
  { label: 'Validaciones externas',icon: Globe,          page: 'sistemas-externos' as Page },
  { label: 'Alertas',              icon: Bell,           page: 'alertas' as Page },
  { label: 'Sistemas externos',    icon: Shield,         page: 'sistemas-externos' as Page },
];

const SUPERVISOR_ITEMS = [
  { label: 'Inicio',               icon: Home,          page: 'supervisor-dashboard' as Page },
  { label: 'Alertas y observaciones', icon: AlertTriangle, page: 'alertas' as Page },
  { label: 'Revisión manual',      icon: UserCheck,     page: 'supervisor-dashboard' as Page },
  { label: 'Expedientes',          icon: FileText,      page: 'supervisor-dashboard' as Page },
  { label: 'Reportes',             icon: BarChart2,     page: 'reportes' as Page },
  { label: 'Sistemas externos',    icon: Globe,         page: 'sistemas-externos' as Page },
];

const ADMIN_ITEMS = [
  { label: 'Inicio',               icon: Home,          page: 'admin-dashboard' as Page },
  { label: 'Usuarios',             icon: Users,         page: 'admin-dashboard' as Page },
  { label: 'Roles y permisos',     icon: Shield,        page: 'admin-dashboard' as Page },
  { label: 'Integraciones externas',icon: Globe,        page: 'sistemas-externos' as Page },
  { label: 'Auditoría',            icon: History,       page: 'admin-dashboard' as Page },
  { label: 'Reportes',             icon: BarChart2,     page: 'reportes' as Page },
  { label: 'Configuración',        icon: Settings,      page: 'admin-dashboard' as Page },
];

export function Sidebar({ navigate, currentUser, logout, active }: SidebarProps) {
  const items =
    currentUser?.role === 'operador' ? OPERADOR_ITEMS :
    currentUser?.role === 'supervisor' ? SUPERVISOR_ITEMS :
    ADMIN_ITEMS;

  return (
    <aside style={{
      width: '240px',
      minWidth: '240px',
      backgroundColor: C.tertiary,
      color: C.white,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      paddingTop: '8px',
    }}>
      <div style={{ flex: 1, padding: '8px 0' }}>
        {items.map((item) => {
          const isActive = active === item.page;
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.page)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 20px',
                background: isActive ? C.primary : 'none',
                border: 'none',
                color: isActive ? C.white : C.accent,
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                borderLeft: isActive ? `3px solid ${C.white}` : '3px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '12px 0' }}>
        <button
          onClick={() => navigate('version-historial')}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 20px',
            background: 'none', border: 'none',
            color: C.grayB, cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          <History size={14} />
          Historial de versiones
        </button>
        <button
          onClick={logout}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 20px',
            background: 'none', border: 'none',
            color: C.secondary, cursor: 'pointer',
            fontSize: '13px', fontWeight: 500,
          }}
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
