import test from 'node:test';
import assert from 'node:assert/strict';
import { buscar, filtrarProductos, obtenerProducto, obtenerProductos } from './api.js';
import { productos } from '../datos/catalogo.js';

test('filtrarProductos por categoría', () => {
  const resultado = filtrarProductos(productos, { categoria: 'mujer' });
  assert.ok(resultado.length > 0);
  assert.ok(resultado.every((producto) => producto.categoria === 'mujer'));
});

test('filtrarProductos por marca', () => {
  const resultado = filtrarProductos(productos, { marcas: ['nike'] });
  assert.ok(resultado.length > 0);
  assert.ok(resultado.every((producto) => producto.marca === 'nike'));
});

test('filtrarProductos por talla', () => {
  const resultado = filtrarProductos(productos, { tallas: ['XS'] });
  assert.ok(resultado.length > 0);
  assert.ok(resultado.every((producto) => producto.tallas.includes('XS')));
});

test('filtrarProductos por color', () => {
  const resultado = filtrarProductos(productos, { colores: ['Negro'] });
  assert.ok(resultado.length > 0);
  assert.ok(
    resultado.every((producto) =>
      producto.colores.some((color) => color.nombre === 'Negro'),
    ),
  );
});

test('filtrarProductos por rango de precio', () => {
  const resultado = filtrarProductos(productos, { precioMin: 20, precioMax: 30 });
  assert.ok(resultado.length > 0);
  assert.ok(resultado.every((producto) => producto.precio >= 20 && producto.precio <= 30));
});

test('filtrarProductos ordena por precio ascendente y descendente', () => {
  const ascendente = filtrarProductos(productos, { orden: 'precio-asc' });
  const descendente = filtrarProductos(productos, { orden: 'precio-desc' });
  for (let i = 1; i < ascendente.length; i += 1) {
    assert.ok(ascendente[i - 1].precio <= ascendente[i].precio);
  }
  for (let i = 1; i < descendente.length; i += 1) {
    assert.ok(descendente[i - 1].precio >= descendente[i].precio);
  }
});

test('filtrarProductos sin coincidencias devuelve array vacío', () => {
  const resultado = filtrarProductos(productos, { categoria: 'mujer', marcas: ['nike'] });
  assert.deepEqual(resultado, []);
});

test('obtenerProductos en modo local devuelve el catálogo', async () => {
  const lista = await obtenerProductos({});
  assert.ok(lista.length >= 16);
});

test('obtenerProducto encuentra por id y devuelve null si no existe', async () => {
  const primero = productos[0];
  const encontrado = await obtenerProducto(primero.id);
  assert.equal(encontrado.id, primero.id);
  assert.equal(await obtenerProducto(999999), null);
});

test('buscar exige al menos 2 caracteres', async () => {
  assert.deepEqual(await buscar('a'), []);
  assert.deepEqual(await buscar(''), []);
});

test('buscar encuentra por nombre', async () => {
  const resultados = await buscar('abrigo');
  assert.ok(resultados.some((producto) => producto.nombre.toLowerCase().includes('abrigo')));
});
