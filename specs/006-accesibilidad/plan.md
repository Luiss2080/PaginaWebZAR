# Plan 006 — Accesibilidad de overlays y menús

## 1. Módulos
| Archivo | Rol | RF |
|---|---|---|
| `src/utils/enfoque.js` | función pura `siguienteEnfoque` + selector `FOCALIZABLES` | RF-76 |
| `src/servicios/accesibilidad.js` | hooks `useOverlayAccesible` y `useCierreExterior` | RF-76..RF-79 |
| `src/componentes/ui/DrawerCarrito.jsx` | usa la trampa de foco y el bloqueo de scroll | RF-76, RF-77, RF-78 |
| `src/componentes/ui/PanelBusqueda.jsx` | idem + foco en el buscador | RF-76..RF-78 |
| `src/componentes/layout/Header.jsx` | cierre del menú de cuenta al clic fuera; `aria-live` | RF-79, RF-80 |

## 2. Diseño
- `useOverlayAccesible(abierto, alCerrar)` devuelve un `ref` para el contenedor del diálogo; guarda el disparador (foco previo), bloquea el scroll, atrapa `Tab` y restaura el foco al cerrar.
- `useCierreExterior(abierto, alCerrar)` devuelve un `ref` y cierra al `mousedown` fuera.
- La decisión de a dónde mover el foco se delega en `siguienteEnfoque(total, actual, shift)`, pura y testeable.

## 3. Tests
- `src/utils/enfoque.test.js` cubre `siguienteEnfoque` (avance, retroceso, ciclos, lista vacía, índice fuera de rango).
- La interacción real con el DOM se verifica a mano (jsdom no se puede instalar).

## 4. Cobertura
| Área | RF |
|---|---|
| Trampa de foco + scroll | RF-76 |
| Escape + restaurar foco | RF-77 |
| Foco inicial | RF-78 |
| Clic exterior (cuenta) | RF-79 |
| aria-live carrito | RF-80 |

## 5. Riesgos
- **Re-render que recree la llamada de cierre:** el hook guarda `alCerrar` en un `ref` para no re-suscribir el efecto en cada render.
