export type Page =
  | 'home'
  | 'login'
  | 'operador-dashboard'
  | 'nuevo-expediente'
  | 'supervisor-dashboard'
  | 'admin-dashboard'
  | 'reportes'
  | 'sistemas-externos'
  | 'alertas'
  | 'version-historial';

export interface User {
  name: string;
  email: string;
  role: 'operador' | 'supervisor' | 'administrador';
}

export interface NavProps {
  navigate: (page: Page, params?: Record<string, unknown>) => void;
  currentUser: User | null;
  logout: () => void;
}

export const C = {
  primary: '#006FB3',
  secondary: '#FE6565',
  tertiary: '#0A132D',
  accent: '#A8B7C7',
  neutral: '#EEEEEE',
  grayA: '#4A4A4A',
  grayB: '#8A8A8A',
  black: '#111111',
  white: '#FFFFFF',
  green: '#16a34a',
  orange: '#ea580c',
  bgPage: '#F0F2F5',
  bgCard: '#FFFFFF',
  lightBlue: '#E8F4FD',
  lightRed: '#FEE2E2',
  lightGreen: '#DCFCE7',
  lightOrange: '#FED7AA',
  lightGray: '#F3F4F6',
};

export const ROLE_LABELS: Record<string, string> = {
  operador: 'Operador Aduanero',
  supervisor: 'Supervisor Aduanero',
  administrador: 'Administrador del Sistema',
};

export const CREDENTIALS = [
  { email: 'operador@aduanachile.cl', password: '12345', role: 'operador' as const, name: 'Carlos Fuentes Mora' },
  { email: 'supervisor@aduanachile.cl', password: '12345', role: 'supervisor' as const, name: 'Ana Sepúlveda Rojo' },
  { email: 'administrador@aduanachile.cl', password: '12345', role: 'administrador' as const, name: 'Luis Contreras Díaz' },
];
