import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useBusqueda } from '../../contextos/contextos';
import { buscar } from '../../servicios/api';
import { formatearPrecio } from '../../utils/formato';

export default function PanelBusqueda() {
  const { abierta, termino, cerrar, cambiarTermino } = useBusqueda();
  const [resultados, setResultados] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!abierta) return undefined;
    const enfocar = setTimeout(() => inputRef.current?.focus(), 50);
    const alPulsar = (evento) => {
      if (evento.key === 'Escape') cerrar();
    };
    window.addEventListener('keydown', alPulsar);
    return () => {
      clearTimeout(enfocar);
      window.removeEventListener('keydown', alPulsar);
    };
  }, [abierta, cerrar]);

  useEffect(() => {
    let activo = true;
    buscar(termino).then((datos) => {
      if (activo) setResultados(datos);
    });
    return () => {
      activo = false;
    };
  }, [termino]);

  if (!abierta) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Buscar productos">
      <button
        type="button"
        aria-label="Cerrar búsqueda"
        onClick={cerrar}
        className="absolute inset-0 h-full w-full cursor-default bg-tinta/40"
      />

      <div className="absolute inset-x-0 top-0 max-h-[85vh] overflow-y-auto bg-blanco">
        <div className="contenedor py-8">
          <div className="flex items-center justify-between gap-6">
            <input
              ref={inputRef}
              type="search"
              value={termino}
              onChange={(evento) => cambiarTermino(evento.target.value)}
              placeholder="Buscar prendas, categorías o marcas…"
              className="w-full border-b border-tinta bg-transparent pb-3 text-xl outline-none placeholder:text-gris-medio"
            />
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar búsqueda"
              className="p-2 transition-opacity hover:opacity-60"
            >
              <X size={22} />
            </button>
          </div>

          <div className="mt-8">
            {termino.trim().length < 2 && (
              <p className="text-sm text-gris-medio">
                Escribe al menos 2 caracteres para ver resultados.
              </p>
            )}

            {termino.trim().length >= 2 && resultados.length === 0 && (
              <p className="text-sm text-gris-medio">
                No hay resultados para “{termino}”. Prueba con otra palabra.
              </p>
            )}

            {resultados.length > 0 && (
              <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {resultados.map((producto) => (
                  <li key={producto.id}>
                    <Link to={`/producto/${producto.id}`} onClick={cerrar} className="group block">
                      <div className="aspect-[3/4] overflow-hidden bg-gris">
                        <img
                          src={producto.imagenes[0]}
                          alt={producto.nombre}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="mt-2 text-sm">{producto.nombre}</p>
                      <p className="text-sm text-gris-medio">{formatearPrecio(producto.precio)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
