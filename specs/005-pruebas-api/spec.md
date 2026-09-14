# Spec 005 — Pruebas de integración de la API

## Contexto y objetivo
La Spec 004 dejó fuera (por el bloqueo del registry) las pruebas end-to-end de la API PHP/MySQL, que se cubrieron a mano. Esta iteración las automatiza con un script Node (sin dependencias) que levanta `php -S localhost:8080 index.php`, recorre los endpoints con `fetch` manteniendo la cookie de sesión y afirma los resultados con `node:assert`.

## Usuarios / actores
- Developer/Agente.

## Historias de usuario
- H15: Como developer quiero un comando que compruebe la API real (catálogo, carrito, favoritos, cuenta y pedidos) contra MySQL.

## Requisitos funcionales (EARS)
- RF-69: CUANDO se ejecuta `npm run test:api`, EL SISTEMA arranca el servidor PHP (o reutiliza uno ya activo) y ejecuta las pruebas.
- RF-70: EL SISTEMA comprueba el catálogo: `/api/categorias`, `/api/marcas`, `/api/productos`, `/api/productos/{id}` y `/api/buscar`.
- RF-71: EL SISTEMA comprueba el carrito: alta, agrupación, cambio de cantidad y borrado.
- RF-72: EL SISTEMA comprueba los favoritos: alternar agrega y quita.
- RF-73: EL SISTEMA comprueba la cuenta: 401 con credenciales inválidas, login y logout.
- RF-74: EL SISTEMA comprueba los pedidos: crear desde el carrito, vaciarlo y listarlo.
- RF-75: EL SISTEMA limpia los datos de prueba (pedidos con dirección marcada) y devuelve código de salida ≠ 0 si algo falla.

## Requisitos no funcionales
- Sin dependencias nuevas; usa `node:assert` y `fetch` nativos.
- No exige que el servidor esté ya levantado (lo arranca y lo detiene).
- Los datos de prueba se limpian al final.

## Casos límite
- Puerto 8080 ocupado: reutiliza el servidor activo y no lo detiene.
- Producto inexistente → `null`.
- Login con contraseña incorrecta → 401.
- Carrito vacío al crear pedido → 400.

## Fuera de alcance
- Pruebas de navegador/UI.
- Pruebas de carga.

## Criterios de finalización
- `npm run test:api` en verde.
- `npm test`, `npm run lint` y `npm run build` siguen en verde.
- La BD queda sin pedidos de prueba.
