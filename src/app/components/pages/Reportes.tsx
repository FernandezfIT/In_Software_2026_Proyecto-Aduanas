import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Download, FileText, Filter, CheckCircle } from 'lucide-react';
import { Layout } from '../layout/Layout';
import { useToast, ToastContainer } from '../ui/Toast';
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

const TABLE_DATA = [
  { id: 'EXP-2026-0001', viajero: 'Camila Rojas Muñoz', tipo: 'Menor de edad', sag: 'Sin obs.', pdi: 'Sin imped.', aduana: 'Validado', estado: 'observado' as const },
  { id: 'EXP-2026-0002', viajero: 'Roberto Figueroa Leiva', tipo: 'Control vehicular', sag: 'Sin obs.', pdi: 'Sin imped.', aduana: 'Validado', estado: 'aprobado' as const },
  { id: 'EXP-2026-0003', viajero: 'Sandra Morales Torres', tipo: 'Control viajero', sag: 'Sin obs.', pdi: 'Sin imped.', aduana: 'Pendiente', estado: 'aprobado' as const },
  { id: 'EXP-2026-0004', viajero: 'Diego Herrera Soto', tipo: 'Menor de edad', sag: 'Con obs.', pdi: 'Sin imped.', aduana: 'Pendiente', estado: 'revision' as const },
];

type ReporteEstado = 'pendiente' | 'generado' | 'exportado';

