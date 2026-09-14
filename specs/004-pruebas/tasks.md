# Tareas 004 — Pruebas automatizadas

- [ ] **T30 — Runner y script** (RF-63)
  - Añadir `"test": "node --test"` a `frontend/package.json` y documentarlo en `AGENTS.md`.
  - Hecho cuando: `npm test` ejecuta la suite.

- [ ] **T31 — Reductores puros** (RF-66)
  - Crear `src/contextos/reductores.js` y hacer que los proveedores lo usen.
  - Hecho cuando: carrito/favoritos siguen funcionando y su lógica es importable en Node.

- [ ] **T32 — Tests de utilidades** (RF-64)
  - `src/utils/formato.test.js`.
  - Hecho cuando: precio, descuento, fecha y envío pasan.

- [ ] **T33 — Tests de datos** (RF-65, RF-67)
  - `src/servicios/api.test.js` y `src/datos/catalogo.test.js`.
  - Hecho cuando: filtros, orden, búsqueda e integridad pasan.

- [ ] **T34 — Tests de reductores** (RF-66)
  - `src/contextos/reductores.test.js`.
  - Hecho cuando: agregar/agrupar/cantidad/quitar/totales/alternar pasan.

- [ ] **T35 — Validación 004** (RF-68)
  - `validation.md`, `npm test`, `npm run lint` y `npm run build` en verde.
  - Hecho cuando: todo verde y documentado.
