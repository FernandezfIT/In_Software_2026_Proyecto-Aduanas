# Prompt Figma - Prototipo v2.0.0

## Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores

Corrige y mejora el prototipo actual del “Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores”, generado previamente como versión v1.0.0.

El objetivo es generar una nueva versión del prototipo llamada:

**Prototipo v2.0.0**

Esta versión debe incorporar mejoras funcionales, visuales, de navegación, accesibilidad, control por roles, trazabilidad con EV2 y preparación para evaluación basada en ISO/IEC 25010.

No rehagas el prototipo desde cero. Mantén la estructura general, identidad visual institucional, contexto de Aduana Chile, Paso Fronterizo Los Libertadores, roles definidos y flujo operativo trabajado en EV2.

---

## 1. Contexto general del sistema

El sistema corresponde a una plataforma web institucional para apoyar el control aduanero fronterizo Chile/Argentina en el Paso Fronterizo Los Libertadores.

Debe representar una solución interna para Aduana Chile, orientada a:

* Registro y consulta de expedientes de viajeros.
* Validación documental.
* Validación de menores de edad.
* Registro y validación de vehículos.
* Validaciones externas con SAG, PDI y Aduana Limítrofe Argentina.
* Gestión de alertas y observaciones.
* Reportes operativos y estadísticos.
* Administración de usuarios, roles, integraciones y auditoría.
* Control de versionamiento del prototipo.

---

## 2. Estándar visual obligatorio

Mantener diseño institucional basado en plataformas del Estado de Chile.

Usar como referencia visual:

https://framework.digital.gob.cl/colors.html

Aplicar una estética sobria, clara, ordenada y compatible con servicios públicos.

Usar preferentemente la siguiente paleta:

* Azul primario: `#006FB3`
* Rojo secundario: `#FE6565`
* Azul oscuro institucional: `#0A132D`
* Gris texto: `#4A4A4A`
* Gris secundario: `#8A8A8A`
* Gris claro: `#EEEEEE`
* Blanco: `#FFFFFF`
* Negro: `#111111`

Usar componentes coherentes:

* Header institucional.
* Sidebar por rol.
* Footer institucional.
* Tarjetas resumen.
* Botones primarios y secundarios.
* Badges o tags de estado.
* Tablas.
* Formularios.
* Modales.
* Mensajes de alerta.
* Breadcrumbs.
* Pantallas de detalle.

---

## 3. Versión visible del prototipo

Actualizar todas las referencias visibles de versión.

Donde diga:

**Prototipo v1.0**

Debe decir:

**Prototipo v2.0.0**

Aplicar en:

* Header.
* Footer.
* Login.
* Home.
* Dashboards.
* Historial de versiones.
* Información del prototipo.
* Cualquier badge, etiqueta o texto visible.

---

## 4. Pantalla principal / Home

Mejorar la pantalla principal del sistema.

Debe contener:

* Header institucional.
* Nombre del sistema:
  **Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores**
* Subtítulo:
  **Plataforma de apoyo al control de viajeros, vehículos, documentación e integraciones externas en frontera**
* Imagen o ilustración relacionada con:

  * Cordillera de Los Andes.
  * Paso Los Libertadores.
  * Control fronterizo.
  * Aduana Chile.
  * Cruce Chile/Argentina.
* Tarjetas informativas:

  * Control de viajeros.
  * Control documental.
  * Control vehicular.
  * Validaciones externas.
  * Gestión de alertas.
  * Reportes operativos.
* Botón principal:
  **Iniciar sesión**
* Botón secundario:
  **Ver información del prototipo**
* El botón “Ver sistemas externos” no debe permitir acceso directo si el usuario no ha iniciado sesión. Si existe, debe enviar al login con mensaje informativo.

Agregar mensaje institucional:

“Este prototipo representa una plataforma académica para la gestión de control aduanero fronterizo en el Paso Los Libertadores.”

---

## 5. Pantalla de Login

Mejorar el login para representar correctamente CU-01: Iniciar sesión y cargar perfil.

Debe incluir:

* Campo correo.
* Campo contraseña.
* Botón “Ingresar”.
* Contraseña oculta visualmente.
* Mensaje de error para credenciales inválidas.
* Mensaje de éxito:
  **Perfil cargado correctamente**
* Credenciales demo visibles, pero claramente marcadas como datos de prueba.

Credenciales demo:

### Operador Aduanero

