import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCategorias, useMarcas, useProductos } from '../servicios/hooks';
import ProductoCard from '../componentes/ui/ProductoCard';
import SkeletonGrilla from '../componentes/ui/SkeletonGrilla';
import EstadoVacio from '../componentes/ui/EstadoVacio';
import Breadcrumbs from '../componentes/ui/Breadcrumbs';

const ordenes = [
  { valor: 'novedad', etiqueta: 'Novedades' },
  { valor: 'precio-asc', etiqueta: 'Precio: de menor a mayor' },
  { valor: 'precio-desc', etiqueta: 'Precio: de mayor a menor' },
];

export default function Catalogo() {
  const [parametros, setParametros] = useSearchParams();
  const categorias = useCategorias();
  const marcasApi = useMarcas();
  const { productos: todos } = useProductos({});

  const filtros = useMemo(
    () => ({
      categoria: parametros.get('categoria') || '',
      marcas: (parametros.get('marca') || '').split(',').filter(Boolean),
      tallas: (parametros.get('talla') || '').split(',').filter(Boolean),
      colores: (parametros.get('color') || '').split(',').filter(Boolean),
      precioMin: parametros.get('min') || '',
      precioMax: parametros.get('max') || '',
      orden: parametros.get('orden') || 'novedad',
    }),
    [parametros],
  );

  const { productos, cargando } = useProductos(filtros);

  const marcasDisponibles = useMemo(() => {
    const conjunto = new Set(marcasApi.map((marca) => marca.slug));
    todos.forEach((producto) => {
      if (producto.marca) conjunto.add(producto.marca);
    });
    return [...conjunto].sort();
  }, [marcasApi, todos]);

  const tallasDisponibles = useMemo(
    () => [...new Set(todos.flatMap((producto) => producto.tallas))],
    [todos],
  );

  const coloresDisponibles = useMemo(() => {
    const mapa = new Map();
    todos.forEach((producto) =>
      producto.colores.forEach((color) => mapa.set(color.nombre, color.hex)),
    );
    return [...mapa.entries()].map(([nombre, hex]) => ({ nombre, hex }));
  }, [todos]);

  useEffect(() => {
    const nombre = categorias.find((cat) => cat.slug === filtros.categoria)?.nombre;
    document.title = nombre ? `${nombre} — ZARA` : 'Catálogo — ZARA';
  }, [categorias, filtros.categoria]);

  const actualizar = (clave, valor) => {
    const siguientes = new URLSearchParams(parametros);
    if (valor) siguientes.set(clave, valor);
    else siguientes.delete(clave);
    setParametros(siguientes, { replace: true });
  };

  const alternarLista = (clave, valor) => {
    const actuales = (parametros.get(clave) || '').split(',').filter(Boolean);
    const siguientes = actuales.includes(valor)
      ? actuales.filter((item) => item !== valor)
      : [...actuales, valor];
    actualizar(clave, siguientes.join(','));
  };

  const limpiar = () => setParametros({}, { replace: true });

  return (
    <div className="contenedor">
      <Breadcrumbs
        items={[
          { label: 'Inicio', to: '/' },
          { label: categorias.find((cat) => cat.slug === filtros.categoria)?.nombre || 'Catálogo' },
        ]}
      />

      <div className="grid gap-10 pb-20 lg:grid-cols-[220px_1fr]">
        <aside aria-label="Filtros">
          <div className="flex items-center justify-between">
            <h1 className="etiqueta">Filtrar</h1>
            <button
              type="button"
              onClick={limpiar}
              className="text-xs text-gris-medio underline-offset-4 hover:underline"
            >
              Limpiar
            </button>
          </div>

          <div className="mt-6">
            <h2 className="etiqueta text-gris-medio">Categoría</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {categorias.map((categoria) => (
                <li key={categoria.slug}>
                  <button
                    type="button"
                    onClick={() =>
                      actualizar(
                        'categoria',
                        filtros.categoria === categoria.slug ? '' : categoria.slug,
                      )
                    }
                    className={`text-sm transition-colors hover:text-tinta ${
                      filtros.categoria === categoria.slug ? 'text-tinta' : 'text-gris-medio'
                    }`}
                  >
                    {categoria.nombre}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="etiqueta text-gris-medio">Marca</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {marcasDisponibles.map((marca) => (
                <li key={marca}>
                  <button
                    type="button"
                    onClick={() => alternarLista('marca', marca)}
                    aria-pressed={filtros.marcas.includes(marca)}
                    className={`text-sm capitalize transition-colors hover:text-tinta ${
                      filtros.marcas.includes(marca) ? 'text-tinta' : 'text-gris-medio'
                    }`}
                  >
                    {marca}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="etiqueta text-gris-medio">Talla</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {tallasDisponibles.map((talla) => (
                <button
                  key={talla}
                  type="button"
                  onClick={() => alternarLista('talla', talla)}
                  aria-pressed={filtros.tallas.includes(talla)}
                  className={`border px-3 py-1 text-xs transition-colors ${
                    filtros.tallas.includes(talla)
                      ? 'border-tinta bg-tinta text-blanco'
                      : 'border-borde hover:border-tinta'
                  }`}
                >
                  {talla}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="etiqueta text-gris-medio">Color</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {coloresDisponibles.map((color) => (
                <button
                  key={color.nombre}
                  type="button"
                  onClick={() => alternarLista('color', color.nombre)}
                  aria-label={color.nombre}
                  aria-pressed={filtros.colores.includes(color.nombre)}
                  title={color.nombre}
                  className={`h-6 w-6 rounded-full border transition-transform hover:scale-110 ${
                    filtros.colores.includes(color.nombre)
                      ? 'border-tinta ring-1 ring-tinta ring-offset-2'
                      : 'border-borde'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="etiqueta text-gris-medio">Precio (€)</h2>
            <div className="mt-3 flex items-center gap-2">
              <input
                type="number"
                min="0"
                placeholder="Mín."
                value={filtros.precioMin}
                onChange={(evento) => actualizar('min', evento.target.value)}
                className="campo px-2 py-2"
                aria-label="Precio mínimo"
              />
              <input
                type="number"
                min="0"
                placeholder="Máx."
                value={filtros.precioMax}
                onChange={(evento) => actualizar('max', evento.target.value)}
                className="campo px-2 py-2"
                aria-label="Precio máximo"
              />
            </div>
          </div>
        </aside>

        <section>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gris-medio">
              {cargando ? 'Cargando…' : `${productos.length} productos`}
            </p>
            <label className="flex items-center gap-3 text-sm">
              <span className="etiqueta text-gris-medio">Ordenar</span>
              <select
                value={filtros.orden}
                onChange={(evento) => actualizar('orden', evento.target.value)}
                className="border border-borde bg-blanco px-3 py-2 text-sm outline-none focus:border-tinta"
              >
                {ordenes.map((orden) => (
                  <option key={orden.valor} value={orden.valor}>
                    {orden.etiqueta}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-8">
            {cargando && <SkeletonGrilla cantidad={8} />}

            {!cargando && productos.length === 0 && (
              <EstadoVacio
                titulo="Sin resultados"
                mensaje="No hay productos que cumplan los filtros seleccionados."
              >
                <button type="button" onClick={limpiar} className="boton-primario">
                  Limpiar filtros
                </button>
              </EstadoVacio>
            )}

            {!cargando && productos.length > 0 && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
                {productos.map((producto) => (
                  <ProductoCard key={producto.id} producto={producto} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
