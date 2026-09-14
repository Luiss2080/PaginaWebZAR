# Tareas 001 — Tienda de moda tipo Zara (SPA)

Recordatorio: cada tarea termina con `npm run lint` y `npm run build` en verde en `frontend/`.

- [x] **T1 — Reparar estructura e imports** (RF: criterio de finalización)
  - Unificar `componentes/` y `secciones/`; renombrar archivos para que el nombre coincida con el export; corregir `src/paginas/Inicio.jsx`; borrar `App.css` y assets sin uso; corregir `<title>` e `index.html` (`lang="es"`).
  - Hecho cuando: `npm run build` compila y `Inicio.jsx` importa rutas existentes.

- [x] **T2 — Tokens y estilos globales Zara** (RF-1)
  - Definir en `src/index.css` `@theme` con blanco/negro/gris/borde y fuentes serif+sans; estilos base, foco visible, utilidades tipográficas.
  - Hecho cuando: existe un token por cada color usado y no quedan `#050505`/`#E63946` en componentes.

- [x] **T3 — Capa de datos** (RF-35, RF-36, RF-37)
  - Crear `src/datos/catalogo.js` (seed) y `src/servicios/api.js` (`obtenerProductos`, `obtenerProducto`, `obtenerCategorias`, `obtenerMarcas`, `buscar`) con fallback local.
  - Hecho cuando: los componentes obtienen datos solo desde `api.js` y el fallback se activa sin backend.

- [x] **T4 — Contextos globales** (RF-21, RF-29)
  - `CarritoContexto`, `FavoritosContexto`, `CuentaContexto`, `BusquedaContexto` con `useReducer` + `servicios/almacenamiento.js`.
  - Hecho cuando: los providers envuelven `App` y el estado sobrevive a un refresh.

- [x] **T5 — Layout editorial** (RF-2, RF-3, RF-4, RF-5)
  - `Topbar`, `Header` (logo ZARA, nav categorías, acciones), `Footer`, `Layout`; menú móvil y contador de carrito.
  - Hecho cuando: la cabecera es sticky y el menú móvil abre/cierra a <1024px.

- [x] **T6 — Página de inicio** (RF-6)
  - `BannerPrincipal` editorial, `CategoriasPopulares`, `LanzamientosDestacados`, bloque `Editorial`.
  - Hecho cuando: `/` muestra hero, categorías y destacados desde `api.js`.

- [x] **T7 — Catálogo** (RF-7, RF-8, RF-9, RF-10, RF-11)
  - `/catalogo` con grilla, filtros (categoría, talla, color, precio) en URL, orden, skeleton y estado vacío.
  - Hecho cuando: cambiar un filtro actualiza URL y resultados; sin resultados muestra estado vacío.

- [x] **T8 — Detalle de producto** (RF-12, RF-13, RF-14, RF-15, RF-16)
  - `/producto/:id` con galería, selectores de talla/color, validación, añadir al carrito y relacionados; id inexistente → 404.
  - Hecho cuando: añadir sin talla muestra error y con talla agrega al carrito.

- [x] **T9 — Drawer de carrito** (RF-17, RF-18, RF-19, RF-20, RF-22)
  - Panel lateral con líneas, cantidades, eliminar, subtotal/total, estado vacío y agrupación por talla/color.
  - Hecho cuando: el contador, el total y la persistencia son consistentes.

- [x] **T10 — Panel de búsqueda** (RF-23, RF-24, RF-25, RF-26)
  - Overlay con foco, resultados en vivo desde `buscar()`, sin resultados y cierre con `Escape`.
  - Hecho cuando: escribir ≥2 caracteres lista resultados y `Escape` cierra.

- [x] **T11 — Favoritos** (RF-27, RF-28, RF-30)
  - Botón de favorito en tarjetas/detalle y página `/favoritos` con estado vacío.
  - Hecho cuando: marcar/desmarcar se refleja en `/favoritos` y persiste.

- [x] **T12 — Cuenta** (RF-31, RF-32, RF-33, RF-34)
  - `/login` y `/registro` con validación por campo, sesión local y menú de cuenta en cabecera; logout.
  - Hecho cuando: credenciales válidas muestran el nombre y logout vuelve a invitado.

- [x] **T13 — 404, estáticas y newsletter** (RF-38, RF-39, RF-40)
  - Página 404, `Estatica` por slug (envíos, devoluciones, tallas, contacto, términos, privacidad) y formulario de newsletter con validación.
  - Hecho cuando: ruta inexistente muestra 404 y cada enlace del footer abre su página.

- [x] **T14 — API JSON en PHP** (RF-36)
  - `app/controllers/ApiControlador.php` con `products`, `categorias`, `marcas`, `buscar` devolviendo JSON; proxy `/api` en `vite.config.js`; documentar `php -S localhost:8080 index.php`.
  - Hecho cuando: `GET /api/products` devuelve JSON y la SPA con `VITE_API_BASE` lo consume.

- [x] **T15 — Pulido final** (RF-1, RF-41, NFRs)
  - Responsive 360–1920, accesibilidad (aria, foco, teclado), título por página, SEO básico, lazy-loading de imágenes.
  - Hecho cuando: navegación completa por teclado y sin avisos de lint.

- [x] **T16 — Validación RF por RF**
  - Recorrer la spec RF a RF registrando dónde se comprueba y el resultado; veredicto final.
  - Hecho cuando: la tabla de validación está completa y `lint`/`build` en verde.
