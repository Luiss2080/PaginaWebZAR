import { useCallback, useEffect, useMemo, useState } from 'react';
import { CuentaContexto } from './contextos';
import { guardar, leer } from '../servicios/almacenamiento';
import {
  apiActiva,
  cerrarSesionApi,
  iniciarSesionApi,
  obtenerCuenta,
  registrarApi,
} from '../servicios/api';

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
  const [usuario, setUsuario] = useState(() => (apiActiva ? null : leer(CLAVE, null)));

  useEffect(() => {
    if (apiActiva) return undefined;
    guardar(CLAVE, usuario);
    return undefined;
  }, [usuario]);

  useEffect(() => {
    if (!apiActiva) return undefined;
    let activo = true;
    obtenerCuenta()
      .then((datos) => {
        if (activo) setUsuario(datos?.usuario ?? null);
      })
      .catch(() => {});
    return () => {
      activo = false;
    };
  }, []);

  const iniciarSesion = useCallback(async ({ email, password }) => {
    if (apiActiva) {
      try {
        const datos = await iniciarSesionApi({ email, password });
        setUsuario(datos.usuario);
        return { ok: true };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    }
    setUsuario({ nombre: nombreDesdeEmail(email), email });
    return { ok: true };
  }, []);

  const registrar = useCallback(async ({ nombre, email, password }) => {
    if (apiActiva) {
      try {
        const datos = await registrarApi({ nombre, email, password });
        setUsuario(datos.usuario);
        return { ok: true };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    }
    setUsuario({ nombre, email });
    return { ok: true };
  }, []);

  const cerrarSesion = useCallback(async () => {
    if (apiActiva) {
      try {
        await cerrarSesionApi();
      } catch {
        /* sin conexión */
      }
    }
    setUsuario(null);
  }, []);

  const valor = useMemo(
    () => ({ usuario, iniciarSesion, registrar, cerrarSesion }),
    [usuario, iniciarSesion, registrar, cerrarSesion],
  );

  return <CuentaContexto.Provider value={valor}>{children}</CuentaContexto.Provider>;
}
