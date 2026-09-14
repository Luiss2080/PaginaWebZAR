# Tareas 006 — Accesibilidad de overlays y menús

- [x] **T41 — Utilidad pura de foco** (RF-76)
  - `src/utils/enfoque.js` con `FOCALIZABLES` y `siguienteEnfoque`.
  - Hecho cuando: la función existe y está cubierta por tests.

- [x] **T42 — Hooks de accesibilidad** (RF-76..RF-79)
  - `src/servicios/accesibilidad.js` con `useOverlayAccesible` y `useCierreExterior`.
  - Hecho cuando: carrito y buscador usan los hooks.

- [x] **T43 — Menú de cuenta y aria-live** (RF-79, RF-80)
  - Cierre al clic fuera en `Header` y `aria-live` en el contador.
  - Hecho cuando: el menú se cierra al pulsar fuera y el contador se anuncia.

- [x] **T44 — Tests de la utilidad** (RF-76)
  - `src/utils/enfoque.test.js`.
  - Hecho cuando: `npm test` incluye los casos de `siguienteEnfoque`.

- [x] **T45 — Validación 006**
  - `validation.md` + repaso de `test`/`test:api`/`lint`/`build` y prueba manual en navegador.
  - Hecho cuando: todo verde.
