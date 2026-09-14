# Plan 003 — Checkout y pedidos

## 1. Modelo de datos
Se reutilizan las tablas existentes de `multishop_db`:

```
orders(id, user_id, order_number, status, total_amount, shipping_amount,
       tax_amount, discount_amount, billing_address, shipping_address,
       payment_method, payment_status, created_at)
order_items(id, order_id, product_id, quantity, price, total)
```

No requiere migración: las tablas ya existen. `order_number` es UNIQUE.

## 2. API (`app/controllers/ApiControlador.php`)
| Endpoint | Método | Devuelve |
|---|---|---|
| `/api/pedidos` | GET | pedidos del usuario con sus líneas (401 sin sesión) |
| `/api/pedidos/crear` | POST | crea la orden desde `cart_items` en una transacción y vacía el carrito |

Lógica de creación:
1. Exige sesión (`usuario_id`).
2. Lee `cart_items` de la sesión unidos a `products` activos.
3. Si no hay líneas → 400.
4. Calcula subtotal, envío (gratis ≥ 30 €, si no 3,95 €) y total.
5. Inserta `orders` + `order_items` y borra `cart_items` (transacción).
6. Devuelve `{ pedido: { numero, total, estado } }`.

## 3. Frontend
- `servicios/api.js`: `crearPedido(datos)` y `obtenerPedidos()`.
- `paginas/Checkout.jsx`: dirección + resumen; requiere sesión; confirmación con número. En modo local simula la confirmación (RF-62).
- `paginas/Pedidos.jsx`: historial del usuario.
- `componentes/ui/DrawerCarrito.jsx`: "Tramitar pedido" navega a `/checkout`.
- `componentes/layout/Header.jsx`: enlace "Mis pedidos" en el menú de cuenta.
- Rutas nuevas en `App.jsx`.

## 4. Cobertura de requisitos
| Módulo | RF |
|---|---|
| Drawer + navegación | RF-54 |
| Sesión / carrito vacío | RF-55, RF-56 |
| Creación de pedido | RF-57, RF-58, RF-59 |
| Historial | RF-60, RF-61 |
| Respaldo local | RF-62 |

## 5. Riesgos
- **Doble pedido:** al vaciar el carrito en la misma transacción, el segundo intento falla por carrito vacío.
- **Pago simulado:** `payment_status` queda `pending`; se documenta.
