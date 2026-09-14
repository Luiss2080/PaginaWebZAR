# Plan 005 — Pruebas de integración de la API

## 1. Herramienta
Script Node ESM `scripts/pruebas_api.mjs` con `node:assert` y `fetch` nativos.
*Alternativa descartada:* PHPUnit/pytest, imposible sin instalar dependencias (registry 403).

## 2. Diseño
- `spawn('php', ['-S','127.0.0.1:8080','index.php'])` si el puerto no responde ya.
- Cliente `pedir(ruta, opciones)` que guarda la cabecera `set-cookie` (sesión PHP) y la reenvía.
- Runner mínimo `prueba(nombre, fn)` con `node:assert`.
- Al terminar: `php scripts/limpiar_pruebas.php` y `kill` del proceso (solo si lo arrancamos nosotros).

## 3. Cobertura
| Bloque | Endpoints | RF |
|---|---|---|
| Catálogo | categorias, marcas, productos, productos/{id}, buscar | RF-70 |
| Carrito | carrito, carrito/agregar, carrito/cantidad, carrito/quitar | RF-71 |
| Favoritos | favoritos, favoritos/alternar | RF-72 |
| Cuenta | cuenta, cuenta/login, cuenta/logout | RF-73 |
| Pedidos | pedidos/crear, pedidos | RF-74 |

## 4. Datos de prueba
Las órdenes creadas llevan la marca `PRUEBA-API` en la dirección; `scripts/limpiar_pruebas.php` las borra. El carrito y los favoritos se vacían por API antes de terminar.

## 5. Riesgos
- **Sesión compartida con el navegador:** cada ejecución usa su propia cookie (nueva sesión), no toca la del usuario.
- **Puerto ocupado:** se detecta y se reutiliza el servidor existente.
