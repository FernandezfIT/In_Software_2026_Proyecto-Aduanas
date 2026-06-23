import { useState } from 'react';
import { Shield, Eye, EyeOff, AlertCircle, Loader } from 'lucide-react';
import { C, CREDENTIALS, ROLE_LABELS } from '../types';
import type { NavProps, User } from '../types';

interface LoginPageProps extends NavProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ navigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fillCredential = (cred: typeof CREDENTIALS[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const match = CREDENTIALS.find(c => c.email === email && c.password === password);
    if (!match) {
      setError('Credenciales inválidas. Verifique su correo y contraseña.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    onLogin({ name: match.name, email: match.email, role: match.role });
  };

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: C.tertiary,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ backgroundColor: C.primary, padding: '4px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)' }}>🇨🇱 Gobierno de Chile — Servicio Nacional de Aduanas</span>
        <span style={{ fontSize: '11px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '1px 8px', borderRadius: '4px', color: C.white }}>Prototipo v1.0</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ width: '100%', maxWidth: '900px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Login form */}
          <div style={{ backgroundColor: C.white, borderRadius: '16px', padding: '36px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: C.primary, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={22} color={C.white} />
              </div>
              <div>
                <div style={{ fontSize: '17px', fontWeight: 700, color: C.tertiary }}>Acceso al sistema</div>
                <div style={{ fontSize: '12px', color: C.grayB }}>Control Aduanero Los Libertadores</div>
              </div>
            </div>

            {error && (
              <div style={{
                backgroundColor: C.lightRed, border: `1px solid ${C.secondary}`,
                borderRadius: '8px', padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '16px', color: '#dc2626', fontSize: '13px',
              }}>
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {loading && (
              <div style={{
                backgroundColor: C.lightBlue, border: `1px solid ${C.primary}`,
                borderRadius: '8px', padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '16px', color: C.primary, fontSize: '13px',
              }}>
                <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Cargando perfil y permisos del usuario...
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: C.grayA, marginBottom: '6px' }}>
                  Correo institucional
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  placeholder="usuario@aduanachile.cl"
                  required
                  style={{
                    width: '100%', padding: '10px 14px',
                    border: `1px solid ${error ? C.secondary : '#D1D5DB'}`,
                    borderRadius: '8px', outline: 'none', fontSize: '14px',
                    color: C.black, boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: C.grayA, marginBottom: '6px' }}>
                  Contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    placeholder="••••••••"
                    required
                    style={{
                      width: '100%', padding: '10px 40px 10px 14px',
                      border: `1px solid ${error ? C.secondary : '#D1D5DB'}`,
                      borderRadius: '8px', outline: 'none', fontSize: '14px',
                      color: C.black, boxSizing: 'border-box',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.grayB }}
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '12px',
                  backgroundColor: loading ? C.grayB : C.primary,
                  color: C.white, border: 'none', borderRadius: '8px',
                  fontSize: '15px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>

            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <span
                onClick={() => navigate('home')}
                style={{ fontSize: '12px', color: C.primary, cursor: 'pointer', textDecoration: 'underline' }}
              >
                ← Volver al inicio
              </span>
            </div>
          </div>

          {/* Demo credentials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '12px', color: C.accent, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                Credenciales de demostración
              </div>
              {CREDENTIALS.map(cred => (
                <div
                  key={cred.role}
                  onClick={() => fillCredential(cred)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px', padding: '12px 14px',
                    marginBottom: '8px', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 600, color: C.white, marginBottom: '4px' }}>
                    {ROLE_LABELS[cred.role]}
                  </div>
                  <div style={{ fontSize: '12px', color: C.accent }}>{cred.email}</div>
                  <div style={{ fontSize: '12px', color: C.accent }}>Contraseña: {cred.password}</div>
                  <div style={{ fontSize: '11px', color: C.primary, marginTop: '4px' }}>Clic para autocompletar →</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'rgba(0,111,179,0.2)', border: `1px solid rgba(0,111,179,0.4)`, borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: C.accent, marginBottom: '8px' }}>
                Actores externos del sistema
              </div>
              {['Sistema SAG', 'Sistema PDI', 'Aduana Limítrofe Argentina'].map(actor => (
                <div key={actor} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  · {actor}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
