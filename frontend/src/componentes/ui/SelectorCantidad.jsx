import { Minus, Plus } from 'lucide-react';

export default function SelectorCantidad({ valor, onCambiar, min = 1, max = 99 }) {
  const cambiar = (siguiente) => {
    if (siguiente < min || siguiente > max) return;
    onCambiar(siguiente);
  };

  return (
    <div className="inline-flex items-center border border-borde">
      <button
        type="button"
        aria-label="Reducir cantidad"
        onClick={() => cambiar(valor - 1)}
        className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-gris"
      >
        <Minus size={14} />
      </button>
      <span className="w-10 text-center text-sm" aria-live="polite">
        {valor}
      </span>
      <button
        type="button"
        aria-label="Aumentar cantidad"
        onClick={() => cambiar(valor + 1)}
        className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-gris"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
