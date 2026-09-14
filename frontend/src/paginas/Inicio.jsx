import { useEffect } from 'react';
import BannerPrincipal from '../secciones/inicio/BannerPrincipal';
import CategoriasPopulares from '../secciones/inicio/CategoriasPopulares';
import LanzamientosDestacados from '../secciones/inicio/LanzamientosDestacados';
import Editorial from '../secciones/inicio/Editorial';

export default function Inicio() {
  useEffect(() => {
    document.title = 'ZARA — Moda online';
  }, []);

  return (
    <>
      <BannerPrincipal />
      <CategoriasPopulares />
      <LanzamientosDestacados />
      <Editorial />
    </>
  );
}
