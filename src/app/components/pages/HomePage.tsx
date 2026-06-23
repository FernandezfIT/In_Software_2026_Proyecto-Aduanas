import { Shield, FileText, Truck, Globe, Users, AlertTriangle, ArrowRight, MapPin, Building, Navigation } from 'lucide-react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { C } from '../types';
import type { NavProps } from '../types';

const HERO_URL = 'https://images.unsplash.com/photo-1735498223007-c9f1eb58a15d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1400';

const INFO_CARDS = [
  { icon: Navigation, title: 'Paso Los Libertadores', desc: 'Principal paso fronterizo terrestre entre Chile y Argentina en la zona central cordillerana.' },
  { icon: Users, title: 'Control de Viajeros', desc: 'Registro y validación de expedientes de viajeros nacionales e internacionales.' },
  { icon: FileText, title: 'Control Documental', desc: 'Verificación de documentos de identidad, pasaportes y autorizaciones notariales.' },
  { icon: Truck, title: 'Control Vehicular', desc: 'Registro y validación de vehículos motorizados y su documentación habilitante.' },
  { icon: Globe, title: 'Validaciones Externas', desc: 'Integración con sistemas SAG, PDI y Aduana Limítrofe Argentina para control integral.' },
  { icon: AlertTriangle, title: 'Gestión de Alertas', desc: 'Sistema de alertas y observaciones para casos que requieren revisión adicional.' },
];

export function HomePage({ navigate, currentUser, logout }: NavProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header navigate={navigate} currentUser={currentUser} logout={logout} />

      {/* Hero */}
      <section style={{ position: 'relative', height: '480px', overflow: 'hidden' }}>
        <img
          src={HERO_URL}
          alt="Cordillera de los Andes — Paso Los Libertadores"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to bottom, rgba(10,19,45,0.7) 0%, rgba(0,111,179,0.4) 100%)`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '24px', textAlign: 'center', color: C.white,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '56px', height: '56px', backgroundColor: C.primary, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={28} color={C.white} aria-hidden="true" />
            </div>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Control Aduanero Fronterizo Los Libertadores
          </h1>
          <p style={{ fontSize: '16px', maxWidth: '700px', color: 'rgba(255,255,255,0.9)', marginBottom: '28px', fontWeight: 400 }}>
            Plataforma de apoyo para registro, validación y control operativo de viajeros,
            vehículos y sistemas externos en frontera.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('login')}
              style={{ backgroundColor: C.primary, color: C.white, border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(0,111,179,0.5)' }}
            >
              Iniciar sesión <ArrowRight size={18} aria-hidden="true" />
            </button>
            {/* v2.0.1: requires login to view sistemas externos */}
            <button
              onClick={() => currentUser ? navigate('sistemas-externos') : navigate('login')}
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: C.white, border: `2px solid rgba(255,255,255,0.6)`, padding: '12px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}
            >
              Ver sistemas externos
            </button>
          </div>
          <div style={{ position: 'absolute', bottom: 16, right: 20, backgroundColor: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 700, color: C.white }}>
            Prototipo v2.0.2
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section style={{ padding: '48px 32px', backgroundColor: C.bgPage }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: C.tertiary, textAlign: 'center', marginBottom: '8px' }}>
          Funcionalidades del sistema
        </h2>
        <p style={{ textAlign: 'center', color: C.grayA, marginBottom: '32px', fontSize: '14px' }}>
          Plataforma integrada de control aduanero para el Paso Fronterizo Los Libertadores
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', maxWidth: '1100px', margin: '0 auto' }}>
          {INFO_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} style={{ backgroundColor: C.white, borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderTop: `3px solid ${C.primary}` }}>
                <div style={{ width: '44px', height: '44px', backgroundColor: C.lightBlue, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <Icon size={22} color={C.primary} aria-hidden="true" />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: C.tertiary, marginBottom: '8px' }}>{card.title}</h3>
                <p style={{ fontSize: '13px', color: C.grayA, lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Info del Paso */}
      <section style={{ backgroundColor: C.tertiary, color: C.white, padding: '40px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>
            Información del Paso Fronterizo
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { icon: Building, label: 'Dependencia', value: 'Aduana de Los Andes' },
              { icon: MapPin, label: 'Ubicación', value: 'Cordillera de los Andes, Región de Valparaíso' },
              { icon: Navigation, label: 'Tipo', value: 'Zona Primaria Avanzada' },
              { icon: Globe, label: 'Cruce internacional', value: 'Chile / Argentina' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <Icon size={22} color={C.accent} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                  <div>
                    <div style={{ fontSize: '11px', color: C.accent, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{item.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
