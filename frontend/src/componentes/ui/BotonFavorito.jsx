import { Heart } from 'lucide-react';
import { useFavoritos } from '../../contextos/contextos';

export default function BotonFavorito({ productoId, className = '', conEtiqueta = false }) {
  const { esFavorito, alternar } = useFavoritos();
  const activo = esFavorito(productoId);

  const alternarSinPropagar = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    alternar(productoId);
  };

  return (
    <button
      type="button"
      onClick={alternarSinPropagar}
      aria-pressed={activo}
      aria-label={activo ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      className={`inline-flex items-center gap-2 text-tinta transition-opacity hover:opacity-60 ${className}`}
    >
      <Heart
        size={20}
        strokeWidth={1.5}
        className={activo ? 'fill-tinta' : ''}
      />
      {conEtiqueta && (
        <span className="etiqueta">{activo ? 'En favoritos' : 'Añadir a favoritos'}</span>
      )}
    </button>
  );
}
