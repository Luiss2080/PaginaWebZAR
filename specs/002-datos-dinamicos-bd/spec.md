# Spec 002 — Datos dinámicos con la base de datos

Cambio sobre la Spec 001. Añade dos fases para que la SPA deje de inventar/almacenar datos en el cliente y los lea/escriba en `multishop_db`.

## Contexto y objetivo
En la Spec 001 el catálogo venía de la BD pero la API completaba con valores fijos tallas, colores, marcas e imágenes (la BD no tenía esas tablas), y el carrito, los favoritos y la sesión vivían en `localStorage`. Esta iteración crea las tablas/columnas que faltan, las siembra y hace que la API y la SPA usen exclusivamente la BD para el catálogo y el estado de compra.

## Usuarios / actores
- Visitante (sesión anónima por cookie PHP).
- Clienta/o registrada/o.
- Developer/Agente.

## Historias de usuario
- H9: Como visitante quiero ver la ficha completa (varias imágenes, tallas y colores reales) leída de la BD.
- H10: Como visitante quiero que mi carrito y mis favoritos sobrevivan al recargar y al cambiar de dispositivo dentro de la misma sesión.
- H11: Como clienta/o quiero registrarme e iniciar sesión con credenciales reales guardadas en la BD.

## Requisitos funcionales (EARS)

### Fase 1 — Catálogo dinámico
- RF-42: EL SISTEMA obtiene las marcas desde la tabla `brands`.
- RF-43: EL SISTEMA obtiene la galería de cada producto desde `product_images`.
- RF-44: EL SISTEMA obtiene las tallas de cada producto desde `product_variants`.
- RF-45: EL SISTEMA obtiene los colores (nombre y hex) desde `product_variants`.
- RF-46: EL SISTEMA marca un producto como destacado según `products.is_featured` y como novedad según `products.is_new`.
- RF-47: CUANDO el usuario filtra por marca, EL SISTEMA usa las marcas reales de `brands`.

### Fase 2 — Estado y cuenta dinámicos
- RF-48: EL SISTEMA persiste el carrito en `cart_items` identificado por la sesión PHP (y por `user_id` si hay sesión iniciada).
- RF-49: EL SISTEMA persiste los favoritos en `wishlist_items` identificados por la sesión PHP (y por `user_id` si hay sesión iniciada).
- RF-50: CUANDO el usuario se registra, EL SISTEMA crea la fila en `users` con la contraseña hasheada; SI el email ya existe, ENTONCES responde con error.
- RF-51: CUANDO el usuario inicia sesión con credenciales válidas, EL SISTEMA abre sesión PHP y responde con sus datos; SI son inválidas, ENTONCES responde 401.
- RF-52: CUANDO el usuario cierra sesión, EL SISTEMA destruye la sesión y responde sin usuario.
- RF-53: SI no hay backend disponible, ENTONCES EL SISTEMA mantiene el comportamiento de la Spec 001 (carrito/favoritos en memoria + respaldo local) sin romper.

## Requisitos no funcionales
- La API valida y escapa la entrada; las contraseñas se guardan con `password_hash`.
- Las consultas usan sentencias preparadas.
- El modo local de la Spec 001 sigue funcionando sin backend.

## Casos límite
- Producto sin variantes o sin imágenes: la API devuelve arrays vacíos y la UI no rompe.
- Cantidad 0 o negativa en carrito: se elimina la línea.
- Email duplicado en registro; contraseña < 6 caracteres.
- Sesión no iniciada: `user_id` es NULL y el carrito/favoritos quedan asociados a `session_id`.

## Fuera de alcance
- Pasarela de pago real y creación de pedidos (`orders`) desde la UI.
- Recuperación de contraseña y verificación de email.
- Migración de datos previos de `localStorage` a la BD.

## Criterios de finalización
- RF-42..RF-53 verificados en navegador y/o API.
- `npm run lint` y `npm run build` en verde.
- Migración re-ejecutable sin errores.
