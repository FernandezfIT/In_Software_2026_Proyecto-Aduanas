# Informe de revisión - Prototipo v1.0.0

## Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores

**Proyecto:** Aduana Chile / Argentina - Paso Fronterizo Los Libertadores  
**Asignatura:** Ingeniería de Software  
**Evaluación:** EV3  
**Versión evaluada:** v1.0.0  
**Tipo de evaluación:** Revisión de prototipo web basada en ISO/IEC 25010  
**Origen:** Prototipo generado desde Figma  
**Estado del informe:** Revisión inicial  

---

## 1. Objetivo de la revisión

El objetivo de esta revisión es evaluar la primera versión navegable del prototipo web del **Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores**, verificando su cumplimiento inicial respecto a los casos de uso trabajados en EV2 y a criterios de calidad asociados al modelo ISO/IEC 25010.

La revisión busca identificar brechas funcionales, visuales, de navegación, accesibilidad, seguridad básica, mantenibilidad y versionamiento, con el fin de generar correcciones para versiones posteriores del prototipo.

---

## 2. Alcance de la revisión

La evaluación se aplicó sobre la versión inicial del prototipo, correspondiente a **v1.0.0**.

Se revisaron los siguientes aspectos:

- Existencia de pantallas principales.
- Login por roles.
- Dashboards para Operador, Supervisor y Administrador.
- Flujo de expediente del Operador.
- Validación documental de menor de edad.
- Registro y validación vehicular.
- Validaciones externas SAG, PDI y Aduana Limítrofe.
- Gestión de alertas RF09.
- Reportes CU-06.
- Pantalla de sistemas externos.
- Pantalla de historial de versiones.
- Estructura técnica del proyecto.
- Calidad inicial del código generado.

No se evaluaron integraciones reales con APIs externas, bases de datos ni servicios productivos, ya que el alcance corresponde a un prototipo académico navegable.

---

## 3. Criterios ISO/IEC 25010 considerados

| Característica | Criterio aplicado en esta revisión |
|---|---|
| Adecuación funcional | Presencia de funciones y pantallas asociadas a los casos de uso EV2. |
| Usabilidad | Claridad de navegación, formularios, botones, mensajes y estados. |
| Compatibilidad | Capacidad de visualización en entorno web y adaptación inicial a distintas resoluciones. |
| Seguridad | Separación visual de roles, login, protección básica de pantallas y manejo de credenciales demo. |
| Mantenibilidad | Organización del código, componentes reutilizables y facilidad de corrección. |
| Portabilidad | Posibilidad de instalar, ejecutar y compilar el proyecto en entorno local. |
| Fiabilidad | Estabilidad de navegación y ausencia de errores críticos visibles en el flujo principal. |
| Eficiencia de desempeño | Carga del prototipo y advertencias relacionadas con recursos o paquetes. |

---

## 4. Resultado general de la revisión

**Resultado:** Aprobado con observaciones.  
**Nivel de avance:** Prototipo navegable inicial.  
**Recomendación:** Usar esta versión como línea base `v1.0.0` y generar una versión correctiva posterior, idealmente `v1.1.0`, con los ajustes detectados.

La versión v1.0.0 cumple como primera base visual y funcional del sistema, ya que contiene la mayoría de las pantallas esperadas. Sin embargo, presenta observaciones relevantes que deben corregirse para fortalecer la defensa de EV3 y mejorar la trazabilidad entre pruebas, hallazgos y versionamiento.

---

## 5. Fortalezas detectadas

| ID | Fortaleza | Impacto |
|---|---|---|
| F-001 | El prototipo representa una plataforma institucional contextualizada en Aduana y Paso Los Libertadores. | Positivo para la defensa visual y funcional. |
| F-002 | Existen roles diferenciados: Operador, Supervisor y Administrador. | Permite demostrar separación inicial de responsabilidades. |
| F-003 | Se incluyen módulos esperados: expedientes, alertas, reportes y sistemas externos. | Alineación inicial con los casos de uso EV2. |
| F-004 | El flujo del Operador incorpora expediente, menor de edad, vehículo y validaciones externas. | Refuerza la relación con el diagrama de actividades. |
| F-005 | Se incorporan actores externos: SAG, PDI y Aduana Limítrofe Argentina. | Cumple con la relación del sistema con entidades externas. |
| F-006 | Existe pantalla de historial de versiones. | Apoya el entregable de versionamiento. |
| F-007 | El proyecto puede ser usado como base para control de versiones en Git. | Permite evidenciar mejora iterativa. |

---

## 6. Hallazgos y observaciones

### H-001 - Acceso a Sistemas Externos sin sesión

