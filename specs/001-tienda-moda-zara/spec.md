# Spec 001 — Tienda de moda tipo Zara (SPA)

## Contexto y objetivo
El repo contiene una app PHP MVC legada con un catálogo de moda en MySQL (`multishop_db`: categorías de ropa, marcas y productos). Sobre ese backend se está construyendo una SPA en React, pero hoy la SPA no compila (imports rotos) y muestra una identidad de sneakers con estética negra/roja. Esta iteración reorienta la SPA a una tienda de moda editorial tipo Zara, la conecta al backend por una API JSON y añade las funcionalidades básicas de e-commerce (catálogo, detalle, carrito, búsqueda, favoritos y cuenta). El objetivo es tener una experiencia de compra navegable, coherente y verificable.

## Usuarios / actores
- **Visitante:** explora el catálogo sin cuenta.
- **Clienta/o:** añade al carrito, guarda favoritos y navega su cuenta.
- **Developer/Agente:** mantiene el código y la spec sincronizados.

## Historias de usuario
- H1: Como visitante quiero ver una home editorial para entender la marca y entrar al catálogo.
- H2: Como visitante quiero filtrar y ordenar productos para encontrar lo que busco.
- H3: Como visitante quiero ver el detalle de un producto con tallas y colores antes de comprar.
- H4: Como clienta/o quiero un carrito visible y persistente para no perder lo que seleccioné.
- H5: Como visitante quiero buscar por texto para llegar rápido a un producto.
- H6: Como visitante quiero guardar favoritos para volver a ellos después.
- H7: Como clienta/o quiero iniciar sesión o registrarme para ver mi cuenta.
- H8: Como visitante quiero respuestas claras ante errores, estados vacíos y rutas inexistentes.

## Requisitos funcionales (criterios de aceptación en EARS)

### Estética y navegación
- RF-1: EL SISTEMA presenta todas las páginas con la estética editorial definida en la constitución (fondo blanco, titulares serif, texto sans, espacio en blanco generoso).
- RF-2: EL SISTEMA muestra en todas las páginas una cabecera con barra de avisos, logotipo ZARA, navegación por categorías y acciones de buscar, favoritos, cuenta y carrito.
- RF-3: CUANDO el usuario hace scroll, EL SISTEMA mantiene la cabecera visible en la parte superior.
- RF-4: MIENTRAS el ancho del viewport sea menor a 1024px, EL SISTEMA ofrece la navegación en un menú móvil desplegable.
- RF-5: EL SISTEMA muestra un pie de página con enlaces de compra, soporte, newsletter y avisos legales en todas las páginas.

### Inicio
- RF-6: CUANDO el usuario visita `/`, EL SISTEMA muestra un hero editorial, las categorías principales y una selección de productos destacados obtenidos de la capa de datos.

### Catálogo
- RF-7: CUANDO el usuario visita `/catalogo`, EL SISTEMA lista los productos en una grilla con imagen, nombre, precio y precio anterior cuando exista.
- RF-8: CUANDO el usuario aplica filtros por categoría, talla, color o rango de precio, EL SISTEMA filtra el listado y refleja los filtros en la URL.
- RF-9: CUANDO el usuario cambia el orden entre novedad, precio ascendente y precio descendente, EL SISTEMA reordena el listado.
- RF-10: SI la combinación de filtros no devuelve resultados, ENTONCES EL SISTEMA muestra un estado vacío con una acción para limpiar los filtros.
- RF-11: MIENTRAS los productos se están cargando, EL SISTEMA muestra marcadores de carga (skeleton) en la grilla.

### Detalle de producto
- RF-12: CUANDO el usuario visita `/producto/{id}`, EL SISTEMA muestra galería de imágenes, nombre, precio, descripción y selectores de talla y color.
- RF-13: SI el producto solicitado no existe, ENTONCES EL SISTEMA muestra la página 404.
- RF-14: CUANDO el usuario selecciona talla y color y pulsa "Añadir al carrito", EL SISTEMA agrega el artículo con esas opciones al carrito.
- RF-15: SI el usuario intenta añadir un producto sin seleccionar talla, ENTONCES EL SISTEMA muestra un mensaje de validación y no agrega el artículo.
- RF-16: EL SISTEMA muestra en el detalle productos relacionados de la misma categoría.

### Carrito
- RF-17: CUANDO el usuario agrega un artículo, EL SISTEMA abre el panel lateral del carrito y muestra el artículo añadido.
- RF-18: EL SISTEMA muestra en la cabecera un contador con la suma de unidades del carrito.
- RF-19: CUANDO el usuario cambia la cantidad o elimina un artículo, EL SISTEMA recalcula el subtotal y el total.
- RF-20: SI el carrito está vacío, ENTONCES EL SISTEMA muestra un estado vacío con un enlace al catálogo.
- RF-21: EL SISTEMA persiste el carrito en el almacenamiento local y lo restaura al recargar la página.
- RF-22: CUANDO el usuario agrega dos veces el mismo producto con la misma talla y color, EL SISTEMA incrementa la cantidad de la línea existente.

