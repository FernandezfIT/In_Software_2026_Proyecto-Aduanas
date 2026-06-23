import { useState } from 'react';
import { CheckCircle, RefreshCw, ArrowLeft, Globe, Shield, Leaf } from 'lucide-react';
import { Layout } from '../layout/Layout';
import { C } from '../types';
import type { NavProps } from '../types';

type SystemKey = 'sag' | 'pdi' | 'aduana';

const SYSTEMS = {
  sag: {
    name: 'Sistema SAG',
    fullName: 'Servicio Agrícola y Ganadero',
    icon: Leaf,
    iconColor: C.green,
    desc: 'Validación sanitaria y declaración de productos regulados',
    detail: 'Sistema integrado con el SAG para validar el ingreso de productos agrícolas, ganaderos y de origen animal/vegetal en la frontera.',
    estado: 'conectado' as const,
    sync: '20/06/2026 09:45',
    tipo: 'REST API / JSON',
    uptime: '99.8%',
    results: [
      { exp: 'EXP-2026-0001', resultado: 'Sin observaciones', fecha: '09:40' },
      { exp: 'EXP-2026-0002', resultado: 'Sin observaciones', fecha: '09:22' },
      { exp: 'EXP-2026-0003', resultado: 'Producto regulado detectado', fecha: '09:15' },
    ],
    example: '{"status": "ok", "code": "SAG-200", "observaciones": null, "timestamp": "2026-06-20T09:40:00Z"}',
  },
  pdi: {
    name: 'Sistema PDI',
    fullName: 'Policía de Investigaciones de Chile',
    icon: Shield,
    iconColor: C.primary,
    desc: 'Validación migratoria y control de impedimentos de ingreso/egreso',
    detail: 'Integración con los sistemas de la PDI para verificar impedimentos de viaje, órdenes judiciales y control migratorio en tiempo real.',
    estado: 'conectado' as const,
    sync: '20/06/2026 09:43',
    tipo: 'SOAP / XML',
    uptime: '99.5%',
    results: [
      { exp: 'EXP-2026-0001', resultado: 'Sin impedimentos', fecha: '09:41' },
      { exp: 'EXP-2026-0002', resultado: 'Sin impedimentos', fecha: '09:23' },
      { exp: 'EXP-2026-0004', resultado: 'Alerta migratoria', fecha: '09:30' },
    ],
    example: '{"status": "ok", "code": "PDI-200", "impedimentos": false, "alertas": [], "timestamp": "2026-06-20T09:41:00Z"}',
  },
  aduana: {
    name: 'Aduana Limítrofe Argentina',
    fullName: 'Administración Federal de Ingresos Públicos — AFIP',
    icon: Globe,
    iconColor: '#7c3aed',
    desc: 'Validación coordinada con aduana extranjera para control bilateral',
    detail: 'Sistema de intercambio de información aduanera con la República Argentina para el control coordinado del Paso Los Libertadores.',
    estado: 'conectado' as const,
    sync: '20/06/2026 09:30',
    tipo: 'API REST / Bilateral',
    uptime: '97.2%',
    results: [
      { exp: 'EXP-2026-0001', resultado: 'Validación pendiente', fecha: '09:40' },
      { exp: 'EXP-2026-0002', resultado: 'Información validada', fecha: '09:24' },
    ],
    example: '{"status": "pending", "code": "ARG-202", "validacion": "en_proceso", "timestamp": "2026-06-20T09:40:00Z"}',
  },
};

