Corrige el prototipo actual del “Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores” sin rehacerlo desde cero.

El objetivo es generar una versión correctiva llamada:

**Prototipo v2.0.1**

Esta versión debe corregir los problemas detectados en la revisión de calidad basada en ISO/IEC 25010. Mantén la identidad visual institucional, el contexto de Aduana Chile, el Paso Fronterizo Los Libertadores y los roles definidos: Operador Aduanero, Supervisor Aduanero y Administrador del Sistema.

No agregues solamente archivos de texto ni prompts dentro del proyecto. Debes aplicar los cambios directamente en las pantallas, componentes, textos, navegación y comportamiento del prototipo.

## 1. Corregir versión visible del prototipo

Actualmente varias pantallas siguen mostrando “Prototipo v1.0”. Debes reemplazar todas esas referencias por:

**Prototipo v2.0.1**

Aplicar el cambio en:

* Header.
* Footer.
* Login.
* Home.
* Historial de versiones.
* Cualquier etiqueta, badge o texto de versión.

## 2. Corregir pantalla “Historial de versiones”

La pantalla de historial no debe mostrar v2.0 como versión futura.

Debe quedar así:

### Versión actual

* Versión: v2.0.1
* Estado: Corrección aplicada según revisión ISO 25010
* Descripción: Versión correctiva del prototipo que incorpora mejoras funcionales, de navegación, accesibilidad, seguridad básica, versionamiento y retroalimentación visual.

### Versiones anteriores

* v1.0.0: Prototipo inicial generado desde Figma.
* v1.1.0: Primera ronda de correcciones según plan de pruebas.
* v2.0.0: Versión revisada con observaciones pendientes.
* v2.0.1: Versión correctiva actual.

### Próxima versión

* v2.1.0: Ajustes finales según nueva ronda de pruebas y evidencias.

## 3. Bloquear acceso a Sistemas Externos sin sesión

Actualmente desde Home se puede entrar a “Sistemas externos” sin iniciar sesión.

Corrige esto:

* Si el usuario no ha iniciado sesión y presiona “Ver sistemas externos”, debe redirigir al Login.
* Mostrar mensaje informativo:
  “Para acceder a los sistemas externos integrados debe iniciar sesión.”
* No permitir visualizar detalles de SAG, PDI o Aduana Limítrofe sin usuario autenticado.
* Después de iniciar sesión, el usuario sí puede acceder a Sistemas Externos desde su dashboard.

## 4. Corregir Sidebar cuando no existe usuario activo

Actualmente, si no existe usuario activo, la Sidebar muestra por defecto opciones de Administrador.

Corrige esto:

* Si `currentUser` es `null`, no mostrar menú de Administrador.
* Mostrar una Sidebar neutral o redirigir al Login.
* La Sidebar debe renderizarse según el rol activo:

  * Operador Aduanero.
  * Supervisor Aduanero.
  * Administrador del Sistema.
* Nunca debe asumir Administrador como rol por defecto.

## 5. Mejorar control visual de acceso por rol

Cada rol debe ver solo las opciones correspondientes.

### Operador Aduanero

Debe ver:

* Inicio.
* Expedientes.
* Documentación de menor.
* Vehículos.
* Validaciones externas.
* Alertas.
* Sistemas externos.
* Cerrar sesión.

No debe ver:

* Gestión de usuarios.
* Roles y permisos.
* Auditoría del sistema.

### Supervisor Aduanero

Debe ver:

* Inicio.
* Alertas y observaciones.
* Revisión manual.
* Expedientes.
* Reportes.
* Sistemas externos.
* Cerrar sesión.

No debe ver:

* Gestión de usuarios.
* Roles y permisos.
* Configuración global.

### Administrador del Sistema

Debe ver:

* Inicio.
* Usuarios.
* Roles y permisos.
* Integraciones externas.
* Auditoría.
* Reportes.
* Configuración.
* Cerrar sesión.

## 6. Agregar feedback a botones sin acción

Actualmente varios botones existen visualmente, pero no entregan respuesta al usuario.

