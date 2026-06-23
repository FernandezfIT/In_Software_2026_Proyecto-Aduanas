import { CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { Layout } from '../layout/Layout';
import { C } from '../types';
import type { NavProps } from '../types';

const CHANGES = [
  'Pantalla principal institucional con hero Paso Los Libertadores',
  'Login por roles (Operador, Supervisor, Administrador)',
  'Dashboard Operador con expedientes y acciones rápidas',
  'Dashboard Supervisor con revisión manual y gestión de alertas',
  'Dashboard Administrador con usuarios, roles y auditoría',
  'Flujo de expediente (wizard 8 pasos — CU-02 a CU-05)',
  'Validación de documentos de menor de edad (CU-03)',
  'Registro y validación vehicular (CU-04)',
  'Validaciones externas SAG, PDI y Aduana Limítrofe (CU-05)',
  'Gestión de alertas RF09 con modal de detalle',
  'Reportes operativos y estadísticos CU-06 con gráficos',
  'Pantalla de sistemas externos integrados con detalle',
];

const NEXT_VERSIONS = [
  { version: 'v1.1', desc: 'Ajustes de usabilidad y retroalimentación de usuarios' },
  { version: 'v1.2', desc: 'Ajustes según plan de pruebas ISO 25000' },
  { version: 'v2.0', desc: 'Prototipo final corregido con validación completa' },
];

export function VersionHistorial({ navigate, currentUser, logout }: NavProps) {
  const getDashboard = () => {
    if (!currentUser) return 'home' as const;
    if (currentUser.role === 'operador') return 'operador-dashboard' as const;
    if (currentUser.role === 'supervisor') return 'supervisor-dashboard' as const;
    return 'admin-dashboard' as const;
  };

  return (
    <Layout
      navigate={navigate} currentUser={currentUser} logout={logout}
      activePage={currentUser ? getDashboard() : 'home'}
      breadcrumbs={[{ label: 'Inicio' }, { label: 'Historial de versiones' }]}
    >
      <div style={{ maxWidth: '800px' }}>
        <button
          onClick={() => navigate(getDashboard())}
          style={{ backgroundColor: C.neutral, color: C.grayA, border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}
        >
          <ArrowLeft size={15} /> Volver al inicio
        </button>

        <div style={{ backgroundColor: C.white, borderRadius: '14px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ backgroundColor: C.tertiary, padding: '28px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: C.white, marginBottom: '6px' }}>
                  Historial de versiones
                </div>
                <div style={{ fontSize: '14px', color: C.accent }}>
                  Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores
                </div>
              </div>
              <span style={{ backgroundColor: C.primary, color: C.white, padding: '6px 18px', borderRadius: '99px', fontSize: '14px', fontWeight: 700 }}>
                Prototipo v1.0
              </span>
            </div>
          </div>

          <div style={{ padding: '32px' }}>
            {/* Current version */}
            <div style={{ backgroundColor: C.lightBlue, border: `1px solid ${C.primary}`, borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: C.primary }}>Versión 1.0</div>
                  <div style={{ fontSize: '13px', color: C.grayA, marginTop: '4px' }}>Prototipo inicial EV3 — EV2 como fuente base</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ backgroundColor: C.lightGreen, color: C.green, padding: '4px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 700 }}>
                    <CheckCircle size={12} style={{ display: 'inline', marginRight: '4px' }} />Estado: Prototipo inicial
                  </span>
                  <span style={{ fontSize: '12px', color: C.grayB, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} />Fecha: {new Date().toLocaleDateString('es-CL')}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: C.grayA, marginBottom: '16px', lineHeight: 1.7 }}>
                Primera versión navegable basada en EV2: casos de uso, diagrama de actividades y roles del sistema.
                Incluye todos los flujos principales, dashboards por rol, validaciones externas y gestión de alertas.
              </p>
              <div style={{ fontSize: '13px', fontWeight: 700, color: C.tertiary, marginBottom: '10px' }}>Cambios incluidos en esta versión:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {CHANGES.map((change, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '4px 0' }}>
                    <CheckCircle size={14} color={C.green} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13px', color: C.black }}>{change}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next versions */}
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: C.tertiary, marginBottom: '14px' }}>Próximas versiones</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {NEXT_VERSIONS.map(nv => (
                  <div key={nv.version} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px 20px', border: `1px solid ${C.neutral}`, borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: C.neutral, border: `2px dashed ${C.grayB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Clock size={18} color={C.grayB} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: C.grayA }}>{nv.version}</div>
                      <div style={{ fontSize: '13px', color: C.grayB, marginTop: '2px' }}>{nv.desc}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', backgroundColor: C.neutral, color: C.grayB, padding: '3px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 600 }}>
                      Planificada
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '28px', padding: '16px', backgroundColor: C.neutral, borderRadius: '10px', fontSize: '12px', color: C.grayB, textAlign: 'center' }}>
              Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores · Servicio Nacional de Aduanas · Gobierno de Chile · © 2026
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
