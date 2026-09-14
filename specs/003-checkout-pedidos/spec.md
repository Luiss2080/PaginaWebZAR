# Spec 003 — Checkout y pedidos

Cambio sobre la Spec 002 (que dejó fuera el pago y la creación de pedidos).

## Contexto y objetivo
El carrito vive en `cart_items` y la cuenta en `users`, pero el botón "Tramitar pedido" estaba deshabilitado y la tabla `orders`/`order_items` sin uso. Esta iteración cierra el embudo: confirmar el pedido con dirección, crear la orden en `orders` + `order_items`, vaciar el carrito y mostrar el historial en "Mis pedidos". El pago sigue siendo simulado (demo).

## Usuarios / actores
- Clienta/o con sesión iniciada.
- Developer/Agente.

## Historias de usuario
- H12: Como clienta/o quiero confirmar mi pedido con una dirección para completar la compra.
- H13: Como clienta/o quiero ver mis pedidos anteriores con su estado y total.

## Requisitos funcionales (EARS)
- RF-54: CUANDO el usuario pulsa "Tramitar pedido" con artículos, EL SISTEMA navega al checkout.
- RF-55: SI no hay sesión iniciada, ENTONCES EL SISTEMA pide iniciar sesión antes de confirmar, sin perder el carrito.
- RF-56: SI el carrito está vacío, ENTONCES EL SISTEMA muestra un estado vacío con enlace al catálogo y no permite confirmar.
- RF-57: CUANDO el usuario completa la dirección y confirma, EL SISTEMA crea una fila en `orders` y sus líneas en `order_items`, con número de pedido único, subtotal, envío y total.
- RF-58: CUANDO se crea el pedido, EL SISTEMA vacía `cart_items` y muestra una confirmación con el número de pedido.
- RF-59: EL SISTEMA calcula el envío: gratis a partir de 30 €; en caso contrario 3,95 €.
- RF-60: CUANDO el usuario visita `/pedidos`, EL SISTEMA lista sus pedidos con número, fecha, estado, total y artículos.
- RF-61: SI el usuario no ha iniciado sesión en `/pedidos`, ENTONCES EL SISTEMA invita a iniciar sesión.
- RF-62: SI el backend no está disponible, ENTONCES EL SISTEMA genera una confirmación local (demo) sin guardar en la BD.

## Requisitos no funcionales
- La creación del pedido es transaccional (orden + líneas + vaciado del carrito).
- Validación de campos de dirección obligatorios (nombre, dirección, ciudad, código postal, país).
- La API comprueba la sesión; sin usuario responde 401.

## Casos límite
- Producto eliminado del catálogo tras añadirlo: la línea se ignora al crear el pedido.
- Dirección incompleta: error por campo, sin crear la orden.
- Doble clic en confirmar: el segundo intento encuentra el carrito vacío y no duplica pedidos.

## Fuera de alcance
- Pasarela de pago real.
- Gestión de envíos y estados desde administración.
- Cupones y descuentos.

## Criterios de finalización
- RF-54..RF-62 verificados.
- `npm run lint` y `npm run build` en verde.
- Flujo: carrito → checkout → confirmación → "Mis pedidos" con la orden real en la BD.