**Característica ISO:** Seguridad / Adecuación funcional  
**Severidad:** Alta  
**Descripción:** Desde la pantalla Home existe acceso directo a “Sistemas externos” sin requerir inicio de sesión.  
**Riesgo:** Un usuario no autenticado puede visualizar una pantalla que debería estar asociada a módulos internos del sistema.  
**Corrección sugerida:** Redirigir al login cuando no exista usuario activo y mostrar mensaje informativo.

---

### H-002 - Sidebar con rol administrador por defecto

**Característica ISO:** Seguridad / Usabilidad  
**Severidad:** Alta  
**Descripción:** Cuando no existe usuario activo, la lógica de navegación puede mostrar opciones de Administrador como valor por defecto.  
**Riesgo:** Se representa visualmente un acceso incorrecto a funciones administrativas.  
**Corrección sugerida:** No renderizar Sidebar administrativa si `currentUser` es `null`; redirigir al login o mostrar navegación neutral.

---

### H-003 - Falta de control visual estricto por rol

**Característica ISO:** Seguridad / Adecuación funcional  
**Severidad:** Media  
**Descripción:** Aunque existen dashboards separados, se requiere reforzar que cada rol vea únicamente las opciones que le corresponden.  
**Riesgo:** La defensa puede verse debilitada si el profesor detecta permisos visuales mezclados o accesos incoherentes.  
**Corrección sugerida:** Definir menú y rutas por rol: Operador, Supervisor y Administrador.

---

### H-004 - Botones sin retroalimentación funcional

**Característica ISO:** Usabilidad / Fiabilidad  
**Severidad:** Media  
**Descripción:** Algunos botones existen visualmente pero no entregan feedback claro al usuario.  
**Botones observados:** Exportar PDF, Exportar Excel, Descargar reporte, Aplicar filtros, Buscar expediente existente y algunas acciones de validaciones externas.  
**Riesgo:** El usuario no sabe si la acción se ejecutó o si el botón no funciona.  
**Corrección sugerida:** Agregar toasts, modales o mensajes simulados de confirmación.

---

### H-005 - Validaciones externas con comportamiento aleatorio

**Característica ISO:** Fiabilidad / Pruebas repetibles  
**Severidad:** Media  
**Descripción:** Las validaciones externas usan resultados no deterministas, por ejemplo mediante comportamientos aleatorios.  
**Riesgo:** Las pruebas no son repetibles y las evidencias pueden variar entre ejecuciones.  
**Corrección sugerida:** Reemplazar resultados aleatorios por respuestas controladas y agregar botón específico para simular observaciones externas.

---

### H-006 - Accesibilidad incompleta en modales y botones de ícono

**Característica ISO:** Usabilidad / Accesibilidad  
**Severidad:** Media  
**Descripción:** Algunos modales y botones de ícono no presentan atributos de accesibilidad suficientes.  
**Riesgo:** Dificulta navegación con tecnologías asistivas y reduce el cumplimiento de buenas prácticas.  
**Corrección sugerida:** Agregar `role="dialog"`, `aria-modal="true"`, títulos visibles y `aria-label` en botones solo con ícono.

---

### H-007 - Responsividad mejorable

**Característica ISO:** Compatibilidad / Usabilidad  
**Severidad:** Media  
**Descripción:** La estructura con Sidebar y tablas puede presentar problemas en resoluciones pequeñas.  
**Riesgo:** El prototipo puede no visualizarse correctamente en tablet o móvil.  
**Corrección sugerida:** Implementar menú colapsable o hamburguesa, scroll horizontal en tablas y grillas adaptables.

---

### H-008 - README genérico

**Característica ISO:** Mantenibilidad / Portabilidad  
**Severidad:** Media  
**Descripción:** El README inicial mantiene contenido genérico del paquete generado desde Figma.  
**Riesgo:** El repositorio no explica adecuadamente el proyecto, instalación, pruebas, versionamiento ni contexto académico.  
**Corrección sugerida:** Crear README propio del proyecto con descripción, instalación, ejecución local, credenciales demo, estructura y comandos de prueba.

---

### H-009 - Metadata técnica genérica en package.json

**Característica ISO:** Mantenibilidad  
**Severidad:** Baja  
**Descripción:** El `package.json` mantiene nombre y versión genérica del proyecto generado.  
**Riesgo:** Resta profesionalismo y dificulta el versionamiento formal.  
**Corrección sugerida:** Cambiar nombre a `aduana-los-libertadores-prototipo-ev3` y ajustar la versión según corresponda.

---

### H-010 - Versionamiento visible limitado a v1.0

**Característica ISO:** Mantenibilidad / Trazabilidad  
**Severidad:** Baja  
**Descripción:** La versión visible inicial cumple como línea base, pero debe actualizarse en futuras versiones.  
**Riesgo:** Si las próximas versiones siguen mostrando v1.0, se pierde trazabilidad entre prototipo, pruebas y correcciones.  
**Corrección sugerida:** En cada nueva versión, actualizar Header, Footer, Login, Historial de versiones, README, CHANGELOG y tag Git.

