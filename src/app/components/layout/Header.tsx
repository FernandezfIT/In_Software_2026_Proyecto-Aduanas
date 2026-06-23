import { Shield, LogOut, Bell, User, ChevronRight } from 'lucide-react';
import { C, ROLE_LABELS } from '../types';
import type { NavProps, Page } from '../types';

interface HeaderProps extends NavProps {
  breadcrumbs?: Array<{ label: string; page?: Page }>;
}

export function Header({ navigate, currentUser, logout, breadcrumbs }: HeaderProps) {
  const getDashboard = (): Page => {
    if (!currentUser) return 'home';
    if (currentUser.role === 'operador') return 'operador-dashboard';
    if (currentUser.role === 'supervisor') return 'supervisor-dashboard';
    return 'admin-dashboard';
  };

  return (
    <header style={{ backgroundColor: C.tertiary, color: C.white, position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Gov bar */}
      <div style={{ backgroundColor: C.primary, padding: '3px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)' }}>
          🇨🇱 Gobierno de Chile — Servicio Nacional de Aduanas
        </span>
        <span style={{ fontSize: '11px', backgroundColor: 'rgba(255,255,255,0.25)', padding: '1px 8px', borderRadius: '4px', color: C.white, fontWeight: 700 }}>
          Prototipo v2.0.2
        </span>
      </div>

      <div style={{ padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <button
          onClick={() => navigate(getDashboard())}
          aria-label="Ir al inicio del sistema"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', background: 'none', border: 'none', color: C.white, padding: 0 }}
        >
          <div style={{ width: '40px', height: '40px', backgroundColor: C.primary, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield size={20} color={C.white} aria-hidden="true" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.01em' }}>
              Sistema de Gestión de Control Aduanero Fronterizo
            </div>
            <div style={{ fontSize: '11px', color: C.accent, fontWeight: 400 }}>
              Paso Los Libertadores · Aduana Chile
            </div>
          </div>
        </button>

        {currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => navigate('alertas')}
              aria-label="Ver alertas — 3 alertas abiertas"
              style={{ background: 'none', border: 'none', color: C.accent, cursor: 'pointer', position: 'relative', padding: 4 }}
            >
              <Bell size={20} aria-hidden="true" />
              <span aria-hidden="true" style={{ position: 'absolute', top: '-2px', right: '-2px', backgroundColor: C.secondary, color: C.white, borderRadius: '50%', width: '14px', height: '14px', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>3</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: C.primary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={16} color={C.white} aria-hidden="true" />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{currentUser.name}</div>
                <div style={{ fontSize: '11px', color: C.accent }}>{ROLE_LABELS[currentUser.role]}</div>
              </div>
            </div>

            <button
              onClick={logout}
              aria-label="Cerrar sesión"
              style={{ background: 'none', border: `1px solid ${C.accent}`, color: C.accent, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', padding: '5px 12px', borderRadius: '6px' }}
            >
              <LogOut size={14} aria-hidden="true" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Ruta de navegación" style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '6px 24px' }}>
          <ol style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: 0, padding: 0, listStyle: 'none' }}>
            {breadcrumbs.map((crumb, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {i > 0 && <ChevronRight size={12} color={C.accent} aria-hidden="true" />}
                {crumb.page ? (
                  <button onClick={() => navigate(crumb.page!)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: C.accent, padding: 0 }}>
                    {crumb.label}
                  </button>
                ) : (
                  <span aria-current="page" style={{ fontSize: '12px', color: i === breadcrumbs.length - 1 ? C.white : C.accent }}>
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
    </header>
  );
}
