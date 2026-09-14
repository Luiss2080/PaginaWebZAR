export const claveLinea = (productoId, talla, color) => `${productoId}::${talla}::${color}`;

export function agregarLinea(lineas, producto, { talla, color, cantidad = 1 }) {
  const idLinea = claveLinea(producto.id, talla, color);
  const existente = lineas.find((linea) => linea.idLinea === idLinea);
  if (existente) {
    return lineas.map((linea) =>
      linea.idLinea === idLinea ? { ...linea, cantidad: linea.cantidad + cantidad } : linea,
    );
  }
  return [
    ...lineas,
    {
      idLinea,
      productoId: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagenes?.[0] ?? '',
      talla,
      color,
      cantidad,
    },
  ];
}

export function cambiarCantidadLinea(lineas, idLinea, cantidad) {
  if (cantidad <= 0) {
    return lineas.filter((linea) => linea.idLinea !== idLinea);
  }
  return lineas.map((linea) => (linea.idLinea === idLinea ? { ...linea, cantidad } : linea));
}

export function quitarLinea(lineas, idLinea) {
  return lineas.filter((linea) => linea.idLinea !== idLinea);
}

export function calcularTotales(lineas) {
  const totalUnidades = lineas.reduce((total, linea) => total + linea.cantidad, 0);
  const subtotal = lineas.reduce((total, linea) => total + linea.precio * linea.cantidad, 0);
  return { totalUnidades, subtotal };
}

export function alternarFavorito(ids, id) {
  return ids.some((guardado) => String(guardado) === String(id))
    ? ids.filter((guardado) => String(guardado) !== String(id))
    : [...ids, id];
}
