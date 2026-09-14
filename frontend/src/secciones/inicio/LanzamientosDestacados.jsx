import { Link } from 'react-router-dom';
import { useProductos } from '../../servicios/hooks';
import ProductoCard from '../../componentes/ui/ProductoCard';
import SkeletonGrilla from '../../componentes/ui/SkeletonGrilla';

export default function LanzamientosDestacados() {
  const { productos, cargando } = useProductos({});
  const destacados = productos.filter((producto) => producto.destacado).slice(0, 8);

  return (
    <section className="border-t border-borde py-16 lg:py-24">
      <div className="contenedor">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="etiqueta text-gris-medio">Selección</p>
            <h2 className="mt-2 font-titulo text-3xl sm:text-4xl">Destacados</h2>
          </div>
          <Link to="/catalogo" className="etiqueta border-b border-tinta pb-1">
            Ver todo
          </Link>
        </div>

        <div className="mt-10">
          {cargando ? (
            <SkeletonGrilla cantidad={4} />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
              {destacados.map((producto) => (
                <ProductoCard key={producto.id} producto={producto} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