export function Reportes({ navigate, currentUser, logout }: NavProps) {
  const { toast, toasts, dismiss } = useToast();
  const [reporteEstado, setReporteEstado] = useState<ReporteEstado>('pendiente');
  const [filtrosAplicados, setFiltrosAplicados] = useState(false);

  const backPage = currentUser?.role === 'supervisor' ? 'supervisor-dashboard' : 'admin-dashboard';

  const aplicarFiltros = () => {
    setFiltrosAplicados(true);
    setReporteEstado('generado');
    toast('Filtros aplicados correctamente al reporte operativo.', 'success');
  };

  const exportarPDF = () => {
    setReporteEstado('exportado');
    toast('Reporte PDF generado correctamente. Esta acción es simulada en el prototipo.\nArchivo: reporte_operativo_los_libertadores_v2_0_1.pdf', 'success');
  };

  const exportarExcel = () => {
    setReporteEstado('exportado');
    toast('Archivo Excel generado correctamente. Esta acción es simulada en el prototipo.\nArchivo: reporte_operativo_los_libertadores_v2_0_1.xlsx', 'success');
  };

  const descargarReporte = () => {
    setReporteEstado('exportado');
    toast('Descarga iniciada: reporte_operativo_los_libertadores_v2_0_1.pdf', 'info');
  };

  const estadoBadge: Record<ReporteEstado, { label: string; bg: string; color: string }> = {
    pendiente: { label: 'Pendiente', bg: '#FED7AA', color: '#92400e' },
    generado:  { label: 'Generado',  bg: C.lightBlue, color: C.primary },
    exportado: { label: 'Exportado', bg: C.lightGreen, color: C.green },
  };

  const eb = estadoBadge[reporteEstado];

  return (
    <Layout navigate={navigate} currentUser={currentUser} logout={logout} activePage="reportes"
      breadcrumbs={[{ label: 'Inicio', page: backPage }, { label: 'Reportes CU-06' }]}
    >
      <ToastContainer toasts={toasts} dismiss={dismiss} />
      <div style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: C.tertiary }}>CU-06: Reportes Operativos y Estadísticos</h1>
            <p style={{ fontSize: '13px', color: C.grayB, marginTop: '4px' }}>Reporte operativo diario — Paso Los Libertadores · {new Date().toLocaleDateString('es-CL')}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ backgroundColor: eb.bg, color: eb.color, padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>
              {eb.label}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Filter size={16} color={C.primary} aria-hidden="true" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: C.tertiary }}>Filtros del reporte</span>
            {filtrosAplicados && (
              <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: C.green }}>
                <CheckCircle size={14} aria-hidden="true" /> Filtros aplicados
              </span>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '16px' }}>
            {[
              { id: 'r-desde', label: 'Fecha desde', type: 'date', dv: '2026-06-01' },
              { id: 'r-hasta', label: 'Fecha hasta', type: 'date', dv: '2026-06-20' },
            ].map(f => (
              <div key={f.id}>
                <label htmlFor={f.id} style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: C.grayA, marginBottom: '5px' }}>{f.label}</label>
                <input id={f.id} type={f.type} defaultValue={f.dv} style={{ width: '100%', padding: '7px 10px', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            ))}
            {[
              { id: 'r-tipo', label: 'Tipo de control', opts: ['Todos', 'Control viajero', 'Control vehicular', 'Menor de edad'] },
              { id: 'r-estado', label: 'Estado del expediente', opts: ['Todos', 'Aprobado', 'En revisión', 'Observado'] },
              { id: 'r-sistema', label: 'Sistema externo', opts: ['Todos', 'SAG', 'PDI', 'Aduana Limítrofe'] },
            ].map(f => (
              <div key={f.id}>
                <label htmlFor={f.id} style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: C.grayA, marginBottom: '5px' }}>{f.label}</label>
                <select id={f.id} style={{ width: '100%', padding: '7px 10px', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}>
                  {f.opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={aplicarFiltros} style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '9px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Filter size={14} aria-hidden="true" /> Aplicar filtros
            </button>
            <button onClick={exportarPDF} aria-label="Exportar reporte como PDF" style={{ backgroundColor: '#FEF2F2', color: '#dc2626', border: '1px solid #FCA5A5', padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Download size={14} aria-hidden="true" /> Exportar PDF
            </button>
            <button onClick={exportarExcel} aria-label="Exportar reporte como Excel" style={{ backgroundColor: '#F0FDF4', color: C.green, border: `1px solid #86EFAC`, padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Download size={14} aria-hidden="true" /> Exportar Excel
            </button>
            <button onClick={descargarReporte} aria-label="Descargar reporte" style={{ backgroundColor: C.neutral, color: C.grayA, border: 'none', padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <FileText size={14} aria-hidden="true" /> Descargar reporte
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          {STATS.map(stat => (
            <div key={stat.label} style={{ backgroundColor: C.white, borderRadius: '10px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderTop: `3px solid ${stat.color}` }}>
              <div style={{ fontSize: '26px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: C.grayA, marginTop: '4px', lineHeight: 1.4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: C.tertiary, marginBottom: '16px' }}>Expedientes y vehículos por día</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={DAILY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.neutral} />
                <XAxis dataKey="dia" tick={{ fontSize: 11, fill: C.grayB }} />
                <YAxis tick={{ fontSize: 11, fill: C.grayB }} />
                <Tooltip />
                <Bar dataKey="expedientes" fill={C.primary} radius={[4, 4, 0, 0]} name="Expedientes" />
                <Bar dataKey="vehiculos" fill={C.accent} radius={[4, 4, 0, 0]} name="Vehículos" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: C.tertiary, marginBottom: '16px' }}>Estado de expedientes</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <PieChart width={160} height={160}>
                <Pie data={PIE_DATA} cx={75} cy={75} innerRadius={40} outerRadius={70} dataKey="value">
                  {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
              <div>
                {PIE_DATA.map(d => (
                  <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: d.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: C.grayA }}>{d.name}: <strong style={{ color: C.black }}>{d.value}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.neutral}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: C.tertiary }}>Tabla de resultados</div>
            <div style={{ fontSize: '12px', color: C.grayB }}>Generado: {new Date().toLocaleString('es-CL')}</div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 680 }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  {['N° Expediente', 'Viajero', 'Tipo', 'SAG', 'PDI', 'Aduana Lim.', 'Estado'].map(col => (
                    <th key={col} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: C.grayA, borderBottom: `1px solid ${C.neutral}` }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_DATA.map((row, i) => (
                  <tr key={row.id} style={{ backgroundColor: i % 2 === 0 ? C.white : '#FAFAFA', borderBottom: `1px solid ${C.neutral}` }}>
                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: C.primary }}>{row.id}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: C.black }}>{row.viajero}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: C.grayA }}>{row.tipo}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: row.sag.includes('obs') && !row.sag.includes('Sin') ? '#dc2626' : C.green }}>{row.sag}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: C.green }}>{row.pdi}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: row.aduana === 'Pendiente' ? '#ea580c' : C.green }}>{row.aduana}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ backgroundColor: row.estado === 'aprobado' ? C.lightGreen : row.estado === 'observado' ? C.lightRed : C.lightBlue, color: row.estado === 'aprobado' ? C.green : row.estado === 'observado' ? '#dc2626' : C.primary, padding: '2px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 600 }}>
                        {row.estado === 'aprobado' ? 'Aprobado' : row.estado === 'observado' ? 'Observado' : 'En revisión'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
