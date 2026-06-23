import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText } from 'lucide-react';
import { Layout } from '../layout/Layout';
import { C } from '../types';
import type { NavProps } from '../types';

const DAILY_DATA = [
  { dia: 'Lun', expedientes: 42, vehiculos: 18, alertas: 5 },
  { dia: 'Mar', expedientes: 55, vehiculos: 22, alertas: 7 },
  { dia: 'Mié', expedientes: 38, vehiculos: 15, alertas: 3 },
  { dia: 'Jue', expedientes: 61, vehiculos: 28, alertas: 9 },
  { dia: 'Vie', expedientes: 73, vehiculos: 31, alertas: 11 },
  { dia: 'Sáb', expedientes: 89, vehiculos: 40, alertas: 8 },
  { dia: 'Dom', expedientes: 47, vehiculos: 19, alertas: 4 },
];

const PIE_DATA = [
  { name: 'Aprobados', value: 312, color: C.green },
  { name: 'En revisión', value: 45, color: C.primary },
  { name: 'Observados', value: 28, color: C.secondary },
  { name: 'Pendientes', value: 20, color: '#ea580c' },
];

const EXT_DATA = [
  { name: 'SAG', consultas: 378, errores: 12 },
  { name: 'PDI', consultas: 405, errores: 8 },
  { name: 'Ad. Limítrofe', consultas: 289, errores: 22 },
];

const STATS = [
  { label: 'Expedientes procesados', value: '405', color: C.primary },
  { label: 'Vehículos validados', value: '173', color: '#ea580c' },
  { label: 'Menores revisados', value: '34', color: C.secondary },
  { label: 'Alertas generadas', value: '47', color: '#dc2626' },
  { label: 'Alertas resueltas', value: '39', color: C.green },
  { label: 'Consultas SAG', value: '378', color: '#16a34a' },
  { label: 'Consultas PDI', value: '405', color: C.primary },
  { label: 'Consultas Aduana', value: '289', color: '#7c3aed' },
];