### Búsqueda
- RF-23: CUANDO el usuario pulsa la acción de búsqueda, EL SISTEMA abre un panel de búsqueda con el campo de texto enfocado.
- RF-24: CUANDO el usuario escribe al menos 2 caracteres, EL SISTEMA muestra resultados en vivo.
- RF-25: SI la búsqueda no tiene coincidencias, ENTONCES EL SISTEMA muestra un mensaje de sin resultados.
- RF-26: CUANDO el usuario presiona `Escape` o cierra el panel, EL SISTEMA cierra la búsqueda.

### Favoritos
- RF-27: CUANDO el usuario pulsa el control de favorito en un producto, EL SISTEMA alterna su estado de favorito.
- RF-28: CUANDO el usuario visita `/favoritos`, EL SISTEMA muestra los productos marcados como favoritos.
- RF-29: EL SISTEMA persiste los favoritos en el almacenamiento local.
- RF-30: SI no hay favoritos, ENTONCES EL SISTEMA muestra un estado vacío con enlace al catálogo.

### Cuenta
- RF-31: CUANDO el usuario visita `/login` o `/registro`, EL SISTEMA muestra el formulario correspondiente.
- RF-32: SI el formulario de cuenta tiene campos vacíos o inválidos, ENTONCES EL SISTEMA muestra errores por campo y no envía el formulario.
- RF-33: CUANDO el usuario envía credenciales válidas en `/login`, EL SISTEMA inicia una sesión local y muestra el nombre en la cabecera.
- RF-34: CUANDO el usuario cierra sesión, EL SISTEMA limpia la sesión y vuelve al estado de invitado.

### Datos y API
- RF-35: EL SISTEMA obtiene categorías y productos exclusivamente a través de `src/servicios/api.js`, sin listas hardcodeadas en los componentes.
- RF-36: CUANDO `VITE_API_BASE` está definido, EL SISTEMA consume los endpoints JSON reales del backend PHP: `/api/productos`, `/api/productos/{id}`, `/api/categorias`, `/api/marcas` y `/api/buscar?q=...`.
- RF-37: SI el backend no responde o devuelve un catálogo vacío, ENTONCES EL SISTEMA usa los datos locales de respaldo y muestra un aviso no bloqueante.

> Nota de verdad: la base de datos `multishop_db` usa columnas distintas a `database/schema.sql` (`is_active`, `is_featured`, `sale_price`, `image`; no existen `brands` ni `product_images`). La API consulta el esquema real y completa con valores por defecto los campos ausentes (tallas, colores).

### Otros
- RF-38: CUANDO el usuario visita una ruta inexistente, EL SISTEMA muestra una página 404 con enlace al inicio.
- RF-39: EL SISTEMA muestra páginas estáticas de envíos, devoluciones, guía de tallas, contacto, términos y privacidad con contenido de la marca.
- RF-40: CUANDO el usuario se suscribe al newsletter con un email válido, EL SISTEMA confirma la operación; SI el email es inválido, ENTONCES muestra un error.
- RF-41: EL SISTEMA actualiza el título del documento según la página activa.

## Requisitos no funcionales
- **Rendimiento:** primera carga útil de JS objetivo < 400 KB gzip; imágenes con `loading="lazy"` salvo el hero.
- **Responsive:** correcto desde 360px hasta 1920px, mobile-first.
- **Accesibilidad:** contraste AA, foco visible, roles/aria en drawer, buscador y menú, navegación por teclado.
- **Idioma:** toda la UI en español.
- **SEO básico:** `lang="es"`, título y meta descripción por página.
- **Sin dependencias nuevas** fuera del stack de la constitución.

## Casos límite
- Producto sin imagen o sin precio anterior: mostrar placeholder y ocultar el precio tachado.
- Cantidad que baja a 0: eliminar la línea del carrito.
- `localStorage` no disponible: mantener el estado en memoria sin romper la app.
- Datos del backend incompletos (campos nulos): no renderizar `undefined` ni romper.
- Imagen de producto lenta o rota: mostrar fondo neutro.

## Fuera de alcance
- Pago real y pasarelas.
- Autenticación de servidor con sesiones/roles y hash de contraseñas.
- Envío real de emails y newsletter.
- Panel de administración.
- Validación de stock y reserva de inventario en servidor.
- Rediseño de la app PHP legada.

## Criterios de finalización
- Todos los RF tienen verificación manual registrada en la tabla de validación del plan.
- `npm run lint` y `npm run build` en verde en `frontend/`.
- El flujo principal (inicio → catálogo → detalle → carrito → favoritos → cuenta) funciona en `npm run dev`.
- No queda ninguna importación rota ni referencia a `components/` en inglés.

## Dudas abiertas
- Ninguna. Decisión tomada: el seed local es un catálogo de moda de demostración con las mismas categorías de `database/schema.sql` (Mujer, Hombre, Niños, Accesorios), ampliado con tallas y colores. Se documenta como respaldo en `plan.md`.
