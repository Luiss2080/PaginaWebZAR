import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useCategorias } from '../../servicios/hooks';
import { useBusqueda, useCarrito, useCuenta, useFavoritos } from '../../contextos/contextos';

export default function Header() {
  const categorias = useCategorias();
  const { abrir: abrirBusqueda } = useBusqueda();
  const { totalUnidades, abrir: abrirCarrito } = useCarrito();
  const { total: totalFavoritos } = useFavoritos();
  const { usuario, cerrarSesion } = useCuenta();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [cuentaAbierta, setCuentaAbierta] = useState(false);

  const cerrarTodo = () => {
    setMenuAbierto(false);
    setCuentaAbierta(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-borde bg-blanco">
      <div className="contenedor flex h-16 items-center gap-6">
        <button
          type="button"
          className="lg:hidden"
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto((valor) => !valor)}
        >
          {menuAbierto ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link
          to="/"
          onClick={cerrarTodo}
          className="font-titulo text-3xl font-semibold tracking-[0.28em]"
        >
          ZARA
        </Link>

        <nav aria-label="Categorías" className="hidden flex-1 justify-center gap-8 lg:flex">
          <NavLink to="/catalogo" className="etiqueta transition-opacity hover:opacity-60">
            Nuevos
          </NavLink>
          {categorias.map((categoria) => (
            <NavLink
              key={categoria.slug}
              to={`/catalogo?categoria=${categoria.slug}`}
              className="etiqueta transition-opacity hover:opacity-60"
            >
              {categoria.nombre}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5 lg:ml-0">
          <button
            type="button"
            aria-label="Buscar"
            onClick={abrirBusqueda}
            className="p-1 transition-opacity hover:opacity-60"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          <Link
            to="/favoritos"
            aria-label={`Favoritos (${totalFavoritos})`}
            className="relative hidden p-1 transition-opacity hover:opacity-60 sm:block"
          >
            <Heart size={20} strokeWidth={1.5} />
            {totalFavoritos > 0 && <Contador valor={totalFavoritos} />}
          </Link>

          <div className="relative hidden sm:block">
            <button
              type="button"
              aria-label="Cuenta"
              aria-expanded={cuentaAbierta}
              onClick={() => setCuentaAbierta((valor) => !valor)}
              className="p-1 transition-opacity hover:opacity-60"
            >
              <User size={20} strokeWidth={1.5} />
            </button>

            {cuentaAbierta && (
              <div className="absolute right-0 top-full mt-3 w-56 border border-borde bg-blanco py-2 shadow-sm">
                {usuario ? (
                  <>
                    <p className="px-4 py-2 text-sm font-medium">{usuario.nombre}</p>
                    <Link
                      to="/favoritos"
                      onClick={cerrarTodo}
                      className="block px-4 py-2 text-sm text-gris-medio transition-colors hover:text-tinta"
                    >
                      Mis favoritos
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        cerrarSesion();
                        cerrarTodo();
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gris-medio transition-colors hover:text-tinta"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={cerrarTodo}
                      className="block px-4 py-2 text-sm transition-colors hover:text-gris-medio"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/registro"
                      onClick={cerrarTodo}
                      className="block px-4 py-2 text-sm transition-colors hover:text-gris-medio"
                    >
                      Crear cuenta
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label={`Carrito (${totalUnidades})`}
            onClick={abrirCarrito}
            className="relative p-1 transition-opacity hover:opacity-60"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalUnidades > 0 && <Contador valor={totalUnidades} />}
          </button>
        </div>
      </div>

      {menuAbierto && (
        <nav aria-label="Menú móvil" className="border-t border-borde bg-blanco lg:hidden">
          <div className="contenedor flex flex-col py-2">
            <Link to="/catalogo" onClick={cerrarTodo} className="border-b border-borde py-4 etiqueta">
              Nuevos
            </Link>
            {categorias.map((categoria) => (
              <Link
                key={categoria.slug}
                to={`/catalogo?categoria=${categoria.slug}`}
                onClick={cerrarTodo}
                className="border-b border-borde py-4 etiqueta"
              >
                {categoria.nombre}
              </Link>
            ))}
            <div className="flex gap-6 py-4">
              <Link to="/favoritos" onClick={cerrarTodo} className="etiqueta">
                Favoritos ({totalFavoritos})
              </Link>
              <Link to={usuario ? '/favoritos' : '/login'} onClick={cerrarTodo} className="etiqueta">
                {usuario ? usuario.nombre : 'Iniciar sesión'}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function Contador({ valor }) {
  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-tinta px-1 text-[10px] font-medium text-blanco">
      {valor}
    </span>
  );
}
