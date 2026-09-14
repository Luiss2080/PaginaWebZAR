import { useEffect, useState } from 'react';
import { obtenerCategorias, obtenerProducto, obtenerProductos } from './api';

export function useProductos(filtros = {}) {
  const clave = JSON.stringify(filtros);
  const [resultado, setResultado] = useState({ clave: null, productos: [] });

  useEffect(() => {
    let activo = true;
    obtenerProductos(JSON.parse(clave)).then((productos) => {
      if (activo) setResultado({ clave, productos });
    });
    return () => {
      activo = false;
    };
  }, [clave]);

  const cargando = resultado.clave !== clave;
  return { productos: cargando ? [] : resultado.productos, cargando };
}

export function useProducto(id) {
  const [resultado, setResultado] = useState({ id: null, producto: null });

  useEffect(() => {
    let activo = true;
    obtenerProducto(id).then((producto) => {
      if (activo) setResultado({ id, producto });
    });
    return () => {
      activo = false;
    };
  }, [id]);

  const cargando = resultado.id !== id;
  return { producto: cargando ? null : resultado.producto, cargando };
}

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    let activo = true;
    obtenerCategorias().then((datos) => {
      if (activo) setCategorias(datos);
    });
    return () => {
      activo = false;
    };
  }, []);

  return categorias;
}
