import { useEffect, useMemo, useState } from 'react';
import { CuentaContexto } from './contextos';
import { guardar, leer } from '../servicios/almacenamiento';

const CLAVE = 'zara-cuenta';

function nombreDesdeEmail(email) {
  const usuario = String(email).split('@')[0] ?? '';
  return usuario
    .split(/[._-]/)
    .filter(Boolean)
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(' ');
}

export default function CuentaProveedor({ children }) {
  const [usuario, setUsuario] = useState(() => leer(CLAVE, null));

  useEffect(() => {
    guardar(CLAVE, usuario);
  }, [usuario]);

  const valor = useMemo(
    () => ({
      usuario,
      iniciarSesion: ({ email }) => setUsuario({ nombre: nombreDesdeEmail(email), email }),
      registrar: ({ nombre, email }) => setUsuario({ nombre, email }),
      cerrarSesion: () => setUsuario(null),
    }),
    [usuario],
  );

  return <CuentaContexto.Provider value={valor}>{children}</CuentaContexto.Provider>;
}
