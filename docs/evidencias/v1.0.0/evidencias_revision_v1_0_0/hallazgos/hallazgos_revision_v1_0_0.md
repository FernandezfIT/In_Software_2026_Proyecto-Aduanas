# Hallazgos de revisión - Prototipo v1.0.0

## Resumen ejecutivo

La versión **v1.0.0** funciona como línea base del prototipo EV3. El proyecto compila correctamente, pero presenta observaciones relevantes para una siguiente versión correctiva.

## Hallazgos

| ID | Severidad | Categoría ISO 25010 | Descripción | Evidencia | Acción sugerida |
|---|---|---|---|---|---|
| H-001 | Alta | Seguridad | Desde Home se puede acceder a Sistemas Externos sin iniciar sesión. | `HomePage.tsx` contiene navegación directa a `sistemas-externos`. | Redirigir a Login cuando no exista usuario activo. |
| H-002 | Alta | Seguridad / Mantenibilidad | Sidebar muestra opciones de Administrador cuando `currentUser` es nulo. | `Sidebar.tsx` usa `ADMIN_ITEMS` como fallback. | No renderizar Sidebar o mostrar menú neutral si no hay usuario. |
| H-003 | Media | Fiabilidad | Validaciones externas usan resultados aleatorios. | `NuevoExpediente.tsx` usa `Math.random`. | Usar resultados controlados y repetibles para evidencias. |
| H-004 | Media | Usabilidad | Botones de reportes y exportación no entregan feedback claro. | `Reportes.tsx` incluye botones sin comportamiento verificable. | Agregar toast, modal o mensaje de confirmación. |
| H-005 | Media | Usabilidad | Botón “Buscar expediente existente” no entrega feedback verificable. | `NuevoExpediente.tsx`. | Mostrar resultado simulado de búsqueda. |
| H-006 | Media | Mantenibilidad | `package.json` mantiene nombre y versión genérica de Figma. | `package.json`: `@figma/my-make-file`, `0.0.1`. | Cambiar nombre a `aduana-los-libertadores-prototipo-ev3` y versión a `1.0.0`. |
| H-007 | Media | Portabilidad | README genérico de Figma. | `README.md`. | Documentar instalación, ejecución, pruebas y credenciales demo. |
| H-008 | Alta | Seguridad | `npm audit` reporta vulnerabilidades altas en dependencias. | `logs/02_npm_audit_v1_0_0.txt`. | Evaluar actualización controlada de Vite y React Router. |
| H-009 | Baja | Eficiencia | Build advierte chunk JS mayor a 500 kB. | `logs/01_npm_run_build_v1_0_0.txt`. | Optimizar dependencias o aplicar code splitting si el tiempo lo permite. |

## Estado sugerido de la versión

**Aprobado con observaciones.**

La versión v1.0.0 puede registrarse como línea base del prototipo, pero los hallazgos deben alimentar la versión correctiva siguiente.
