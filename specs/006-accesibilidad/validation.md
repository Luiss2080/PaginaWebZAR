# Validación — Spec 006 (Accesibilidad de overlays y menús)

Fecha: 2026-09-14. Entorno: `npm run dev` (Vite) y `npm test` (Node).

| RF | Verificación | Método | Resultado |
|---|---|---|---|
| RF-76 | Carrito: el foco entra y 8 `Tab` seguidos se mantienen dentro; `body` con `overflow: hidden`. Buscador: bloquea el scroll | Navegador | Cumple |
| RF-77 | `Escape` cierra y devuelve el foco al disparador (buscador → botón "Buscar"; carrito → botón "Carrito") | Navegador | Cumple |
| RF-78 | Al abrir el buscador el foco está en el campo (`type=search`); el carrito enfoca su primer control | Navegador | Cumple |
| RF-79 | El menú de cuenta se cierra al hacer clic fuera | Navegador | Cumple |
| RF-80 | El contador del carrito tiene `aria-live="polite"` | Navegador | Cumple |

## Resultado
```
npm test        -> 36/36 (incluye 5 tests de siguienteEnfoque)
npm run test:api -> 19/19
npm run lint    -> sin avisos
npm run build   -> verde
```

## Cierre técnico
- La decisión de foco se aisló en `utils/enfoque.js` (`siguienteEnfoque`) para poder probarla sin DOM.
- jsdom/no se pudo instalar (registry 403), por eso la interacción DOM se verificó manualmente en el navegador.

## Veredicto
**Spec 006 cumplida.** Los overlays atrapan el foco, bloquean el scroll, restauran el foco al cerrar y el menú de cuenta se cierra al clic fuera.
