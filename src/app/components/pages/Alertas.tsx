import { useState } from 'react';
import { AlertTriangle, X, MessageSquare, Clock } from 'lucide-react';
import { Layout } from '../layout/Layout';
import { StatusTag } from '../ui/StatusTag';
import { C } from '../types';
import type { NavProps } from '../types';

interface Alert {
  code: string;
  origen: string;
  descripcion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  responsable: string;
  estado: 'abierta' | 'revision' | 'resuelta' | 'derivada';
  expediente: string;
  fecha: string;
}

const ALERTS_DATA: Alert[] = [
  { code: 'ALT-001', origen: 'CU-03', descripcion: 'Falta autorización notarial del menor de edad', prioridad: 'Alta', responsable: 'Carlos Fuentes', estado: 'abierta', expediente: 'EXP-2026-0001', fecha: '20/06/2026 09:36' },
  { code: 'ALT-002', origen: 'CU-04', descripcion: 'Inconsistencia en datos del vehículo LLBB-22', prioridad: 'Media', responsable: 'Carlos Fuentes', estado: 'revision', expediente: 'EXP-2026-0001', fecha: '20/06/2026 09:42' },
  { code: 'ALT-003', origen: 'SAG', descripcion: 'Error en validación externa — Sistema SAG sin respuesta', prioridad: 'Alta', responsable: 'Carlos Fuentes', estado: 'resuelta', expediente: 'EXP-2026-0003', fecha: '20/06/2026 08:55' },
  { code: 'ALT-004', origen: 'PDI', descripcion: 'Observación migratoria desde PDI — requiere revisión', prioridad: 'Alta', responsable: 'Ana Sepúlveda', estado: 'derivada', expediente: 'EXP-2026-0004', fecha: '20/06/2026 09:30' },
  { code: 'ALT-005', origen: 'Aduana Limítrofe', descripcion: 'Respuesta pendiente de Aduana Limítrofe Argentina', prioridad: 'Baja', responsable: 'Carlos Fuentes', estado: 'abierta', expediente: 'EXP-2026-0002', fecha: '20/06/2026 09:50' },
];

const PRIORITY_COLOR = { Alta: { bg: C.lightRed, color: '#dc2626' }, Media: { bg: '#FED7AA', color: '#ea580c' }, Baja: { bg: '#E0F2FE', color: '#0284c7' } };

type AlertStatus = 'abierta' | 'revision' | 'resuelta' | 'derivada';