export function Reportes({ navigate, currentUser, logout }: NavProps) {
  const backPage = currentUser?.role === 'supervisor' ? 'supervisor-dashboard' : 'admin-dashboard';
  return (
    <Layout
      navigate={navigate} currentUser={currentUser} logout={logout}
      activePage="reportes"
      breadcrumbs={[{ label: 'Inicio' }, { label: 'Reportes CU-06' }]}
    >
      <div style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: C.tertiary }}>CU-06: Reportes operativos y estadísticos</h1>
            <p style={{ fontSize: '13px', color: C.grayB, marginTop: '4px' }}>Reporte operativo diario — Paso Los Libertadores · {new Date().toLocaleDateString('es-CL')}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ backgroundColor: C.secondary, color: C.white, border: 'none', padding: '9px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Download size={15} /> Exportar PDF
            </button>
            <button style={{ backgroundColor: C.green, color: C.white, border: 'none', padding: '9px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Download size={15} /> Exportar Excel
            </button>
            <button style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '9px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={15} /> Descargar reporte
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: C.tertiary, marginBottom: '14px' }}>Filtros de búsqueda</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
            {[
              { label: 'Fecha desde', type: 'date', defaultValue: '2026-06-14' },
              { label: 'Fecha hasta', type: 'date', defaultValue: '2026-06-20' },
              { label: 'Tipo de control', type: 'select', options: ['Todos', 'Viajeros', 'Vehículos', 'Menores'] },
              { label: 'Estado expediente', type: 'select', options: ['Todos', 'Aprobado', 'Observado', 'En revisión', 'Pendiente'] },
              { label: 'Sistema externo', type: 'select', options: ['Todos', 'SAG', 'PDI', 'Aduana Limítrofe'] },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: C.grayA, marginBottom: '6px' }}>{f.label}</label>
                {f.type === 'select' ? (
                  <select style={{ width: '100%', padding: '7px 10px', border: `1px solid #D1D5DB`, borderRadius: '7px', fontSize: '13px', color: C.black, outline: 'none', boxSizing: 'border-box' }}>
                    {f.options?.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type} defaultValue={f.defaultValue} style={{ width: '100%', padding: '7px 10px', border: `1px solid #D1D5DB`, borderRadius: '7px', fontSize: '13px', color: C.black, outline: 'none', boxSizing: 'border-box' }} />
                )}
              </div>
            ))}
          </div>
          <button style={{ marginTop: '14px', backgroundColor: C.primary, color: C.white, border: 'none', padding: '8px 20px', borderRadius: '7px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>
            Aplicar filtros
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {STATS.slice(0, 4).map(stat => (
            <div key={stat.label} style={{ backgroundColor: C.white, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderTop: `3px solid ${stat.color}` }}>
              <div style={{ fontSize: '32px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: C.grayA, marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {STATS.slice(4).map(stat => (
            <div key={stat.label} style={{ backgroundColor: C.white, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderTop: `3px solid ${stat.color}` }}>
              <div style={{ fontSize: '32px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: C.grayA, marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: C.tertiary, marginBottom: '16px' }}>Expedientes por día (últimos 7 días)</div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={DAILY_DATA} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.neutral} />
                <XAxis dataKey="dia" tick={{ fontSize: 12, fill: C.grayB }} />
                <YAxis tick={{ fontSize: 12, fill: C.grayB }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="expedientes" name="Expedientes" fill={C.primary} radius={[4, 4, 0, 0]} />
                <Bar dataKey="vehiculos" name="Vehículos" fill="#ea580c" radius={[4, 4, 0, 0]} />
                <Bar dataKey="alertas" name="Alertas" fill={C.secondary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: C.tertiary, marginBottom: '16px' }}>Estado de expedientes</div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {PIE_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* External Systems stats */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: C.tertiary, marginBottom: '16px' }}>Consultas a sistemas externos</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={EXT_DATA} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.neutral} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: C.grayB }} />
              <YAxis tick={{ fontSize: 12, fill: C.grayB }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="consultas" name="Consultas" fill={C.primary} radius={[4, 4, 0, 0]} />
              <Bar dataKey="errores" name="Errores" fill={C.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table sample */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.neutral}` }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: C.tertiary }}>Tabla de resultados</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Expediente', 'Viajero', 'Tipo control', 'SAG', 'PDI', 'Ad. Limítrofe', 'Alertas', 'Estado'].map(col => (
                  <th key={col} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: C.grayA, borderBottom: `1px solid ${C.neutral}` }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'EXP-2026-0001', v: 'Camila Rojas Muñoz', tipo: 'Menor + Vehículo', sag: '✓', pdi: '✓', ad: '⏳', alertas: '2', estado: 'observado' },
                { id: 'EXP-2026-0002', v: 'Roberto Figueroa', tipo: 'Vehículo', sag: '✓', pdi: '✓', ad: '✓', alertas: '0', estado: 'aprobado' },
                { id: 'EXP-2026-0003', v: 'Sandra Morales Torres', tipo: 'Viajero', sag: '✓', pdi: '✓', ad: '✓', alertas: '0', estado: 'aprobado' },
                { id: 'EXP-2026-0004', v: 'Diego Herrera Soto', tipo: 'Menor', sag: '✓', pdi: '✗', ad: '—', alertas: '1', estado: 'revision' },
              ].map((row, i) => (
                <tr key={row.id} style={{ backgroundColor: i % 2 === 0 ? C.white : '#FAFAFA', borderBottom: `1px solid ${C.neutral}` }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: C.primary }}>{row.id}</td>
                  <td style={{ padding: '10px 14px', color: C.black }}>{row.v}</td>
                  <td style={{ padding: '10px 14px', color: C.grayA }}>{row.tipo}</td>
                  <td style={{ padding: '10px 14px', color: row.sag === '✓' ? C.green : C.secondary }}>{row.sag}</td>
                  <td style={{ padding: '10px 14px', color: row.pdi === '✓' ? C.green : C.secondary }}>{row.pdi}</td>
                  <td style={{ padding: '10px 14px', color: row.ad === '✓' ? C.green : C.grayB }}>{row.ad}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: row.alertas !== '0' ? '#dc2626' : C.green }}>{row.alertas}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{
                      backgroundColor: row.estado === 'aprobado' ? C.lightGreen : row.estado === 'revision' ? C.lightBlue : C.lightRed,
                      color: row.estado === 'aprobado' ? C.green : row.estado === 'revision' ? C.primary : '#dc2626',
                      padding: '2px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 600,
                    }}>
                      {row.estado === 'aprobado' ? 'Aprobado' : row.estado === 'revision' ? 'En revisión' : 'Observado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
