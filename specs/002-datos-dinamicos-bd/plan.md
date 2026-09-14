# Plan 002 — Datos dinámicos con la base de datos

## 1. Modelo de datos (migración)

```
brands(id, name, slug)
products + brand_id, is_new
product_images(id, product_id, image_url, sort_order)
product_variants(id, product_id, size, color_name, color_hex, stock)
cart_items + size, color_name            (para distinguir variantes)
wishlist_items + session_id, user_id NULL (para invitados y registrados)
users (ya existe; se siembra un usuario demo)
```

Migración idempotente en `database/migrations/002_catalogo_dinamico.sql`, aplicada por `scripts/migracion_catalogo.php` (comprueba `information_schema` antes de crear/alterar y solo siembra si está vacío).

## 2. API (app/controllers/ApiControlador.php)

| Endpoint | Método | Devuelve |
|---|---|---|
| `/api/productos` | GET | catálogo con marcas, imágenes, tallas, colores, destacado y novedad reales |
| `/api/productos/{id}` | GET | un producto |
| `/api/categorias` | GET | categorías |
| `/api/marcas` | GET | marcas reales |
| `/api/buscar?q=` | GET | búsqueda |
| `/api/carrito` | GET | líneas de la sesión |
| `/api/carrito/agregar` | POST | añade/actualiza línea |
| `/api/carrito/cantidad` | POST | cambia cantidad (0 elimina) |
| `/api/carrito/quitar` | POST | elimina línea |
| `/api/carrito/vaciar` | POST | vacía |
| `/api/favoritos` | GET | ids favoritos |
| `/api/favoritos/alternar` | POST | alterna favorito |
| `/api/cuenta` | GET | usuario de la sesión |
| `/api/cuenta/login` | POST | inicia sesión |
| `/api/cuenta/registro` | POST | crea cuenta |
| `/api/cuenta/logout` | POST | cierra sesión |

> El enrutado se resuelve con el fallback dinámico de `app/core/App.php`; el verbo se decide dentro de cada método con `$_SERVER['REQUEST_METHOD']`. No se modifica el enrutador.

## 3. Frontend

- `servicios/api.js`: añade funciones de carrito, favoritos y cuenta que hablan con la API cuando `VITE_API_BASE` está definido.
- `contextos/*`: cuando hay API, usan la BD (asíncrono); si no, mantienen el comportamiento local de la Spec 001.
- `DetalleProducto` y `ProductoCard` ya consumen el mismo modelo, sin cambios de forma.
- Imágenes: la API devuelve las rutas guardadas en `product_images` (se sirven desde `frontend/public/img/`).

**Decisión:** la sesión se identifica con la cookie `PHPSESSID` que ya crea `App.php`; el proxy de Vite hace que todo sea mismo origen, por lo que las cookies viajan sin CORS.
*Alternativa descartada:* token propio en `localStorage`; más código y sin ventaja.

## 4. Cobertura de requisitos

| Módulo | RF |
|---|---|
| Migración + catálogo API | RF-42..RF-47 |
| Carrito | RF-48 |
| Favoritos | RF-49 |
| Cuenta | RF-50..RF-52 |
| Respaldo local | RF-53 |

## 5. Riesgos
- **Modificar la BD viva:** la migración es aditiva e idempotente; no borra ni altera datos existentes.
- **Cookies en desarrollo:** requieren el proxy de Vite (mismo origen); documentado.
- **Doble modo (API/local):** se conserva el modo local para no romper la Spec 001.
