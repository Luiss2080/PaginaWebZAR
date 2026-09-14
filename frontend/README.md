# ZARA — SPA de moda

Interfaz de tienda de moda editorial construida con **React 19 + Vite + Tailwind CSS v4 + react-router-dom v7 + framer-motion**.

## Comandos
```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # build de producción
npm run lint     # oxlint
```

## Datos (dos modos)
- **Respaldo local (por defecto):** usa el catálogo de `src/datos/catalogo.js`. No requiere backend.
- **API PHP:** copia `.env.example` a `.env` (con `VITE_API_BASE=`). La SPA consume `/api/productos`, `/api/categorias`, `/api/marcas` y `/api/buscar` a través del proxy de Vite (`/api` → `http://localhost:8080`). En este modo el **carrito**, los **favoritos** y la **sesión** también se guardan en MySQL (usuario demo `demo@zara.test` / `demo1234`).

Arranca el backend y aplica la migración en la raíz del repositorio:
```bash
php scripts/migracion_catalogo.php   # crea/siembra brands, variantes, imágenes y usuario demo
php -S localhost:8080 index.php
```

Si el backend no responde (o devuelve un catálogo vacío), la SPA cae al respaldo local y muestra un aviso. Toda lectura de datos pasa por `src/servicios/api.js`.

## Estructura
```
src/
├── componentes/layout/   Topbar, Header, Footer, Layout
├── componentes/ui/       ProductoCard, DrawerCarrito, PanelBusqueda, ...
├── secciones/inicio/     BannerPrincipal, CategoriasPopulares, ...
├── paginas/              Inicio, Catalogo, DetalleProducto, Favoritos, Login, ...
├── contextos/            Carrito, Favoritos, Cuenta y Búsqueda (Context + useReducer)
├── servicios/            api.js, hooks.js, almacenamiento.js
└── datos/                catalogo.js (respaldo local)
```

## Documentación SDD
- `../docs/constitution.md`
- `../specs/001-tienda-moda-zara/spec.md`, `plan.md`, `tasks.md`, `validation.md`