* Correo: `operador@aduanachile.cl`
* Clave: `12345`

### Supervisor Aduanero

* Correo: `supervisor@aduanachile.cl`
* Clave: `12345`

### Administrador del Sistema

* Correo: `administrador@aduanachile.cl`
* Clave: `12345`

Agregar nota:

“Credenciales de demostración utilizadas solo para fines académicos.”

El login debe redirigir al dashboard correcto según el rol.

---

## 6. Control por roles

Corregir y reforzar la navegación por rol.

Cada usuario debe acceder solo a las opciones correspondientes.

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

* Usuarios.
* Roles y permisos.
* Auditoría.
* Configuración global.

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

---

## 7. Sidebar y navegación

Corregir comportamiento de Sidebar.

Reglas:

* Si no hay usuario activo, no mostrar menú de administrador.
* Nunca asumir Administrador como rol por defecto.
* Si `currentUser` es `null`, redirigir al Login o mostrar navegación pública mínima.
* La Sidebar debe cambiar visualmente según el rol autenticado.
* Todas las pantallas internas deben tener opción “Cerrar sesión”.
* Cerrar sesión debe limpiar el usuario activo y volver al Login.

---

## 8. Dashboard Operador Aduanero

Mejorar el Dashboard Operador.

Debe mostrar:

* Nombre del usuario o rol:
  **Operador Aduanero**
* Tarjetas resumen:

  * Expedientes en atención.
  * Documentos pendientes.
  * Vehículos por validar.
  * Alertas abiertas.
  * Validaciones externas pendientes.
* Tabla de expedientes recientes:

  * N° expediente.
  * Viajero.
  * Documento.
  * Edad.
  * Vehículo.
  * Estado.
  * Acción.
* Botón principal:
  **Nuevo expediente**
* Acceso al flujo completo del operador.

---

## 9. Flujo Operador según EV2

El flujo debe seguir el diagrama de actividades trabajado en EV2.

Secuencia esperada:

1. Iniciar sesión y cargar perfil.
2. Registrar o consultar expediente de viajero.
3. Verificar si el viajero es menor de edad.
4. Validar documentación de menor, si corresponde.
5. Verificar si viaja con vehículo.
6. Registrar y validar vehículo, si corresponde.
7. Preparar validaciones externas.
8. Consultar SAG.
9. Consultar PDI.
10. Consultar Aduana Limítrofe Argentina.
11. Registrar resultados en expediente.
12. Gestionar alertas RF09 si existen inconsistencias.
13. Derivar a revisión manual si quedan alertas pendientes.
14. Cerrar atención si no quedan alertas pendientes.

---

## 10. Registro / consulta de expediente CU-02

La pantalla debe permitir:

* Buscar expediente existente.
* Crear nuevo expediente.
* Ingresar datos de viajero:

  * RUT o pasaporte.
  * Nombre completo.
  * Nacionalidad.
  * Edad.
  * Motivo del viaje.
  * Dirección de destino.
* Mostrar estado del expediente.

El botón “Buscar expediente existente” debe mostrar feedback visual:

“Se encontró el expediente EXP-2026-0001 asociado al viajero Camila Rojas Muñoz.”

---

## 11. Validación documental de menor CU-03

Si el viajero es menor de edad, se debe navegar a la pantalla de validación documental.

Debe contener:

* Documento de identidad.
* Certificado de nacimiento.
* Autorización notarial.
* Adulto acompañante.
* Relación con el menor.
* Estado documental.

Acciones:

* Documentación completa.
* Falta documentación.

Si falta documentación:

* Generar alerta RF09.
* Mostrar mensaje:
  **Se generó una alerta por falta de documentación de menor de edad.**
* Estado del expediente:
  **Observado**

---

## 12. Registro y validación de vehículo CU-04

Si el viajero viaja con vehículo, se debe mostrar formulario de vehículo.

Campos:

* Patente.
* Tipo de vehículo.
* País de origen.
* Marca.
* Modelo.
* Año.
* Propietario.
* Permiso de circulación.
* Seguro.
* Documentación del vehículo.

Acciones:

* Datos consistentes.
* Datos inconsistentes.

Si hay inconsistencia:

* Generar alerta RF09.
* Mostrar mensaje:
  **Se generó una alerta por inconsistencia en datos del vehículo.**
* Estado:
  **Pendiente de revisión**

---

## 13. Validaciones externas CU-05

