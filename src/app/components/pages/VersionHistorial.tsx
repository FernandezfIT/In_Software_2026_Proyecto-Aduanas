import { CheckCircle, Clock, Tag } from 'lucide-react';
import { Layout } from '../layout/Layout';
import { C } from '../types';
import type { NavProps, Page } from '../types';

const CHANGES_V201 = [
  'Versión visible corregida a v2.0.1 en todas las pantallas',
  'Control de acceso: sistemas externos bloqueados sin sesión',
  'Sidebar solo muestra opciones del rol autenticado — sin asumir Administrador por defecto',
  'Modal de alerta RF09 con role="dialog" y aria-modal="true"',
  'Botones de ícono con aria-label accesible',
  'Feedback en botones: Exportar PDF, Excel, Descargar reporte',
  'Feedback en botones: Aplicar filtros, Buscar expediente',
  'Feedback en botones: Simular consulta SAG, PDI, Aduana Limítrofe',
  'Validaciones externas con resultado controlado — sin Math.random()',
  'Opción "Simular observación" para generar alerta RF09 de forma determinista',
  'Mensaje "Perfil cargado correctamente" al iniciar sesión',
  'Credenciales demo marcadas como datos de prueba',
  'Tabla de expedientes con scroll horizontal en pantallas pequeñas',
  'Grillas de tarjetas con auto-fit/minmax responsive',
  'Formularios con htmlFor/id correctamente asociados',
];

const VERSION_HISTORY = [
  { version: 'v1.0.0', label: 'Prototipo inicial', desc: 'Prototipo generado desde Figma. Pantallas básicas, login, dashboards y flujo operador.', date: 'Jun 2026', done: true },
  { version: 'v1.1.0', label: 'Primera corrección', desc: 'Primera ronda de correcciones según plan de pruebas EV2. Mejoras visuales y de navegación.', date: 'Jun 2026', done: true },
  { version: 'v2.0.0', label: 'Revisión ISO 25010', desc: 'Versión revisada con observaciones ISO/IEC 25010 pendientes de aplicar.', date: 'Jun 2026', done: true },
  { version: 'v2.0.1', label: 'Corrección aplicada', desc: 'Versión correctiva actual. Incorpora mejoras funcionales, accesibilidad, seguridad, versionamiento y retroalimentación visual.', date: 'Jun 2026', done: true, current: true },
];

const NEXT_VERSION = { version: 'v2.1.0', desc: 'Ajustes finales según nueva ronda de pruebas y evidencias.' };

