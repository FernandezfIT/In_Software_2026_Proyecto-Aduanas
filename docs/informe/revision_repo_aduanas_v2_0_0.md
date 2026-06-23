# Revisión del repositorio - Proyecto Aduanas EV3

**Archivo revisado:** `In_Software_2026_Proyecto-Aduanas-main.zip`  
**Versión declarada:** v2.0.0  
**Estado general:** Aprobado con observaciones importantes.  

## 1. Resultado técnico

Se revisó el proyecto descargado desde el ZIP del repositorio.

### Comandos ejecutados

```bash
rm -rf node_modules
npm ci --no-audit --no-fund
npm run build
npm audit --audit-level=high
```

### Resultado

| Prueba | Resultado |
|---|---|
| Instalación limpia | OK |
| Build productivo | OK |
| Auditoría npm | Observada |
| Tamaño bundle | Observado |

El proyecto compila correctamente después de eliminar `node_modules` y reinstalar dependencias. Sin embargo, `npm audit` reporta 2 vulnerabilidades altas asociadas a `react-router` y `vite`.

## 2. Problemas críticos o importantes

### H-001: `node_modules` está subido al repositorio

El ZIP del repo contiene `node_modules`, lo que no debería ocurrir. Aunque existe `.gitignore`, esto indica que `node_modules` ya fue agregado al control de versiones antes de aplicar correctamente el ignore.

**Impacto:**
- Repositorio extremadamente pesado.
- Dificulta clonado y revisión.
- Mala práctica en Git.
- Puede provocar problemas de permisos entre Windows/Linux/Mac.

**Corrección recomendada:**

```bash
git rm -r --cached node_modules
git commit -m "chore: elimina node_modules del control de versiones"
git push origin main
```

---

### H-002: `dist` también aparece dentro del ZIP

El ZIP contiene archivos de build. En proyectos Vite, `dist/` normalmente no debe subirse al repo salvo que estén usando GitHub Pages o despliegue estático intencional.

**Corrección recomendada:**

```bash
git rm -r --cached dist
git commit -m "chore: elimina dist del control de versiones"
git push origin main
```

---

### H-003: El README sigue siendo genérico de Figma

El `README.md` aún dice:

```text
# Follow Attached Instructions
This is a code bundle for Follow Attached Instructions...
```

**Impacto:**
- Debilita la defensa académica.
- No explica el caso Aduana.
- No documenta instalación, pruebas ni versionamiento.

**Corrección recomendada:** reemplazar por un README propio del proyecto.

---

### H-004: `package.json` mantiene nombre y versión genéricos

Actualmente:

```json
"name": "@figma/my-make-file",
"version": "0.0.1"
```

**Corrección recomendada:**

```json
"name": "aduana-los-libertadores-prototipo-ev3",
"version": "2.0.0"
```

---

### H-005: El prototipo visible aún muestra `Prototipo v1.0`

Referencias encontradas en:

- `src/app/components/layout/Footer.tsx`
- `src/app/components/layout/Header.tsx`
- `src/app/components/pages/LoginPage.tsx`
- `src/app/components/pages/VersionHistorial.tsx`

**Corrección recomendada:** cambiar a `Prototipo v2.0.0` para esta versión, y luego a `v2.0.1` cuando se apliquen correcciones.

---

### H-006: Historial de versiones no representa correctamente v2.0.0

La pantalla `VersionHistorial.tsx` todavía presenta:

- Versión actual: 1.0
- v2.0 como versión futura
- Estado: prototipo inicial

**Corrección recomendada:** actualizar historial para mostrar v2.0.0 como versión actual revisada con observaciones y v2.0.1 como próxima versión correctiva.

---

### H-007: Acceso a Sistemas Externos sin sesión

En `HomePage.tsx`, el botón “Ver sistemas externos” navega directamente a:

```tsx
navigate('sistemas-externos')
```

**Impacto:**
- Problema de seguridad básica.
- Rompe el flujo esperado de autenticación.

**Corrección recomendada:** si no hay usuario activo, enviar al login y mostrar mensaje informativo.

---

### H-008: Sidebar carga menú Administrador cuando `currentUser` es null

En `Sidebar.tsx`:

```tsx
const items =
  currentUser?.role === 'operador' ? OPERADOR_ITEMS :
  currentUser?.role === 'supervisor' ? SUPERVISOR_ITEMS :
  ADMIN_ITEMS;
```

Si `currentUser` es `null`, cae en `ADMIN_ITEMS`.

**Corrección recomendada:** no renderizar sidebar sin usuario activo o redirigir a login.

---

