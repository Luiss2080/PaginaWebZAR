import { Link } from 'react-router-dom';
import EstadoVacio from '../componentes/ui/EstadoVacio';
import { useSeo } from '../utils/seo';

export default function NoEncontrado() {
  useSeo(
    'Página no encontrada — ZARA',
    'La página que buscas no existe o ha cambiado de dirección.',
  );

  return (
    <div className="contenedor">
      <EstadoVacio
        titulo="Página no encontrada"
        mensaje="La página que buscas no existe o ha cambiado de dirección."
      >
        <Link to="/" className="boton-primario">
          Volver al inicio
        </Link>
      </EstadoVacio>
    </div>
  );
}
