import { useState } from 'react';
import { Users, Shield, Globe, FileText, Settings, Clock, CheckCircle, Eye, Edit } from 'lucide-react';
import { Layout } from '../layout/Layout';
import { StatusTag } from '../ui/StatusTag';
import { C, ROLE_LABELS } from '../types';
import type { NavProps } from '../types';

type AdminTab = 'usuarios' | 'roles' | 'auditoria';

const USUARIOS = [
  { name: 'Carlos Fuentes Mora', email: 'operador@aduanachile.cl', role: 'operador', estado: 'aprobado' as const, ultimo: '20/06/2026 08:32' },
  { name: 'Ana Sepúlveda Rojo', email: 'supervisor@aduanachile.cl', role: 'supervisor', estado: 'aprobado' as const, ultimo: '20/06/2026 07:55' },
  { name: 'Luis Contreras Díaz', email: 'administrador@aduanachile.cl', role: 'administrador', estado: 'aprobado' as const, ultimo: '20/06/2026 09:01' },
  { name: 'María Herrera Soto', email: 'operador2@aduanachile.cl', role: 'operador', estado: 'deshabilitado' as const, ultimo: '18/06/2026 16:45' },
];

const AUDIT_EVENTS = [
  { timestamp: '20/06/2026 09:15', user: 'operador@aduanachile.cl', evento: 'Inicio de sesión', detalle: 'Acceso exitoso al sistema' },
  { timestamp: '20/06/2026 09:22', user: 'operador@aduanachile.cl', evento: 'Creación de expediente', detalle: 'EXP-2026-0001 — Camila Rojas Muñoz' },
  { timestamp: '20/06/2026 09:35', user: 'operador@aduanachile.cl', evento: 'Validación documental', detalle: 'CU-03 — Menor de edad — Documentación incompleta' },
  { timestamp: '20/06/2026 09:36', user: 'operador@aduanachile.cl', evento: 'Generación de alerta', detalle: 'ALT-001 — Falta autorización notarial' },
  { timestamp: '20/06/2026 09:40', user: 'operador@aduanachile.cl', evento: 'Consulta externa', detalle: 'CU-05 — Consulta SAG — Sin observaciones' },
  { timestamp: '20/06/2026 09:41', user: 'operador@aduanachile.cl', evento: 'Consulta externa', detalle: 'CU-05 — Consulta PDI — Sin impedimentos' },
  { timestamp: '20/06/2026 09:50', user: 'supervisor@aduanachile.cl', evento: 'Revisión manual', detalle: 'EXP-2026-0001 — Expediente derivado por operador' },
];

const PERMISOS: Record<string, string[]> = {
  'Operador Aduanero': ['Registrar expedientes', 'Consultar viajeros', 'Validar documentos de menor', 'Registrar vehículos', 'Ejecutar validaciones externas', 'Gestionar alertas'],
  'Supervisor Aduanero': ['Revisar alertas', 'Resolver observaciones', 'Derivar casos', 'Consultar expedientes', 'Generar reportes', 'Ver sistemas externos'],
  'Administrador del Sistema': ['Gestionar usuarios', 'Gestionar roles y permisos', 'Ver auditoría', 'Generar reportes', 'Configurar integraciones', 'Ver todos los módulos'],
};

const SUMMARY = [
  { label: 'Usuarios activos', value: '3', color: C.green, bg: C.lightGreen, icon: Users },
  { label: 'Roles configurados', value: '3', color: C.primary, bg: C.lightBlue, icon: Shield },
  { label: 'Integraciones disponibles', value: '3', color: '#ea580c', bg: '#FED7AA', icon: Globe },
  { label: 'Eventos de auditoría', value: '127', color: C.grayA, bg: C.neutral, icon: Clock },
];

