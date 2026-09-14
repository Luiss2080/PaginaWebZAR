import test from 'node:test';
import assert from 'node:assert/strict';
import { categorias, marcas, productos } from './catalogo.js';

test('los ids de producto son únicos', () => {
  const ids = productos.map((producto) => producto.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('cada producto tiene los campos obligatorios', () => {
  for (const producto of productos) {
    assert.ok(producto.id, 'id');
    assert.ok(producto.nombre, 'nombre');
    assert.ok(producto.slug, 'slug');
    assert.equal(typeof producto.precio, 'number');
    assert.ok(producto.imagenes.length > 0, `imágenes de ${producto.nombre}`);
    assert.ok(producto.tallas.length > 0, `tallas de ${producto.nombre}`);
    assert.ok(producto.colores.length > 0, `colores de ${producto.nombre}`);
  }
});

test('categoría y marca de cada producto existen', () => {
  const slugsCategoria = new Set(categorias.map((categoria) => categoria.slug));
  const slugsMarca = new Set(marcas.map((marca) => marca.slug));
  for (const producto of productos) {
    assert.ok(slugsCategoria.has(producto.categoria), `categoría ${producto.categoria}`);
    assert.ok(slugsMarca.has(producto.marca), `marca ${producto.marca}`);
  }
});

test('los colores tienen nombre y hex válidos', () => {
  for (const producto of productos) {
    for (const color of producto.colores) {
      assert.ok(color.nombre, 'nombre de color');
      assert.match(color.hex, /^#[0-9a-fA-F]{6}$/);
    }
  }
});

test('precioAnterior es mayor que precio cuando existe', () => {
  for (const producto of productos) {
    if (producto.precioAnterior !== null) {
      assert.ok(producto.precioAnterior > producto.precio, producto.nombre);
    }
  }
});
