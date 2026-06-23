# Registro de versionamiento — v2.0.0

## Identificación

**Versión:** v2.0.0  
**Estado:** Revisada con observaciones  
**Propósito:** Registrar una segunda versión del prototipo y su evaluación técnica/funcional antes de aplicar correcciones finales.

## Descripción

La versión v2.0.0 corresponde a una actualización generada desde Figma luego de la primera evaluación del prototipo. Durante la revisión se detectó que varias correcciones solicitadas no fueron aplicadas completamente al código funcional, por lo que esta versión se mantiene como evidencia de evaluación intermedia.

## Resultado de revisión

**Aprobado con observaciones importantes.**

## Próxima versión

**v2.0.1** — versión correctiva que debe aplicar los hallazgos detectados en v2.0.0.

## Comandos sugeridos para registrar en Git

```bash
git add docs/evidencias/v2.0.0/
git commit -m "docs: agrega evidencias de revision v2.0.0"
git push origin main

git tag -a v2.0.0 -m "Versión v2.0.0 revisada con observaciones ISO 25010"
git push origin v2.0.0
```

## Frase de defensa

“La versión v2.0.0 fue registrada como una versión evaluada con observaciones. A partir de sus hallazgos se planificó la versión v2.0.1 como corrección final, manteniendo trazabilidad entre pruebas, defectos, correcciones y control de versiones.”