export function AdminDashboard({ navigate, currentUser, logout }: NavProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('usuarios');

  return (
    <Layout
      navigate={navigate} currentUser={currentUser} logout={logout}
      activePage="admin-dashboard"
      breadcrumbs={[{ label: 'Inicio' }, { label: 'Dashboard Administrador' }]}
    >
      <div style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: C.tertiary }}>Dashboard Administrador del Sistema</h1>
            <p style={{ fontSize: '13px', color: C.grayB, marginTop: '4px' }}>Gestión de usuarios, roles, integraciones y auditoría del sistema</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate('reportes')}
              style={{ backgroundColor: C.lightBlue, color: C.primary, border: `1px solid ${C.primary}`, padding: '9px 18px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
            >
              Ver reportes
            </button>
            <button
              onClick={() => navigate('sistemas-externos')}
              style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '9px 18px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
            >
              Integraciones externas
            </button>
          </div>
        </div>

        {/* Summary */}
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

        {/* Tabs */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: `1px solid ${C.neutral}` }}>
            {([
              { id: 'usuarios', label: 'Usuarios', icon: Users },
              { id: 'roles', label: 'Roles y permisos', icon: Shield },
              { id: 'auditoria', label: 'Auditoría', icon: Clock },
            ] as Array<{ id: AdminTab; label: string; icon: typeof Users }>).map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '14px 24px', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    backgroundColor: activeTab === tab.id ? C.lightBlue : C.white,
                    color: activeTab === tab.id ? C.primary : C.grayA,
                    borderBottom: activeTab === tab.id ? `2px solid ${C.primary}` : '2px solid transparent',
                    fontSize: '13px', fontWeight: activeTab === tab.id ? 700 : 400,
                  }}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </div>

          <div style={{ padding: '24px' }}>
            {/* Usuarios */}
            {activeTab === 'usuarios' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: C.tertiary }}>Gestión de usuarios</div>
                  <button style={{ backgroundColor: C.green, color: C.white, border: 'none', padding: '7px 16px', borderRadius: '7px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>
                    + Nuevo usuario
                  </button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC' }}>
                      {['Nombre', 'Correo', 'Rol', 'Estado', 'Último acceso', 'Acción'].map(col => (
                        <th key={col} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: C.grayA, borderBottom: `1px solid ${C.neutral}` }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {USUARIOS.map((u, i) => (
                      <tr key={u.email} style={{ backgroundColor: i % 2 === 0 ? C.white : '#FAFAFA', borderBottom: `1px solid ${C.neutral}` }}>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: C.black }}>{u.name}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', color: C.grayA }}>{u.email}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', color: C.primary }}>{ROLE_LABELS[u.role]}</td>
                        <td style={{ padding: '12px 16px' }}><StatusTag status={u.estado} /></td>
                        <td style={{ padding: '12px 16px', fontSize: '12px', color: C.grayB }}>{u.ultimo}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button style={{ backgroundColor: C.lightBlue, color: C.primary, border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}><Eye size={12} /></button>
                            <button style={{ backgroundColor: C.neutral, color: C.grayA, border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}><Edit size={12} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Roles */}
            {activeTab === 'roles' && (
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: C.tertiary, marginBottom: '16px' }}>Permisos por rol</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  {Object.entries(PERMISOS).map(([rol, perms]) => (
                    <div key={rol} style={{ border: `1px solid ${C.neutral}`, borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ backgroundColor: C.tertiary, color: C.white, padding: '12px 16px', fontSize: '13px', fontWeight: 700 }}>{rol}</div>
                      <div style={{ padding: '12px 16px' }}>
                        {perms.map(perm => (
                          <div key={perm} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 0', borderBottom: `1px solid ${C.neutral}` }}>
                            <CheckCircle size={13} color={C.green} />
                            <span style={{ fontSize: '12px', color: C.black }}>{perm}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Auditoría */}
            {activeTab === 'auditoria' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: C.tertiary }}>Registro de auditoría del sistema</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ backgroundColor: C.neutral, color: C.grayA, border: 'none', padding: '6px 14px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>
                      Exportar log
                    </button>
                  </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC' }}>
                      {['Fecha / Hora', 'Usuario', 'Evento', 'Detalle'].map(col => (
                        <th key={col} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: C.grayA, borderBottom: `1px solid ${C.neutral}` }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {AUDIT_EVENTS.map((ev, i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? C.white : '#FAFAFA', borderBottom: `1px solid ${C.neutral}` }}>
                        <td style={{ padding: '10px 16px', color: C.grayB, whiteSpace: 'nowrap' }}>{ev.timestamp}</td>
                        <td style={{ padding: '10px 16px', color: C.primary }}>{ev.user}</td>
                        <td style={{ padding: '10px 16px', fontWeight: 600, color: C.black }}>{ev.evento}</td>
                        <td style={{ padding: '10px 16px', color: C.grayA }}>{ev.detalle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Config shortcuts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '20px' }}>
          {[
            { icon: Settings, label: 'Parámetros del sistema', desc: 'Configurar parámetros generales y operacionales', color: C.grayA },
            { icon: Globe, label: 'Integraciones externas', desc: 'Estado y configuración de SAG, PDI y Aduana Limítrofe', color: C.primary, action: () => navigate('sistemas-externos') },
            { icon: FileText, label: 'Reportes avanzados', desc: 'Estadísticas y reportes operativos CU-06', color: C.green, action: () => navigate('reportes') },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.action}
                style={{ backgroundColor: C.white, border: `1px solid ${C.neutral}`, borderRadius: '12px', padding: '16px', textAlign: 'left', cursor: item.action ? 'pointer' : 'default', borderLeft: `4px solid ${item.color}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6px' }}>
                  <Icon size={18} color={item.color} />
                  <div style={{ fontSize: '14px', fontWeight: 600, color: item.color }}>{item.label}</div>
                </div>
                <div style={{ fontSize: '12px', color: C.grayB }}>{item.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
