import { CheckCircle, Clock, Tag, Camera } from 'lucide-react';
import { Layout } from '../layout/Layout';
import { C } from '../types';
import type { NavProps, Page } from '../types';

const CHANGES_V202 = [
  'Versión visible actualizada a v2.0.2 en todas las pantallas',
  'package.json: name "aduana-los-libertadores-prototipo-ev3", version "2.0.2"',
  'Scripts: dev, build, preview, audit, lint',
  '.gitignore con plantilla React/Vite (excluye node_modules, dist, .env)',
  'README.md profesional con instalación, credenciales, estructura y evidencias',
  'AuthGuard con control de acceso por rol por página',
  'Mensaje "No tiene permisos para acceder a este módulo" con botón al dashboard',
  'Sistemas externos requieren sesión activa (redirige con mensaje visible)',
  'Feedback en botones SAG, PDI, Aduana Limítrofe con mensaje específico por sistema',
  'aria-label en botones de consulta y detalle de sistemas externos',
  'Grids fijos reemplazados por repeat(auto-fit, minmax) en dashboards',
  'Tablas con overflowX auto para scroll horizontal en pantallas pequeñas',
  'Sección "Evidencias recomendadas v2.0.2" en historial de versiones',
];

const VERSION_HISTORY = [
  { version: 'v1.0.0', label: 'Prototipo inicial', desc: 'Prototipo generado desde Figma. Pantallas básicas, login, dashboards y flujo operador.', date: 'Jun 2026', done: true },
  { version: 'v2.0.0', label: 'Segunda versión', desc: 'Versión revisada con observaciones ISO 25010 pendientes de aplicar.', date: 'Jun 2026', done: true },
  { version: 'v2.0.1', label: 'Primera corrección', desc: 'Correcciones de accesibilidad, seguridad de sesión, sidebar por rol y validaciones externas sin aleatoriedad.', date: 'Jun 2026', done: true },
  { version: 'v2.0.2', label: 'Cierre de observaciones', desc: 'Versión correctiva final. Control de acceso por rol, feedback completo, README, .gitignore y evidencias EV3.', date: 'Jun 2026', done: true, current: true },
];

const NEXT_VERSION = { version: 'v2.1.0', desc: 'Ajustes finales según nueva ronda de pruebas y evidencias, si se requieren.' };

