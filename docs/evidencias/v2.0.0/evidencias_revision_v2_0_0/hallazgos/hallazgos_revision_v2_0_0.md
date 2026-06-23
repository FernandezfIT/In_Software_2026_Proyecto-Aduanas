# Hallazgos de revisión — v2.0.0

## H-001 — Versionamiento visible incorrecto

**Severidad:** Alta  
**ISO/IEC 25010:** Mantenibilidad / Portabilidad  
**Descripción:** El prototipo sigue mostrando `Prototipo v1.0` en Header, Footer, Login e Historial.  
**Corrección esperada:** actualizar textos visibles a v2.0.0 o v2.0.1 según corresponda.

## H-002 — Correcciones anteriores no aplicadas al código funcional

**Severidad:** Alta  
**ISO/IEC 25010:** Mantenibilidad  
**Descripción:** No se identificaron cambios funcionales relevantes en componentes principales. Se agregaron archivos de texto/prompt, pero no se aplicaron correcciones reales al prototipo.  
**Corrección esperada:** aplicar cambios en componentes React.

## H-003 — Acceso a Sistemas Externos sin sesión

**Severidad:** Alta  
**ISO/IEC 25010:** Seguridad  
**Descripción:** Desde Home se puede abrir `sistemas-externos` sin autenticación.  
**Corrección esperada:** redirigir a Login o mostrar vista pública sin sidebar interna.

## H-004 — Sidebar carga menú Administrador si no hay usuario activo

**Severidad:** Alta  
**ISO/IEC 25010:** Seguridad / Usabilidad  
**Descripción:** La lógica de Sidebar usa `ADMIN_ITEMS` como fallback.  
**Corrección esperada:** no renderizar menú administrador si `currentUser` es null.

## H-005 — Falta control visual de acceso por rol

**Severidad:** Alta  
**ISO/IEC 25010:** Seguridad  
**Descripción:** Las pantallas dependen del estado de navegación, no de permisos claros por rol.  
**Corrección esperada:** implementar validación visual por rol o pantalla de acceso no autorizado.

## H-006 — Vulnerabilidades altas en dependencias

**Severidad:** Alta  
**ISO/IEC 25010:** Seguridad / Mantenibilidad  
**Descripción:** `npm audit` detectó 2 vulnerabilidades altas asociadas a `react-router` y `vite`.  
**Corrección esperada:** actualizar dependencias, probar build y repetir auditoría.

## H-007 — Botones sin feedback funcional

**Severidad:** Media  
**ISO/IEC 25010:** Adecuación funcional / Usabilidad  
**Descripción:** Exportar PDF, Exportar Excel, Descargar reporte, Aplicar filtros y Buscar expediente no entregan respuesta visible.  
**Corrección esperada:** agregar toast, modal o mensaje de acción simulada.

## H-008 — Validaciones externas no reproducibles

**Severidad:** Media  
**ISO/IEC 25010:** Fiabilidad  
**Descripción:** Las validaciones externas usan `Math.random`.  
**Corrección esperada:** reemplazar por resultados controlados y repetibles.

## H-009 — Accesibilidad incompleta

**Severidad:** Media  
**ISO/IEC 25010:** Usabilidad / Accesibilidad  
**Descripción:** Faltan asociaciones label-input, atributos ARIA y modales plenamente accesibles.  
**Corrección esperada:** agregar `htmlFor`, `id`, `aria-label`, `role="dialog"` y mensajes con `role="alert"`.

## H-010 — Responsive incompleto

**Severidad:** Media  
**ISO/IEC 25010:** Compatibilidad / Portabilidad  
**Descripción:** Se detectan grillas rígidas y sidebar fija.  
**Corrección esperada:** usar diseño responsive, sidebar colapsable y tablas con `overflow-x:auto`.

## H-011 — README y metadatos genéricos

**Severidad:** Media  
**ISO/IEC 25010:** Mantenibilidad / Portabilidad  
**Descripción:** README y package.json siguen con datos genéricos de Figma.  
**Corrección esperada:** documentar proyecto, instalación, pruebas, credenciales, versionamiento y evidencias.

## H-012 — Falta .gitignore

**Severidad:** Media  
**ISO/IEC 25010:** Mantenibilidad  
**Descripción:** El ZIP recibido no incluye `.gitignore`.  
**Corrección esperada:** crear `.gitignore` antes de subir a GitHub.