export function SistemasExternos({ navigate, currentUser, logout }: NavProps) {
  const [selected, setSelected] = useState<SystemKey | null>(null);
  const [querying, setQuerying] = useState<Record<SystemKey, boolean>>({ sag: false, pdi: false, aduana: false });

  const simulate = (key: SystemKey) => {
    setQuerying(q => ({ ...q, [key]: true }));
    setTimeout(() => setQuerying(q => ({ ...q, [key]: false })), 1500);
  };

  if (selected) {
    const sys = SYSTEMS[selected];
    const Icon = sys.icon;
    return (
      <Layout
        navigate={navigate} currentUser={currentUser} logout={logout}
        activePage="sistemas-externos"
        breadcrumbs={[{ label: 'Inicio' }, { label: 'Sistemas externos' }, { label: sys.name }]}
      >
        <div style={{ maxWidth: '900px' }}>
          <button
            onClick={() => setSelected(null)}
            style={{ backgroundColor: C.neutral, color: C.grayA, border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}
          >
            <ArrowLeft size={15} /> Volver a sistemas externos
          </button>

          <div style={{ backgroundColor: C.white, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ backgroundColor: C.tertiary, padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '56px', height: '56px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={28} color={C.white} />
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: C.white }}>{sys.name}</div>
                <div style={{ fontSize: '13px', color: C.accent }}>{sys.fullName}</div>
              </div>
              <div style={{ marginLeft: 'auto', backgroundColor: C.lightGreen, color: C.green, padding: '6px 16px', borderRadius: '99px', fontSize: '13px', fontWeight: 700 }}>
                ● Conectado
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <p style={{ fontSize: '14px', color: C.grayA, marginBottom: '20px' }}>{sys.detail}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                {[
                  ['Tipo de consulta', sys.tipo],
                  ['Última sincronización', sys.sync],
                  ['Disponibilidad', sys.uptime],
                ].map(([k, v]) => (
                  <div key={k} style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: C.grayB, marginBottom: '4px' }}>{k}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: C.black }}>{v}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: C.tertiary, marginBottom: '10px' }}>Últimos resultados</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC' }}>
                      {['Expediente', 'Resultado', 'Hora'].map(col => (
                        <th key={col} style={{ padding: '8px 14px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: C.grayA, borderBottom: `1px solid ${C.neutral}` }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sys.results.map((r, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.neutral}` }}>
                        <td style={{ padding: '10px 14px', fontWeight: 600, color: C.primary }}>{r.exp}</td>
                        <td style={{ padding: '10px 14px', color: r.resultado.includes('Sin') || r.resultado.includes('validada') ? C.green : '#ea580c' }}>{r.resultado}</td>
                        <td style={{ padding: '10px 14px', color: C.grayB }}>{r.fecha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: C.tertiary, marginBottom: '8px' }}>Ejemplo de respuesta</div>
                <pre style={{ backgroundColor: '#1E293B', color: '#7DD3FC', padding: '16px', borderRadius: '8px', fontSize: '12px', overflowX: 'auto' }}>
                  {sys.example}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      navigate={navigate} currentUser={currentUser} logout={logout}
      activePage="sistemas-externos"
      breadcrumbs={[{ label: 'Inicio' }, { label: 'Sistemas externos integrados' }]}
    >
      <div style={{ maxWidth: '1100px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: C.tertiary }}>Sistemas externos integrados</h1>
          <p style={{ fontSize: '13px', color: C.grayB, marginTop: '4px' }}>Actores externos del diagrama de casos de uso · Estado de integraciones en tiempo real</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {(Object.entries(SYSTEMS) as [SystemKey, typeof SYSTEMS.sag][]).map(([key, sys]) => {
            const Icon = sys.icon;
            return (
              <div key={key} style={{ backgroundColor: C.white, borderRadius: '14px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <div style={{ backgroundColor: C.tertiary, padding: '20px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={24} color={C.white} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: C.white }}>{sys.name}</div>
                    <div style={{ fontSize: '11px', color: C.accent }}>{sys.fullName}</div>
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <p style={{ fontSize: '13px', color: C.grayA, marginBottom: '16px' }}>{sys.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: C.grayB }}>Estado</span>
                    <span style={{ backgroundColor: C.lightGreen, color: C.green, padding: '2px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>
                      <CheckCircle size={10} style={{ display: 'inline', marginRight: '4px' }} />Conectado
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontSize: '12px', color: C.grayB }}>Última sincronización</span>
                    <span style={{ fontSize: '12px', color: C.black, fontWeight: 500 }}>{sys.sync}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      onClick={() => simulate(key)}
                      disabled={querying[key]}
                      style={{
                        backgroundColor: sys.iconColor, color: C.white,
                        border: 'none', padding: '10px', borderRadius: '8px',
                        fontWeight: 600, cursor: querying[key] ? 'not-allowed' : 'pointer',
                        fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      }}
                    >
                      {querying[key] ? <><RefreshCw size={15} /> Consultando...</> : `Consultar ${sys.name.split(' ').slice(-1)[0]}`}
                    </button>
                    <button
                      onClick={() => setSelected(key)}
                      style={{ backgroundColor: C.neutral, color: C.grayA, border: 'none', padding: '8px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
                    >
                      Ver detalle integración
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ backgroundColor: C.lightBlue, border: `1px solid ${C.primary}`, borderRadius: '12px', padding: '16px 20px', marginTop: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <CheckCircle size={20} color={C.primary} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: C.primary }}>Todos los sistemas operativos</div>
            <div style={{ fontSize: '12px', color: C.grayA }}>Las tres integraciones externas están activas y respondiendo correctamente. Última verificación: {new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
