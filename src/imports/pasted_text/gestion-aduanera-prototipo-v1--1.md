Crea una versión corregida del prototipo Figma / código llamada “Prototipo v1.1” para el Sistema de Gestión de Control
Aduanero Fronterizo Los Libertadores.

Mantén la base funcional de v1.0:
- Home institucional del Paso Los Libertadores.
- Login con roles Operador Aduanero, Supervisor Aduanero y Administrador del Sistema.
- Dashboards por rol.
- Flujo operador CU-02 a CU-05.
- Gestión de alertas RF09.
- Reportes CU-06.
- Sistemas externos SAG, PDI y Aduana Limítrofe.
- Historial de versiones.

Aplica obligatoriamente estas correcciones detectadas en la evaluación ISO/IEC 25010:

1. Seguridad y control de acceso
- Ninguna pantalla interna debe mostrarse si no hay sesión iniciada.
- Si el usuario no autenticado presiona “Ver sistemas externos” desde Home, mostrar una vista pública limitada sin
sidebar interno ni opciones de administrador.
- Si intenta entrar a dashboard, reportes, alertas, administración o sistemas internos sin sesión, redirigir a Login con
mensaje: “Debe iniciar sesión para acceder a módulos internos”.
- El Sidebar no debe usar menú de administrador cuando currentUser sea null.
- Mantener separación visual por rol:
- Operador: expedientes, documentos, vehículos, validaciones, alertas.
- Supervisor: alertas, revisión manual, expedientes, reportes.
- Administrador: usuarios, roles, integraciones, auditoría, reportes.

2. Accesibilidad
- Todos los formularios deben tener labels asociados mediante htmlFor/id.
- Campos de error deben mostrarse con texto claro y aria-live.
- Los botones solo con ícono deben tener aria-label.
- La campana de alertas, botón cerrar modal, botón mostrar/ocultar clave y botones de navegación deben ser accesibles
por teclado.
- Las credenciales demo deben ser botones, no divs clickeables.
- Los modales de alerta y detalle deben tener role="dialog", aria-modal="true", título asociado, foco inicial y cierre
con Escape.
- No depender solo del color para comunicar estado; acompañar con texto: Aprobado, Pendiente, Observado, Error, En
revisión.

3. Diseño responsive
- Crear versión desktop, tablet y móvil.
- En móvil, el Sidebar debe colapsar en un menú hamburguesa.
- Los dashboards deben reorganizar tarjetas a 1 columna en móvil, 2 en tablet y 4 en desktop.
- Las tablas deben permitir scroll horizontal o convertirse en tarjetas en móvil.
- El login no debe quedar en 2 columnas fijas en pantallas pequeñas.
- Los filtros de reportes no deben quedar en 5 columnas fijas; usar auto-fit/minmax.

4. Fiabilidad de las validaciones externas
- Eliminar simulaciones aleatorias con Math.random.
- En CU-05, cada sistema externo debe permitir elegir resultado controlado:
- Aprobado / Sin observaciones.
- Observado.
- Error de comunicación.
- SAG, PDI y Aduana Limítrofe deben mostrar fecha/hora, estado, código de respuesta y detalle.
- Si se selecciona “Observado” o “Error”, debe generarse alerta RF09 reproducible.

5. Reportes CU-06
- Los botones Exportar PDF, Exportar Excel y Descargar reporte deben tener acción visible.
- Puede ser una descarga simulada, modal o toast.
- Mostrar nombre de archivo demo:
- reporte_operativo_los_libertadores_v1_1.pdf
- reporte_operativo_los_libertadores_v1_1.xlsx
- Mostrar estado: “Generando reporte”, “Reporte generado” o “Error al generar”.

6. Navegación y enlaces
- Breadcrumbs intermedios deben navegar realmente o no tener cursor de enlace.
- Footer debe tener enlaces simulados funcionales o abrir modal informativo.
- Todos los botones críticos deben tener feedback visible.

7. Mantenibilidad del código generado
- Crear componentes reutilizables:
- Button
- Card
- FormField
- DataTable
- Modal
- StatusTag
- Sidebar
- Header
- Toast/Notification
- Evitar duplicación excesiva de estilos inline.
- Mantener paleta institucional centralizada según Framework Gobierno de Chile:
- Primary #006FB3
- Secondary #FE6565
- Tertiary #0A132D
- Accent #A8B7C7
- Neutral #EEEEEE
- Gray A #4A4A4A
- Gray B #8A8A8A
- Black #111111
- White #FFFFFF

8. Dependencias y seguridad técnica del código
- Si se genera código React/Vite, usar versiones sin vulnerabilidades altas conocidas:
- vite >= 6.4.3
- react-router >= 7.18.0 si se utiliza
- Si react-router no se usa realmente, eliminarlo de dependencias.
- Agregar scripts:
- dev
- build
- preview
- audit
- lint
- Incluir lock file package-lock.json o pnpm-lock.yaml.

9. Documentación y versionamiento
- Agregar pantalla “Historial de versiones” actualizada:
- v1.0 Prototipo inicial EV3.
- v1.1 Correcciones ISO 25010.
- Agregar sección “Correcciones aplicadas v1.1” con:
- Seguridad de acceso.
- Accesibilidad.
- Responsive.
- Validaciones externas determinísticas.
- Exportaciones simuladas.
- Mejoras de navegación.
- Mejoras de mantenibilidad.
- Incluir una etiqueta visible en header/footer: “Prototipo v1.1”.
- Incluir en el README instrucciones de instalación, ejecución, credenciales demo, pruebas ISO 25010 y versionamiento.

10. Mantener el contexto del caso de estudio
- No convertirlo en una app genérica.
- Todo debe seguir contextualizado en Aduana Chile, Paso Fronterizo Los Libertadores, control Chile/Argentina,
expedientes de viajeros, menores de edad, vehículos, alertas, reportes y sistemas externos SAG/PDI/Aduana Limítrofe.

Resultado esperado:
- Prototipo v1.1 navegable.
- Correcciones visuales y funcionales aplicadas.
- Diseño compatible con desktop, tablet y móvil.
- Mejor soporte para evaluación ISO/IEC 25010.
- Código más mantenible, accesible y defendible para EV3.
