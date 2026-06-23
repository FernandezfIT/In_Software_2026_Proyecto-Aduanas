interface StatusTagProps {
  status: 'aprobado' | 'pendiente' | 'observado' | 'revision' | 'deshabilitado' | 'abierta' | 'resuelta' | 'derivada' | 'conectado' | 'error';
  label?: string;
}

const STATUS_MAP: Record<string, { label: string; bg: string; color: string }> = {
  aprobado:      { label: 'Aprobado',      bg: '#DCFCE7', color: '#16a34a' },
  pendiente:     { label: 'Pendiente',     bg: '#FED7AA', color: '#ea580c' },
  observado:     { label: 'Observado',     bg: '#FEE2E2', color: '#dc2626' },
  revision:      { label: 'En revisión',   bg: '#E8F4FD', color: '#006FB3' },
  deshabilitado: { label: 'Deshabilitado', bg: '#F3F4F6', color: '#6b7280' },
  abierta:       { label: 'Abierta',       bg: '#FEE2E2', color: '#dc2626' },
  resuelta:      { label: 'Resuelta',      bg: '#DCFCE7', color: '#16a34a' },
  derivada:      { label: 'Derivada',      bg: '#FED7AA', color: '#ea580c' },
  conectado:     { label: 'Conectado',     bg: '#DCFCE7', color: '#16a34a' },
  error:         { label: 'Error',         bg: '#FEE2E2', color: '#dc2626' },
};

export function StatusTag({ status, label }: StatusTagProps) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.deshabilitado;
  return (
    <span style={{
      backgroundColor: s.bg,
      color: s.color,
      padding: '3px 12px',
      borderRadius: '99px',
      fontSize: '12px',
      fontWeight: 600,
      display: 'inline-block',
      whiteSpace: 'nowrap',
    }}>
      {label ?? s.label}
    </span>
  );
}
