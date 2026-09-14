import test from 'node:test';
import assert from 'node:assert/strict';
import {
  alternarFavorito,
  agregarLinea,
  calcularTotales,
  cambiarCantidadLinea,
  claveLinea,
  quitarLinea,
} from './reductores.js';

const producto = { id: 1, nombre: 'Vestido', precio: 50, imagenes: ['/img/1.jpg'] };

test('agregarLinea crea una línea nueva con su clave', () => {
  const lineas = agregarLinea([], producto, { talla: 'M', color: 'Negro', cantidad: 2 });
  assert.equal(lineas.length, 1);
  assert.equal(lineas[0].cantidad, 2);
  assert.equal(lineas[0].idLinea, claveLinea(1, 'M', 'Negro'));
  assert.equal(lineas[0].imagen, '/img/1.jpg');
});

test('agregarLinea agrupa misma talla y color incrementando cantidad', () => {
  let lineas = agregarLinea([], producto, { talla: 'M', color: 'Negro', cantidad: 1 });
  lineas = agregarLinea(lineas, producto, { talla: 'M', color: 'Negro', cantidad: 3 });
  assert.equal(lineas.length, 1);
  assert.equal(lineas[0].cantidad, 4);
});

test('distinta talla o color crea una línea independiente', () => {
  let lineas = agregarLinea([], producto, { talla: 'M', color: 'Negro' });
  lineas = agregarLinea(lineas, producto, { talla: 'L', color: 'Negro' });
  lineas = agregarLinea(lineas, producto, { talla: 'M', color: 'Blanco' });
  assert.equal(lineas.length, 3);
});

test('cambiarCantidadLinea actualiza la cantidad', () => {
  let lineas = agregarLinea([], producto, { talla: 'M', color: 'Negro', cantidad: 2 });
  lineas = cambiarCantidadLinea(lineas, lineas[0].idLinea, 5);
  assert.equal(lineas[0].cantidad, 5);
});

test('cambiarCantidadLinea a 0 elimina la línea', () => {
  const lineas = agregarLinea([], producto, { talla: 'M', color: 'Negro', cantidad: 2 });
  assert.equal(cambiarCantidadLinea(lineas, lineas[0].idLinea, 0).length, 0);
  assert.equal(cambiarCantidadLinea(lineas, lineas[0].idLinea, -1).length, 0);
});

test('quitarLinea elimina solo la línea indicada', () => {
  let lineas = agregarLinea([], producto, { talla: 'M', color: 'Negro' });
  lineas = agregarLinea(lineas, producto, { talla: 'L', color: 'Negro' });
  lineas = quitarLinea(lineas, lineas[0].idLinea);
  assert.equal(lineas.length, 1);
});

test('calcularTotales suma unidades y subtotal', () => {
  let lineas = agregarLinea([], producto, { talla: 'M', color: 'Negro', cantidad: 2 });
  lineas = agregarLinea(lineas, producto, { talla: 'L', color: 'Negro', cantidad: 1 });
  const { totalUnidades, subtotal } = calcularTotales(lineas);
  assert.equal(totalUnidades, 3);
  assert.equal(subtotal, 150);
});

test('calcularTotales de un carrito vacío es cero', () => {
  assert.deepEqual(calcularTotales([]), { totalUnidades: 0, subtotal: 0 });
});

test('alternarFavorito agrega, no duplica y quita', () => {
  let ids = alternarFavorito([], 3);
  assert.deepEqual(ids, [3]);
  ids = alternarFavorito(ids, 3);
  assert.deepEqual(ids, []);
});

test('alternarFavorito compara ids como texto', () => {
  const ids = alternarFavorito([3], '3');
  assert.deepEqual(ids, []);
});
