import { useState } from 'react';
import { CheckCircle, AlertTriangle, ChevronRight, X, RefreshCw, Check, Search } from 'lucide-react';
import { Layout } from '../layout/Layout';
import { StatusTag } from '../ui/StatusTag';
import { useToast, ToastContainer } from '../ui/Toast';
import { C } from '../types';
import type { NavProps } from '../types';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type ExtResult = 'pendiente' | 'consultando' | 'aprobado' | 'observado';
interface AlertItem { code: string; origin: string; desc: string; priority: 'Alta' | 'Media'; status: 'abierta' | 'resuelta'; }
interface WizardState {
  step: Step; isMinor: boolean | null; hasVehicle: boolean | null;
  docComplete: boolean | null; vehicleOk: boolean | null;
  alerts: AlertItem[]; showAlertModal: boolean; pendingAlertDesc: string;
  extValidations: Record<string, ExtResult>;
}

const STEPS = ['Datos del viajero', '¿Es menor?', 'Documentos menor', '¿Viaja con vehículo?', 'Registro vehículo', 'Validaciones externas', 'Gestión de alertas', 'Cierre de atención'];
const EXT_SYSTEMS = ['SAG', 'PDI', 'Aduana Limítrofe'];
const EXT_OK: Record<string, string> = { SAG: 'Sin observaciones.', PDI: 'Sin impedimentos.', 'Aduana Limítrofe': 'Validación registrada.' };

