import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import EstadoVacio from '../componentes/ui/EstadoVacio';

export default function NoEncontrado() {
  useEffect(() => {
    document.title = 'Página no encontrada — ZARA';
  }, []);

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
