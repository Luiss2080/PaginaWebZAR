# Validación — Spec 005 (Pruebas de integración de la API)

Fecha: 2026-09-14. Entorno: Node v24.15.0, `php -S 127.0.0.1:8080 index.php`, `multishop_db`.

| RF | Verificación | Método | Resultado |
|---|---|---|---|
| RF-69 | `npm run test:api` arranca/reutiliza el servidor y ejecuta 19 pruebas | Terminal | Cumple |
| RF-70 | Catálogo: categorías, marcas, productos, producto por id y búsqueda | Terminal | Cumple |
| RF-71 | Carrito: vacío, alta, agrupación, cantidad y borrado | Terminal | Cumple |
| RF-72 | Favoritos: alternar agrega y quita | Terminal | Cumple |
| RF-73 | Cuenta: null sin sesión, 401 inválido, login y logout | Terminal | Cumple |
| RF-74 | Pedidos: crear (formato `ZR-…`), historial, carrito a 0 y 400 sin carrito | Terminal | Cumple |
| RF-75 | Limpieza de pedidos de prueba y código de salida | Terminal | Cumple |

## Resultado
```
API · 19 pasadas, 0 falladas
Pedidos de prueba eliminados: 1
```

## Cierre técnico
- `npm run test:api` → 19/19 en verde.
- `npm test` (unitarios) → 31/31 en verde.
- `npm run lint` sin avisos y `npm run build` en verde.
- El script reutiliza un servidor ya activo y no toca la sesión del navegador (usa su propia cookie).

## Veredicto
**Spec 005 cumplida.** La API PHP/MySQL queda cubierta por pruebas de integración automatizadas y sin dependencias.
