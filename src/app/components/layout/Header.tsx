import { Shield, LogOut, Bell, User, ChevronRight } from 'lucide-react';
import { C, ROLE_LABELS } from '../types';
import type { NavProps } from '../types';

interface HeaderProps extends NavProps {
  breadcrumbs?: Array<{ label: string; page?: string }>;
}

export function Header({ navigate, currentUser, logout, breadcrumbs }: HeaderProps) {
  const getDashboard = () => {
    if (!currentUser) return 'home' as const;
    if (currentUser.role === 'operador') return 'operador-dashboard' as const;
    if (currentUser.role === 'supervisor') return 'supervisor-dashboard' as const;
    return 'admin-dashboard' as const;
  };

  return (
    <header style={{ backgroundColor: C.tertiary, color: C.white, position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ backgroundColor: C.primary, padding: '3px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)' }}>
          🇨🇱 Gobierno de Chile — Servicio Nacional de Aduanas
        </span>
        <span style={{
          fontSize: '11px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          padding: '1px 8px',
          borderRadius: '4px',
          color: C.white,
        }}>
          Prototipo v1.0
        </span>
      </div>

      <div style={{ padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => navigate(getDashboard())}
        >
          <div style={{
            width: '40px', height: '40px',
            backgroundColor: C.primary,
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Shield size={20} color={C.white} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.02em' }}>
              Sistema de Gestión de Control Aduanero Fronterizo
            </div>
            <div style={{ fontSize: '11px', color: C.accent, fontWeight: 400 }}>
              Paso Los Libertadores · Aduana Chile
            </div>
          </div>
        </div>

        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => navigate('alertas')}
              style={{ background: 'none', border: 'none', color: C.accent, cursor: 'pointer', position: 'relative' }}
              title="Alertas"
            >
              <Bell size={20} />
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px',
                backgroundColor: C.secondary, color: C.white,
                borderRadius: '50%', width: '14px', height: '14px',
                fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700,
              }}>3</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px', height: '32px',
                backgroundColor: C.primary,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <User size={16} color={C.white} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{currentUser.name}</div>
                <div style={{ fontSize: '11px', color: C.accent }}>{ROLE_LABELS[currentUser.role]}</div>
              </div>
            </div>

            <button
              onClick={logout}
              style={{
                background: 'none', border: `1px solid ${C.accent}`,
                color: C.accent, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '12px', padding: '5px 12px', borderRadius: '6px',
                transition: 'all 0.2s',
              }}
            >
              <LogOut size={14} />
              Cerrar sesión
            </button>
          </div>
        ) : null}
      </div>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '6px 24px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {i > 0 && <ChevronRight size={12} color={C.accent} />}
              <span style={{ fontSize: '12px', color: i === breadcrumbs.length - 1 ? C.white : C.accent, cursor: crumb.page ? 'pointer' : 'default' }}>
                {crumb.label}
              </span>
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
