# Validación — Spec 004 (Pruebas automatizadas)

Fecha: 2026-09-14. Entorno: Node v24.15.0, `npm test` = `node --test`.

| RF | Verificación | Método | Resultado |
|---|---|---|---|
| RF-63 | `npm test` ejecuta la suite sin dependencias nuevas | Terminal | Cumple |
| RF-64 | `utils/formato.test.js`: precio, descuento, fecha y envío (5 tests) | Terminal | Cumple |
| RF-65 | `servicios/api.test.js`: filtros, orden, búsqueda, catálogo local (11 tests) | Terminal | Cumple |
| RF-66 | `contextos/reductores.test.js`: carrito y favoritos (10 tests) | Terminal | Cumple |
| RF-67 | `datos/catalogo.test.js`: integridad del catálogo (5 tests) | Terminal | Cumple |
| RF-68 | `AGENTS.md` documenta `npm test`; `lint` y `build` siguen verdes | Terminal | Cumple |

## Resultado
```
ℹ tests 31
ℹ pass 31
ℹ fail 0
```

## Cierre técnico
- `npm test` → 31/31 en verde.
- `npm run lint` → sin avisos.
- `npm run build` → correcto.
- Refactor asociado: la lógica pura de carrito/favoritos se movió a `contextos/reductores.js` (sin JSX) y `servicios/api.js` lee el entorno con `import.meta.env?.VITE_API_BASE`, lo que permite ejecutarlo en Node sin romper Vite (modo API re-verificado en navegador).

## Veredicto
**Spec 004 cumplida.** El repositorio ya tiene una red de tests determinista, sin red ni BD, ejecutable con el runner nativo de Node.
