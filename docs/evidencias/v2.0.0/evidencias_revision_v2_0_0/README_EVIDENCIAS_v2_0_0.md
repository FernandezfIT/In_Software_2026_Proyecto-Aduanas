# Evidencias de revisión — Prototipo Aduana EV3 v2.0.0

**Proyecto:** Sistema de Gestión de Control Aduanero Fronterizo Los Libertadores  
**Versión evaluada:** v2.0.0  
**Tipo de evidencia:** revisión técnica, revisión estática, checklist ISO/IEC 25010 y registro de hallazgos  
**Fecha de preparación de evidencias:** 2026-06-23  

## Objetivo

Esta carpeta reúne evidencias para respaldar la revisión de la versión **v2.0.0** del prototipo. La versión se considera **aprobada con observaciones**, ya que el prototipo contiene los módulos principales y permite navegación general, pero mantiene problemas funcionales, de versionamiento, seguridad básica, accesibilidad y mantenibilidad.

## Contenido de la carpeta

```text
evidencias_revision_v2_0_0/
├── README_EVIDENCIAS_v2_0_0.md
├── logs/
│   ├── 01_npm_install_v2_0_0.txt
│   ├── 02_npm_run_build_v2_0_0.txt
│   └── 03_npm_audit_v2_0_0.txt
├── revision-estatica/
│   ├── 04_estructura_archivos_v2_0_0.txt
│   ├── 05_package_json_v2_0_0.txt
│   ├── 06_busqueda_hallazgos_codigo_v2_0_0.txt
│   ├── 07_readme_actual_v2_0_0.txt
│   └── 08_archivos_faltantes_o_no_incluidos_v2_0_0.txt
├── checklists/
│   └── checklist_iso25010_v2_0_0.md
├── hallazgos/
│   └── hallazgos_revision_v2_0_0.md
├── capturas-pendientes/
│   └── capturas_recomendadas_v2_0_0.md
├── informes/
│   ├── informe_revision_v2_aduana_ev3.md
│   └── revision_repo_aduanas_v2_0_0.md
└── versionamiento/
    └── registro_version_v2_0_0.md
```

## Estado general

| Área | Estado |
|---|---|
| Instalación / ejecución | Aprobado con observaciones |
| Build | Aprobado con advertencia de tamaño de chunk |
| npm audit | Observado: 2 vulnerabilidades altas |
| Adecuación funcional | Aprobado con observaciones |
| Seguridad básica | Observado |
| Accesibilidad | Observado |
| Mantenibilidad | Observado |
| Versionamiento visible | Observado |

## Uso recomendado en el repo

Copiar esta carpeta dentro del repositorio en:

```text
docs/evidencias/v2.0.0/
```

Luego ejecutar:

```bash
git add docs/evidencias/v2.0.0/
git commit -m "docs: agrega evidencias de revision v2.0.0"
git push origin main
```

## Nota importante

Las capturas de navegador, consola y Lighthouse deben completarse desde el equipo local, ejecutando el prototipo con `npm run dev`. Esta carpeta incluye una guía de capturas recomendadas para completar la evidencia visual.
