# Tareas 003 — Checkout y pedidos

- [ ] **T25 — API de pedidos** (RF-57..RF-59)
  - `pedidos()` y `pedidos('crear')` en `ApiControlador` con transacción, cálculo de envío y vaciado del carrito.
  - Hecho cuando: `/api/pedidos/crear` inserta en `orders`/`order_items`, vacía `cart_items` y `/api/pedidos` lista el pedido.

- [ ] **T26 — Servicios de pedidos en la SPA** (RF-57)
  - `crearPedido` y `obtenerPedidos` en `servicios/api.js`.
  - Hecho cuando: la SPA puede crear y listar pedidos.

- [ ] **T27 — Página de checkout** (RF-54..RF-59, RF-62)
  - `paginas/Checkout.jsx` con formulario de dirección, resumen, validación y confirmación; ruta `/checkout`.
  - Hecho cuando: confirmar crea el pedido y muestra el número.

- [ ] **T28 — Mis pedidos + enlaces** (RF-60, RF-61)
  - `paginas/Pedidos.jsx`, ruta `/pedidos`, botón del drawer y enlace en la cabecera.
  - Hecho cuando: `/pedidos` lista las órdenes del usuario y el drawer navega al checkout.

- [ ] **T29 — Validación 003**
  - Recorrer RF-54..RF-62, `validation.md`, lint y build.
  - Hecho cuando: tabla completa y verde.
