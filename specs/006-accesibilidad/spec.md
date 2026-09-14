# Spec 006 — Accesibilidad de overlays y menús

## Contexto y objetivo
El carrito lateral y el buscador ya cierran con `Escape`, pero no atrapan el foco, no bloquean el scroll del fondo y no devuelven el foco al disparador. El menú de cuenta tampoco se cierra al hacer clic fuera. Esta iteración endurece la accesibilidad para que la app sea usable solo con teclado.

## Usuarios / actores
- Visitante que navega con teclado o lector de pantalla.
- Developer/Agente.

## Historias de usuario
- H16: Como usuario de teclado quiero moverme dentro del carrito sin salir a la página de fondo y volver al botón que lo abrió al cerrarlo.
- H17: Como usuario quiero que el buscador reciba el foco al abrirse y se cierre al pulsar fuera.

## Requisitos funcionales (EARS)
- RF-76: MIENTRAS el carrito o el buscador están abiertos, EL SISTEMA cicla el foco (`Tab`/`Shift+Tab`) solo entre sus elementos y bloquea el scroll del `body`.
- RF-77: CUANDO el usuario cierra un overlay con `Escape`, EL SISTEMA devuelve el foco al elemento que lo abrió.
- RF-78: CUANDO el usuario abre un overlay, EL SISTEMA enfoca su primer elemento interactivo (el campo de búsqueda en el buscador).
- RF-79: CUANDO el usuario hace clic fuera del menú de cuenta, EL SISTEMA lo cierra.
- RF-80: EL SISTEMA anuncia el contador del carrito con `aria-live`.

## Requisitos no funcionales
- El cálculo del siguiente foco es una función pura y testable.
- No se añaden dependencias.

## Casos límite
- Overlay sin elementos enfocables: el foco no se mueve.
- Elemento activo fuera de la lista (p. ej. foco en el `body`): el ciclo empieza por el primer elemento.
- Lista vacía: no hay índice válido.

## Fuera de alcance
- Pruebas DOM automáticas (requieren jsdom, bloqueado por el registry).
- Navegación por `aria-roledescription`.

## Criterios de finalización
- RF-76..RF-80 verificados (una parte con test unitario; el resto manual).
- `npm test`, `npm run test:api`, `lint` y `build` en verde.
