import { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Users, Eye, X } from 'lucide-react';
import { Layout } from '../layout/Layout';
import { StatusTag } from '../ui/StatusTag';
import { C } from '../types';
import type { NavProps } from '../types';

const CASOS = [
  { id: 'EXP-2026-0001', viajero: 'Camila Rojas Muñoz', alerta: 'Falta autorización notarial', prioridad: 'Alta', operador: 'Carlos Fuentes', estado: 'observado' as const },
  { id: 'EXP-2026-0003', viajero: 'Pedro Arenas Díaz', alerta: 'Inconsistencia datos vehículo', prioridad: 'Media', operador: 'Carlos Fuentes', estado: 'revision' as const },
  { id: 'EXP-2026-0007', viajero: 'Elena Gutiérrez Ríos', alerta: 'Error validación SAG', prioridad: 'Alta', operador: 'Carlos Fuentes', estado: 'observado' as const },
];

const SUMMARY = [
  { label: 'Alertas críticas', value: '4', color: '#dc2626', bg: C.lightRed, icon: AlertTriangle },
  { label: 'Casos derivados', value: '3', color: '#ea580c', bg: '#FED7AA', icon: Clock },
  { label: 'Resueltos hoy', value: '12', color: C.green, bg: C.lightGreen, icon: CheckCircle },
  { label: 'Errores externos', value: '2', color: C.primary, bg: C.lightBlue, icon: Users },
];

export function SupervisorDashboard({ navigate, currentUser, logout }: NavProps) {
  const [selected, setSelected] = useState<typeof CASOS[0] | null>(null);

  return (
    <Layout
      navigate={navigate} currentUser={currentUser} logout={logout}
      activePage="supervisor-dashboard"
      breadcrumbs={[{ label: 'Inicio' }, { label: 'Dashboard Supervisor' }]}
    >
      {/* Modal detalle */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: C.white, borderRadius: '16px', padding: '28px', maxWidth: '560px', width: '90%', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '17px', fontWeight: 700, color: C.tertiary }}>Detalle de caso en revisión</div>
                <div style={{ fontSize: '13px', color: C.grayB }}>{selected.id} · {selected.viajero}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.grayB }}>
                <X size={22} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              {[
                ['Expediente', selected.id], ['Viajero', selected.viajero],
                ['Alerta', selected.alerta], ['Prioridad', selected.prioridad],
                ['Operador asignado', selected.operador], ['Estado', selected.estado],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: C.grayB, marginBottom: '3px' }}>{k}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: C.black }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button onClick={() => setSelected(null)} style={{ backgroundColor: C.green, color: C.white, border: 'none', padding: '9px 18px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>
                Aprobar expediente
              </button>
              <button onClick={() => setSelected(null)} style={{ backgroundColor: C.lightBlue, color: C.primary, border: `1px solid ${C.primary}`, padding: '9px 18px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>
                Solicitar antecedentes
              </button>
              <button onClick={() => setSelected(null)} style={{ backgroundColor: '#FED7AA', color: '#ea580c', border: 'none', padding: '9px 18px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>
                Mantener observado
              </button>
              <button onClick={() => { setSelected(null); navigate('admin-dashboard'); }} style={{ backgroundColor: C.lightRed, color: '#dc2626', border: 'none', padding: '9px 18px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>
                Derivar a administrador
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '1100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: C.tertiary }}>Dashboard Supervisor Aduanero</h1>
            <p style={{ fontSize: '13px', color: C.grayB, marginTop: '4px' }}>Revisión de casos observados y gestión de alertas · {new Date().toLocaleDateString('es-CL')}</p>
          </div>
          <button
            onClick={() => navigate('reportes')}
            style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
          >
            Generar reporte
          </button>
        </div>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {SUMMARY.map(card => {
            const Icon = card.icon;
            return (
              <div key={card.label} style={{ backgroundColor: C.white, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: card.color }}>{card.value}</div>
                    <div style={{ fontSize: '12px', color: C.grayA, marginTop: '4px' }}>{card.label}</div>
                  </div>
                  <div style={{ width: '36px', height: '36px', backgroundColor: card.bg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={card.color} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Casos en revisión */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.neutral}`, backgroundColor: '#FFFBEB', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <AlertTriangle size={18} color='#d97706' />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: C.tertiary }}>Casos en revisión manual</div>
              <div style={{ fontSize: '12px', color: C.grayB }}>Expedientes derivados por el operador que requieren supervisión</div>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['N° Expediente', 'Viajero', 'Alerta', 'Prioridad', 'Operador', 'Estado', 'Acción'].map(col => (
                  <th key={col} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: C.grayA, borderBottom: `1px solid ${C.neutral}` }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CASOS.map((caso, i) => (
                <tr key={caso.id} style={{ backgroundColor: i % 2 === 0 ? C.white : '#FAFAFA', borderBottom: `1px solid ${C.neutral}` }}>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: C.primary }}>{caso.id}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: C.black }}>{caso.viajero}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: C.grayA }}>{caso.alerta}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ backgroundColor: caso.prioridad === 'Alta' ? C.lightRed : '#FED7AA', color: caso.prioridad === 'Alta' ? '#dc2626' : '#ea580c', padding: '2px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 600 }}>
                      {caso.prioridad}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: C.grayA }}>{caso.operador}</td>
                  <td style={{ padding: '12px 16px' }}><StatusTag status={caso.estado} /></td>
                  <td style={{ padding: '12px 16px' }}>
                    <button
                      onClick={() => setSelected(caso)}
                      style={{ backgroundColor: C.lightBlue, color: C.primary, border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Eye size={13} /> Revisar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={() => navigate('alertas')}
            style={{ backgroundColor: C.lightRed, color: '#dc2626', border: `1px solid #FCA5A5`, padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <AlertTriangle size={16} /> Ver todas las alertas
          </button>
          <button
            onClick={() => navigate('reportes')}
            style={{ backgroundColor: C.lightBlue, color: C.primary, border: `1px solid ${C.primary}`, padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
          >
            Ver reportes CU-06
          </button>
          <button
            onClick={() => navigate('sistemas-externos')}
            style={{ backgroundColor: C.neutral, color: C.grayA, border: `1px solid ${C.grayB}`, padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
          >
            Ver sistemas externos
          </button>
        </div>
      </div>
    </Layout>
  );
}