Agrega feedback mediante modal, toast, mensaje o cambio visual en los siguientes botones:

* Exportar PDF.
* Exportar Excel.
* Descargar reporte.
* Aplicar filtros.
* Buscar expediente existente.
* Simular consulta SAG.
* Simular consulta PDI.
* Simular consulta Aduana Limítrofe.

Ejemplos de mensajes:

Para Exportar PDF:
“Reporte PDF generado correctamente. Esta acción es simulada en el prototipo.”

Para Exportar Excel:
“Archivo Excel generado correctamente. Esta acción es simulada en el prototipo.”

Para Aplicar filtros:
“Filtros aplicados correctamente al reporte operativo.”

Para Buscar expediente existente:
“Se encontró el expediente EXP-2026-0001 asociado al viajero Camila Rojas Muñoz.”

Para consulta SAG:
“Consulta SAG completada: Sin observaciones.”

Para consulta PDI:
“Consulta PDI completada: Sin impedimentos.”

Para consulta Aduana Limítrofe:
“Consulta Aduana Limítrofe completada: Validación registrada.”

## 7. Eliminar comportamiento aleatorio en validaciones externas

Actualmente las validaciones externas usan resultados aleatorios, lo que dificulta las pruebas.

Corrige esto:

* No usar resultados aleatorios para SAG, PDI y Aduana Limítrofe.
* Las validaciones deben tener resultados controlados y repetibles.

Resultado por defecto:

* SAG: Sin observaciones.
* PDI: Sin impedimentos.
* Aduana Limítrofe: Validación registrada.

Agregar también un botón o estado alternativo para simular error externo:

“Simular observación externa”

Cuando se active:

* Cambiar estado a “Observado”.
* Generar alerta RF09 con origen del sistema externo.
* Mostrar mensaje:
  “Se generó una alerta RF09 por observación externa.”

## 8. Mejorar accesibilidad de modales

Todos los modales deben tener:

* `role="dialog"`.
* `aria-modal="true"`.
* Título visible.
* Botón de cerrar con `aria-label="Cerrar modal"`.
* Posibilidad de cerrar con botón “Cancelar” o “Cerrar”.
* Mensajes que no dependan solo del color.

Aplicar esto especialmente a:

* Modal de alerta RF09.
* Modal de exportación.
* Modal de validación externa.
* Modal de credenciales inválidas, si existe.

## 9. Agregar aria-label a botones de ícono

Todo botón que use solo ícono debe tener texto accesible.

Ejemplos:

* Botón cerrar sesión: `aria-label="Cerrar sesión"`
* Botón ver detalle: `aria-label="Ver detalle del expediente"`
* Botón cerrar modal: `aria-label="Cerrar modal"`
* Botón menú: `aria-label="Abrir menú de navegación"`
* Botón volver: `aria-label="Volver al dashboard"`

## 10. Mejorar responsive de Sidebar y tablas

Corregir problemas visuales en pantallas pequeñas.

Debe cumplirse:

* En vista desktop, Sidebar fija normal.
* En vista tablet, Sidebar colapsable o más compacta.
* En vista móvil, Sidebar debe transformarse en menú superior o menú hamburguesa.
* Las tablas no deben romper el layout.
* Las tablas deben permitir scroll horizontal si tienen muchas columnas.
* Las tarjetas deben reorganizarse en una sola columna en móvil.
* Ningún texto importante debe quedar cortado.

Aplicar especialmente a:

* Dashboard Operador.
* Dashboard Supervisor.
* Dashboard Administrador.
* Tabla de expedientes.
* Tabla de alertas.
* Tabla de reportes.
* Tabla de usuarios.
* Pantalla Sistemas Externos.

## 11. Mejorar documentación visible del prototipo

Agregar o corregir una pantalla/sección llamada:

**Información del prototipo**

Debe incluir:

