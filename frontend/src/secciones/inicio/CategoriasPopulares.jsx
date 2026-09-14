import { Link } from 'react-router-dom';
import { useCategorias } from '../../servicios/hooks';

export default function CategoriasPopulares() {
  const categorias = useCategorias();

  return (
    <section className="py-16 lg:py-24">
      <div className="contenedor">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="etiqueta text-gris-medio">Comprar por</p>
            <h2 className="mt-2 font-titulo text-3xl sm:text-4xl">Categorías</h2>
          </div>
          <Link to="/catalogo" className="etiqueta border-b border-tinta pb-1">
            Ver todo
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categorias.map((categoria) => (
            <Link
              key={categoria.slug}
              to={`/catalogo?categoria=${categoria.slug}`}
              className="group block"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gris">
                <img
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 etiqueta">{categoria.nombre}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
