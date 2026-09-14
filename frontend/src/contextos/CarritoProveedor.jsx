import { useCallback, useEffect, useMemo, useState } from 'react';
import { CarritoContexto } from './contextos';
import { guardar, leer } from '../servicios/almacenamiento';
import {
  agregarCarrito,
  apiActiva,
  cambiarCantidadCarrito,
  obtenerCarrito,
  quitarCarrito,
  vaciarCarrito,
} from '../servicios/api';

const CLAVE = 'zara-carrito';

const claveLinea = (productoId, talla, color) => `${productoId}::${talla}::${color}`;

function agregarLocal(lineas, producto, { talla, color, cantidad }) {
  const idLinea = claveLinea(producto.id, talla, color);
  const existente = lineas.find((linea) => linea.idLinea === idLinea);
  if (existente) {
    return lineas.map((linea) =>
      linea.idLinea === idLinea ? { ...linea, cantidad: linea.cantidad + cantidad } : linea,
    );
  }
  return [
    ...lineas,
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

function cambiarLocal(lineas, idLinea, cantidad) {
  if (cantidad <= 0) return lineas.filter((linea) => linea.idLinea !== idLinea);
  return lineas.map((linea) => (linea.idLinea === idLinea ? { ...linea, cantidad } : linea));
}

export default function CarritoProveedor({ children }) {
  const [lineas, setLineas] = useState(() => (apiActiva ? [] : leer(CLAVE, [])));
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (apiActiva) return undefined;
    guardar(CLAVE, lineas);
    return undefined;
  }, [lineas]);

  useEffect(() => {
    if (!apiActiva) return undefined;
    let activo = true;
    obtenerCarrito()
      .then((datos) => {
        if (activo) setLineas(datos);
      })
      .catch(() => {});
    return () => {
      activo = false;
    };
  }, []);

  const agregar = useCallback(async (producto, { talla, color, cantidad = 1 }) => {
    setAbierto(true);
    if (apiActiva) {
      try {
        setLineas(await agregarCarrito({ productoId: producto.id, talla, color, cantidad }));
      } catch {
        /* sin conexión: se mantiene el estado actual */
      }
    } else {
      setLineas((previas) => agregarLocal(previas, producto, { talla, color, cantidad }));
    }
  }, []);

  const cambiarCantidad = useCallback(async (idLinea, cantidad) => {
    if (apiActiva) {
      try {
        setLineas(await cambiarCantidadCarrito(idLinea, cantidad));
      } catch {
        /* sin conexión */
      }
    } else {
      setLineas((previas) => cambiarLocal(previas, idLinea, cantidad));
    }
  }, []);

  const quitar = useCallback(async (idLinea) => {
    if (apiActiva) {
      try {
        setLineas(await quitarCarrito(idLinea));
      } catch {
        /* sin conexión */
      }
    } else {
      setLineas((previas) => previas.filter((linea) => linea.idLinea !== idLinea));
    }
  }, []);

  const vaciar = useCallback(async () => {
    if (apiActiva) {
      try {
        setLineas(await vaciarCarrito());
      } catch {
        /* sin conexión */
      }
    } else {
      setLineas([]);
    }
  }, []);

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
      agregar,
      quitar,
      cambiarCantidad,
      vaciar,
    };
  }, [lineas, abierto, agregar, quitar, cambiarCantidad, vaciar]);

  return <CarritoContexto.Provider value={valor}>{children}</CarritoContexto.Provider>;
}
