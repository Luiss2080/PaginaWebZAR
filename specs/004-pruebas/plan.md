# Plan 004 — Pruebas automatizadas

## 1. Herramienta
`node --test` (runner nativo de Node 24). Script `"test": "node --test"` en `frontend/package.json`.
*Alternativa descartada:* Vitest + Testing Library, porque el registry npm devuelve 403 (no se pueden instalar dependencias).

## 2. Módulos bajo test (todos .js puros)
| Archivo | Qué prueba | RF |
|---|---|---|
| `src/utils/formato.js` | `formatearPrecio`, `calcularDescuento`, `formatearFecha`, `calcularEnvio` | RF-64 |
| `src/servicios/api.js` | `filtrarProductos`, `obtenerProductos`, `obtenerProducto`, `buscar` | RF-65 |
| `src/contextos/reductores.js` | lógica de carrito y favoritos | RF-66 |
| `src/datos/catalogo.js` | integridad del seed | RF-67 |

## 3. Refactor necesario
La lógica pura de los contextos se extrae a `src/contextos/reductores.js` (sin JSX) y los proveedores la consumen. Además `servicios/api.js` pasa a leer el entorno con `import.meta.env?.VITE_API_BASE` para que Node pueda importarlo (en Node `import.meta.env` es `undefined` → modo local).

## 4. Estrategia
- Tests unitarios con `node:test` y `node:assert/strict`.
- Sin red: `api.js` en modo local usa `datos/catalogo.js`.
- Nombres `*.test.js` junto al módulo.

## 5. Cobertura de requisitos
| Área | RF |
|---|---|
| Runner | RF-63 |
| Utilidades | RF-64 |
| Datos | RF-65, RF-67 |
| Reductores | RF-66 |
| Documentación/CI local | RF-68 |
