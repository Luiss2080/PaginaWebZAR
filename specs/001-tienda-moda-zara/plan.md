# Plan 001 — Tienda de moda tipo Zara (SPA)

> Lee `docs/constitution.md` y `specs/001-tienda-moda-zara/spec.md`. Este plan no contiene código.

## 1. Arquitectura objetivo

```
frontend/src/
├── main.jsx                 # bootstrap + providers
├── App.jsx                  # Router y rutas
├── index.css                # tokens @theme + estilos base
├── datos/
│   └── catalogo.js          # seed local (respaldo del backend)
├── servicios/
│   ├── api.js               # única puerta de datos (RF-35/36/37)
│   └── almacenamiento.js    # helpers de localStorage (RF-21/29)
├── contextos/
│   ├── CarritoContexto.jsx  # RF-17..22
│   ├── FavoritosContexto.jsx# RF-27..30
│   ├── CuentaContexto.jsx   # RF-31..34
│   └── BusquedaContexto.jsx # RF-23..26
├── componentes/
│   ├── layout/  Topbar, Header, Footer, Layout  (RF-2..5)
│   └── ui/      ProductoCard, DrawerCarrito, PanelBusqueda, BotonFavorito,
│                SelectorCantidad, EstadoVacio, SkeletonGrilla, Breadcrumbs
├── secciones/inicio/  BannerPrincipal, CategoriasPopulares,
│                      LanzamientosDestacados, Editorial              (RF-6)
└── paginas/  Inicio, Catalogo, DetalleProducto, Favoritos,
             Login, Registro, NoEncontrado, Estatica                (RF-7..41)
```

Backend (mínimo, dentro de la regla "solo `app/controllers/`"):

```
app/controllers/ApiControlador.php   # JSON: products, categorias, marcas, buscar
```

## 2. Modelo de datos (contrato compartido)

```js
Producto = {
  id, nombre, slug, descripcion,
  precio, precioAnterior,            // number | null
  categoria,                         // slug: 'mujer' | 'hombre' | 'ninos' | 'accesorios'
  marca,                             // 'zara' | 'nike' | 'adidas' | 'hm'
  imagenes: string[],
  tallas: string[],
  colores: { nombre, hex }[],
  destacado: boolean, novedad: boolean
}
Categoria = { id, nombre, slug, descripcion, imagen }
LineaCarrito = { idLinea, productoId, nombre, precio, imagen, talla, color, cantidad }
Usuario = { nombre, email }
```

El seed local replica la estructura de `multishop_db` (categorías de ropa, marcas y los productos de `database/schema.sql`), ampliado con tallas/colores para poder cumplir RF-12 y RF-14.

## 3. Decisiones técnicas

- **Capa de datos con dos adaptadores (`servicios/api.js`).** Si `VITE_API_BASE` está definido se usa `fetch` contra la API PHP; si no, se usa el seed local. Ante fallo de red se degrada al seed y se marca `usandoRespaldo` (RF-37).
  - *Alternativa descartada:* importar el JSON del backend en build. No permite RF-36 ni refleja cambios del backend.
- **Estado global con Context + `useReducer`.** Carrito, favoritos y cuenta se persisten en `localStorage`.
  - *Alternativa descartada:* Redux/Zustand. La constitución prohíbe nuevas dependencias de estado.
- **API PHP sin tocar el enrutador.** `app/core/App.php` ya cae a `ucfirst($url[0]).'Controlador'`, así que `/api/...` resuelve solo a `ApiControlador`. Solo se crea el controlador (permite cumplir la regla del AGENTS.md).
  - *Alternativa descartada:* modificar `App.php` con una rama `/api`.
- **Proxy de Vite** `/api → http://localhost:8080` para evitar CORS en desarrollo.
- **Tailwind v4 con tokens `@theme`** (colores y fuentes). Se eliminan los valores mágicos `#050505`/`#E63946`.
- **framer-motion** se conserva solo para transiciones sutiles (fade/slide); se eliminan glows y marquesinas ruidosas.
- **Rutas:** `/`, `/catalogo`, `/producto/:id`, `/favoritos`, `/login`, `/registro`, `/pagina/:slug`, `*`.

## 4. Estrategia de verificación

No hay runner de tests en el proyecto (no se añade dependencia). La verificación es:
1. `npm run lint` (oxlint) y `npm run build` en verde por cada tarea.
2. Checklist manual por RF en `npm run dev`.
3. Tabla de validación final RF ↔ dónde se comprueba ↔ resultado, al cerrar T16.
4. Para el backend: `php -S localhost:8080 index.php` + comprobar `/api/products` y `/api/categories`.

## 5. Cobertura de requisitos

| Módulo | RF |
|---|---|
| Layout (Topbar/Header/Footer) | RF-2, RF-3, RF-4, RF-5 |
| Inicio | RF-1, RF-6 |
| Catálogo | RF-7, RF-8, RF-9, RF-10, RF-11 |
| Detalle | RF-12, RF-13, RF-14, RF-15, RF-16 |
| Carrito | RF-17..22 |
| Búsqueda | RF-23..26 |
| Favoritos | RF-27..30 |
| Cuenta | RF-31..34 |
| Servicios/Datos | RF-35, RF-36, RF-37 |
| Genéricos | RF-38, RF-39, RF-40, RF-41 |

## 6. Riesgos y mitigaciones
- **Backend no arranca, DB vacía o responde vacío:** `api.js` degrada al seed local y muestra un aviso no bloqueante.
- **Esquema real distinto a `schema.sql`:** la DB viva usa `is_active`/`is_featured`/`sale_price`/`image` y no tiene `brands`; `ApiControlador` consulta esas columnas y completa tallas/colores por defecto, sin tocar los modelos legados.
- **Imágenes de la API:** se sirven desde `frontend/public/img/` (copia de `public/img/`) para que Vite las entregue sin depender del docroot de PHP.
- **Enrutado PHP en servidor integrado:** se documenta `php -S localhost:8080 index.php`.
- **Alcance amplio:** tareas pequeñas y cada una con lint+build verde evita deuda acumulada.
