import test from 'node:test';
import assert from 'node:assert/strict';
import { FOCALIZABLES, siguienteEnfoque } from './enfoque.js';

test('FOCALIZABLES es un selector no vacío', () => {
  assert.equal(typeof FOCALIZABLES, 'string');
  assert.ok(FOCALIZABLES.includes('button'));
});

test('siguienteEnfoque avanza y cicla al principio', () => {
  assert.equal(siguienteEnfoque(3, 0, false), 1);
  assert.equal(siguienteEnfoque(3, 1, false), 2);
  assert.equal(siguienteEnfoque(3, 2, false), 0);
});

test('siguienteEnfoque retrocede y cicla al final', () => {
  assert.equal(siguienteEnfoque(3, 2, true), 1);
  assert.equal(siguienteEnfoque(3, 0, true), 2);
});

test('siguienteEnfoque arranca por un extremo si el índice está fuera', () => {
  assert.equal(siguienteEnfoque(3, -1, false), 0);
  assert.equal(siguienteEnfoque(3, -1, true), 2);
  assert.equal(siguienteEnfoque(3, 99, false), 0);
});

test('siguienteEnfoque con lista vacía devuelve -1', () => {
  assert.equal(siguienteEnfoque(0, 0, false), -1);
  assert.equal(siguienteEnfoque(0, -1, true), -1);
});