Debe existir una pantalla de validaciones externas con tres tarjetas principales:

* SAG.
* PDI.
* Aduana Limítrofe Argentina.

Cada tarjeta debe mostrar:

* Nombre del sistema.
* Tipo de validación.
* Estado.
* Última consulta.
* Resultado.
* Botón “Consultar”.
* Botón “Ver detalle”.

Resultados esperados por defecto:

* SAG: Sin observaciones.
* PDI: Sin impedimentos.
* Aduana Limítrofe: Validación registrada.

Importante:

* No usar resultados aleatorios.
* Las pruebas deben ser repetibles.
* Cada consulta debe entregar feedback visual.

Mensajes:

* “Consulta SAG completada: Sin observaciones.”
* “Consulta PDI completada: Sin impedimentos.”
* “Consulta Aduana Limítrofe completada: Validación registrada.”

Agregar también opción para simular observación externa:

* Botón: **Simular observación externa**
* Resultado:

  * Estado cambia a “Observado”.
  * Se genera alerta RF09.
  * Mensaje:
    **Se generó una alerta RF09 por observación externa.**

---

## 14. Pantalla Sistemas Externos

Debe existir una pantalla llamada:

**Sistemas externos integrados**

Debe servir como representación de los actores externos del diagrama de casos de uso.

Mostrar tres tarjetas:

### Sistema SAG

* Descripción: Validación sanitaria y declaración de productos regulados.
* Estado: Conectado.
* Última sincronización.
* Botón: Consultar SAG.
* Botón: Ver detalle.

### Sistema PDI

* Descripción: Validación migratoria y control de impedimentos.
* Estado: Conectado.
* Última sincronización.
* Botón: Consultar PDI.
* Botón: Ver detalle.

### Aduana Limítrofe Argentina

* Descripción: Validación coordinada con aduana extranjera.
* Estado: Conectado.
* Última sincronización.
* Botón: Consultar Aduana Limítrofe.
* Botón: Ver detalle.

Restricción:

* Esta pantalla no debe estar disponible sin iniciar sesión.
* Si el usuario no está autenticado, enviar al Login con mensaje:
  **Para acceder a los sistemas externos integrados debe iniciar sesión.**

---

## 15. Gestión de alertas RF09

Mejorar la pantalla de alertas.

Debe permitir:

* Ver listado de alertas.
* Filtrar por:

  * Prioridad.
  * Estado.
  * Origen.
  * Fecha.
* Ver detalle.
* Resolver alerta.
* Derivar alerta.
* Volver al expediente.

Estados:

* Abierta.
* En revisión.
* Resuelta.
* Derivada.

Prioridades:

* Alta.
* Media.
* Baja.

Ejemplos de alertas:

* Falta documentación de menor de edad.
* Inconsistencia en datos del vehículo.
* Observación desde SAG.
* Observación desde PDI.
* Respuesta pendiente de Aduana Limítrofe.

Mensajes:

* Al resolver:
  **Alerta resuelta correctamente.**
* Al derivar:
  **Alerta derivada a revisión manual.**

---

## 16. Dashboard Supervisor Aduanero

Debe mostrar:

* Tarjetas resumen:

  * Alertas críticas.
  * Expedientes derivados.
  * Casos resueltos hoy.
  * Validaciones externas con error.
* Tabla de casos en revisión manual.
* Acceso a:

  * Alertas.
  * Revisión manual.
  * Expedientes.
  * Reportes.
  * Sistemas externos.

Acciones:

* Aprobar expediente.
* Solicitar antecedentes.
* Mantener observado.
* Derivar a administrador.

Cada acción debe mostrar feedback visual.

---

## 17. Reportes CU-06

Mejorar pantalla de reportes.

Debe incluir:

* Título:
  **Reportes operativos y estadísticos**
* Filtros:

  * Fecha desde.
  * Fecha hasta.
  * Tipo de control.
  * Estado del expediente.
  * Sistema externo consultado.
* Fecha de generación.
* Estado del reporte:

  * Generado.
  * Pendiente.
  * Exportado.
* Tarjetas:

  * Expedientes procesados.
  * Vehículos validados.
  * Menores revisados.
  * Alertas generadas.
  * Alertas resueltas.
  * Consultas SAG.
  * Consultas PDI.
  * Consultas Aduana Limítrofe.
* Tabla de resultados.

Botones:

* Aplicar filtros.
* Exportar PDF.
* Exportar Excel.
* Descargar reporte.

