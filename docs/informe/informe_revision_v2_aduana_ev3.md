# Informe de revisión técnica y funcional — Prototipo Aduana EV3 v2.0

## 1. Identificación

**Proyecto:** Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores  
**Caso de estudio:** Aduana Chile / Paso Fronterizo Los Libertadores  
**Versión recibida:** v2.0, según indicación del equipo  
**Archivo revisado:** ZIP recibido, sin considerar el nombre del archivo  
**Tipo de revisión:** revisión estática de código, instalación, build, auditoría npm y trazabilidad funcional basada en ISO/IEC 25010  
**Resultado general:** Aprobado con observaciones importantes. No se recomienda marcar esta versión como final sin aplicar una ronda adicional de correcciones.

---

## 2. Resumen ejecutivo

La versión recibida mantiene una estructura funcional sólida: incluye Home institucional, login por roles, dashboard de Operador, Supervisor y Administrador, flujo de nuevo expediente, validación de menor, registro vehicular, validaciones externas SAG/PDI/Aduana Limítrofe, alertas RF09, reportes CU-06 y pantalla de historial de versiones.

Sin embargo, la revisión muestra que varias correcciones esperadas no fueron aplicadas de forma efectiva. Al comparar esta versión con la versión anterior, no se detectaron cambios funcionales relevantes en el código del prototipo. La diferencia principal es la aparición de archivos de texto/prompt dentro de `src/imports/pasted_text`, pero los componentes principales de la aplicación siguen igual.

Por lo tanto, esta versión funciona como prototipo navegable, pero todavía presenta observaciones relevantes en versionamiento, control de acceso, accesibilidad, seguridad básica, documentación, mantenibilidad y comportamiento responsive.

---

## 3. Resultado técnico de ejecución

### 3.1 Instalación de dependencias

Comando ejecutado:

```bash
npm install
```

**Resultado:** Correcto.  
Se instalaron 285 paquetes y el proyecto pudo preparar sus dependencias.

**Observación:** `npm audit` reportó vulnerabilidades altas.

---

### 3.2 Build del proyecto

Comando ejecutado:

```bash
npm run build
```

**Resultado:** Correcto.  
El proyecto compila correctamente con Vite.

Resultado relevante:

- CSS generado: aproximadamente 86.41 kB.
- JS generado: aproximadamente 670.86 kB.
- Gzip JS: aproximadamente 181.67 kB.
- Advertencia: el chunk JavaScript supera los 500 kB después de minificación.

**Interpretación:** El build funciona, pero existe una advertencia de rendimiento. Para un prototipo académico no bloquea la entrega, pero debe registrarse como observación de eficiencia de desempeño.

---

### 3.3 Auditoría de seguridad npm

Comando ejecutado:

```bash
npm audit
```

**Resultado:** Observado.

Se detectaron 2 vulnerabilidades de severidad alta asociadas a:

- `react-router`
- `vite`

**Recomendación técnica:** actualizar dependencias a versiones corregidas. Según el reporte, existen versiones disponibles sin cambio mayor:

- `react-router`: actualizar a versión segura superior, por ejemplo `7.18.0` o la recomendada por npm.
- `vite`: actualizar a versión segura superior, por ejemplo `6.4.3` o la recomendada por npm.

No aplicar `npm audit fix --force` sin probar después, porque puede modificar dependencias de forma agresiva.

---

## 4. Comparación con la versión anterior

Se realizó comparación entre el ZIP anterior y el ZIP recibido como versión 2.0.

**Resultado:** No se detectaron cambios funcionales relevantes en los componentes principales de la aplicación.

Diferencias observadas:

- Se agregaron archivos de texto/prompt en `src/imports/pasted_text`.
- No se identificaron cambios en componentes clave como:
  - `App.tsx`
  - `Header.tsx`
  - `Footer.tsx`
  - `Sidebar.tsx`
  - `HomePage.tsx`
  - `LoginPage.tsx`
  - `NuevoExpediente.tsx`
  - `SistemasExternos.tsx`
  - `Reportes.tsx`
  - `VersionHistorial.tsx`

**Conclusión:** Figma probablemente no aplicó la mayor parte de las correcciones solicitadas. En términos de control de versiones, esta entrega no debería considerarse una v2.0 final corregida, sino una versión observada que requiere una corrección adicional.

