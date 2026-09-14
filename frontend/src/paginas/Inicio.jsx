import BannerPrincipal from '../secciones/inicio/BannerPrincipal';
import CategoriasPopulares from '../secciones/inicio/CategoriasPopulares';
import LanzamientosDestacados from '../secciones/inicio/LanzamientosDestacados';
import Editorial from '../secciones/inicio/Editorial';
import { useSeo } from '../utils/seo';

export default function Inicio() {
  useSeo(
    'ZARA — Moda online',
    'Nueva colección de moda para mujer, hombre y niños. Envíos gratis a partir de 30 € y devoluciones en 30 días.',
  );

  return (
    <>
      <BannerPrincipal />
      <CategoriasPopulares />
      <LanzamientosDestacados />
      <Editorial />
    </>
  );
}