const EVIDENCIAS = [
  { num: '01', label: 'Build OK', desc: 'npm run build sin errores — carpeta dist/ generada correctamente' },
  { num: '02', label: 'Audit', desc: 'npm audit --audit-level=high sin vulnerabilidades altas en dependencias directas' },
  { num: '03', label: 'Home v2.0.2', desc: 'Portada institucional con badge Prototipo v2.0.2 visible' },
  { num: '04', label: 'Login', desc: 'Formulario + credenciales demo + mensaje "Perfil cargado correctamente"' },
  { num: '05', label: 'Dashboard Operador', desc: 'KPIs + tabla de expedientes con acceso denegado si rol no corresponde' },
  { num: '06', label: 'Flujo expediente', desc: 'Wizard 8 pasos: CU-02 → CU-05 → RF09 → Cierre de atención' },
  { num: '07', label: 'Dashboard Supervisor', desc: 'Revisión manual + modal detalle + acciones aprobar/derivar' },
  { num: '08', label: 'Dashboard Administrador', desc: 'Usuarios, roles/permisos, auditoría — sin acceso cruzado entre roles' },
  { num: '09', label: 'Reportes CU-06', desc: 'Gráficos + feedback toast al exportar PDF/Excel/Descargar' },
  { num: '10', label: 'Sistemas externos', desc: 'SAG/PDI/Aduana con feedback por sistema + detalle de integración' },
  { num: '11', label: 'Alertas RF09', desc: 'Tabla + modal accesible + toast al resolver/derivar' },
  { num: '12', label: 'Control de acceso', desc: 'Intento sin sesión → "Debe iniciar sesión". Rol incorrecto → "Sin permisos"' },
  { num: '13', label: 'Consola limpia', desc: 'Consola del navegador sin errores JavaScript en el flujo principal' },
  { num: '14', label: 'Lighthouse', desc: 'Accesibilidad y rendimiento — sin errores críticos de contraste o semántica' },
];

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

        {/* Header */}
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
              v2.0.2
            </span>
          </div>
        </div>

        {/* Current version */}
        <div style={{ backgroundColor: C.lightBlue, border: `2px solid ${C.primary}`, borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                <Tag size={16} color={C.primary} aria-hidden="true" />
                <span style={{ fontSize: '20px', fontWeight: 700, color: C.primary }}>Versión 2.0.2</span>
                <span style={{ backgroundColor: C.primary, color: C.white, padding: '2px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700 }}>ACTUAL</span>
              </div>
              <div style={{ fontSize: '13px', color: C.grayA }}>Estado: Versión correctiva — cierre de observaciones ISO 25010</div>
            </div>
            <div style={{ fontSize: '12px', color: C.grayB, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={13} aria-hidden="true" /> Jun 2026
            </div>
          </div>

          <p style={{ fontSize: '13px', color: C.grayA, lineHeight: 1.7, marginBottom: '16px' }}>
            Versión correctiva final del prototipo EV3. Cierra observaciones de la revisión ISO/IEC 25010 sobre
            control de acceso por rol, retroalimentación de botones, documentación, .gitignore, README y grids responsive.
          </p>

          <div style={{ fontSize: '13px', fontWeight: 700, color: C.tertiary, marginBottom: '10px' }}>Correcciones aplicadas:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6px' }}>
            {CHANGES_V202.map((change, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '4px 0' }}>
                <CheckCircle size={14} color={C.green} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                <span style={{ fontSize: '13px', color: C.black }}>{change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Version history */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: C.tertiary, marginBottom: '20px' }}>Versiones del proyecto</h2>
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
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: C.tertiary, marginBottom: '14px' }}>Próxima versión (condicional)</h2>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '14px 16px', border: `1px dashed ${C.grayB}`, borderRadius: '10px', flexWrap: 'wrap' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: C.neutral, border: `2px dashed ${C.grayB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={18} color={C.grayB} aria-hidden="true" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: C.grayA }}>{NEXT_VERSION.version}</div>
              <div style={{ fontSize: '13px', color: C.grayB, marginTop: '2px' }}>{NEXT_VERSION.desc}</div>
            </div>
            <span style={{ backgroundColor: C.neutral, color: C.grayB, padding: '3px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 600 }}>Condicional</span>
          </div>
        </div>

        {/* Evidencias */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '20px' }}>
            <Camera size={18} color={C.primary} aria-hidden="true" />
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: C.tertiary }}>Evidencias recomendadas v2.0.2</h2>
          </div>
          <p style={{ fontSize: '13px', color: C.grayB, marginBottom: '16px' }}>
            Capturas y verificaciones recomendadas para la defensa EV3. Cada ítem corresponde a una funcionalidad evaluable según ISO/IEC 25010.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
            {EVIDENCIAS.map(ev => (
              <div key={ev.num} style={{ display: 'flex', gap: '12px', padding: '12px 14px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: `1px solid ${C.neutral}` }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: C.primary, color: C.white, fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ev.num}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: C.tertiary, marginBottom: 2 }}>{ev.label}</div>
                  <div style={{ fontSize: '12px', color: C.grayA, lineHeight: 1.5 }}>{ev.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info del prototipo */}
        <div style={{ backgroundColor: C.tertiary, borderRadius: '12px', padding: '24px', color: C.white }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', color: C.white }}>Información del prototipo</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            {[
              ['Nombre', 'Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores'],
              ['Versión actual', 'v2.0.2'],
              ['Tipo', 'Prototipo académico EV3'],
              ['Base de evaluación', 'ISO/IEC 25010'],
            ].map(([k, v]) => (
              <div key={k} style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: '11px', color: C.accent, marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '14px 16px', marginBottom: '12px' }}>
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
