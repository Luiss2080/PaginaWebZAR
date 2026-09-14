import { Link } from 'react-router-dom';
import BotonFavorito from './BotonFavorito';
import { calcularDescuento, formatearPrecio } from '../../utils/formato';

export default function ProductoCard({ producto }) {
  const descuento = calcularDescuento(producto.precio, producto.precioAnterior);

  return (
    <Link to={`/producto/${producto.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gris">
        <img
          src={producto.imagenes[0]}
          alt={producto.nombre}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {producto.imagenes[1] && (
          <img
            src={producto.imagenes[1]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        <div className="absolute left-3 top-3 flex flex-col items-start gap-2">
          {producto.novedad && (
            <span className="bg-blanco px-2 py-1 text-[10px] uppercase tracking-[0.18em]">
              Nuevo
            </span>
          )}
          {descuento > 0 && (
            <span className="bg-tinta px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-blanco">
              -{descuento}%
            </span>
          )}
        </div>

        <BotonFavorito
          productoId={producto.id}
          className="absolute right-3 top-3 z-10 bg-blanco/85 p-2"
        />
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-normal leading-snug">{producto.nombre}</h3>
        <p className="mt-1 text-sm">
          <span>{formatearPrecio(producto.precio)}</span>
          {descuento > 0 && (
            <span className="ml-2 text-gris-medio line-through">
              {formatearPrecio(producto.precioAnterior)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
