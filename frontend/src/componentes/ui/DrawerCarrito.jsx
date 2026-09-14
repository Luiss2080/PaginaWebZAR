import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, X } from 'lucide-react';
import { useCarrito } from '../../contextos/contextos';
import { formatearPrecio } from '../../utils/formato';
import SelectorCantidad from './SelectorCantidad';
import EstadoVacio from './EstadoVacio';

export default function DrawerCarrito() {
  const { lineas, abierto, cerrar, cambiarCantidad, quitar, vaciar, subtotal, totalUnidades } =
    useCarrito();

  useEffect(() => {
    if (!abierto) return undefined;
    const alPulsar = (evento) => {
      if (evento.key === 'Escape') cerrar();
    };
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [abierto, cerrar]);

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Carrito de compra">
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={cerrar}
        className="absolute inset-0 h-full w-full cursor-default bg-tinta/40"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-blanco">
        <header className="flex items-center justify-between border-b border-borde px-6 py-5">
          <h2 className="etiqueta">Carrito ({totalUnidades})</h2>
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar carrito"
            className="p-1 transition-opacity hover:opacity-60"
          >
            <X size={20} />
          </button>
        </header>

        {lineas.length === 0 ? (
          <EstadoVacio
            titulo="Tu carrito está vacío"
            mensaje="Explora la nueva colección y añade tus prendas favoritas."
          >
            <Link to="/catalogo" onClick={cerrar} className="boton-primario">
              Ir al catálogo
            </Link>
          </EstadoVacio>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6">
              {lineas.map((linea) => (
                <li key={linea.idLinea} className="flex gap-4 border-b border-borde py-5">
                  <img
                    src={linea.imagen}
                    alt={linea.nombre}
                    className="h-28 w-20 flex-none object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-4">
                      <p className="text-sm leading-snug">{linea.nombre}</p>
                      <button
                        type="button"
                        onClick={() => quitar(linea.idLinea)}
                        aria-label={`Quitar ${linea.nombre}`}
                        className="text-gris-medio transition-colors hover:text-tinta"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gris-medio">
                      {linea.talla} · {linea.color}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <SelectorCantidad
                        valor={linea.cantidad}
                        onCambiar={(cantidad) => cambiarCantidad(linea.idLinea, cantidad)}
                      />
                      <span className="text-sm">{formatearPrecio(linea.precio * linea.cantidad)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-borde px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="etiqueta">Subtotal</span>
                <span className="text-base">{formatearPrecio(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-gris-medio">
                Gastos de envío calculados en el siguiente paso.
              </p>
              <Link to="/checkout" onClick={cerrar} className="boton-primario mt-5 w-full">
                Tramitar pedido
              </Link>
              <button
                type="button"
                onClick={vaciar}
                className="mt-3 w-full text-xs uppercase tracking-[0.2em] text-gris-medio transition-colors hover:text-tinta"
              >
                Vaciar carrito
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
