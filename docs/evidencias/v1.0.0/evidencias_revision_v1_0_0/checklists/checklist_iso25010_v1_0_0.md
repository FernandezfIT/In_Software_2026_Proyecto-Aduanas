# Checklist ISO/IEC 25010 - Revisión v1.0.0

| Característica ISO 25010 | Criterio revisado | Resultado | Evidencia |
|---|---|---|---|
| Adecuación funcional | Home, login, roles, dashboards, expedientes, alertas, reportes y sistemas externos presentes | Aprobado con observaciones | Revisión estática de componentes |
| Adecuación funcional | Flujo operador basado en EV2 | Aprobado con observaciones | `NuevoExpediente.tsx` |
| Seguridad | Campo de contraseña y credenciales demo | Aprobado con observaciones | `LoginPage.tsx` |
| Seguridad | Acceso a Sistemas Externos protegido por sesión | Observado | `HomePage.tsx` navega directo a sistemas externos |
| Seguridad | Sidebar no debe asumir rol administrador sin usuario | Observado | `Sidebar.tsx` cae en `ADMIN_ITEMS` por defecto |
| Usabilidad | Feedback visual en acciones principales | Observado | Botones de exportación/filtros/búsqueda sin respuesta visible suficiente |
| Fiabilidad | Flujo repetible de validaciones externas | Observado | Uso de `Math.random` en validaciones |
| Mantenibilidad | Build productivo | Aprobado con advertencia | `logs/01_npm_run_build_v1_0_0.txt` |
| Mantenibilidad | Metadata del proyecto | Observado | `package.json` genérico de Figma |
| Portabilidad | README de instalación | Observado | README genérico de Figma |
| Compatibilidad | Prueba navegador Chrome/Firefox/Edge | Pendiente | Requiere capturas manuales |
| Eficiencia de desempeño | Lighthouse | Pendiente | Requiere ejecución en navegador |
| Seguridad | Vulnerabilidades de dependencias | Observado | `logs/02_npm_audit_v1_0_0.txt` |
