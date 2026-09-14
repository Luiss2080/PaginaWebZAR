import { useEffect } from 'react';

function actualizarMeta(nombre, contenido) {
  let etiqueta = document.querySelector(`meta[name="${nombre}"]`);
  if (!etiqueta) {
    etiqueta = document.createElement('meta');
    etiqueta.setAttribute('name', nombre);
    document.head.appendChild(etiqueta);
  }
  etiqueta.setAttribute('content', contenido);
}

export function useSeo(titulo, descripcion) {
  useEffect(() => {
    if (titulo) document.title = titulo;
    if (descripcion) actualizarMeta('description', descripcion);
  }, [titulo, descripcion]);
}
