import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calcularDescuento,
  calcularEnvio,
  formatearFecha,
  formatearPrecio,
} from './formato.js';

test('formatearPrecio formatea números en euros', () => {
  assert.match(formatearPrecio(49.95), /49,95/);
  assert.match(formatearPrecio(0), /0,00/);
});

test('formatearPrecio devuelve cadena vacía con valores inválidos', () => {
  assert.equal(formatearPrecio(null), '');
  assert.equal(formatearPrecio(undefined), '');
  assert.equal(formatearPrecio('no-es-numero'), '');
});

test('calcularDescuento calcula el porcentaje y descarta casos sin oferta', () => {
  assert.equal(calcularDescuento(49.95, 59.95), 17);
  assert.equal(calcularDescuento(50, null), 0);
  assert.equal(calcularDescuento(60, 50), 0);
  assert.equal(calcularDescuento(50, 50), 0);
});

test('formatearFecha devuelve vacío sin valor y formatea con año', () => {
  assert.equal(formatearFecha(''), '');
  assert.match(formatearFecha('2026-09-14 10:57:21'), /2026/);
});

test('calcularEnvio es gratis a partir de 30 € y 3,95 € por debajo', () => {
  assert.equal(calcularEnvio(30), 0);
  assert.equal(calcularEnvio(120), 0);
  assert.equal(calcularEnvio(29.99), 3.95);
});
