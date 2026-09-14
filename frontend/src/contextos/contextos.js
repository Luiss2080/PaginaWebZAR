import { createContext, useContext } from 'react';

export const CarritoContexto = createContext(null);
export const FavoritosContexto = createContext(null);
export const CuentaContexto = createContext(null);
export const BusquedaContexto = createContext(null);

export function useCarrito() {
  const contexto = useContext(CarritoContexto);
  if (!contexto) throw new Error('useCarrito debe usarse dentro de CarritoProveedor');
  return contexto;
}

export function useFavoritos() {
  const contexto = useContext(FavoritosContexto);
  if (!contexto) throw new Error('useFavoritos debe usarse dentro de FavoritosProveedor');
  return contexto;
}

export function useCuenta() {
  const contexto = useContext(CuentaContexto);
  if (!contexto) throw new Error('useCuenta debe usarse dentro de CuentaProveedor');
  return contexto;
}

export function useBusqueda() {
  const contexto = useContext(BusquedaContexto);
  if (!contexto) throw new Error('useBusqueda debe usarse dentro de BusquedaProveedor');
  return contexto;
}