export function Alertas({ navigate, currentUser, logout }: NavProps) {
  const [alerts, setAlerts] = useState<Alert[]>(ALERTS_DATA);
  const [selected, setSelected] = useState<Alert | null>(null);
  const [filterPriority, setFilterPriority] = useState('Todas');
  const [filterEstado, setFilterEstado] = useState('Todos');

  const filtered = alerts.filter(a =>
    (filterPriority === 'Todas' || a.prioridad === filterPriority) &&
    (filterEstado === 'Todos' || a.estado === filterEstado)
  );

  const updateStatus = (code: string, estado: AlertStatus) => {
    setAlerts(prev => prev.map(a => a.code === code ? { ...a, estado } : a));
    setSelected(null);
  };

  return (
    <Layout
      navigate={navigate} currentUser={currentUser} logout={logout}
      activePage="alertas"
      breadcrumbs={[{ label: 'Inicio' }, { label: 'Alertas RF09' }]}
    >
      {/* Modal detalle */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: C.white, borderRadius: '16px', padding: '28px', maxWidth: '560px', width: '90%', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '17px', fontWeight: 700, color: C.tertiary }}>Detalle de alerta RF09</div>
                <div style={{ fontSize: '13px', color: C.grayB }}>{selected.code} · {selected.expediente}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.grayB }}>
                <X size={22} />
              </button>
            </div>

            <div style={{ backgroundColor: '#FFFBEB', border: `1px solid #FDE68A`, borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400e', marginBottom: '6px' }}>{selected.descripcion}</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ ...PRIORITY_COLOR[selected.prioridad], padding: '2px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 600 }}>
                  Prioridad: {selected.prioridad}
                </span>
                <StatusTag status={selected.estado} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              {[
                ['Origen', selected.origen], ['Expediente', selected.expediente],
                ['Responsable', selected.responsable], ['Fecha / Hora', selected.fecha],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: C.grayB, marginBottom: '3px' }}>{k}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: C.black }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: C.grayA, marginBottom: '8px' }}>Comentarios y observaciones</div>
              <div style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: '8px', fontSize: '13px', color: C.grayA }}>
                <MessageSquare size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Pendiente de revisión por supervisor. Se notificó al responsable a las {selected.fecha.split(' ')[1]}.
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: C.grayA, marginBottom: '8px' }}>Historial</div>
              <div style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', color: C.grayA, display: 'flex', gap: '8px' }}>
                  <Clock size={13} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span>{selected.fecha} — Alerta generada por {selected.responsable} desde módulo {selected.origen}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {selected.estado !== 'resuelta' && (
                <button onClick={() => updateStatus(selected.code, 'resuelta')} style={{ backgroundColor: C.green, color: C.white, border: 'none', padding: '9px 18px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>
                  Marcar como resuelta
                </button>
              )}
              {selected.estado !== 'derivada' && (
                <button onClick={() => updateStatus(selected.code, 'derivada')} style={{ backgroundColor: '#FED7AA', color: '#ea580c', border: 'none', padding: '9px 18px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>
                  Derivar
                </button>
              )}
              <button onClick={() => setSelected(null)} style={{ backgroundColor: C.neutral, color: C.grayA, border: 'none', padding: '9px 18px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '1100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: C.tertiary }}>RF09: Gestión de alertas y observaciones</h1>
            <p style={{ fontSize: '13px', color: C.grayB, marginTop: '4px' }}>Alertas generadas durante los procesos de control aduanero · {alerts.filter(a => a.estado === 'abierta').length} abierta(s)</p>
          </div>
        </div>

        {/* Summary mini */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Abiertas', count: alerts.filter(a => a.estado === 'abierta').length, color: '#dc2626', bg: C.lightRed },
            { label: 'En revisión', count: alerts.filter(a => a.estado === 'revision').length, color: C.primary, bg: C.lightBlue },
            { label: 'Resueltas', count: alerts.filter(a => a.estado === 'resuelta').length, color: C.green, bg: C.lightGreen },
            { label: 'Derivadas', count: alerts.filter(a => a.estado === 'derivada').length, color: '#ea580c', bg: '#FED7AA' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: s.bg, borderRadius: '10px', padding: '14px 16px', border: `1px solid ${s.color}20` }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: s.color }}>{s.count}</div>
              <div style={{ fontSize: '12px', color: C.grayA }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ backgroundColor: C.white, borderRadius: '10px', padding: '14px 20px', marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: C.grayA }}>Filtros:</span>
          <div>
            <label style={{ fontSize: '12px', color: C.grayB, marginRight: '6px' }}>Prioridad:</label>
            <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{ padding: '5px 10px', border: `1px solid #D1D5DB`, borderRadius: '6px', fontSize: '13px' }}>
              {['Todas', 'Alta', 'Media', 'Baja'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: C.grayB, marginRight: '6px' }}>Estado:</label>
            <select value={filterEstado} onChange={e => setFilterEstado(e.target.value)} style={{ padding: '5px 10px', border: `1px solid #D1D5DB`, borderRadius: '6px', fontSize: '13px' }}>
              {['Todos', 'abierta', 'revision', 'resuelta', 'derivada'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: C.grayB }}>{filtered.length} resultado(s)</span>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Código', 'Origen', 'Descripción', 'Prioridad', 'Responsable', 'Estado', 'Fecha', 'Acción'].map(col => (
                  <th key={col} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: C.grayA, borderBottom: `1px solid ${C.neutral}` }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((alert, i) => (
                <tr key={alert.code} style={{ backgroundColor: i % 2 === 0 ? C.white : '#FAFAFA', borderBottom: `1px solid ${C.neutral}` }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: C.primary, fontSize: '13px' }}>{alert.code}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: C.grayA }}>{alert.origen}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: C.black, maxWidth: '220px' }}>{alert.descripcion}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ backgroundColor: PRIORITY_COLOR[alert.prioridad].bg, color: PRIORITY_COLOR[alert.prioridad].color, padding: '2px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 600 }}>
                      {alert.prioridad}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: C.grayA }}>{alert.responsable}</td>
                  <td style={{ padding: '12px 14px' }}><StatusTag status={alert.estado} /></td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: C.grayB, whiteSpace: 'nowrap' }}>{alert.fecha.split(' ')[1]}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <button
                      onClick={() => setSelected(alert)}
                      style={{ backgroundColor: C.lightBlue, color: C.primary, border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <AlertTriangle size={12} /> Revisar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: C.grayB, fontSize: '14px' }}>
              No se encontraron alertas con los filtros seleccionados.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
