import { useMemo, useState } from 'react';
import { BusquedaContexto } from './contextos';

export default function BusquedaProveedor({ children }) {
  const [abierta, setAbierta] = useState(false);
  const [termino, setTermino] = useState('');

  const valor = useMemo(
    () => ({
      abierta,
      termino,
      abrir: () => setAbierta(true),
      cerrar: () => {
        setAbierta(false);
        setTermino('');
      },
      cambiarTermino: (nuevo) => setTermino(nuevo),
    }),
    [abierta, termino],
  );

  return <BusquedaContexto.Provider value={valor}>{children}</BusquedaContexto.Provider>;
}