---

## 5. Evaluación según ISO/IEC 25010

| Característica | Estado | Evaluación |
|---|---|---|
| Adecuación funcional | Aprobado con observaciones | Los módulos principales existen y representan los casos de uso, pero algunos botones son solo visuales y no entregan feedback. |
| Eficiencia de desempeño | Observado | El build genera advertencia por chunk JS superior a 500 kB. |
| Compatibilidad | Pendiente / observado | No se ejecutaron pruebas reales en Chrome, Firefox y Edge. Hay riesgos responsive por grillas rígidas y sidebar fija. |
| Usabilidad | Aprobado con observaciones | El flujo principal es claro, pero faltan mensajes de feedback en acciones como exportar, aplicar filtros y buscar expediente. |
| Fiabilidad | Observado | El flujo funciona, pero usa resultados aleatorios en validaciones externas, lo que dificulta repetir pruebas con evidencia estable. |
| Seguridad | Observado | No hay protección de navegación por rol. Hay acceso a pantallas internas sin sesión y vulnerabilidades npm altas. |
| Mantenibilidad | Observado | Hay componentes separados, pero falta documentación real, `.gitignore`, versionamiento formal y package metadata correcta. |
| Portabilidad | Aprobado con observaciones | El proyecto instala y compila, pero el README sigue siendo genérico y no explica pruebas ni versionamiento. |

---

## 6. Cumplimiento funcional EV2 / EV3

### 6.1 Elementos correctamente presentes

- Página principal institucional del sistema.
- Referencia visual al Paso Los Libertadores.
- Login por roles.
- Credenciales demo de Operador, Supervisor y Administrador.
- Dashboard del Operador Aduanero.
- Dashboard del Supervisor Aduanero.
- Dashboard del Administrador del Sistema.
- Flujo de nuevo expediente con 8 pasos.
- CU-02: registro/consulta de expediente.
- CU-03: validación documental de menor.
- CU-04: registro y validación vehicular.
- CU-05: validaciones externas SAG, PDI y Aduana Limítrofe.
- RF09: alertas y observaciones.
- CU-06: reportes operativos y estadísticos.
- Pantalla de sistemas externos integrados.
- Pantalla de historial de versiones.

### 6.2 Elementos observados

- El prototipo sigue mostrando “Prototipo v1.0” en Header, Footer, Login e Historial de Versiones.
- La pantalla de historial declara v1.1, v1.2 y v2.0 como versiones futuras o planificadas, no como versión actual.
- No hay evidencia visual dentro del prototipo de “correcciones aplicadas v2.0”.
- Los botones de exportar PDF, exportar Excel y descargar reporte no tienen acción ni feedback.
- El botón “Buscar expediente existente” no tiene acción visible.
- El botón “Aplicar filtros” en reportes no modifica resultados ni muestra feedback.
- Las validaciones externas del flujo de expediente usan `Math.random`, por lo que los resultados no son reproducibles.
- No existe bloqueo real de acceso por rol.
- Desde Home se puede entrar a Sistemas Externos sin sesión y aparece una sidebar con opciones de administrador por defecto.
- Desde Supervisor se puede navegar visualmente al dashboard de administrador al seleccionar “Derivar a administrador”.

---

## 7. Hallazgos principales

### H-001 — Versionamiento no aplicado correctamente

**Severidad:** Alta  
**Característica ISO:** Mantenibilidad / Portabilidad  
**Descripción:** La versión recibida se indicó como v2.0, pero el prototipo sigue mostrando v1.0 en varias pantallas. El historial de versiones también sigue considerando v2.0 como versión futura.

**Corrección requerida:** actualizar todos los textos visibles a “Prototipo v2.0” o “Prototipo v2.0.1”, según la estrategia de versionamiento. La pantalla de historial debe mostrar v1.0, v1.1 y v2.0 como versiones ya ejecutadas, con estado, fecha, cambios y correcciones aplicadas.

---

### H-002 — Correcciones anteriores no aplicadas al código funcional

**Severidad:** Alta  
**Característica ISO:** Mantenibilidad  
**Descripción:** La comparación con la versión anterior muestra que no hubo cambios funcionales en los componentes principales. Solo se agregaron archivos de texto/prompt.

