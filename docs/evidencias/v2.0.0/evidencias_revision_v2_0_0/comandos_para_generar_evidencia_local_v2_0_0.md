# Comandos para generar evidencia local — v2.0.0

Ejecutar desde la raíz del proyecto.

## Linux / macOS / Git Bash

```bash
mkdir -p docs/evidencias/v2.0.0/logs
mkdir -p docs/evidencias/v2.0.0/revision-estatica

npm install > docs/evidencias/v2.0.0/logs/01_npm_install_v2_0_0_local.txt 2>&1
npm run build > docs/evidencias/v2.0.0/logs/02_npm_run_build_v2_0_0_local.txt 2>&1
npm audit > docs/evidencias/v2.0.0/logs/03_npm_audit_v2_0_0_local.txt 2>&1

find . -maxdepth 4 -type f | sort > docs/evidencias/v2.0.0/revision-estatica/estructura_local_v2_0_0.txt
grep -RIn "Prototipo v1.0\|Math.random\|navigate('sistemas-externos'\|ADMIN_ITEMS\|currentUser?.role" src README.md package.json > docs/evidencias/v2.0.0/revision-estatica/hallazgos_grep_local_v2_0_0.txt
```

## Windows PowerShell

```powershell
New-Item -ItemType Directory -Force docs/evidencias/v2.0.0/logs
New-Item -ItemType Directory -Force docs/evidencias/v2.0.0/revision-estatica

npm install *> docs/evidencias/v2.0.0/logs/01_npm_install_v2_0_0_local.txt
npm run build *> docs/evidencias/v2.0.0/logs/02_npm_run_build_v2_0_0_local.txt
npm audit *> docs/evidencias/v2.0.0/logs/03_npm_audit_v2_0_0_local.txt

Get-ChildItem -Recurse -File | Select-Object FullName | Out-File docs/evidencias/v2.0.0/revision-estatica/estructura_local_v2_0_0.txt
Select-String -Path src/**/*,README.md,package.json -Pattern "Prototipo v1.0","Math.random","navigate('sistemas-externos'","ADMIN_ITEMS","currentUser?.role" | Out-File docs/evidencias/v2.0.0/revision-estatica/hallazgos_grep_local_v2_0_0.txt
```

## Capturas recomendadas

Después de levantar el prototipo:

```bash
npm run dev
```

Capturar:

- Home.
- Login.
- Dashboard Operador.
- Flujo expediente.
- Alertas.
- Reportes.
- Sistemas externos.
- Historial de versiones.
- Consola navegador.
- Lighthouse.
- Terminal con build.
- Terminal con audit.
