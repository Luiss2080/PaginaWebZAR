# Validación — Spec 001 (Tienda de moda tipo Zara)

Fecha: 2026-09-14. Entorno: `npm run dev` (Vite :5173) y `php -S localhost:8080 index.php`.
Métodos: **Navegador** (Playwright, local seed), **API** (modo `VITE_API_BASE` con PHP+MySQL), **Código** (revisión).

| RF | Verificación | Método | Resultado |
|---|---|---|---|
| RF-1 | Estética editorial en home y catálogo | Navegador | Cumple |
| RF-2 | Cabecera con topbar, logo ZARA, nav y acciones | Navegador | Cumple |
| RF-3 | `sticky top-0` en la cabecera | Código | Cumple |
| RF-4 | Menú móvil a 390px | Navegador | Cumple |
| RF-5 | Pie con columnas, newsletter y legal | Navegador | Cumple |
| RF-6 | Home con hero, categorías y destacados | Navegador | Cumple |
| RF-7 | Catálogo lista productos con precio y tachado | Navegador | Cumple |
| RF-8 | `?categoria=mujer` filtra y refleja en URL; `?marca=adidas` → 2 productos | Navegador | Cumple |
| RF-9 | Selector de orden (novedad/precio) | Código | Cumple |
| RF-10 | Estado vacío con "Limpiar filtros" | Código | Cumple |
| RF-11 | Skeleton mientras carga | Código | Cumple |
| RF-12 | Detalle con galería, talla y color (`/producto/1`) | Navegador | Cumple |
| RF-13 | Producto inexistente → 404 | Código | Cumple |
| RF-14 | Añadir con talla abre el carrito | Navegador | Cumple |
| RF-15 | Añadir sin talla muestra error y no añade | Navegador | Cumple |
| RF-16 | Bloque "También te puede interesar" | Navegador | Cumple |
| RF-17 | El drawer se abre al añadir | Navegador | Cumple |
| RF-18 | Contador del carrito en cabecera | Navegador | Cumple |
| RF-19 | Subtotal recalcula (49,95 €) | Navegador | Cumple |
| RF-20 | Estado vacío del carrito con enlace | Código | Cumple |
| RF-21 | Carrito persiste tras navegar (localStorage) | Navegador | Cumple |
| RF-22 | Mismo producto+talla+color incrementa cantidad | Código | Cumple |
| RF-23 | Panel de búsqueda abre con foco | Navegador | Cumple |
| RF-24 | "abrigo" devuelve resultados en vivo | Navegador | Cumple |
| RF-25 | Mensaje de sin resultados | Código | Cumple |
| RF-26 | `Escape` cierra carrito y búsqueda | Navegador | Cumple |
| RF-27 | Alternar favorito desde la tarjeta | Navegador | Cumple |
| RF-28 | `/favoritos` lista el producto marcado | Navegador | Cumple |
| RF-29 | Favoritos persisten (localStorage) | Navegador | Cumple |
| RF-30 | Estado vacío de favoritos | Código | Cumple |
| RF-31 | `/login` y `/registro` renderizan | Navegador | Cumple |
| RF-32 | Errores por campo en login | Navegador | Cumple |
| RF-33 | Sesión válida muestra "Ana Garcia" | Navegador | Cumple |
| RF-34 | Cerrar sesión vuelve a invitado | Código | Cumple |
| RF-35 | Todo el catálogo pasa por `servicios/api.js` | Código | Cumple |
| RF-36 | API PHP: `/api/productos` (9), `/api/categorias` (9), `/api/buscar?q=vestido` (1); SPA en modo API con 9 productos y 0 imágenes rotas | API | Cumple |
| RF-37 | Respaldo local si el backend falla o responde vacío + aviso | API/Código | Cumple |
| RF-38 | `/ruta-inexistente` → página 404 | Navegador | Cumple |
| RF-39 | `/pagina/envios` y resto de estáticas | Navegador | Cumple |
| RF-40 | Newsletter valida email y confirma | Código | Cumple |
| RF-41 | Título y meta descripción por página ("Mujer — ZARA", descripción del producto, etc.) | Navegador | Cumple |

## Requisitos no funcionales

| RNF | Verificación | Resultado |
|---|---|---|
| Rendimiento | Build de JS 286 KB (88,6 KB gzip), por debajo del objetivo de 400 KB | Cumple |
| Responsive | Probado a 390px y 1440px | Cumple |
| Accesibilidad | `aria-label`/`aria-pressed`, foco visible, cierre con `Escape`, navegación por teclado | Cumple |
| SEO básico | `lang="es"` + título y `meta[name=description]` por página (`utils/seo.js`) | Cumple |
| Sin dependencias nuevas | `package.json` sin añadidos fuera del stack de la constitución | Cumple |
| Sin `console.log` | `git grep` sin coincidencias en `src/` | Cumple |

## Cierre técnico
- `npm run lint` → sin avisos.
- `npm run build` → correcto (JS 285 KB / 88 KB gzip, CSS 24,7 KB).
- Flujo principal verificado: inicio → catálogo → filtro → detalle → añadir (con y sin talla) → carrito → búsqueda → favoritos → login → 404 → estáticas → móvil.
- Verificado además el modo API contra `multishop_db` real (esquema distinto a `schema.sql`).

## Veredicto
**Spec cumplida.** Los 41 requisitos funcionales tienen verificación registrada y el build/lint están en verde.