**Corrección requerida:** aplicar los cambios directamente sobre los componentes React y no solo incorporar prompts o documentación interna.

---

### H-003 — Acceso a pantalla interna sin sesión

**Severidad:** Alta  
**Característica ISO:** Seguridad  
**Descripción:** Desde Home se puede abrir “Sistemas externos” sin autenticación. Al hacerlo, la pantalla usa `Layout`, que incluye `Sidebar`. Como `currentUser` es `null`, la sidebar carga menú de administrador por defecto.

**Corrección requerida:** cuando no exista sesión, Sistemas Externos debe mostrarse en modo público sin sidebar interna, o debe redirigir a Login. Nunca debe mostrar navegación de administrador sin usuario autenticado.

---

### H-004 — Sidebar asigna menú administrador cuando no hay usuario

**Severidad:** Alta  
**Característica ISO:** Seguridad / Usabilidad  
**Descripción:** En `Sidebar.tsx`, si el usuario no es operador ni supervisor, el sistema carga `ADMIN_ITEMS`. Eso incluye también el caso `currentUser === null`.

**Corrección requerida:** si `currentUser` es `null`, no renderizar sidebar o renderizar menú público mínimo. El menú administrador solo debe aparecer si `currentUser.role === 'administrador'`.

---

### H-005 — Falta control de acceso por rol

**Severidad:** Alta  
**Característica ISO:** Seguridad  
**Descripción:** Las pantallas se renderizan solo por estado de navegación, sin una matriz de permisos. Esto permite rutas visuales incoherentes entre roles.

**Corrección requerida:** implementar función `canAccess(page, currentUser)` o equivalente. Si un rol no tiene permiso, redirigir a su dashboard o mostrar “Acceso no autorizado”.

---

### H-006 — Vulnerabilidades altas en dependencias

**Severidad:** Alta  
**Característica ISO:** Seguridad / Mantenibilidad  
**Descripción:** `npm audit` detecta vulnerabilidades altas en `react-router` y `vite`.

**Corrección requerida:** actualizar dependencias y volver a ejecutar `npm install`, `npm run build` y `npm audit`.

---

### H-007 — Acciones sin feedback funcional

**Severidad:** Media  
**Característica ISO:** Adecuación funcional / Usabilidad  
**Descripción:** Existen botones que parecen funcionales, pero no generan respuesta visible: exportar PDF, exportar Excel, descargar reporte, aplicar filtros y buscar expediente existente.

**Corrección requerida:** agregar feedback visual: toast, modal, mensaje de “acción simulada” o cambio de estado.

---

### H-008 — Validaciones externas no reproducibles

**Severidad:** Media  
**Característica ISO:** Fiabilidad  
**Descripción:** En `NuevoExpediente.tsx`, las validaciones externas usan `Math.random`. Esto dificulta repetir evidencias y obtener resultados consistentes en pruebas.

**Corrección requerida:** reemplazar aleatoriedad por resultados controlados. Ejemplo: botón “Simular aprobado” y botón “Simular con observación”, o un set fijo de respuestas por sistema.

---

### H-009 — Problemas de accesibilidad en formularios y modales

**Severidad:** Media  
**Característica ISO:** Usabilidad / Accesibilidad  
**Descripción:** Los labels no están asociados a inputs mediante `htmlFor` e `id`. Los modales personalizados no declaran `role="dialog"`, `aria-modal="true"` ni manejo de foco. Algunos botones de ícono no tienen `aria-label`.

**Corrección requerida:** asociar labels, agregar atributos ARIA, permitir cierre con Escape y definir labels accesibles en botones de ícono.

---

### H-010 — Responsive incompleto

**Severidad:** Media  
**Característica ISO:** Compatibilidad / Portabilidad  
**Descripción:** Varias pantallas usan grillas rígidas como `repeat(3, 1fr)`, `repeat(4, 1fr)` o `repeat(5, 1fr)`. La sidebar tiene ancho fijo de 240px. Esto puede afectar tablets y móviles.

**Corrección requerida:** usar grillas con `auto-fit/minmax`, permitir menú colapsable y agregar contenedores con `overflow-x` para tablas.

---

### H-011 — README y metadatos genéricos