Todos los botones deben entregar feedback visual.

Mensajes:

* “Filtros aplicados correctamente al reporte operativo.”
* “Reporte PDF generado correctamente. Esta acción es simulada en el prototipo.”
* “Archivo Excel generado correctamente. Esta acción es simulada en el prototipo.”
* “Reporte descargado correctamente. Esta acción es simulada en el prototipo.”

---

## 18. Dashboard Administrador del Sistema

Debe mostrar:

* Usuarios activos.
* Roles configurados.
* Integraciones disponibles.
* Eventos de auditoría.

Pantallas disponibles:

* Usuarios.
* Roles y permisos.
* Integraciones externas.
* Auditoría.
* Reportes.
* Configuración.

Tabla de usuarios:

* Nombre.
* Correo.
* Rol.
* Estado.
* Último acceso.
* Acción.

Roles y permisos:

* Operador Aduanero.
* Supervisor Aduanero.
* Administrador del Sistema.

Auditoría:

* Inicio de sesión.
* Creación de expediente.
* Validación documental.
* Consulta externa.
* Generación de alerta.
* Cierre de expediente.
* Exportación de reporte.

---

## 19. Accesibilidad

Aplicar mejoras básicas de accesibilidad.

Requisitos:

* Botones de ícono con `aria-label`.
* Modales con `role="dialog"`.
* Modales con `aria-modal="true"`.
* Botón de cerrar modal con `aria-label="Cerrar modal"`.
* Formularios con labels visibles.
* Los mensajes no deben depender solo del color.
* Contraste adecuado entre texto y fondo.
* Navegación clara con teclado.
* Títulos visibles en cada pantalla.

---

## 20. Responsive

Mejorar comportamiento responsive.

Requisitos:

* En desktop: sidebar completa.
* En tablet: sidebar compacta o colapsable.
* En móvil: menú hamburguesa o navegación superior.
* Tablas con scroll horizontal si tienen muchas columnas.
* Tarjetas en una sola columna en móvil.
* No cortar textos importantes.
* Formularios legibles en resoluciones pequeñas.

Aplicar especialmente a:

* Dashboard Operador.
* Dashboard Supervisor.
* Dashboard Administrador.
* Expedientes.
* Alertas.
* Reportes.
* Sistemas Externos.
* Usuarios.

---

## 21. Información del prototipo

Agregar pantalla o sección:

**Información del prototipo**

Contenido:

* Nombre del sistema:
  Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores.
* Versión actual:
  v2.0.0.
* Tipo:
  Prototipo académico EV3.
* Base de evaluación:
  ISO/IEC 25010.
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

---

## 22. Historial de versiones

Corregir pantalla de historial de versiones.

Debe mostrar:

### Versión actual

* Versión: v2.0.0
* Estado: Segunda versión del prototipo.
* Descripción: Versión generada tras la primera revisión de calidad, incorporando mejoras de navegación, roles, feedback visual y preparación para evaluación ISO/IEC 25010.

### Versiones anteriores

* v1.0.0: Prototipo inicial generado desde Figma.

### Próxima versión planificada

* v2.0.1: Corrección de observaciones detectadas en la revisión de v2.0.0.

---

## 23. Documentación interna visible

Agregar sección visual o pantalla para indicar:

* El prototipo es académico.
* Las credenciales son de prueba.
* Las validaciones externas son simuladas.
* Las exportaciones son simuladas.
* El versionamiento se controla mediante Git y GitHub.
* La evaluación se basa en ISO/IEC 25010.

---

## 24. Resultado esperado

El resultado debe ser un prototipo navegable llamado:

**Prototipo v2.0.0**

Debe cumplir:

* Navegación por roles.
* Flujo del operador según EV2.
* Sistemas externos protegidos por sesión.
* Feedback visible en botones.
* Validaciones externas repetibles.
* Alertas RF09 funcionales visualmente.
* Reportes CU-06 con acciones simuladas.
* Historial de versiones actualizado.
* Mejoras de accesibilidad.
* Mejoras responsive.
* Apariencia institucional.
* Preparado para revisión mediante plan de pruebas ISO/IEC 25010.

No crear una app genérica. Todo debe mantenerse contextualizado en Aduana Chile, Paso Fronterizo Los Libertadores, control fronterizo, viajeros, vehículos, documentos, alertas, reportes, sistemas externos y versionamiento académico.
