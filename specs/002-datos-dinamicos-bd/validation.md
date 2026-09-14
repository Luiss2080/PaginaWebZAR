# Validación — Spec 002 (Datos dinámicos con la base de datos)

Fecha: 2026-09-14. Entorno: `php -S localhost:8080 index.php` + `multishop_db` (MySQL) y SPA con `VITE_API_BASE`.

| RF | Verificación | Método | Resultado |
|---|---|---|---|
| RF-42 | `/api/marcas` → adidas, hm, nike, zara (tabla `brands`) | API | Cumple |
| RF-43 | Detalle de producto con 2 imágenes desde `product_images` | Navegador | Cumple |
| RF-44 | Tallas XS..XL leídas de `product_variants` | Navegador | Cumple |
| RF-45 | Colores Negro/Blanco/Camel desde `product_variants` | Navegador | Cumple |
| RF-46 | Destacados en home y badge "Nuevo" según `is_featured`/`is_new` | Navegador | Cumple |
| RF-47 | Filtro por marca con valores reales en catálogo | Navegador | Cumple |
| RF-48 | Carrito en `cart_items` (sesión + usuario); persiste tras recargar | Navegador/BD | Cumple |
| RF-49 | Favoritos en `wishlist_items`; persisten tras recargar | Navegador/BD | Cumple |
| RF-50 | Registro crea usuario (200), email duplicado 409, contraseña corta 400 | API | Cumple |
| RF-51 | Login válido abre sesión; credenciales malas 401 | API/Navegador | Cumple |
| RF-52 | Logout limpia la sesión (el header vuelve a "Iniciar sesión") | Navegador | Cumple |
| RF-53 | Sin `VITE_API_BASE` la SPA usa el respaldo local (Spec 001) | Navegador | Cumple |

## Evidencia en la BD
- `brands`=4, `product_images`=18, `product_variants`=129.
- Filas reales en `cart_items` (con `session_id`, `user_id`, `size`, `color_name`) y `wishlist_items`.
- `users`: usuario demo `demo@zara.test` con contraseña hasheada.
- La migración `scripts/migracion_catalogo.php` se ejecutó dos veces sin error (idempotente).

## Cierre técnico
- `npm run lint` sin avisos.
- `npm run build` en verde.
- Flujo verificado: catálogo dinámico → detalle con galería/variantes → añadir al carrito → recarga (persiste) → favorito → recarga (persiste) → login → logout.

## Veredicto
**Spec 002 cumplida.** El catálogo, el carrito, los favoritos y la cuenta son datos dinámicos de `multishop_db`.
