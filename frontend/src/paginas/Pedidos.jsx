import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCuenta } from '../contextos/contextos';
import { apiActiva, obtenerPedidos } from '../servicios/api';
import { formatearFecha, formatearPrecio } from '../utils/formato';
import { useSeo } from '../utils/seo';
import EstadoVacio from '../componentes/ui/EstadoVacio';
import Breadcrumbs from '../componentes/ui/Breadcrumbs';

const estados = {
  pending: 'Pendiente',
  processing: 'En proceso',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
};

export default function Pedidos() {
  const { usuario } = useCuenta();
  const [pedidos, setPedidos] = useState(null);

  useSeo('Mis pedidos — ZARA', 'Consulta el historial y el estado de tus pedidos.');

  useEffect(() => {
    if (!apiActiva || !usuario) return undefined;
    let activo = true;
    obtenerPedidos()
      .then((datos) => {
        if (activo) setPedidos(datos);
      })
      .catch(() => {
        if (activo) setPedidos([]);
      });
    return () => {
      activo = false;
    };
  }, [usuario]);

  if (!usuario) {
    return (
      <div className="contenedor">
        <EstadoVacio
          titulo="Inicia sesión"
          mensaje="Inicia sesión para consultar tus pedidos."
        >
          <Link to="/login" className="boton-primario">
            Iniciar sesión
          </Link>
        </EstadoVacio>
      </div>
    );
  }

  const cargando = apiActiva && pedidos === null;
  const lista = pedidos ?? [];

  return (
    <div className="contenedor">
      <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Mis pedidos' }]} />
      <h1 className="font-titulo text-3xl sm:text-4xl">Mis pedidos</h1>

      <div className="pb-20 pt-10">
        {cargando && <p className="text-sm text-gris-medio">Cargando pedidos…</p>}

        {!cargando && lista.length === 0 && (
          <EstadoVacio
            titulo="Todavía no tienes pedidos"
            mensaje="Cuando confirmes una compra aparecerá aquí."
          >
            <Link to="/catalogo" className="boton-primario">
              Ir al catálogo
            </Link>
          </EstadoVacio>
        )}

        {!cargando && lista.length > 0 && (
          <ul className="space-y-8">
            {lista.map((pedido) => (
              <li key={pedido.numero} className="border border-borde">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-borde px-5 py-4">
                  <div>
                    <p className="etiqueta">{pedido.numero}</p>
                    <p className="mt-1 text-xs text-gris-medio">{formatearFecha(pedido.fecha)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{estados[pedido.estado] ?? pedido.estado}</p>
                    <p className="mt-1 text-sm">{formatearPrecio(pedido.total)}</p>
                  </div>
                </div>

                <ul className="divide-y divide-borde">
                  {pedido.items.map((item, indice) => (
                    <li key={`${pedido.numero}-${indice}`} className="flex items-center gap-4 px-5 py-4">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        loading="lazy"
                        className="h-16 w-12 object-cover"
                      />
                      <div className="flex-1 text-sm">
                        <p>{item.nombre}</p>
                        <p className="text-xs text-gris-medio">
                          x{item.cantidad} · {formatearPrecio(item.precio)}
                        </p>
                      </div>
                      <span className="text-sm">{formatearPrecio(item.total)}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
