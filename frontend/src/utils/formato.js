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
