import { useEffect, useState } from 'react';
import { obtenerCategorias, obtenerProducto, obtenerProductos } from './api';

export function useProductos(filtros = {}) {
  const clave = JSON.stringify(filtros);
  const [estado, setEstado] = useState({ productos: [], cargando: true });

  useEffect(() => {
    let activo = true;
    setEstado((previo) => ({ ...previo, cargando: true }));
    obtenerProductos(JSON.parse(clave)).then((productos) => {
      if (activo) setEstado({ productos, cargando: false });
    });
    return () => {
      activo = false;
    };
  }, [clave]);

  return estado;
}

export function useProducto(id) {
  const [estado, setEstado] = useState({ producto: null, cargando: true });

  useEffect(() => {
    let activo = true;
    setEstado({ producto: null, cargando: true });
    obtenerProducto(id).then((producto) => {
      if (activo) setEstado({ producto, cargando: false });
    });
    return () => {
      activo = false;
    };
  }, [id]);

  return estado;
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
