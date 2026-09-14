# Spec 004 — Pruebas automatizadas

## Contexto y objetivo
El proyecto se verificó a mano RF por RF, pero no tiene red de seguridad automatizada. El registry de npm está bloqueado (403), así que no se añaden dependencias (Vitest, Testing Library). Se usa el **runner integrado de Node** (`node --test`), disponible en Node 24, sin instalar nada.

## Usuarios / actores
- Developer/Agente.

## Historias de usuario
- H14: Como developer quiero ejecutar `npm test` y saber en segundos si rompí la lógica de datos o de compra.

## Requisitos funcionales (EARS)
- RF-63: CUANDO se ejecuta `npm test`, EL SISTEMA corre la suite con `node --test` sin dependencias nuevas.
- RF-64: EL SISTEMA cubre con tests las utilidades de formato y cálculo (precio, descuento, fecha, envío).
- RF-65: EL SISTEMA cubre con tests la capa de datos: filtros por categoría/marca/talla/color/precio, orden, búsqueda y catálogo local.
- RF-66: EL SISTEMA cubre con tests la lógica pura de carrito y favoritos (agregar, agrupar, cantidad, quitar, totales, alternar).
- RF-67: EL SISTEMA cubre con tests la integridad del catálogo local (ids únicos, campos obligatorios, categorías y colores válidos).
- RF-68: `npm run lint` y `npm run build` siguen en verde y el comando de tests queda documentado en `AGENTS.md`.

## Requisitos no funcionales
- Los tests son deterministas y no dependen de red ni de la BD.
- La lógica a probar vive en módulos `.js` puros (sin JSX) para poder ejecutarse en Node.

## Casos límite
- Filtro sin resultados → array vacío.
- `buscar('')` → array vacío.
- Cantidad 0 → elimina la línea.
- Producto repetido con misma talla/color → incrementa cantidad.

## Fuera de alcance
- Tests de componentes React (requieren transformador JSX; el registry bloquea Testing Library).
- Tests end-to-end de la API PHP/MySQL (cubiertos en las validaciones manuales 001–003).

## Criterios de finalización
- `npm test` en verde con al menos las 5 áreas cubiertas.
- `lint` y `build` en verde.
- `AGENTS.md` documenta el comando.
