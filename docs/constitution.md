# Constitución — PaginaWebZAR

Principios innegociables. Si una tarea entra en conflicto con alguno, se detiene y se consulta.

1. **La verdad única.** El código, la documentación y la spec describen el mismo sistema. Un archivo se llama como el componente que exporta, el componente se importa por esa ruta y la spec solo afirma lo que el código hace.
2. **Estética editorial.** La interfaz sigue el lenguaje de una tienda de moda editorial: blanco, negro, gris y una sola tipografía serif para titulares más una sans para texto. Mucho aire, reglas finas y fotografía grande. Prohibido glow, neón y ruido visual.
3. **Stack cerrado.** React 19 + Vite + Tailwind v4 + react-router-dom v7 + framer-motion. Estado con Context + `useReducer`. No se añaden dependencias de estado, UI ni datos sin aprobación.
4. **Datos por una sola puerta.** El catálogo y las entidades se leen siempre desde `src/servicios/api.js`. Ningún componente contiene listas de productos hardcodeadas.
5. **Accesible y responsive.** Mobile-first, foco visible, navegación por teclado, `alt` en imágenes y contraste AA. Ninguna funcionalidad existe solo en desktop.
6. **Verificación obligatoria.** Ninguna tarea se marca como hecha sin `npm run lint` y `npm run build` en verde y sin comprobar el flujo en el navegador.
