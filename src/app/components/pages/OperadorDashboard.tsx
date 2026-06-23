import { FileText, AlertTriangle, Truck, Globe, Plus, Eye, Clock } from 'lucide-react';
import { Layout } from '../layout/Layout';
import { StatusTag } from '../ui/StatusTag';
import { C } from '../types';
import type { NavProps } from '../types';

const EXPEDIENTES = [
  { id: 'EXP-2026-0001', nombre: 'Camila Rojas Muñoz',    doc: 'P12345678', edad: 17, vehiculo: 'LLBB-22', estado: 'observado' as const },
  { id: 'EXP-2026-0002', nombre: 'Roberto Figueroa Leiva', doc: 'RUT 12.345.678-9', edad: 35, vehiculo: 'CDFE-44', estado: 'revision' as const },
  { id: 'EXP-2026-0003', nombre: 'Sandra Morales Torres',  doc: 'P98765432', edad: 29, vehiculo: '-', estado: 'aprobado' as const },
  { id: 'EXP-2026-0004', nombre: 'Diego Herrera Soto',     doc: 'RUT 9.876.543-2', edad: 14, vehiculo: '-', estado: 'pendiente' as const },
  { id: 'EXP-2026-0005', nombre: 'Laura Vásquez Pinto',    doc: 'RUT 15.432.678-K', edad: 45, vehiculo: 'GHIJ-77', estado: 'aprobado' as const },
];

const SUMMARY_CARDS = [
  { label: 'Expedientes en atención', value: '8',  color: C.primary,  bg: C.lightBlue, icon: FileText },
  { label: 'Documentos pendientes',   value: '3',  color: '#ea580c', bg: '#FED7AA',    icon: AlertTriangle },
  { label: 'Vehículos por validar',   value: '5',  color: C.primary,  bg: C.lightBlue, icon: Truck },
  { label: 'Alertas abiertas',        value: '4',  color: '#dc2626',  bg: C.lightRed,  icon: AlertTriangle },
  { label: 'Valid. externas pend.',   value: '2',  color: '#ea580c', bg: '#FED7AA',    icon: Globe },
];

export function OperadorDashboard({ navigate, currentUser, logout }: NavProps) {
  return (
    <Layout
      navigate={navigate} currentUser={currentUser} logout={logout}
      activePage="operador-dashboard"
      breadcrumbs={[{ label: 'Inicio' }, { label: 'Dashboard Operador' }]}
    >
      <div style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: C.tertiary }}>Dashboard Operador Aduanero</h1>
            <p style={{ fontSize: '13px', color: C.grayB, marginTop: '4px' }}>Paso Fronterizo Los Libertadores · {new Date().toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <button
            onClick={() => navigate('nuevo-expediente')}
            style={{
              backgroundColor: C.primary, color: C.white,
              border: 'none', padding: '10px 20px', borderRadius: '8px',
              fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <Plus size={18} /> Nuevo expediente
          </button>
        </div>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {SUMMARY_CARDS.map(card => {
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

        {/* Expedientes table */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.neutral}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: C.tertiary }}>Expedientes recientes</div>
              <div style={{ fontSize: '12px', color: C.grayB, marginTop: '2px' }}>Atención del día — {new Date().toLocaleDateString('es-CL')}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => navigate('alertas')} style={{ backgroundColor: C.lightRed, color: '#dc2626', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Ver alertas (4)
              </button>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['N° Expediente', 'Nombre Viajero', 'RUT / Pasaporte', 'Edad', 'Vehículo', 'Estado', 'Acción'].map(col => (
                  <th key={col} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: C.grayA, borderBottom: `1px solid ${C.neutral}` }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EXPEDIENTES.map((exp, i) => (
                <tr key={exp.id} style={{ backgroundColor: i % 2 === 0 ? C.white : '#FAFAFA', borderBottom: `1px solid ${C.neutral}` }}>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: C.primary }}>{exp.id}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: C.black }}>{exp.nombre}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: C.grayA }}>{exp.doc}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: exp.edad < 18 ? '#dc2626' : C.grayA }}>
                    {exp.edad} {exp.edad < 18 && '⚠️'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: C.grayA }}>{exp.vehiculo}</td>
                  <td style={{ padding: '12px 16px' }}><StatusTag status={exp.estado} /></td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => navigate('nuevo-expediente')}
                        style={{ backgroundColor: C.lightBlue, color: C.primary, border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Eye size={13} /> Ver
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '12px 20px', backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: C.grayB }}>Mostrando {EXPEDIENTES.length} expedientes recientes</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: C.grayB }}>
              <Clock size={14} />
              Última actualización: {new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '20px' }}>
          {[
            { label: 'Validaciones externas pendientes', desc: 'SAG · PDI · Aduana Limítrofe', action: () => navigate('sistemas-externos'), color: C.primary },
            { label: 'Gestionar alertas abiertas', desc: '4 alertas requieren atención', action: () => navigate('alertas'), color: '#dc2626' },
            { label: 'Nuevo expediente de viajero', desc: 'Iniciar proceso de atención', action: () => navigate('nuevo-expediente'), color: C.green },
          ].map(item => (
            <button
              key={item.label}
              onClick={item.action}
              style={{
                backgroundColor: C.white, border: `1px solid ${C.neutral}`,
                borderRadius: '12px', padding: '16px',
                textAlign: 'left', cursor: 'pointer',
                borderLeft: `4px solid ${item.color}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 600, color: item.color, marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '12px', color: C.grayB }}>{item.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
