#!/usr/bin/env node
/**
 * Pruebas de integración de la API (Spec 005).
 *
 * Uso:  node scripts/pruebas_api.mjs
 *
 * Sin dependencias: usa node:assert y fetch nativos. Arranca el servidor PHP
 * si no está activo y elimina los datos de prueba al terminar.
 */
import { spawn, spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'http://127.0.0.1:8080';

let cookies = '';
let proceso = null;
let arrancadoPorNosotros = false;
let pasadas = 0;
let falladas = 0;

async function disponible() {
  try {
    const respuesta = await fetch(`${BASE}/api/categorias`, {
      signal: AbortSignal.timeout(1000),
    });
    return respuesta.ok;
  } catch {
    return false;
  }
}

async function esperarServidor(intentos = 40) {
  for (let i = 0; i < intentos; i += 1) {
    if (await disponible()) return true;
    await new Promise((resolver) => setTimeout(resolver, 250));
  }
  return false;
}

async function arrancarServidor() {
  if (await disponible()) return;
  proceso = spawn('php', ['-S', '127.0.0.1:8080', 'index.php'], { cwd: raiz, stdio: 'ignore' });
  arrancadoPorNosotros = true;
  if (!(await esperarServidor())) {
    throw new Error('El servidor PHP no respondió en http://127.0.0.1:8080');
  }
}

async function pedir(ruta, opciones = {}) {
  const headers = { ...(opciones.headers || {}) };
  if (cookies) headers.cookie = cookies;
  if (opciones.body !== undefined) headers['content-type'] = 'application/json';

  const respuesta = await fetch(`${BASE}${ruta}`, {
    method: opciones.method || 'GET',
    headers,
    body: opciones.body !== undefined ? JSON.stringify(opciones.body) : undefined,
  });

  const setCookie = respuesta.headers.getSetCookie?.() ?? [];
  if (setCookie.length > 0) {
    cookies = setCookie.map((valor) => valor.split(';')[0]).join('; ');
  }

  const texto = await respuesta.text();
  let datos = null;
  try {
    datos = JSON.parse(texto);
  } catch {
    datos = null;
  }
  return { status: respuesta.status, datos };
}

async function prueba(nombre, fn) {
  try {
    await fn();
    pasadas += 1;
    console.log(`  OK  ${nombre}`);
  } catch (error) {
    falladas += 1;
    console.error(`  X   ${nombre}`);
    console.error(`      ${error.message}`);
  }
}

const direccionPrueba = {
  nombre: 'Prueba API',
  direccion: 'PRUEBA-API',
  ciudad: 'Madrid',
  codigoPostal: '28001',
  pais: 'Espana',
  metodoPago: 'tarjeta',
};

try {
  console.log('API · pruebas de integración\n');
  await arrancarServidor();

  let primerProducto = null;

  console.log('Catálogo (RF-70)');
  await prueba('GET /api/categorias devuelve categorías con slug', async () => {
    const { status, datos } = await pedir('/api/categorias');
    assert.equal(status, 200);
    assert.ok(Array.isArray(datos) && datos.length > 0);
    assert.ok(datos[0].slug);
  });
  await prueba('GET /api/marcas incluye zara', async () => {
    const { status, datos } = await pedir('/api/marcas');
    assert.equal(status, 200);
    assert.ok(datos.some((marca) => marca.slug === 'zara'));
  });
  await prueba('GET /api/productos devuelve el catálogo completo', async () => {
    const { status, datos } = await pedir('/api/productos');
    assert.equal(status, 200);
    assert.ok(Array.isArray(datos) && datos.length > 0);
    primerProducto = datos[0];
    assert.ok(primerProducto.nombre);
    assert.equal(typeof primerProducto.precio, 'number');
    assert.ok(Array.isArray(primerProducto.imagenes) && primerProducto.imagenes.length > 0);
    assert.ok(Array.isArray(primerProducto.tallas));
    assert.ok(Array.isArray(primerProducto.colores));
  });
  await prueba('GET /api/productos/{id} coincide y el inexistente es null', async () => {
    const { datos } = await pedir(`/api/productos/${primerProducto.id}`);
    assert.equal(datos.id, primerProducto.id);
    const inexistente = await pedir('/api/productos/999999');
    assert.equal(inexistente.datos, null);
  });
  await prueba('GET /api/buscar?q= devuelve resultados', async () => {
    const { datos } = await pedir('/api/buscar?q=vestido');
    assert.ok(Array.isArray(datos) && datos.length > 0);
  });

  const productoId = primerProducto.id;

  console.log('\nCarrito (RF-71)');
  await prueba('el carrito empieza vacío', async () => {
    const { datos } = await pedir('/api/carrito');
    assert.ok(Array.isArray(datos));
    assert.equal(datos.length, 0);
  });
  await prueba('agregar crea la línea con cantidad', async () => {
    const { datos } = await pedir('/api/carrito/agregar', {
      method: 'POST',
      body: { productoId, talla: 'M', color: 'Negro', cantidad: 2 },
    });
    assert.equal(datos.length, 1);
    assert.equal(datos[0].cantidad, 2);
  });
  await prueba('agregar la misma variante agrupa la cantidad', async () => {
    const { datos } = await pedir('/api/carrito/agregar', {
      method: 'POST',
      body: { productoId, talla: 'M', color: 'Negro', cantidad: 2 },
    });
    assert.equal(datos.length, 1);
    assert.equal(datos[0].cantidad, 4);
  });
  let idLinea = null;
  await prueba('cambiar cantidad actualiza la línea', async () => {
    const { datos: actual } = await pedir('/api/carrito');
    idLinea = actual[0].idLinea;
    const { datos } = await pedir('/api/carrito/cantidad', {
      method: 'POST',
      body: { id: idLinea, cantidad: 5 },
    });
    assert.equal(datos[0].cantidad, 5);
  });
  await prueba('quitar deja el carrito vacío', async () => {
    const { datos } = await pedir('/api/carrito/quitar', {
      method: 'POST',
      body: { id: idLinea },
    });
    assert.equal(datos.length, 0);
  });

  console.log('\nFavoritos (RF-72)');
  await prueba('alternar agrega y quita', async () => {
    const alta = await pedir('/api/favoritos/alternar', {
      method: 'POST',
      body: { productoId },
    });
    assert.ok(alta.datos.includes(productoId));
    const baja = await pedir('/api/favoritos/alternar', {
      method: 'POST',
      body: { productoId },
    });
    assert.ok(!baja.datos.includes(productoId));
  });

  console.log('\nCuenta (RF-73)');
  await prueba('sin sesión el usuario es null', async () => {
    const { datos } = await pedir('/api/cuenta');
    assert.equal(datos.usuario, null);
  });
  await prueba('credenciales inválidas devuelven 401', async () => {
    const { status } = await pedir('/api/cuenta/login', {
      method: 'POST',
      body: { email: 'demo@zara.test', password: 'incorrecta' },
    });
    assert.equal(status, 401);
  });
  await prueba('login válido devuelve el usuario', async () => {
    const { status, datos } = await pedir('/api/cuenta/login', {
      method: 'POST',
      body: { email: 'demo@zara.test', password: 'demo1234' },
    });
    assert.equal(status, 200);
    assert.equal(datos.usuario.email, 'demo@zara.test');
  });

  console.log('\nPedidos (RF-74)');
  let numeroPedido = null;
  await prueba('crear pedido desde el carrito', async () => {
    await pedir('/api/carrito/agregar', {
      method: 'POST',
      body: { productoId, talla: 'M', color: 'Negro', cantidad: 1 },
    });
    const { status, datos } = await pedir('/api/pedidos/crear', {
      method: 'POST',
      body: direccionPrueba,
    });
    assert.equal(status, 200);
    assert.match(datos.pedido.numero, /^ZR-\d{8}-[0-9A-F]{5}$/);
    numeroPedido = datos.pedido.numero;
  });
  await prueba('el pedido aparece en el historial', async () => {
    const { datos } = await pedir('/api/pedidos');
    assert.ok(Array.isArray(datos) && datos.some((pedido) => pedido.numero === numeroPedido));
  });
  await prueba('el carrito queda vacío tras el pedido', async () => {
    const { datos } = await pedir('/api/carrito');
    assert.equal(datos.length, 0);
  });
  await prueba('crear pedido con el carrito vacío devuelve 400', async () => {
    const { status } = await pedir('/api/pedidos/crear', {
      method: 'POST',
      body: direccionPrueba,
    });
    assert.equal(status, 400);
  });

  console.log('\nSesión (RF-73)');
  await prueba('logout deja la sesión sin usuario', async () => {
    await pedir('/api/cuenta/logout', { method: 'POST', body: {} });
    const { datos } = await pedir('/api/cuenta');
    assert.equal(datos.usuario, null);
  });
} catch (error) {
  falladas += 1;
  console.error(`Error inesperado: ${error.message}`);
} finally {
  if (proceso && arrancadoPorNosotros) proceso.kill();
  spawnSync('php', ['scripts/limpiar_pruebas.php'], { cwd: raiz, stdio: 'inherit' });
}

console.log(`\nAPI · ${pasadas} pasadas, ${falladas} falladas`);
process.exit(falladas > 0 ? 1 : 0);
