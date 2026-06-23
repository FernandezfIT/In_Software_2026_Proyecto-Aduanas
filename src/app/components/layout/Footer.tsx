import { C } from '../types';

export function Footer() {
  return (
    <footer style={{ backgroundColor: C.tertiary, color: C.accent, padding: '20px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: C.white, marginBottom: '4px' }}>
            Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores
          </div>
          <div style={{ fontSize: '11px' }}>
            Servicio Nacional de Aduanas · Gobierno de Chile
          </div>
        </div>
        <nav aria-label="Enlaces del pie de página" style={{ display: 'flex', gap: '20px', fontSize: '12px', flexWrap: 'wrap' }}>
          {['Aduana Chile', 'Gobierno de Chile', 'Soporte', 'Accesibilidad', 'Historial de versiones'].map(link => (
            <span key={link} style={{ cursor: 'pointer', color: C.accent, textDecoration: 'underline' }}>
              {link}
            </span>
          ))}
        </nav>
      </div>
      <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: '11px', flexWrap: 'wrap', gap: 8 }}>
        <span>© 2026 Servicio Nacional de Aduanas. Todos los derechos reservados.</span>
        <span style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '2px 10px', borderRadius: '4px', color: C.white, fontWeight: 700 }}>
          Prototipo v2.0.2 · EV3
        </span>
      </div>
    </footer>
  );
}
