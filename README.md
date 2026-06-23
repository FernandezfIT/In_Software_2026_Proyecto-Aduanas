# Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores

**Prototipo académico v2.0.2 — Evaluación EV3**

Plataforma web institucional de apoyo al control aduanero fronterizo en el Paso Los Libertadores, Chile/Argentina. Desarrollada como prototipo navegable para la evaluación EV3, basada en los casos de uso y diagramas de actividad de la evaluación EV2.

---

## Descripción

Sistema de gestión interna para operadores, supervisores y administradores de Aduana Chile en el Paso Fronterizo Los Libertadores (Región de Valparaíso). Permite gestionar expedientes de viajeros, validar documentación de menores, registrar vehículos, ejecutar validaciones externas con SAG/PDI/Aduana Limítrofe Argentina, gestionar alertas RF09 y generar reportes CU-06.

---

## Tecnologías utilizadas

- **React 18** — interfaz de usuario
- **TypeScript** — tipado estático
- **Vite 6** — bundler y servidor de desarrollo
- **Tailwind CSS 4** — utilidades de estilo
- **Recharts** — gráficos de reportes
- **Lucide React** — íconos institucionales
- **Radix UI** — componentes accesibles

---

## Requisitos

- Node.js >= 18
- pnpm >= 8 (recomendado) o npm >= 9

---

## Instalación

```bash
pnpm install
# o
npm install
```

---

## Ejecución local

```bash
pnpm dev
# o
npm run dev
```

El servidor de desarrollo estará disponible en: `http://localhost:5173`

---

## Build de producción

```bash
pnpm build
# o
npm run build
```

La carpeta `dist/` contiene el build estático listo para despliegue.

---

## Vista previa del build

```bash
pnpm preview
# o
npm run preview
```

---

## Auditoría de seguridad

```bash
npm audit --audit-level=high
```

> **Nota:** Las dependencias de terceros pueden reportar vulnerabilidades de baja/media severidad no explotables en este contexto de prototipo. No se utilizan versiones con vulnerabilidades altas conocidas en el código propio.

---

## Credenciales de demostración

| Rol | Correo | Contraseña |
|---|---|---|
| Operador Aduanero | operador@aduanachile.cl | 12345 |
| Supervisor Aduanero | supervisor@aduanachile.cl | 12345 |
| Administrador del Sistema | administrador@aduanachile.cl | 12345 |

> Estas credenciales son exclusivamente para demostración académica.

---

## Versionamiento

| Versión | Estado | Descripción |
|---|---|---|
| v1.0.0 | Histórica | Prototipo inicial EV3 |
| v2.0.0 | Histórica | Segunda revisión con observaciones ISO |
| v2.0.1 | Histórica | Primera corrección de observaciones |
| v2.0.2 | **Actual** | Cierre de observaciones — versión final EV3 |

---

## Estructura de carpetas

```
src/
├── app/
│   ├── App.tsx                    # Entrada principal + AuthGuard + navegación
│   └── components/
│       ├── types.ts               # Tipos, constantes de color, credenciales
│       ├── layout/
│       │   ├── Header.tsx         # Barra superior institucional
│       │   ├── Footer.tsx         # Pie de página
│       │   ├── Layout.tsx         # Layout con sidebar + header
│       │   └── Sidebar.tsx        # Navegación lateral por rol
│       ├── pages/
│       │   ├── HomePage.tsx       # Portada pública
│       │   ├── LoginPage.tsx      # Inicio de sesión CU-01
│       │   ├── OperadorDashboard.tsx
│       │   ├── NuevoExpediente.tsx  # Wizard CU-02 a CU-05 + RF09
│       │   ├── SupervisorDashboard.tsx
│       │   ├── AdminDashboard.tsx
│       │   ├── Reportes.tsx        # CU-06
│       │   ├── SistemasExternos.tsx
│       │   ├── Alertas.tsx         # RF09
│       │   └── VersionHistorial.tsx
│       └── ui/
│           ├── StatusTag.tsx
│           └── Toast.tsx          # Sistema de notificaciones
└── styles/
    ├── index.css
    ├── theme.css
    ├── tailwind.css
    └── fonts.css
```

---

## Evidencias recomendadas para EV3

Para la defensa, se recomienda capturar:

1. **Build exitoso** — `npm run build` sin errores
2. **Audit** — `npm audit --audit-level=high` sin vulnerabilidades altas
3. **Home** — Portada institucional con badge v2.0.2
4. **Login** — Formulario + credenciales demo + mensaje "Perfil cargado correctamente"
5. **Dashboard Operador** — KPIs + tabla de expedientes
6. **Flujo expediente** — Wizard 8 pasos (CU-02 → CU-05 → RF09 → Cierre)
7. **Dashboard Supervisor** — Revisión manual + modal de detalle
8. **Dashboard Administrador** — Usuarios, roles, auditoría
9. **Reportes CU-06** — Gráficos + feedback de exportación
10. **Sistemas externos** — SAG / PDI / Aduana Limítrofe con consulta simulada
11. **Alertas RF09** — Tabla + modal + resolver/derivar
12. **Control de acceso** — Intento de acceso sin sesión → mensaje de acceso restringido
13. **Consola del navegador** — Sin errores JavaScript
14. **Lighthouse** — Accesibilidad y rendimiento

---

## Notas académicas

- Las integraciones externas (SAG, PDI, Aduana Limítrofe Argentina) son **simuladas** para fines académicos.
- Las exportaciones de reportes (PDF, Excel) son **simuladas** con mensajes de confirmación.
- El sistema no persiste datos entre sesiones (sin backend real).
- Basado en el caso de estudio de Aduana Chile, EV2 — diagramas UML de casos de uso y actividad.

---

**Servicio Nacional de Aduanas · Gobierno de Chile · Paso Fronterizo Los Libertadores**
