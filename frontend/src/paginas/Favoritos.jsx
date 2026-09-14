import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavoritos } from '../contextos/contextos';
import { useProductos } from '../servicios/hooks';
import ProductoCard from '../componentes/ui/ProductoCard';
import SkeletonGrilla from '../componentes/ui/SkeletonGrilla';
import EstadoVacio from '../componentes/ui/EstadoVacio';
import Breadcrumbs from '../componentes/ui/Breadcrumbs';

export default function Favoritos() {
  const { ids } = useFavoritos();
  const { productos, cargando } = useProductos({});

  useEffect(() => {
    document.title = 'Favoritos — ZARA';
  }, []);

  const favoritos = productos.filter((producto) =>
    ids.some((id) => String(id) === String(producto.id)),
  );

  return (
    <div className="contenedor">
      <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Favoritos' }]} />

      <h1 className="font-titulo text-3xl sm:text-4xl">Favoritos</h1>

      <div className="pb-20 pt-10">
        {cargando && <SkeletonGrilla cantidad={4} />}

        {!cargando && favoritos.length === 0 && (
          <EstadoVacio
            titulo="Todavía no tienes favoritos"
            mensaje="Guarda las prendas que te gusten para encontrarlas más rápido."
          >
            <Link to="/catalogo" className="boton-primario">
              Explorar catálogo
            </Link>
          </EstadoVacio>
        )}

        {!cargando && favoritos.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {favoritos.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
