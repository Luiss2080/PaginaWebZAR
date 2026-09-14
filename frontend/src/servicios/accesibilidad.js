import { useEffect, useRef } from 'react';
import { FOCALIZABLES, siguienteEnfoque } from '../utils/enfoque';

function useRefActual(valor) {
  const ref = useRef(valor);
  useEffect(() => {
    ref.current = valor;
  });
  return ref;
}

export function useOverlayAccesible(abierto, alCerrar) {
  const contenedorRef = useRef(null);
  const disparadorRef = useRef(null);
  const cerrarRef = useRefActual(alCerrar);

  useEffect(() => {
    if (!abierto) return undefined;

    disparadorRef.current = document.activeElement;
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const contenedor = contenedorRef.current;
    const elementos = () =>
      Array.from(contenedor?.querySelectorAll(FOCALIZABLES) ?? []);

    const enfocarInicial = setTimeout(() => {
      const lista = elementos();
      (lista[0] ?? contenedor)?.focus?.();
    }, 0);

    const alPulsar = (evento) => {
      if (evento.key === 'Escape') {
        evento.preventDefault();
        cerrarRef.current?.();
        return;
      }
      if (evento.key !== 'Tab') return;

      const lista = elementos();
      if (lista.length === 0) return;

      const indice = lista.indexOf(document.activeElement);
      const siguiente = siguienteEnfoque(lista.length, indice, evento.shiftKey);
      evento.preventDefault();
      lista[siguiente]?.focus();
    };

    document.addEventListener('keydown', alPulsar);
    return () => {
      clearTimeout(enfocarInicial);
      document.removeEventListener('keydown', alPulsar);
      document.body.style.overflow = overflowPrevio;
      const disparador = disparadorRef.current;
      if (disparador && typeof disparador.focus === 'function') {
        disparador.focus();
      }
    };
  }, [abierto, cerrarRef]);

  return contenedorRef;
}

export function useCierreExterior(abierto, alCerrar) {
  const ref = useRef(null);
  const cerrarRef = useRefActual(alCerrar);

  useEffect(() => {
    if (!abierto) return undefined;

    const alPulsar = (evento) => {
      if (ref.current && !ref.current.contains(evento.target)) {
        cerrarRef.current?.();
      }
    };

    document.addEventListener('mousedown', alPulsar);
    return () => document.removeEventListener('mousedown', alPulsar);
  }, [abierto, cerrarRef]);

  return ref;
}
