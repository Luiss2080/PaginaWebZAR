import { useCallback, useEffect, useMemo, useState } from 'react';
import { FavoritosContexto } from './contextos';
import { guardar, leer } from '../servicios/almacenamiento';
import { alternarFavorito, apiActiva, obtenerFavoritos } from '../servicios/api';

const CLAVE = 'zara-favoritos';

export default function FavoritosProveedor({ children }) {
  const [ids, setIds] = useState(() => (apiActiva ? [] : leer(CLAVE, [])));

  useEffect(() => {
    if (apiActiva) return undefined;
    guardar(CLAVE, ids);
    return undefined;
  }, [ids]);

  useEffect(() => {
    if (!apiActiva) return undefined;
    let activo = true;
    obtenerFavoritos()
      .then((datos) => {
        if (activo) setIds(datos);
      })
      .catch(() => {});
    return () => {
      activo = false;
    };
  }, []);

  const alternar = useCallback(async (id) => {
    if (apiActiva) {
      try {
        setIds(await alternarFavorito(id));
      } catch {
        /* sin conexión */
      }
    } else {
      setIds((previos) =>
        previos.some((guardado) => String(guardado) === String(id))
          ? previos.filter((guardado) => String(guardado) !== String(id))
          : [...previos, id],
      );
    }
  }, []);

  const valor = useMemo(
    () => ({
      ids,
      total: ids.length,
      esFavorito: (id) => ids.some((guardado) => String(guardado) === String(id)),
      alternar,
      limpiar: () => setIds([]),
    }),
    [ids, alternar],
  );

  return <FavoritosContexto.Provider value={valor}>{children}</FavoritosContexto.Provider>;
}