---

### H-011 - Vulnerabilidades reportadas por npm audit

**Característica ISO:** Seguridad / Mantenibilidad  
**Severidad:** Alta  
**Descripción:** En la revisión inicial se registraron vulnerabilidades altas asociadas a dependencias.  
**Riesgo:** Aunque el prototipo es académico, la evidencia de `npm audit` puede aparecer como observación técnica.  
**Corrección sugerida:** Ejecutar `npm audit`, revisar dependencias afectadas y aplicar `npm audit fix` si no rompe el prototipo.

---

## 7. Matriz de evaluación resumida

| ID | Área evaluada | Estado | Observación |
|---|---|---|---|
| EV-001 | Home institucional | Aprobado | Cumple como portada del sistema. |
| EV-002 | Login por roles | Aprobado con observaciones | Requiere reforzar feedback y seguridad visual. |
| EV-003 | Dashboard Operador | Aprobado | Representa módulos principales. |
| EV-004 | Dashboard Supervisor | Aprobado | Representa revisión, alertas y reportes. |
| EV-005 | Dashboard Administrador | Aprobado con observaciones | Revisar que no aparezca por defecto sin usuario. |
| EV-006 | Flujo expediente | Aprobado | Cumple el flujo base de EV2. |
| EV-007 | Validación menor | Aprobado | Existe representación funcional. |
| EV-008 | Validación vehículo | Aprobado | Existe representación funcional. |
| EV-009 | Sistemas externos | Observado | Requiere restricción por sesión y resultados repetibles. |
| EV-010 | Alertas RF09 | Aprobado con observaciones | Requiere mejorar modales y estados. |
| EV-011 | Reportes CU-06 | Observado | Botones requieren feedback. |
| EV-012 | Versionamiento | Aprobado inicial | Debe evolucionar en v1.1.0 y posteriores. |
| EV-013 | README / documentación | Observado | Requiere reemplazar contenido genérico. |
| EV-014 | Seguridad básica | Observado | Requiere control visual de acceso por rol. |
| EV-015 | Mantenibilidad | Aprobado con observaciones | Hay componentes, pero metadata y docs requieren ajuste. |

---

## 8. Recomendaciones para la versión v1.1.0

Para la siguiente versión se recomienda aplicar las siguientes correcciones:

1. Bloquear acceso a sistemas externos sin sesión.
2. Corregir Sidebar para que no muestre menú de Administrador cuando no exista usuario activo.
3. Reforzar separación visual de opciones por rol.
4. Agregar feedback a botones sin acción.
5. Reemplazar validaciones aleatorias por resultados controlados.
6. Mejorar accesibilidad de modales y botones de ícono.
7. Mejorar responsive en Sidebar, dashboards y tablas.
8. Actualizar README con información real del proyecto.
9. Actualizar `package.json` con nombre y versión del proyecto.
10. Crear o actualizar `CHANGELOG.md` y `VERSION.md`.
11. Guardar evidencias de build, navegación, Lighthouse y pruebas manuales.
12. Crear tag Git `v1.0.0` para congelar esta primera versión como línea base.

---

## 9. Evidencias sugeridas para adjuntar en docs

Para respaldar esta versión se recomienda guardar capturas en:

```text
docs/evidencias/v1.0.0/
```

Evidencias mínimas:

- `home_v1.0.0.png`
- `login_v1.0.0.png`
- `dashboard_operador_v1.0.0.png`
- `dashboard_supervisor_v1.0.0.png`
- `dashboard_administrador_v1.0.0.png`
- `flujo_expediente_v1.0.0.png`
- `alertas_rf09_v1.0.0.png`
- `sistemas_externos_v1.0.0.png`
- `reportes_v1.0.0.png`
- `build_ok_v1.0.0.png`
- `npm_audit_v1.0.0.png`

---

## 10. Conclusión

La versión **v1.0.0** cumple como primera línea base del prototipo EV3. Representa de manera suficiente el sistema aduanero, los roles internos, los actores externos y los principales flujos derivados de la EV2.

Sin embargo, la revisión basada en ISO/IEC 25010 detecta observaciones relevantes en seguridad visual, control de navegación, accesibilidad, retroalimentación de acciones, repetibilidad de pruebas, documentación y versionamiento.

Por lo tanto, se recomienda mantener esta versión como **línea base inicial**, etiquetarla en Git como `v1.0.0` y generar una versión posterior `v1.1.0` orientada a corregir los hallazgos registrados.

La trazabilidad recomendada para defensa es:

```text
v1.0.0 = prototipo inicial evaluado
v1.1.0 = primera versión corregida según hallazgos ISO 25010
v2.0.0 = versión avanzada revisada
v2.0.1 = versión correctiva final
```