**Severidad:** Media  
**Característica ISO:** Portabilidad / Mantenibilidad  
**Descripción:** El README sigue siendo el genérico generado por Figma. El `package.json` mantiene nombre `@figma/my-make-file` y versión `0.0.1`.

**Corrección requerida:** actualizar README con objetivo, instalación, credenciales, comandos de prueba, versionamiento y evidencias. Actualizar `package.json` con nombre del proyecto y versión real.

---

### H-012 — Falta `.gitignore`

**Severidad:** Media  
**Característica ISO:** Mantenibilidad  
**Descripción:** El ZIP no incluye `.gitignore`. Para trabajar en GitHub, esto puede provocar que se suban `node_modules`, `dist`, logs o archivos locales.

**Corrección requerida:** crear `.gitignore` antes del primer commit.

---

## 8. Estado recomendado para control de versiones

Dado que esta versión fue declarada como v2.0 pero no refleja las correcciones completas, se recomienda una de estas dos estrategias:

### Opción A — Si aún no hicieron tag en Git

Registrar esta versión como:

```text
v1.1.0-observada
```

Luego aplicar correcciones y recién marcar:

```text
v2.0.0-final
```

### Opción B — Si ya hicieron tag v2.0.0

Mantener el tag como evidencia histórica y crear una versión de corrección:

```text
v2.0.1-correcciones-finales
```

Esta segunda opción es más honesta si el equipo ya subió o presentó la versión como v2.0.

---

## 9. Criterio de aprobación

**Resultado:** Aprobado con observaciones importantes.

El prototipo permite demostrar la mayoría de los flujos de EV3, pero no se recomienda considerarlo versión final mientras mantenga:

- Etiquetas visibles de v1.0.
- Historial de versiones sin actualizar.
- Acceso interno sin sesión.
- Sidebar de administrador para usuario nulo.
- Dependencias con vulnerabilidades altas.
- README genérico.
- Acciones críticas sin feedback.
- Validaciones externas aleatorias.

---

## 10. Prompt para Figma — Correcciones finales v2.0.1

