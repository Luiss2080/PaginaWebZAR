# Validación — Spec 003 (Checkout y pedidos)

Fecha: 2026-09-14. Entorno: `php -S localhost:8080 index.php` + `multishop_db` y SPA con `VITE_API_BASE`.

| RF | Verificación | Método | Resultado |
|---|---|---|---|
| RF-54 | "Tramitar pedido" del drawer navega a `/checkout` | Navegador | Cumple |
| RF-55 | Sin sesión, el checkout pide iniciar sesión y conserva el carrito | Código | Cumple |
| RF-56 | Carrito vacío → estado vacío con enlace al catálogo, sin confirmar | Código | Cumple |
| RF-57 | Se crea `orders` + `order_items` con número único, subtotal, envío y total | Navegador/BD | Cumple |
| RF-58 | Al confirmar, `cart_items` queda vacío y se muestra el número de pedido | Navegador/BD | Cumple |
| RF-59 | Envío gratis ≥ 30 €; en caso contrario 3,95 € | API/BD | Cumple |
| RF-60 | `/pedidos` lista número, fecha, estado, total y artículos | Navegador | Cumple |
| RF-61 | Sin sesión, `/pedidos` invita a iniciar sesión | Código | Cumple |
| RF-62 | Sin backend, el checkout genera una confirmación local (`DEMO-...`) | Código | Cumple |

## Evidencia en la BD
- `orders`: 2 filas (`ZR-20260914-623F8` 119,98 €; `ZR-20260914-CF7B4` 149,98 €), `status=pending`, `payment_status=pending`.
- `order_items`: líneas con producto, cantidad, precio y total correctos.
- Tras el checkout de la SPA, `cart_items` de la sesión quedó vacío.

## Cierre técnico
- `npm run lint` sin avisos.
- `npm run build` en verde (JS 295 KB / 90 KB gzip).
- Flujo verificado: login → añadir al carrito → checkout → confirmación con número → "Mis pedidos" con la orden real.

## Veredicto
**Spec 003 cumplida.** El embudo de compra (carrito → pedido) queda persistido en `multishop_db`; el pago permanece simulado por diseño.
