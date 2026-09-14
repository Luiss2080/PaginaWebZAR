# Tareas 005 — Pruebas de integración de la API

- [ ] **T36 — Runner de integración** (RF-69)
  - `scripts/pruebas_api.mjs`: arranque/reutilización del servidor, cliente con cookies y runner de asserts.
  - Hecho cuando: `npm run test:api` ejecuta y reporta.

- [ ] **T37 — Catálogo** (RF-70)
  - Asserts de categorías, marcas, productos, producto por id y búsqueda.
  - Hecho cuando: los 5 endpoints devuelven la forma esperada.

- [ ] **T38 — Carrito y favoritos** (RF-71, RF-72)
  - Asserts de alta/agrupación/cantidad/borrado y de alternar favorito.
  - Hecho cuando: el estado coincide con las respuestas.

- [ ] **T39 — Cuenta y pedidos** (RF-73, RF-74)
  - Asserts de login 401/válido, logout, creación y listado de pedidos, carrito vaciado.
  - Hecho cuando: el pedido aparece en el historial y el carrito queda a cero.

- [ ] **T40 — Limpieza y validación** (RF-75)
  - `scripts/limpiar_pruebas.php`, `validation.md` y repaso de `test`/`lint`/`build`.
  - Hecho cuando: la BD queda sin pedidos de prueba y todo está en verde.