export function VersionHistorial({ navigate, currentUser, logout }: NavProps) {
  const getDashboard = (): Page => {
    if (!currentUser) return 'home';
    if (currentUser.role === 'operador') return 'operador-dashboard';
    if (currentUser.role === 'supervisor') return 'supervisor-dashboard';
    return 'admin-dashboard';
  };

  return (
    <Layout navigate={navigate} currentUser={currentUser} logout={logout}
      activePage={currentUser ? getDashboard() : 'home'}
      breadcrumbs={[{ label: 'Inicio', page: getDashboard() }, { label: 'Historial de versiones' }]}
    >
      <div style={{ maxWidth: '860px' }}>
        {/* Header card */}
        <div style={{ backgroundColor: C.tertiary, borderRadius: '14px', padding: '28px 32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: '11px', color: C.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores
              </div>
              <div style={{ fontSize: '26px', fontWeight: 700, color: C.white, marginBottom: '6px' }}>Historial de versiones</div>
              <div style={{ fontSize: '14px', color: C.accent }}>aduana-los-libertadores-prototipo-ev3</div>
            </div>
            <span style={{ backgroundColor: C.primary, color: C.white, padding: '8px 20px', borderRadius: '99px', fontSize: '15px', fontWeight: 700, flexShrink: 0 }}>
              v2.0.1
            </span>
          </div>
        </div>

        {/* Current version */}
        <div style={{ backgroundColor: C.lightBlue, border: `2px solid ${C.primary}`, borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Tag size={16} color={C.primary} aria-hidden="true" />
                <span style={{ fontSize: '20px', fontWeight: 700, color: C.primary }}>Versión 2.0.1</span>
                <span style={{ backgroundColor: C.primary, color: C.white, padding: '2px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700 }}>ACTUAL</span>
              </div>
              <div style={{ fontSize: '13px', color: C.grayA }}>Estado: Corrección aplicada según revisión ISO 25010</div>
            </div>
            <div style={{ fontSize: '12px', color: C.grayB, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={13} aria-hidden="true" /> Jun 2026
            </div>
          </div>

          <p style={{ fontSize: '13px', color: C.grayA, lineHeight: 1.7, marginBottom: '16px' }}>
            Versión correctiva del prototipo que incorpora mejoras funcionales, de navegación, accesibilidad,
            seguridad básica, versionamiento y retroalimentación visual. Basada en la evaluación ISO/IEC 25010.
          </p>

          <div style={{ fontSize: '13px', fontWeight: 700, color: C.tertiary, marginBottom: '10px' }}>
            Correcciones aplicadas en esta versión:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6px' }}>
            {CHANGES_V201.map((change, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '4px 0' }}>
                <CheckCircle size={14} color={C.green} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                <span style={{ fontSize: '13px', color: C.black }}>{change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Version history */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: C.tertiary, marginBottom: '20px' }}>Versiones anteriores</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {VERSION_HISTORY.map(v => (
              <div key={v.version} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '14px 16px', border: `1px solid ${v.current ? C.primary : C.neutral}`, borderRadius: '10px', backgroundColor: v.current ? C.lightBlue : '#F8FAFC' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: v.current ? C.primary : C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle size={20} color={C.white} aria-hidden="true" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: v.current ? C.primary : C.tertiary }}>{v.version}</span>
                    <span style={{ fontSize: '12px', color: C.grayB }}>— {v.label}</span>
                    {v.current && <span style={{ backgroundColor: C.primary, color: C.white, padding: '1px 8px', borderRadius: '99px', fontSize: '11px', fontWeight: 700 }}>Actual</span>}
                  </div>
                  <div style={{ fontSize: '13px', color: C.grayA }}>{v.desc}</div>
                </div>
                <div style={{ fontSize: '11px', color: C.grayB, flexShrink: 0 }}>{v.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Next version */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: C.tertiary, marginBottom: '14px' }}>Próxima versión</h2>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '14px 16px', border: `1px dashed ${C.grayB}`, borderRadius: '10px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: C.neutral, border: `2px dashed ${C.grayB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={18} color={C.grayB} aria-hidden="true" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: C.grayA }}>{NEXT_VERSION.version}</div>
              <div style={{ fontSize: '13px', color: C.grayB, marginTop: '2px' }}>{NEXT_VERSION.desc}</div>
            </div>
            <span style={{ marginLeft: 'auto', backgroundColor: C.neutral, color: C.grayB, padding: '3px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 600, flexShrink: 0 }}>Planificada</span>
          </div>
        </div>

        {/* Info del prototipo */}
        <div style={{ backgroundColor: C.tertiary, borderRadius: '12px', padding: '24px', color: C.white }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', color: C.white }}>Información del prototipo</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            {[
              ['Nombre', 'Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores'],
              ['Versión actual', 'v2.0.1'],
              ['Tipo', 'Prototipo académico EV3'],
              ['Base de evaluación', 'ISO/IEC 25010'],
            ].map(([k, v]) => (
              <div key={k} style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: '11px', color: C.accent, marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '14px 16px', marginBottom: '14px' }}>
            <div style={{ fontSize: '12px', color: C.accent, fontWeight: 600, marginBottom: '8px' }}>Alcance del prototipo</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4px' }}>
              {['Login por roles', 'Expedientes de viajero', 'Validación de menor de edad', 'Registro vehicular', 'Validaciones externas SAG/PDI/Aduana', 'Alertas RF09', 'Reportes CU-06', 'Sistemas externos', 'Versionamiento'].map(item => (
                <div key={item} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                  <CheckCircle size={12} color={C.green} aria-hidden="true" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: '12px', color: C.accent, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: '10px 14px' }}>
            <strong>Nota:</strong> Las integraciones externas y exportaciones son simuladas para fines académicos.
          </div>
        </div>
      </div>
    </Layout>
  );
}
