import { useState } from 'react';
import { CheckCircle, AlertTriangle, ChevronRight, X, RefreshCw, Check } from 'lucide-react';
import { Layout } from '../layout/Layout';
import { StatusTag } from '../ui/StatusTag';
import { C } from '../types';
import type { NavProps } from '../types';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface Alert { code: string; origin: string; desc: string; priority: 'Alta' | 'Media'; status: 'abierta' | 'resuelta'; }

interface WizardState {
  step: Step;
  isMinor: boolean | null;
  hasVehicle: boolean | null;
  docComplete: boolean | null;
  vehicleOk: boolean | null;
  alerts: Alert[];
  showAlertModal: boolean;
  pendingAlertDesc: string;
  extValidations: Record<string, 'pendiente' | 'consultando' | 'aprobado' | 'error'>;
}

const STEPS = [
  'Datos del viajero', '¿Es menor?', 'Documentos menor', '¿Viaja con vehículo?',
  'Registro vehículo', 'Validaciones externas', 'Gestión de alertas', 'Cierre de atención'
];

export function NuevoExpediente({ navigate, currentUser, logout }: NavProps) {
  const [state, setState] = useState<WizardState>({
    step: 1, isMinor: null, hasVehicle: null, docComplete: null, vehicleOk: null,
    alerts: [], showAlertModal: false, pendingAlertDesc: '',
    extValidations: { SAG: 'pendiente', PDI: 'pendiente', 'Aduana Limítrofe': 'pendiente' },
  });

  const update = (patch: Partial<WizardState>) => setState(s => ({ ...s, ...patch }));

  const addAlert = (desc: string, origin: string, priority: 'Alta' | 'Media' = 'Alta') => {
    const code = `ALT-${String(state.alerts.length + 1).padStart(3, '0')}`;
    update({ alerts: [...state.alerts, { code, origin, desc, priority, status: 'abierta' }], showAlertModal: true, pendingAlertDesc: desc });
  };

  const resolveAlert = (code: string) => update({ alerts: state.alerts.map(a => a.code === code ? { ...a, status: 'resuelta' } : a) });

  const simulateExternal = (system: string) => {
    update({ extValidations: { ...state.extValidations, [system]: 'consultando' } });
    setTimeout(() => {
      const result = Math.random() > 0.15 ? 'aprobado' : 'error';
      if (result === 'error') addAlert(`Error en validación externa — ${system}`, system);
      update({ extValidations: { ...state.extValidations, [system]: result } });
    }, 1500);
  };

  const openAlerts = state.alerts.filter(a => a.status === 'abierta');
  const allExternalDone = Object.values(state.extValidations).every(v => v === 'aprobado' || v === 'error');

  const s = state.step;

  return (
    <Layout
      navigate={navigate} currentUser={currentUser} logout={logout}
      activePage="nuevo-expediente"
      breadcrumbs={[{ label: 'Inicio' }, { label: 'Expedientes' }, { label: 'Nuevo expediente' }]}
    >
      {/* Alert modal */}
      {state.showAlertModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: C.white, borderRadius: '16px', padding: '32px', maxWidth: '480px', width: '90%', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: C.lightRed, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertTriangle size={22} color={C.secondary} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: C.tertiary, marginBottom: '6px' }}>Alerta RF09 generada</div>
                <div style={{ fontSize: '13px', color: C.grayA, marginBottom: '16px' }}>{state.pendingAlertDesc}</div>
                <div style={{ backgroundColor: '#FFF8F0', border: `1px solid #FED7AA`, borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#ea580c', fontWeight: 600 }}>Estado del expediente actualizado</div>
                  <div style={{ fontSize: '12px', color: C.grayA, marginTop: '2px' }}>El expediente EXP-2026-0001 ha sido marcado como "Observado"</div>
                </div>
                <button
                  onClick={() => update({ showAlertModal: false })}
                  style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
                >
                  Entendido — continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '900px' }}>
        {/* Steps indicator */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
            {STEPS.map((label, idx) => {
              const stepNum = idx + 1;
              const done = s > stepNum;
              const current = s === stepNum;
              // Determine if step is relevant
              const skip = (stepNum === 3 && state.isMinor === false) || (stepNum === 5 && state.hasVehicle === false);
              return (
                <div key={stepNum} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '50%',
                      backgroundColor: skip ? C.neutral : done ? C.green : current ? C.primary : C.neutral,
                      color: (done || current) && !skip ? C.white : C.grayB,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 700, flexShrink: 0,
                    }}>
                      {done && !skip ? <Check size={14} /> : stepNum}
                    </div>
                    <div style={{ fontSize: '10px', color: current ? C.primary : C.grayB, textAlign: 'center', maxWidth: '70px', lineHeight: 1.2 }}>
                      {label}
                    </div>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div style={{ flex: 1, height: '2px', backgroundColor: done ? C.green : C.neutral, margin: '0 4px', marginBottom: '16px' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step content */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          {/* STEP 1 — Datos del viajero */}
          {s === 1 && (
            <StepSection title="CU-02: Registrar / Consultar expediente de viajero" subtitle="Complete los datos del viajero para iniciar el expediente">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="RUT o Pasaporte" placeholder="P12345678" defaultValue="P12345678" />
                <Field label="Nombre completo" placeholder="Nombre del viajero" defaultValue="Camila Rojas Muñoz" />
                <Field label="Nacionalidad" placeholder="Chilena" defaultValue="Chilena" />
                <Field label="Edad" placeholder="Edad" defaultValue="17" />
                <Field label="Motivo del viaje" placeholder="Turismo / Trabajo / Estudio" defaultValue="Turismo" />
                <Field label="Dirección de destino" placeholder="Dirección en destino" defaultValue="Mendoza, Argentina" />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button style={{ backgroundColor: C.lightBlue, color: C.primary, border: `1px solid ${C.primary}`, padding: '9px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>
                  Buscar expediente existente
                </button>
                <button
                  onClick={() => update({ step: 2 })}
                  style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '9px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Crear nuevo expediente <ChevronRight size={16} />
                </button>
              </div>
            </StepSection>
          )}

          {/* STEP 2 — ¿Es menor? */}
          {s === 2 && (
            <StepSection title="Decisión: ¿El viajero es menor de edad?" subtitle="Camila Rojas Muñoz · 17 años · Pasaporte P12345678">
              <div style={{ backgroundColor: '#FFF8F0', border: `1px solid ${C.secondary}`, borderRadius: '10px', padding: '16px', marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <AlertTriangle size={20} color={C.secondary} />
                <div style={{ fontSize: '13px', color: C.grayA }}>El viajero tiene <strong>17 años</strong>. Confirme si es menor de edad para proceder con la validación documental correspondiente.</div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => update({ step: 3, isMinor: true })}
                  style={{ backgroundColor: C.secondary, color: C.white, border: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
                >
                  Sí, es menor de edad
                </button>
                <button
                  onClick={() => update({ step: 4, isMinor: false })}
                  style={{ backgroundColor: C.lightBlue, color: C.primary, border: `1px solid ${C.primary}`, padding: '12px 28px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
                >
                  No, continuar
                </button>
              </div>
              <BtnBack onClick={() => update({ step: 1 })} />
            </StepSection>
          )}

          {/* STEP 3 — Documentación menor */}
          {s === 3 && (
            <StepSection title="CU-03: Validar documentación de menor de edad" subtitle="Verificación de documentos para viajero menor de edad">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <CheckField label="Certificado de nacimiento" checked />
                <CheckField label="Documento de identidad" checked />
                <CheckField label="Autorización notarial" checked={false} />
                <Field label="Adulto acompañante" placeholder="Nombre del acompañante" defaultValue="María Elena Muñoz" />
                <Field label="Relación con el menor" placeholder="Parentesco" defaultValue="Madre" />
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: C.grayA, marginBottom: '6px', display: 'block' }}>Estado documental</label>
                  <StatusTag status="observado" label="Falta documentación" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => { addAlert('Falta autorización notarial del menor de edad', 'CU-03'); update({ step: 4, docComplete: false }); }}
                  style={{ backgroundColor: C.secondary, color: C.white, border: 'none', padding: '10px 22px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
                >
                  Falta documentación
                </button>
                <button
                  onClick={() => update({ step: 4, docComplete: true })}
                  style={{ backgroundColor: C.green, color: C.white, border: 'none', padding: '10px 22px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
                >
                  Documentación completa
                </button>
              </div>
              <BtnBack onClick={() => update({ step: 2 })} />
            </StepSection>
          )}

          {/* STEP 4 — ¿Viaja con vehículo? */}
          {s === 4 && (
            <StepSection title="Decisión: ¿El viajero ingresa con vehículo motorizado?" subtitle="Expediente EXP-2026-0001 · Camila Rojas Muñoz">
              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => update({ step: 5, hasVehicle: true })}
                  style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
                >
                  Sí, registrar vehículo
                </button>
                <button
                  onClick={() => update({ step: 6, hasVehicle: false })}
                  style={{ backgroundColor: C.lightBlue, color: C.primary, border: `1px solid ${C.primary}`, padding: '12px 28px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
                >
                  No, preparar validaciones externas
                </button>
              </div>
              <BtnBack onClick={() => update({ step: state.isMinor ? 3 : 2 })} />
            </StepSection>
          )}

          {/* STEP 5 — Vehículo */}
          {s === 5 && (
            <StepSection title="CU-04: Registrar y validar vehículo motorizado" subtitle="Ingrese los datos del vehículo del viajero">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <Field label="Patente" placeholder="Ej: LLBB-22" defaultValue="LLBB-22" />
                <Field label="Tipo de vehículo" placeholder="SUV / Sedán / Camioneta" defaultValue="SUV" />
                <Field label="País de origen" placeholder="Chile / Argentina" defaultValue="Chile" />
                <Field label="Marca" placeholder="Marca" defaultValue="Toyota" />
                <Field label="Modelo" placeholder="Modelo" defaultValue="Fortuner" />
                <Field label="Año" placeholder="Año" defaultValue="2022" />
                <Field label="Propietario" placeholder="Propietario del vehículo" defaultValue="María Elena Muñoz" />
                <Field label="N° Permiso de circulación" placeholder="N° documento" defaultValue="PC-2026-445231" />
                <CheckField label="Permiso de circulación vigente" checked />
                <CheckField label="Seguro obligatorio vigente" checked />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => { addAlert('Inconsistencia en datos del propietario del vehículo', 'CU-04', 'Media'); update({ step: 6, vehicleOk: false }); }}
                  style={{ backgroundColor: C.secondary, color: C.white, border: 'none', padding: '10px 22px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
                >
                  Datos inconsistentes
                </button>
                <button
                  onClick={() => update({ step: 6, vehicleOk: true })}
                  style={{ backgroundColor: C.green, color: C.white, border: 'none', padding: '10px 22px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
                >
                  Datos consistentes — asociar al expediente
                </button>
              </div>
              <BtnBack onClick={() => update({ step: 4 })} />
            </StepSection>
          )}

          {/* STEP 6 — Validaciones externas */}
          {s === 6 && (
            <StepSection title="CU-05: Ejecutar validaciones externas de control" subtitle="Consulte los sistemas externos antes de cerrar la atención">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                {Object.entries(state.extValidations).map(([sys, status]) => (
                  <ExtCard
                    key={sys}
                    system={sys}
                    status={status}
                    onSimulate={() => simulateExternal(sys)}
                  />
                ))}
              </div>
              {allExternalDone && (
                <button
                  onClick={() => update({ step: 7 })}
                  style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Continuar → Gestión de alertas <ChevronRight size={16} />
                </button>
              )}
              <BtnBack onClick={() => update({ step: state.hasVehicle ? 5 : 4 })} />
            </StepSection>
          )}

          {/* STEP 7 — Alertas */}
          {s === 7 && (
            <StepSection title="RF09: Gestión de alertas y observaciones" subtitle={`${state.alerts.length} alerta(s) generadas durante el proceso`}>
              {state.alerts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px', color: C.green }}>
                  <CheckCircle size={48} style={{ marginBottom: '12px' }} />
                  <div style={{ fontSize: '15px', fontWeight: 600 }}>No se generaron alertas</div>
                </div>
              ) : (
                <div style={{ marginBottom: '20px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8FAFC' }}>
                        {['Código', 'Origen', 'Descripción', 'Prioridad', 'Estado', 'Acción'].map(col => (
                          <th key={col} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: C.grayA, borderBottom: `1px solid ${C.neutral}` }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {state.alerts.map(alert => (
                        <tr key={alert.code} style={{ borderBottom: `1px solid ${C.neutral}` }}>
                          <td style={{ padding: '10px 12px', fontWeight: 600, color: C.primary }}>{alert.code}</td>
                          <td style={{ padding: '10px 12px', color: C.grayA }}>{alert.origin}</td>
                          <td style={{ padding: '10px 12px', color: C.black }}>{alert.desc}</td>
                          <td style={{ padding: '10px 12px' }}><PriorityTag p={alert.priority} /></td>
                          <td style={{ padding: '10px 12px' }}><StatusTag status={alert.status} /></td>
                          <td style={{ padding: '10px 12px' }}>
                            {alert.status === 'abierta' && (
                              <button
                                onClick={() => resolveAlert(alert.code)}
                                style={{ backgroundColor: C.lightGreen, color: C.green, border: 'none', padding: '4px 12px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}
                              >
                                Resolver
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {openAlerts.length > 0 ? (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ backgroundColor: C.lightRed, border: `1px solid #FCA5A5`, borderRadius: '8px', padding: '10px 16px', flex: 1, fontSize: '13px', color: '#dc2626', fontWeight: 500 }}>
                    ⚠️ Quedan {openAlerts.length} alerta(s) abiertas — se requiere revisión manual del supervisor.
                  </div>
                  <button
                    onClick={() => navigate('supervisor-dashboard')}
                    style={{ backgroundColor: C.secondary, color: C.white, border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap' }}
                  >
                    Derivar a revisión manual
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => update({ step: 8 })}
                  style={{ backgroundColor: C.green, color: C.white, border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <CheckCircle size={16} /> Cerrar atención del expediente
                </button>
              )}
              <BtnBack onClick={() => update({ step: 6 })} />
            </StepSection>
          )}

          {/* STEP 8 — Cierre */}
          {s === 8 && (
            <StepSection title="Cierre de atención — EXP-2026-0001" subtitle="Resumen completo del proceso de control aduanero">
              <div style={{ backgroundColor: C.lightGreen, border: `1px solid #86EFAC`, borderRadius: '10px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
                <CheckCircle size={24} color={C.green} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: C.green }}>Atención cerrada exitosamente</div>
                  <div style={{ fontSize: '13px', color: C.grayA }}>El expediente ha sido procesado y registrado en el sistema</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <SummaryCard title="Viajero" items={[['Nombre', 'Camila Rojas Muñoz'], ['Documento', 'Pasaporte P12345678'], ['Edad', '17 años (menor)'], ['Nacionalidad', 'Chilena']]} />
                <SummaryCard title="Validaciones externas" items={[['SAG', 'Sin observaciones ✓'], ['PDI', 'Sin impedimentos ✓'], ['Aduana Limítrofe', 'Información validada ✓']]} />
                {state.hasVehicle && (
                  <SummaryCard title="Vehículo" items={[['Patente', 'LLBB-22'], ['Tipo', 'SUV'], ['País', 'Chile'], ['Estado', 'Validado']]} />
                )}
                <SummaryCard title="Alertas" items={state.alerts.length === 0 ? [['Estado', 'Sin alertas generadas']] : state.alerts.map(a => [a.code, a.status === 'resuelta' ? `${a.desc} (resuelta)` : a.desc])} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => navigate('operador-dashboard')}
                  style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
                >
                  Volver al dashboard
                </button>
                <button
                  onClick={() => { update({ step: 1, isMinor: null, hasVehicle: null, docComplete: null, vehicleOk: null, alerts: [], extValidations: { SAG: 'pendiente', PDI: 'pendiente', 'Aduana Limítrofe': 'pendiente' } }); }}
                  style={{ backgroundColor: C.neutral, color: C.grayA, border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
                >
                  Nuevo expediente
                </button>
              </div>
            </StepSection>
          )}
        </div>
      </div>
    </Layout>
  );
}

function StepSection({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: C.tertiary }}>{title}</h2>
        <p style={{ fontSize: '13px', color: C.grayB, marginTop: '4px' }}>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, placeholder, defaultValue }: { label: string; placeholder: string; defaultValue?: string }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: C.grayA, marginBottom: '6px' }}>{label}</label>
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        style={{ width: '100%', padding: '8px 12px', border: `1px solid #D1D5DB`, borderRadius: '7px', fontSize: '13px', color: C.black, boxSizing: 'border-box', outline: 'none' }}
      />
    </div>
  );
}

function CheckField({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', border: `1px solid ${checked ? '#86EFAC' : '#FCA5A5'}`, borderRadius: '8px', backgroundColor: checked ? '#F0FDF4' : '#FEF2F2' }}>
      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: checked ? C.green : C.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {checked ? <Check size={13} color={C.white} /> : <X size={13} color={C.white} />}
      </div>
      <span style={{ fontSize: '13px', fontWeight: 500, color: C.black }}>{label}</span>
      <span style={{ marginLeft: 'auto', fontSize: '12px', color: checked ? C.green : C.secondary, fontWeight: 600 }}>
        {checked ? 'Presente' : 'Falta'}
      </span>
    </div>
  );
}

function BtnBack({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ marginTop: '16px', background: 'none', border: 'none', color: C.grayB, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
    >
      ← Paso anterior
    </button>
  );
}

function PriorityTag({ p }: { p: 'Alta' | 'Media' }) {
  return (
    <span style={{ backgroundColor: p === 'Alta' ? C.lightRed : '#FED7AA', color: p === 'Alta' ? '#dc2626' : '#ea580c', padding: '2px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 600 }}>
      {p}
    </span>
  );
}

function ExtCard({ system, status, onSimulate }: { system: string; status: string; onSimulate: () => void }) {
  const statusConfig = {
    pendiente: { label: 'Pendiente', color: C.grayB, bg: C.neutral },
    consultando: { label: 'Consultando...', color: C.primary, bg: C.lightBlue },
    aprobado: { label: 'Aprobado', color: C.green, bg: C.lightGreen },
    error: { label: 'Error', color: '#dc2626', bg: C.lightRed },
  }[status] ?? { label: status, color: C.grayB, bg: C.neutral };
  return (
    <div style={{ border: `1px solid ${C.neutral}`, borderRadius: '10px', padding: '16px' }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: C.tertiary, marginBottom: '8px' }}>{system}</div>
      <div style={{ fontSize: '12px', color: C.grayB, marginBottom: '12px' }}>Última consulta: {new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</div>
      <div style={{ backgroundColor: statusConfig.bg, color: statusConfig.color, padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 600, display: 'inline-block', marginBottom: '12px' }}>
        {status === 'consultando' ? <RefreshCw size={12} style={{ display: 'inline', marginRight: '4px' }} /> : null}
        {statusConfig.label}
      </div>
      <br />
      {status === 'pendiente' && (
        <button
          onClick={onSimulate}
          style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '6px 14px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}
        >
          Simular consulta
        </button>
      )}
    </div>
  );
}

function SummaryCard({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div style={{ border: `1px solid ${C.neutral}`, borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ backgroundColor: C.tertiary, color: C.white, padding: '10px 16px', fontSize: '13px', fontWeight: 700 }}>{title}</div>
      <div style={{ padding: '12px 16px' }}>
        {items.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${C.neutral}`, fontSize: '13px' }}>
            <span style={{ color: C.grayB }}>{k}</span>
            <span style={{ color: C.black, fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
