# Evidencias de revisión - Prototipo v1.0.0

Sistema: **Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores**  
Versión revisada: **v1.0.0**  
Base de evaluación: **Plan de evaluación ISO/IEC 25010**  
Tipo de evidencia: revisión técnica, revisión estática, build, audit y checklist de hallazgos.

## Contenido de esta carpeta

```text
logs/
├── 01_npm_run_build_v1_0_0.txt
└── 02_npm_audit_v1_0_0.txt

revision-estatica/
├── 03_revision_estatica_codigo_v1_0_0.txt
├── 04_estructura_archivos_v1_0_0.txt
└── 05_package_json_v1_0_0.txt

checklists/
└── checklist_iso25010_v1_0_0.md

hallazgos/
└── hallazgos_revision_v1_0_0.md

evidencias-pendientes/
└── capturas_recomendadas_v1_0_0.md
```

## Resultado resumido

| Área evaluada | Resultado |
|---|---|
| Instalación / dependencias | Revisada mediante entorno local preparado |
| Build productivo | Aprobado con advertencia de chunk grande |
| Seguridad de dependencias | Observado: 2 vulnerabilidades altas |
| Versionamiento visible | Observado: versión visible como Prototipo v1.0 |
| Control de acceso | Observado: Sistemas Externos accesible desde Home |
| Sidebar por rol | Observado: si no hay usuario, cae en menú Administrador |
| Validaciones externas | Observado: uso de `Math.random`, pruebas no repetibles |
| Reportes | Observado: botones sin feedback funcional |
| README / metadata | Observado: README y package.json genéricos de Figma |

## Uso sugerido en el repo

Copiar esta carpeta dentro de:

```text
docs/evidencias/v1.0.0/
```

Luego registrar en Git:

```bash
git add docs/evidencias/v1.0.0/
git commit -m "docs: agrega evidencias de revision v1.0.0"
git push origin main
```
