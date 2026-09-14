import { useCallback, useEffect, useMemo, useState } from 'react';
import { CarritoContexto } from './contextos';
import {
  agregarLinea,
  calcularTotales,
  cambiarCantidadLinea,
  quitarLinea,
} from './reductores';
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
      setLineas((previas) => agregarLinea(previas, producto, { talla, color, cantidad }));
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
      setLineas((previas) => cambiarCantidadLinea(previas, idLinea, cantidad));
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
      setLineas((previas) => quitarLinea(previas, idLinea));
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
    const { totalUnidades, subtotal } = calcularTotales(lineas);

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
