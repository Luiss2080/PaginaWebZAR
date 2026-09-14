import { useEffect, useMemo, useReducer, useState } from 'react';
import { CarritoContexto } from './contextos';
import { guardar, leer } from '../servicios/almacenamiento';

const CLAVE = 'zara-carrito';

const claveLinea = (productoId, talla, color) => `${productoId}::${talla}::${color}`;

function reductor(estado, accion) {
  switch (accion.type) {
    case 'agregar': {
      const { producto, talla, color, cantidad } = accion;
      const idLinea = claveLinea(producto.id, talla, color);
      const existente = estado.find((linea) => linea.idLinea === idLinea);
      if (existente) {
        return estado.map((linea) =>
          linea.idLinea === idLinea ? { ...linea, cantidad: linea.cantidad + cantidad } : linea,
        );
      }
      return [
        ...estado,
        {
          idLinea,
          productoId: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagenes?.[0] ?? '',
          talla,
          color,
          cantidad,
        },
      ];
    }
    case 'quitar':
      return estado.filter((linea) => linea.idLinea !== accion.idLinea);
    case 'cantidad': {
      if (accion.cantidad <= 0) {
        return estado.filter((linea) => linea.idLinea !== accion.idLinea);
      }
      return estado.map((linea) =>
        linea.idLinea === accion.idLinea ? { ...linea, cantidad: accion.cantidad } : linea,
      );
    }
    case 'vaciar':
      return [];
    default:
      return estado;
  }
}

export default function CarritoProveedor({ children }) {
  const [lineas, despachar] = useReducer(reductor, [], () => leer(CLAVE, []));
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    guardar(CLAVE, lineas);
  }, [lineas]);

  const valor = useMemo(() => {
    const totalUnidades = lineas.reduce((total, linea) => total + linea.cantidad, 0);
    const subtotal = lineas.reduce((total, linea) => total + linea.precio * linea.cantidad, 0);

    return {
      lineas,
      totalUnidades,
      subtotal,
      abierto,
      abrir: () => setAbierto(true),
      cerrar: () => setAbierto(false),
      agregar: (producto, { talla, color, cantidad = 1 }) => {
        despachar({ type: 'agregar', producto, talla, color, cantidad });
        setAbierto(true);
      },
      quitar: (idLinea) => despachar({ type: 'quitar', idLinea }),
      cambiarCantidad: (idLinea, cantidad) => despachar({ type: 'cantidad', idLinea, cantidad }),
      vaciar: () => despachar({ type: 'vaciar' }),
    };
  }, [lineas, abierto]);

  return <CarritoContexto.Provider value={valor}>{children}</CarritoContexto.Provider>;
}