### H-009: Validaciones externas todavía usan `Math.random`

En `NuevoExpediente.tsx`:

```tsx
const result = Math.random() > 0.15 ? 'aprobado' : 'error';
```

**Impacto:**
- Las pruebas no son repetibles.
- Dificulta registrar evidencia estable.

**Corrección recomendada:** usar resultados controlados para SAG, PDI y Aduana Limítrofe.

---

### H-010: Botones importantes sin feedback funcional

En `Reportes.tsx` aparecen botones sin `onClick` ni feedback:

- Exportar PDF.
- Exportar Excel.
- Descargar reporte.
- Aplicar filtros.

**Corrección recomendada:** agregar modal, toast o mensaje visual de acción simulada.

---

### H-011: Vulnerabilidades altas en dependencias

`npm audit` reporta vulnerabilidades altas en:

- `react-router` 7.13.0
- `vite` 6.3.5

**Corrección recomendada:** probar actualización controlada:

```bash
npm install vite@6.4.3 react-router@7.18.0
npm run build
npm audit --audit-level=high
```

No aplicar `npm audit fix --force` sin probar, porque puede actualizar dependencias de forma agresiva.

---

### H-012: Falta carpeta `docs/` en raíz del repo

No se encontró una carpeta `docs/` propia con:

- Plan de pruebas.
- Evidencias.
- Informes.
- Prompts.
- Control de versiones.

**Corrección recomendada:** agregar estructura documental.

```text
docs/
├── plan-pruebas/
├── informes/
├── prompts-figma/
├── evidencias/
│   ├── v1.0.0/
│   ├── v2.0.0/
│   └── v2.0.1/
└── versionamiento/
```

---

### H-013: Prompts pegados dentro de `src/imports/pasted_text`

Hay varios prompts o textos importados dentro del código fuente:

```text
src/imports/pasted_text/
```

**Impacto:**
- Ensucia el código fuente.
- Mezcla documentación con implementación.

**Corrección recomendada:** mover esos archivos a:

```text
docs/prompts-figma/
```

---

### H-014: No hay ESLint ni TypeScript config visible

No se encontró `eslint.config.js` ni `tsconfig.json`.

**Impacto:**
- Menor control de mantenibilidad.
- Más difícil detectar errores de tipos o calidad.

**Corrección recomendada:** opcional para la EV3, pero recomendable para defensa técnica.

---

## 3. Comandos recomendados antes de pasar a v2.0.1

Ejecutar desde la raíz del repo:

```bash
# 1. Revisar estado
git status

# 2. Eliminar archivos que no deben estar versionados
git rm -r --cached node_modules
git rm -r --cached dist

# 3. Confirmar que .gitignore existe y contiene node_modules/ y dist/
git add .gitignore

# 4. Commit de limpieza
git commit -m "chore: limpia archivos generados e ignorados"

# 5. Actualizar metadata básica
git add README.md package.json package-lock.json CHANGELOG.md VERSION.md
git commit -m "docs: actualiza documentacion y metadata de v2.0.0"

# 6. Subir cambios
git push origin main

# 7. Crear tag v2.0.0 si aún no existe
git tag -a v2.0.0 -m "Versión v2.0.0 revisada con observaciones ISO 25010"
git push origin v2.0.0

# 8. Crear rama correctiva
git checkout -b correcciones/v2.0.1
```

## 4. Prioridad de corrección

| Prioridad | Corrección |
|---|---|
| Alta | Eliminar `node_modules` y `dist` del repo |
| Alta | Corregir README y package.json |
| Alta | Actualizar versión visible e historial |
| Alta | Bloquear Sistemas Externos sin sesión |
| Alta | Corregir Sidebar sin usuario activo |
| Media | Eliminar `Math.random` de validaciones |
| Media | Agregar feedback a botones de reportes |
| Media | Corregir vulnerabilidades npm |
| Media | Ordenar documentación en `docs/` |
| Baja | Agregar ESLint/tsconfig |

## 5. Veredicto

El repo ya tiene una base útil para defensa, pero aún necesita limpieza y orden antes de avanzar a v2.0.1. El mayor problema no es el prototipo en sí, sino el estado del repositorio: `node_modules`, `dist`, README genérico, metadata de Figma y documentación incompleta.

La ruta recomendada es:

```text
1. Limpiar repo.
2. Documentar v2.0.0 como versión revisada con observaciones.
3. Crear tag v2.0.0.
4. Crear rama correcciones/v2.0.1.
5. Aplicar correcciones funcionales y visuales.
6. Ejecutar nueva ronda de pruebas.
7. Crear tag v2.0.1.
```
