import { useEffect, useMemo, useReducer } from 'react';
import { FavoritosContexto } from './contextos';
import { guardar, leer } from '../servicios/almacenamiento';

const CLAVE = 'zara-favoritos';

function reductor(estado, accion) {
  switch (accion.type) {
    case 'alternar':
      return estado.includes(accion.id)
        ? estado.filter((id) => id !== accion.id)
        : [...estado, accion.id];
    case 'limpiar':
      return [];
    default:
      return estado;
  }
}

export default function FavoritosProveedor({ children }) {
  const [ids, despachar] = useReducer(reductor, [], () => leer(CLAVE, []));

  useEffect(() => {
    guardar(CLAVE, ids);
  }, [ids]);

  const valor = useMemo(
    () => ({
      ids,
      total: ids.length,
      esFavorito: (id) => ids.some((guardado) => String(guardado) === String(id)),
      alternar: (id) => despachar({ type: 'alternar', id }),
      limpiar: () => despachar({ type: 'limpiar' }),
    }),
    [ids],
  );

  return <FavoritosContexto.Provider value={valor}>{children}</FavoritosContexto.Provider>;
}