export function NuevoExpediente({ navigate, currentUser, logout }: NavProps) {
  const { toast, toasts, dismiss } = useToast();
  const [state, setState] = useState<WizardState>({
    step: 1, isMinor: null, hasVehicle: null, docComplete: null, vehicleOk: null,
    alerts: [], showAlertModal: false, pendingAlertDesc: '',
    extValidations: { SAG: 'pendiente', PDI: 'pendiente', 'Aduana Limítrofe': 'pendiente' },
  });

  const update = (patch: Partial<WizardState>) => setState(s => ({ ...s, ...patch }));

  const addAlert = (desc: string, origin: string, priority: 'Alta' | 'Media' = 'Alta') => {
    setState(s => {
      const code = `ALT-${String(s.alerts.length + 1).padStart(3, '0')}`;
      return { ...s, alerts: [...s.alerts, { code, origin, desc, priority, status: 'abierta' }], showAlertModal: true, pendingAlertDesc: desc };
    });
  };

  const resolveAlert = (code: string) => update({ alerts: state.alerts.map(a => a.code === code ? { ...a, status: 'resuelta' } : a) });

  /* v2.0.1: controlled outcomes — no Math.random */
  const simulateOk = (system: string) => {
    setState(s => ({ ...s, extValidations: { ...s.extValidations, [system]: 'consultando' } }));
    setTimeout(() => {
      setState(s => ({ ...s, extValidations: { ...s.extValidations, [system]: 'aprobado' } }));
      toast(`Consulta ${system} completada: ${EXT_OK[system]}`, 'success');
    }, 1500);
  };

  const simulateObserved = (system: string) => {
    setState(s => ({ ...s, extValidations: { ...s.extValidations, [system]: 'consultando' } }));
    setTimeout(() => {
      setState(s => ({
        ...s,
        extValidations: { ...s.extValidations, [system]: 'observado' },
        alerts: [...s.alerts, { code: `ALT-${String(s.alerts.length + 1).padStart(3, '0')}`, origin: system, desc: `Observación externa desde ${system}`, priority: 'Alta', status: 'abierta' }],
        showAlertModal: true, pendingAlertDesc: `Observación externa desde ${system}`,
      }));
      toast('Se generó una alerta RF09 por observación externa.', 'warning');
    }, 1500);
  };

  const openAlerts = state.alerts.filter(a => a.status === 'abierta');
  const allExtDone = EXT_SYSTEMS.every(sys => state.extValidations[sys] === 'aprobado' || state.extValidations[sys] === 'observado');
  const s = state.step;

  return (
    <Layout navigate={navigate} currentUser={currentUser} logout={logout} activePage="nuevo-expediente"
      breadcrumbs={[{ label: 'Inicio', page: 'operador-dashboard' }, { label: 'Expedientes', page: 'operador-dashboard' }, { label: 'Nuevo expediente' }]}
    >
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      {state.showAlertModal && (
        <div role="dialog" aria-modal="true" aria-labelledby="alerta-modal-title" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: C.white, borderRadius: '16px', padding: '32px', maxWidth: '480px', width: '90%', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: C.lightRed, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertTriangle size={22} color={C.secondary} aria-hidden="true" />
              </div>
              <div style={{ flex: 1 }}>
                <div id="alerta-modal-title" style={{ fontSize: '16px', fontWeight: 700, color: C.tertiary, marginBottom: '6px' }}>Alerta RF09 generada</div>
                <div style={{ fontSize: '13px', color: C.grayA, marginBottom: '16px' }}>{state.pendingAlertDesc}</div>
                <div style={{ backgroundColor: '#FFF8F0', border: '1px solid #FED7AA', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#ea580c', fontWeight: 600 }}>Estado actualizado</div>
                  <div style={{ fontSize: '12px', color: C.grayA, marginTop: '2px' }}>Expediente EXP-2026-0001 marcado como "Observado"</div>
                </div>
                <button autoFocus onClick={() => update({ showAlertModal: false })} aria-label="Cerrar modal de alerta"
                  style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>
                  Entendido — continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '900px' }}>
        {/* Step indicator */}
        <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflowX: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', minWidth: 600 }}>
            {STEPS.map((label, idx) => {
              const num = idx + 1;
              const done = s > num; const cur = s === num;
              const skip = (num === 3 && state.isMinor === false) || (num === 5 && state.hasVehicle === false);
              return (
                <div key={num} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: skip ? C.neutral : done ? C.green : cur ? C.primary : C.neutral, color: (done || cur) && !skip ? C.white : C.grayB, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                      {done && !skip ? <Check size={14} /> : num}
                    </div>
                    <div style={{ fontSize: '10px', color: cur ? C.primary : C.grayB, textAlign: 'center', maxWidth: '70px', lineHeight: 1.2 }}>{label}</div>
                  </div>
                  {idx < STEPS.length - 1 && <div style={{ flex: 1, height: '2px', backgroundColor: done ? C.green : C.neutral, margin: '0 4px', marginBottom: '16px' }} />}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>

          {s === 1 && (
            <Sec title="CU-02: Registrar / Consultar expediente de viajero" sub="Complete los datos del viajero para iniciar el expediente">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <Fld id="f-rut" label="RUT o Pasaporte" dv="P12345678" />
                <Fld id="f-nom" label="Nombre completo" dv="Camila Rojas Muñoz" />
                <Fld id="f-nac" label="Nacionalidad" dv="Chilena" />
                <Fld id="f-edad" label="Edad" dv="17" />
                <Fld id="f-mot" label="Motivo del viaje" dv="Turismo" />
                <Fld id="f-dest" label="Dirección de destino" dv="Mendoza, Argentina" />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
                <button onClick={() => toast('Se encontró el expediente EXP-2026-0001 asociado al viajero Camila Rojas Muñoz.', 'info')}
                  style={{ backgroundColor: C.lightBlue, color: C.primary, border: `1px solid ${C.primary}`, padding: '9px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Search size={15} aria-hidden="true" /> Buscar expediente existente
                </button>
                <button onClick={() => update({ step: 2 })} style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '9px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Crear nuevo expediente <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
            </Sec>
          )}

          {s === 2 && (
            <Sec title="Decisión: ¿El viajero es menor de edad?" sub="Camila Rojas Muñoz · 17 años · Pasaporte P12345678">
              <div style={{ backgroundColor: '#FFF8F0', border: `1px solid ${C.secondary}`, borderRadius: '10px', padding: '16px', marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <AlertTriangle size={20} color={C.secondary} aria-hidden="true" />
                <p style={{ fontSize: '13px', color: C.grayA }}>El viajero tiene <strong>17 años</strong>. Confirme si es menor de edad para proceder con la validación documental.</p>
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button onClick={() => update({ step: 3, isMinor: true })} style={{ backgroundColor: C.secondary, color: C.white, border: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Sí, es menor de edad</button>
                <button onClick={() => update({ step: 4, isMinor: false })} style={{ backgroundColor: C.lightBlue, color: C.primary, border: `1px solid ${C.primary}`, padding: '12px 28px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>No, continuar</button>
              </div>
              <BtnBack onClick={() => update({ step: 1 })} />
            </Sec>
          )}

          {s === 3 && (
            <Sec title="CU-03: Validar documentación de menor de edad" sub="Verificación de documentos para viajero menor de edad">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <ChkFld label="Certificado de nacimiento" checked />
                <ChkFld label="Documento de identidad" checked />
                <ChkFld label="Autorización notarial" checked={false} />
                <Fld id="f-acomp" label="Adulto acompañante" dv="María Elena Muñoz" />
                <Fld id="f-relac" label="Relación con el menor" dv="Madre" />
                <div><label style={{ fontSize: '12px', fontWeight: 600, color: C.grayA, marginBottom: '6px', display: 'block' }}>Estado documental</label><StatusTag status="observado" label="Falta documentación" /></div>
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button onClick={() => { addAlert('Falta autorización notarial del menor de edad', 'CU-03'); update({ step: 4, docComplete: false }); }} style={{ backgroundColor: C.secondary, color: C.white, border: 'none', padding: '10px 22px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>Falta documentación</button>
                <button onClick={() => update({ step: 4, docComplete: true })} style={{ backgroundColor: C.green, color: C.white, border: 'none', padding: '10px 22px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>Documentación completa</button>
              </div>
              <BtnBack onClick={() => update({ step: 2 })} />
            </Sec>
          )}

          {s === 4 && (
            <Sec title="Decisión: ¿El viajero ingresa con vehículo motorizado?" sub="Expediente EXP-2026-0001 · Camila Rojas Muñoz">
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button onClick={() => update({ step: 5, hasVehicle: true })} style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Sí, registrar vehículo</button>
                <button onClick={() => update({ step: 6, hasVehicle: false })} style={{ backgroundColor: C.lightBlue, color: C.primary, border: `1px solid ${C.primary}`, padding: '12px 28px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>No, preparar validaciones externas</button>
              </div>
              <BtnBack onClick={() => update({ step: state.isMinor ? 3 : 2 })} />
            </Sec>
          )}

          {s === 5 && (
            <Sec title="CU-04: Registrar y validar vehículo motorizado" sub="Ingrese los datos del vehículo del viajero">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <Fld id="f-pat" label="Patente" dv="LLBB-22" />
                <Fld id="f-tipo" label="Tipo de vehículo" dv="SUV" />
                <Fld id="f-pais" label="País de origen" dv="Chile" />
                <Fld id="f-marca" label="Marca" dv="Toyota" />
                <Fld id="f-modelo" label="Modelo" dv="Fortuner" />
                <Fld id="f-anio" label="Año" dv="2022" />
                <Fld id="f-prop" label="Propietario" dv="María Elena Muñoz" />
                <Fld id="f-perm" label="N° Permiso de circulación" dv="PC-2026-445231" />
                <ChkFld label="Permiso de circulación vigente" checked />
                <ChkFld label="Seguro obligatorio vigente" checked />
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button onClick={() => { addAlert('Inconsistencia en datos del propietario del vehículo', 'CU-04', 'Media'); update({ step: 6, vehicleOk: false }); }} style={{ backgroundColor: C.secondary, color: C.white, border: 'none', padding: '10px 22px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>Datos inconsistentes</button>
                <button onClick={() => update({ step: 6, vehicleOk: true })} style={{ backgroundColor: C.green, color: C.white, border: 'none', padding: '10px 22px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>Datos consistentes — asociar al expediente</button>
              </div>
              <BtnBack onClick={() => update({ step: 4 })} />
            </Sec>
          )}

          {s === 6 && (
            <Sec title="CU-05: Ejecutar validaciones externas de control" sub="Resultados controlados y repetibles — sin aleatoriedad">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                {EXT_SYSTEMS.map(sys => {
                  const st = state.extValidations[sys];
                  const cfgMap: Record<ExtResult, { label: string; bg: string; color: string }> = {
                    pendiente:   { label: 'Pendiente',      bg: C.neutral,    color: C.grayB },
                    consultando: { label: 'Consultando...', bg: C.lightBlue,  color: C.primary },
                    aprobado:    { label: 'Aprobado',       bg: C.lightGreen, color: C.green },
                    observado:   { label: 'Observado',      bg: C.lightRed,   color: '#dc2626' },
                  };
                  const cfg = cfgMap[st];
                  return (
                    <div key={sys} style={{ border: `1px solid ${C.neutral}`, borderRadius: '10px', padding: '16px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: C.tertiary, marginBottom: '4px' }}>{sys}</div>
                      <div style={{ fontSize: '12px', color: C.grayB, marginBottom: '10px' }}>Última consulta: {new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</div>
                      <div style={{ backgroundColor: cfg.bg, color: cfg.color, padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: '10px' }}>
                        {st === 'consultando' && <RefreshCw size={12} style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true" />}
                        <span>{cfg.label}</span>
                      </div>
                      {st === 'aprobado' && <p style={{ fontSize: '12px', color: C.green, marginBottom: 8 }}>✓ {EXT_OK[sys]}</p>}
                      {st === 'observado' && <p style={{ fontSize: '12px', color: '#dc2626', marginBottom: 8 }}>⚠ Observación registrada — alerta RF09 generada.</p>}
                      {st === 'pendiente' && (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          <button onClick={() => simulateOk(sys)} aria-label={`Simular consulta aprobada a ${sys}`} style={{ flex: 1, backgroundColor: C.primary, color: C.white, border: 'none', padding: '7px 8px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>Simular consulta</button>
                          <button onClick={() => simulateObserved(sys)} aria-label={`Simular observación externa de ${sys}`} style={{ flex: 1, backgroundColor: '#FED7AA', color: '#92400e', border: 'none', padding: '7px 8px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>Simular observación</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {allExtDone && (
                <button onClick={() => update({ step: 7 })} style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Continuar → Gestión de alertas <ChevronRight size={16} aria-hidden="true" />
                </button>
              )}
              <BtnBack onClick={() => update({ step: state.hasVehicle ? 5 : 4 })} />
            </Sec>
          )}

          {s === 7 && (
            <Sec title="RF09: Gestión de alertas y observaciones" sub={`${state.alerts.length} alerta(s) generadas durante el proceso`}>
              {state.alerts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px', color: C.green }}>
                  <CheckCircle size={48} style={{ marginBottom: '12px' }} aria-hidden="true" />
                  <div style={{ fontSize: '15px', fontWeight: 600 }}>No se generaron alertas</div>
                </div>
              ) : (
                <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: 540 }}>
                    <thead><tr style={{ backgroundColor: '#F8FAFC' }}>
                      {['Código', 'Origen', 'Descripción', 'Prioridad', 'Estado', 'Acción'].map(col => (
                        <th key={col} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: C.grayA, borderBottom: `1px solid ${C.neutral}` }}>{col}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {state.alerts.map(alert => (
                        <tr key={alert.code} style={{ borderBottom: `1px solid ${C.neutral}` }}>
                          <td style={{ padding: '10px 12px', fontWeight: 600, color: C.primary }}>{alert.code}</td>
                          <td style={{ padding: '10px 12px', color: C.grayA }}>{alert.origin}</td>
                          <td style={{ padding: '10px 12px', color: C.black }}>{alert.desc}</td>
                          <td style={{ padding: '10px 12px' }}><span style={{ backgroundColor: alert.priority === 'Alta' ? C.lightRed : '#FED7AA', color: alert.priority === 'Alta' ? '#dc2626' : '#ea580c', padding: '2px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 600 }}>{alert.priority}</span></td>
                          <td style={{ padding: '10px 12px' }}><StatusTag status={alert.status} /></td>
                          <td style={{ padding: '10px 12px' }}>{alert.status === 'abierta' && (<button onClick={() => resolveAlert(alert.code)} aria-label={`Resolver alerta ${alert.code}`} style={{ backgroundColor: C.lightGreen, color: C.green, border: 'none', padding: '4px 12px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>Resolver</button>)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {openAlerts.length > 0 ? (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div role="alert" style={{ backgroundColor: C.lightRed, border: '1px solid #FCA5A5', borderRadius: '8px', padding: '10px 16px', flex: 1, fontSize: '13px', color: '#dc2626', fontWeight: 500, minWidth: 200 }}>
                    ⚠ Quedan {openAlerts.length} alerta(s) abiertas — se requiere revisión manual del supervisor.
                  </div>
                  <button onClick={() => navigate('supervisor-dashboard')} style={{ backgroundColor: C.secondary, color: C.white, border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap' }}>Derivar a revisión manual</button>
                </div>
              ) : (
                <button onClick={() => update({ step: 8 })} style={{ backgroundColor: C.green, color: C.white, border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={16} aria-hidden="true" /> Cerrar atención del expediente
                </button>
              )}
              <BtnBack onClick={() => update({ step: 6 })} />
            </Sec>
          )}

          {s === 8 && (
            <Sec title="Cierre de atención — EXP-2026-0001" sub="Resumen completo del proceso de control aduanero">
              <div style={{ backgroundColor: C.lightGreen, border: '1px solid #86EFAC', borderRadius: '10px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
                <CheckCircle size={24} color={C.green} aria-hidden="true" />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: C.green }}>Atención cerrada exitosamente</div>
                  <div style={{ fontSize: '13px', color: C.grayA }}>Estado final: <strong>Aprobado</strong></div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <SumCard title="Viajero" items={[['Nombre', 'Camila Rojas Muñoz'], ['Documento', 'Pasaporte P12345678'], ['Edad', '17 años (menor)'], ['Nacionalidad', 'Chilena']]} />
                <SumCard title="Validaciones externas" items={EXT_SYSTEMS.map(sys => [sys, state.extValidations[sys] === 'aprobado' ? `✓ ${EXT_OK[sys]}` : state.extValidations[sys] === 'observado' ? '⚠ Observado' : 'Pendiente'])} />
                {state.hasVehicle && <SumCard title="Vehículo" items={[['Patente', 'LLBB-22'], ['Tipo', 'SUV'], ['País', 'Chile'], ['Estado', state.vehicleOk ? 'Validado' : 'Con observaciones']]} />}
                <SumCard title="Alertas" items={state.alerts.length === 0 ? [['Estado', 'Sin alertas generadas']] : state.alerts.map(a => [a.code, a.status === 'resuelta' ? `Resuelta — ${a.desc}` : a.desc])} />
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('operador-dashboard')} aria-label="Volver al dashboard del operador" style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Volver al dashboard</button>
                <button onClick={() => setState({ step: 1, isMinor: null, hasVehicle: null, docComplete: null, vehicleOk: null, alerts: [], showAlertModal: false, pendingAlertDesc: '', extValidations: { SAG: 'pendiente', PDI: 'pendiente', 'Aduana Limítrofe': 'pendiente' } })} style={{ backgroundColor: C.neutral, color: C.grayA, border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Nuevo expediente</button>
              </div>
            </Sec>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </Layout>
  );
}

function Sec({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return <div><div style={{ marginBottom: '24px' }}><h2 style={{ fontSize: '18px', fontWeight: 700, color: C.tertiary }}>{title}</h2><p style={{ fontSize: '13px', color: C.grayB, marginTop: '4px' }}>{sub}</p></div>{children}</div>;
}
function Fld({ id, label, dv }: { id: string; label: string; dv?: string }) {
  return <div><label htmlFor={id} style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: C.grayA, marginBottom: '6px' }}>{label}</label><input id={id} defaultValue={dv} style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '7px', fontSize: '13px', color: C.black, boxSizing: 'border-box', outline: 'none' }} /></div>;
}
function ChkFld({ label, checked }: { label: string; checked: boolean }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', border: `1px solid ${checked ? '#86EFAC' : '#FCA5A5'}`, borderRadius: '8px', backgroundColor: checked ? '#F0FDF4' : '#FEF2F2' }}><div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: checked ? C.green : C.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">{checked ? <Check size={13} color={C.white} /> : <X size={13} color={C.white} />}</div><span style={{ fontSize: '13px', fontWeight: 500, color: C.black }}>{label}</span><span style={{ marginLeft: 'auto', fontSize: '12px', color: checked ? C.green : C.secondary, fontWeight: 600 }}>{checked ? 'Presente' : 'Falta'}</span></div>;
}
function BtnBack({ onClick }: { onClick: () => void }) {
  return <button aria-label="Ir al paso anterior" onClick={onClick} style={{ marginTop: '16px', background: 'none', border: 'none', color: C.grayB, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>← Paso anterior</button>;
}
function SumCard({ title, items }: { title: string; items: [string, string][] }) {
  return <div style={{ border: `1px solid ${C.neutral}`, borderRadius: '10px', overflow: 'hidden' }}><div style={{ backgroundColor: C.tertiary, color: C.white, padding: '10px 16px', fontSize: '13px', fontWeight: 700 }}>{title}</div><div style={{ padding: '12px 16px' }}>{items.map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${C.neutral}`, fontSize: '13px', gap: 8 }}><span style={{ color: C.grayB, flexShrink: 0 }}>{k}</span><span style={{ color: C.black, fontWeight: 500, textAlign: 'right' }}>{v}</span></div>)}</div></div>;
}