* Nombre del sistema.
* Versión actual: v2.0.1.
* Tipo: Prototipo académico EV3.
* Base de evaluación: ISO/IEC 25010.
* Alcance:

  * Login por roles.
  * Expedientes.
  * Validación de menor.
  * Registro vehicular.
  * Validaciones externas.
  * Alertas RF09.
  * Reportes CU-06.
  * Sistemas externos.
  * Versionamiento.
* Nota:
  “Las integraciones externas y exportaciones son simuladas para fines académicos.”

## 12. Mejorar pantalla de Login

El Login debe:

* Mantener las credenciales demo visibles, pero claramente marcadas como datos de prueba.
* Ocultar la clave en el campo password.
* Mostrar error si las credenciales son inválidas.
* Al iniciar sesión correctamente, mostrar brevemente:
  “Perfil cargado correctamente.”
* Redirigir al dashboard correspondiente según rol.

Credenciales válidas:

Operador Aduanero:

* [operador@aduanachile.cl](mailto:operador@aduanachile.cl)
* 12345

Supervisor Aduanero:

* [supervisor@aduanachile.cl](mailto:supervisor@aduanachile.cl)
* 12345

Administrador del Sistema:

* [administrador@aduanachile.cl](mailto:administrador@aduanachile.cl)
* 12345

## 13. Mejorar reportes CU-06

En la pantalla de reportes:

* El botón “Aplicar filtros” debe actualizar visualmente la tabla o mostrar mensaje.
* Exportar PDF debe mostrar feedback.
* Exportar Excel debe mostrar feedback.
* Descargar reporte debe mostrar feedback.
* Agregar fecha de generación del reporte.
* Agregar estado del reporte:

  * Generado.
  * Pendiente.
  * Exportado.

Ejemplo de reporte:
“Reporte operativo diario - Paso Los Libertadores”

## 14. Mejorar Alertas RF09

La pantalla de alertas debe permitir:

* Ver detalle de alerta.
* Resolver alerta.
* Derivar alerta.
* Cambiar estado visual:

  * Abierta.
  * En revisión.
  * Resuelta.
  * Derivada.

Agregar ejemplos:

* Falta documentación de menor de edad.
* Inconsistencia en datos del vehículo.
* Observación desde SAG.
* Observación desde PDI.
* Respuesta pendiente de Aduana Limítrofe.

Al resolver una alerta, mostrar:
“Alerta resuelta correctamente.”

Al derivar una alerta, mostrar:
“Alerta derivada a revisión manual.”

## 15. Mantener coherencia con EV2

El flujo del Operador debe seguir el diagrama de actividades trabajado en EV2:

1. Iniciar sesión y cargar perfil.
2. Registrar o consultar expediente.
3. Determinar si el viajero es menor de edad.
4. Validar documentación de menor, si corresponde.
5. Determinar si viaja con vehículo.
6. Registrar y validar vehículo, si corresponde.
7. Preparar validaciones externas.
8. Consultar SAG.
9. Consultar PDI.
10. Consultar Aduana Limítrofe.
11. Registrar resultados en expediente.
12. Gestionar alertas RF09 si existen inconsistencias.
13. Derivar a revisión manual si quedan alertas pendientes.
14. Cerrar atención si no quedan alertas pendientes.

No eliminar este flujo. Solo corregirlo y hacerlo más consistente.

## 16. Mejorar nombres del proyecto

Si el proyecto permite modificar metadatos, corregir:

* Nombre actual genérico del proyecto.
* Reemplazar por:
  `aduana-los-libertadores-prototipo-ev3`

La versión visible debe ser:
`2.0.1`

## 17. Resultado esperado

Al finalizar, el prototipo debe quedar como versión:

**v2.0.1 - Corrección aplicada según evaluación ISO 25010**

Debe estar listo para:

* Ejecutarse localmente.
* Ser subido a GitHub.
* Ser probado nuevamente.
* Generar evidencias de la nueva versión.
* Defender el proceso de versionamiento:
  prueba → hallazgo → corrección → nueva versión.

No crear una app nueva desde cero. Corregir la versión actual manteniendo diseño, pantallas, roles y contexto del sistema aduanero.
