# AGENTS.md — PaginaWebZAR

## Proyecto
Tienda de moda online. La interfaz activa es una SPA en **React 19 + Vite 7 + Tailwind CSS v4 + react-router-dom v7 + framer-motion** ubicada en `frontend/`. La estética objetivo es la de una tienda de moda editorial (tipo Zara): fondo blanco, tipografías serif/sans, mucho espacio en blanco y fotografía grande.

El repositorio también contiene una aplicación heredada en **PHP 8 MVC puro** (`app/`, `config/`, `database/`, `index.php`) con MySQL (`multishop_db`). Esa app sirve HTML y se conserva como backend de datos: la SPA la consume a través de una nueva API JSON (`/api/...`). No se rediseña la app PHP.

## Comandos
- Instalar SPA: `npm install` (en `frontend/`)
- Ejecutar SPA (dev): `npm run dev` (en `frontend/`, Vite en `http://localhost:5173`)
- Build: `npm run build` (en `frontend/`)
- Lint: `npm run lint` (en `frontend/`, oxlint)
- Tests: `npm test` (en `frontend/`, runner integrado de Node `node --test`; no añade dependencias)
- Backend PHP: `php -S localhost:8080 index.php` (en la raíz; sirve la API `/api/...` y la app legada)
- API desde la SPA: copiar `frontend/.env.example` a `frontend/.env` (activa el proxy `/api` → `:8080`)
- Base de datos: `php scripts/migracion_catalogo.php` (migración idempotente: marcas, variantes, imágenes y usuario demo `demo@zara.test` / `demo1234`)

## Estilo y convenciones
- Idioma del código, carpetas, comentarios y mensajes de UI: **español** (`componentes`, `paginas`, `secciones`, `servicios`, `contextos`, `datos`).
- El nombre del archivo debe coincidir con el nombre del componente y con su export. No mezclar `components/` y `componentes/`.
- Componentes funcionales y hooks. Estado global con Context + `useReducer`; no añadir librerías de estado.
- Tailwind v4 con tokens en `src/index.css` (`@theme`). No usar valores mágicos de color repetidos: usar tokens.
- Sin `console.log` en el código entregado. Sin `any` implícito en lógica nueva.

## Reglas
- Leer `docs/constitution.md` y la spec activa (`specs/001-tienda-moda-zara/spec.md`) antes de tocar código.
- El catálogo **nunca** se hardcodea dentro de componentes: todo pasa por `src/servicios/api.js`.
- No añadir dependencias nuevas sin aprobación explícita.
- No modificar la app PHP salvo para añadir la API JSON en `app/controllers/`.
- No tocar `config/database.php` ni `config/app.php` (credenciales).

## Al terminar cualquier tarea
- Ejecutar `npm run lint`, `npm test` y `npm run build` en `frontend/` y dejarlos en verde.
- Verificar manualmente el flujo afectado en `npm run dev`.
- Actualizar el checkbox de la tarea en `specs/001-tienda-moda-zara/tasks.md`.
