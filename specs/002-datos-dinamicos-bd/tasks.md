# Tareas 002 — Datos dinámicos con la base de datos

- [ ] **T17 — Migración del esquema** (RF-42..RF-47)
  - Crear `database/migrations/002_catalogo_dinamico.sql` y `scripts/migracion_catalogo.php` (idempotente): tablas `brands`, `product_images`, `product_variants`, columnas `products.brand_id`/`is_new`, `cart_items.size`/`color_name`, `wishlist_items.session_id`/`user_id` nullable; sembrar marcas, variantes e imágenes.
  - Hecho cuando: el script corre dos veces sin error y las tablas quedan pobladas.

- [ ] **T18 — API catálogo dinámico** (RF-42..RF-47)
  - `ApiControlador` lee marcas, imágenes, tallas, colores, `is_featured` e `is_new` de la BD (sin valores fijos).
  - Hecho cuando: `/api/productos` devuelve `marca`, `imagenes[]`, `tallas[]`, `colores[]`, `destacado`, `novedad` reales y `/api/marcas` lista `brands`.

- [ ] **T19 — SPA en modo BD (catálogo)** (RF-42..RF-47)
  - Verificar catálogo, filtro por marca y detalle (galería múltiple, tallas y colores reales) con `VITE_API_BASE`.
  - Hecho cuando: 9 productos con marca real, galería de 2 imágenes y variantes; 0 imágenes rotas.

- [ ] **T20 — API carrito** (RF-48)
  - Endpoints `/api/carrito`, `/agregar`, `/cantidad`, `/quitar`, `/vaciar` sobre `cart_items` por `session_id`/`user_id`.
  - Hecho cuando: agregar, cambiar cantidad y vaciar se reflejan en la tabla.

- [ ] **T21 — API favoritos** (RF-49)
  - Endpoints `/api/favoritos` y `/api/favoritos/alternar` sobre `wishlist_items` por `session_id`/`user_id`.
  - Hecho cuando: alternar inserta/borra en la tabla y persiste entre recargas.

- [ ] **T22 — API cuenta** (RF-50..RF-52)
  - Endpoints `/api/cuenta`, `/login`, `/registro`, `/logout` con `password_hash`/`password_verify` y sesión PHP.
  - Hecho cuando: registro crea usuario, login válido abre sesión, credenciales malas dan 401 y logout limpia.

- [ ] **T23 — Frontend dinámico** (RF-48..RF-53)
  - `servicios/api.js` con funciones de carrito/favoritos/cuenta; contextos que usan la API en modo BD y `localStorage` en modo local.
  - Hecho cuando: en modo BD el carrito/favoritos persisten en la tabla y el header muestra el usuario de la sesión.

- [ ] **T24 — Validación 002**
  - Recorrer RF-42..RF-53, actualizar `validation.md`, `npm run lint` y `npm run build`.
  - Hecho cuando: tabla completa y verde.
