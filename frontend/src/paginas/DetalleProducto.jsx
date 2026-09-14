import { useState } from 'react';
import { ClipboardCheck, RotateCcw, Truck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useProducto, useProductos } from '../servicios/hooks';
import { useCarrito } from '../contextos/contextos';
import { calcularDescuento, formatearPrecio } from '../utils/formato';
import { useSeo } from '../utils/seo';
import BotonFavorito from '../componentes/ui/BotonFavorito';
import Breadcrumbs from '../componentes/ui/Breadcrumbs';
import ProductoCard from '../componentes/ui/ProductoCard';
import SelectorCantidad from '../componentes/ui/SelectorCantidad';
import NoEncontrado from './NoEncontrado';

export default function DetalleProducto() {
  const { id } = useParams();
  const { producto, cargando } = useProducto(id);
  const { productos } = useProductos({});

  useSeo(
    producto ? `${producto.nombre} — ZARA` : 'Producto — ZARA',
    producto ? producto.descripcion : undefined,
  );

  if (cargando) return <CargandoDetalle />;
  if (!producto) return <NoEncontrado />;

  const relacionados = productos
    .filter((item) => item.categoria === producto.categoria && item.id !== producto.id)
    .slice(0, 4);

  return (
    <div className="contenedor">
      <Breadcrumbs
        items={[
          { label: 'Inicio', to: '/' },
          { label: 'Catálogo', to: '/catalogo' },
          { label: producto.nombre },
        ]}
      />

      <ContenidoDetalle key={producto.id} producto={producto} />

      {relacionados.length > 0 && (
        <section className="border-t border-borde py-16">
          <h2 className="font-titulo text-2xl">También te puede interesar</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {relacionados.map((item) => (
              <ProductoCard key={item.id} producto={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ContenidoDetalle({ producto }) {
  const { agregar } = useCarrito();
  const [imagenActiva, setImagenActiva] = useState(0);
  const [talla, setTalla] = useState('');
  const [color, setColor] = useState(producto.colores[0]?.nombre || 'Única');
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState('');

  const descuento = calcularDescuento(producto.precio, producto.precioAnterior);

  const anadir = () => {
    if (!talla) {
      setError('Selecciona una talla antes de continuar.');
      return;
    }
    setError('');
    agregar(producto, { talla, color, cantidad });
  };

  return (
    <div className="grid gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="aspect-[3/4] overflow-hidden bg-gris">
          <img
            src={producto.imagenes[imagenActiva]}
            alt={producto.nombre}
            className="h-full w-full object-cover"
          />
        </div>
        {producto.imagenes.length > 1 && (
          <div className="mt-4 flex gap-3">
            {producto.imagenes.map((imagen, indice) => (
              <button
                key={imagen}
                type="button"
                onClick={() => setImagenActiva(indice)}
                aria-label={`Ver imagen ${indice + 1}`}
                aria-pressed={imagenActiva === indice}
                className={`h-24 w-20 overflow-hidden border ${
                  imagenActiva === indice ? 'border-tinta' : 'border-transparent'
                }`}
              >
                <img src={imagen} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <p className="etiqueta capitalize text-gris-medio">{producto.marca}</p>
        <h1 className="mt-2 font-titulo text-3xl sm:text-4xl">{producto.nombre}</h1>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-xl">{formatearPrecio(producto.precio)}</span>
          {descuento > 0 && (
            <>
              <span className="text-gris-medio line-through">
                {formatearPrecio(producto.precioAnterior)}
              </span>
              <span className="bg-tinta px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-blanco">
                -{descuento}%
              </span>
            </>
          )}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-gris-medio">{producto.descripcion}</p>

        {producto.colores.length > 0 && (
          <div className="mt-8">
            <p className="etiqueta text-gris-medio">Color: {color}</p>
            <div className="mt-3 flex gap-3">
              {producto.colores.map((opcion) => (
                <button
                  key={opcion.nombre}
                  type="button"
                  onClick={() => setColor(opcion.nombre)}
                  aria-label={opcion.nombre}
                  aria-pressed={color === opcion.nombre}
                  title={opcion.nombre}
                  className={`h-7 w-7 rounded-full border transition-transform hover:scale-110 ${
                    color === opcion.nombre
                      ? 'border-tinta ring-1 ring-tinta ring-offset-2'
                      : 'border-borde'
                  }`}
                  style={{ backgroundColor: opcion.hex }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <p className="etiqueta text-gris-medio">Talla</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {producto.tallas.map((opcion) => (
              <button
                key={opcion}
                type="button"
                onClick={() => {
                  setTalla(opcion);
                  setError('');
                }}
                aria-pressed={talla === opcion}
                className={`min-w-12 border px-3 py-2 text-sm transition-colors ${
                  talla === opcion
                    ? 'border-tinta bg-tinta text-blanco'
                    : 'border-borde hover:border-tinta'
                }`}
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <SelectorCantidad valor={cantidad} onCambiar={setCantidad} max={10} />
          <button type="button" onClick={anadir} className="boton-primario flex-1">
            Añadir al carrito
          </button>
          <BotonFavorito productoId={producto.id} conEtiqueta className="px-2 py-3" />
        </div>

        {error && (
          <p role="alert" className="mt-3 text-sm text-tinta">
            {error}
          </p>
        )}

        <ul className="mt-10 space-y-3 border-t border-borde pt-6 text-sm text-gris-medio">
          <li className="flex items-center gap-3">
            <Truck size={16} /> Envío gratis a partir de 30 €.
          </li>
          <li className="flex items-center gap-3">
            <RotateCcw size={16} /> Devoluciones gratuitas en 30 días.
          </li>
          <li className="flex items-center gap-3">
            <ClipboardCheck size={16} /> Pago seguro en la tienda (demo).
          </li>
        </ul>
      </div>
    </div>
  );
}

function CargandoDetalle() {
  return (
    <div className="contenedor py-20">
      <div className="grid animate-pulse gap-10 lg:grid-cols-2">
        <div className="aspect-[3/4] bg-gris" />
        <div className="space-y-4">
          <div className="h-4 w-1/3 bg-gris" />
          <div className="h-8 w-2/3 bg-gris" />
          <div className="h-4 w-1/4 bg-gris" />
        </div>
      </div>
    </div>
  );
}
