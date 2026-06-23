# Checklist ISO/IEC 25010 — Prototipo Aduana v2.0.0

| Característica ISO/IEC 25010 | Estado | Evidencia / Observación |
|---|---|---|
| Adecuación funcional | Aprobado con observaciones | Existen módulos principales, pero hay botones sin feedback funcional. |
| Eficiencia de desempeño | Observado | Build correcto, pero JS supera 500 kB minificado. |
| Compatibilidad | Pendiente / observado | Faltan pruebas reales en Chrome, Firefox, Edge, tablet y móvil. |
| Usabilidad | Aprobado con observaciones | Flujo general claro, pero faltan mensajes de feedback en acciones importantes. |
| Fiabilidad | Observado | Validaciones externas usan `Math.random`, dificultando pruebas repetibles. |
| Seguridad | Observado | Sistemas Externos puede abrirse sin sesión y Sidebar puede mostrar menú administrador sin usuario. |
| Mantenibilidad | Observado | README y package.json genéricos; falta versionamiento visible coherente. |
| Portabilidad | Aprobado con observaciones | Proyecto ejecutable, pero documentación insuficiente para instalación y pruebas. |

## Resultado

**Aprobado con observaciones importantes.**

La versión v2.0.0 sirve como evidencia de una segunda revisión, pero debe generar una versión correctiva v2.0.1 antes de la entrega final.
