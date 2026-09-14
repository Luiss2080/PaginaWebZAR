export function formatearPrecio(valor) {
  if (valor === null || valor === undefined || Number.isNaN(Number(valor))) return '';
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(Number(valor));
}

export function calcularDescuento(precio, precioAnterior) {
  if (!precioAnterior || precioAnterior <= precio) return 0;
  return Math.round((1 - precio / precioAnterior) * 100);
}

export function formatearFecha(valor) {
  if (!valor) return '';
  const fecha = new Date(String(valor).replace(' ', 'T'));
  if (Number.isNaN(fecha.getTime())) return String(valor);
  return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }).format(
    fecha,
  );
}

export const COSTO_ENVIO = 3.95;
export const MINIMO_ENVIO_GRATIS = 30;

export function calcularEnvio(subtotal) {
  return subtotal >= MINIMO_ENVIO_GRATIS ? 0 : COSTO_ENVIO;
}