```text
Crea una versión corregida del prototipo llamada “Prototipo v2.0.1 — Correcciones finales EV3” para el Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores.

Objetivo:
Aplicar correcciones finales sobre el prototipo de Aduana Chile / Paso Fronterizo Los Libertadores, manteniendo la base visual institucional, los roles definidos y los casos de uso trabajados en EV2, pero corrigiendo los problemas detectados en la revisión técnica y funcional de la versión v2.0.

Mantener obligatoriamente:
- Página principal institucional del sistema.
- Login por roles.
- Rol Operador Aduanero.
- Rol Supervisor Aduanero.
- Rol Administrador del Sistema.
- Dashboard Operador.
- Dashboard Supervisor.
- Dashboard Administrador.
- Flujo de expediente basado en CU-02, CU-03, CU-04 y CU-05.
- Validación de menor de edad.
- Registro y validación de vehículo.
- Validaciones externas SAG, PDI y Aduana Limítrofe Argentina.
- Gestión de alertas RF09.
- Reportes CU-06.
- Pantalla de sistemas externos.
- Historial de versiones.
- Estética basada en Framework visual Gobierno de Chile.

Correcciones obligatorias:

1. Actualizar versionamiento visual
- Reemplazar todo texto visible “Prototipo v1.0” por “Prototipo v2.0.1”.
- Actualizar Header, Footer, Login e Historial de versiones.
- La pantalla Historial de versiones debe mostrar:
  - v1.0.0: Prototipo inicial EV3.
  - v1.1.0: Correcciones ISO 25010 iniciales.
  - v2.0.0: Versión recibida con observaciones.
  - v2.0.1: Correcciones finales aplicadas.
- Marcar v2.0.1 como “Versión actual”.
- Agregar sección “Correcciones aplicadas v2.0.1”.

2. Corregir acceso sin sesión
- Si el usuario no ha iniciado sesión, la pantalla Sistemas Externos no debe mostrar sidebar interna.
- Desde Home, el botón “Ver sistemas externos” puede abrir una vista pública simple, sin menú interno y con botones “Volver al inicio” e “Iniciar sesión”.
- La sidebar nunca debe mostrar menú de Administrador si currentUser es null.
- El menú administrador solo debe mostrarse si el rol activo es Administrador del Sistema.

3. Agregar control visual de acceso por rol
- Operador solo debe ver: expediente, menor, vehículo, validaciones externas y alertas.
- Supervisor solo debe ver: alertas, revisión manual, expedientes observados, reportes y sistemas externos.
- Administrador solo debe ver: usuarios, roles, integraciones, auditoría, configuración y reportes.
- Si un rol intenta entrar a una pantalla no permitida, mostrar pantalla “Acceso no autorizado” con botón para volver a su dashboard.
- No permitir que Supervisor navegue directamente al dashboard administrador. El botón “Derivar a administrador” debe cambiar el estado del caso a “Derivado a administrador” y mostrar feedback, no abrir el panel administrador.

4. Corregir acciones sin feedback
- Botón “Buscar expediente existente”: mostrar resultado simulado o mensaje “Expediente encontrado / No encontrado”.
- Botón “Aplicar filtros”: mostrar mensaje “Filtros aplicados correctamente” y actualizar visualmente la tabla.
- Botón “Exportar PDF”: mostrar toast o modal “Reporte PDF generado correctamente — simulación”.
- Botón “Exportar Excel”: mostrar toast o modal “Reporte Excel generado correctamente — simulación”.
- Botón “Descargar reporte”: mostrar mensaje “Descarga simulada completada”.
- Botón “Exportar log” del administrador: agregar feedback visual.

5. Corregir validaciones externas
- Eliminar comportamiento aleatorio en las validaciones externas.
- Reemplazar Math.random por resultados controlados:
  - SAG: botón “Simular sin observaciones” y botón “Simular con observación”.
  - PDI: botón “Simular sin impedimentos” y botón “Simular alerta migratoria”.
  - Aduana Limítrofe: botón “Simular información validada” y botón “Simular validación pendiente”.
- Esto debe permitir repetir pruebas con evidencia estable.

6. Mejorar accesibilidad
- Asociar todos los labels con inputs usando id y htmlFor.
- Agregar aria-label a botones de solo ícono: ver contraseña, ocultar contraseña, cerrar modal, campana de alertas, volver, editar.
- Los modales deben tener role="dialog", aria-modal="true" y título accesible.
- Los mensajes de error deben usar role="alert".
- El modal debe poder cerrarse con botón claro y, si es posible, con tecla Escape.
- No depender solo del color para comunicar estados; mantener texto visible como Aprobado, Pendiente, Observado, En revisión, Resuelto.

7. Mejorar diseño responsive
- Reemplazar grillas rígidas repeat(3), repeat(4) y repeat(5) por estructuras responsivas con auto-fit/minmax.
- La sidebar debe ser colapsable o transformarse en menú superior/hamburguesa en pantallas pequeñas.
- Las tablas deben tener contenedor con overflow-x:auto.
- Login debe pasar de dos columnas a una columna en pantallas pequeñas.
- El flujo de expediente debe seguir siendo legible en tablet.

8. Mejorar documentación visible del prototipo
- Agregar una pantalla o sección breve “Evidencia de pruebas” con:
  - Build ejecutado correctamente.
  - Auditoría npm con observaciones.
  - Pruebas funcionales por rol.
  - Pruebas de accesibilidad pendientes/aplicadas.
  - Pruebas responsive.
- Agregar una tarjeta final en Historial de versiones con el estado “Aprobado con observaciones corregidas”.

9. Mantener coherencia visual institucional
- Mantener paleta Gobierno de Chile:
  - Primary: #006FB3
  - Secondary: #FE6565
  - Tertiary: #0A132D
  - Accent: #A8B7C7
  - Neutral: #EEEEEE
  - Gray A: #4A4A4A
  - Gray B: #8A8A8A
  - Black: #111111
  - White: #FFFFFF
- Mantener estética sobria, institucional y clara.
- Usar botones, tarjetas, tablas, tags y alertas consistentes.

Resultado esperado:
Entregar un prototipo navegable final v2.0.1, donde se pueda demostrar claramente:
- Flujo completo del Operador Aduanero.
- Revisión y gestión del Supervisor.
- Administración de usuarios, roles e integraciones.
- Reportes CU-06.
- Sistemas externos SAG, PDI y Aduana Limítrofe.
- Versionamiento completo.
- Correcciones aplicadas a partir del plan de pruebas ISO 25010.
```
