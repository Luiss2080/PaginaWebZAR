import {
  categorias as categoriasLocales,
  productos as productosLocales,
} from '../datos/catalogo';

const API_ACTIVA = import.meta.env.VITE_API_BASE !== undefined;
const BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');

let respaldoActivo = false;
const oyentesRespaldo = new Set();

export function estaUsandoRespaldo() {
  return respaldoActivo;
}

export function suscribirRespaldo(callback) {
  oyentesRespaldo.add(callback);
  return () => oyentesRespaldo.delete(callback);
}

function activarRespaldo() {
  if (respaldoActivo) return;
  respaldoActivo = true;
  oyentesRespaldo.forEach((callback) => callback());
}

async function pedirJson(ruta) {
  const respuesta = await fetch(`${BASE}${ruta}`);
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
  return respuesta.json();
}

function normalizarProducto(producto) {
  return {
    id: producto.id,
    nombre: producto.nombre ?? producto.name ?? '',
    slug: producto.slug ?? '',
    descripcion: producto.descripcion ?? producto.description ?? '',
    precio: Number(producto.precio ?? producto.price ?? 0),
    precioAnterior:
      producto.precioAnterior ?? producto.old_price ?? producto.precio_anterior ?? null,
    categoria: producto.categoria ?? producto.category_slug ?? producto.category_id ?? '',
    marca: producto.marca ?? producto.brand_slug ?? producto.brand_id ?? '',
    imagenes: producto.imagenes ?? producto.images ?? [],
    tallas: producto.tallas ?? producto.sizes ?? ['Única'],
    colores: producto.colores ?? producto.colors ?? [],
    destacado: Boolean(producto.destacado ?? producto.featured),
    novedad: Boolean(producto.novedad),
  };
}

function ordenar(lista, orden) {
  const copia = [...lista];
  switch (orden) {
    case 'precio-asc':
      return copia.sort((a, b) => a.precio - b.precio);
    case 'precio-desc':
      return copia.sort((a, b) => b.precio - a.precio);
    case 'novedad':
      return copia.sort((a, b) => Number(b.novedad) - Number(a.novedad));
    default:
      return copia;
  }
}

export function filtrarProductos(lista, filtros = {}) {
  const { categoria, marcas = [], tallas = [], colores = [], precioMin, precioMax, orden } =
    filtros;
  let resultado = lista;

  if (categoria) resultado = resultado.filter((p) => p.categoria === categoria);
  if (marcas.length) {
    resultado = resultado.filter((p) => marcas.includes(p.marca));
  }
  if (tallas.length) {
    resultado = resultado.filter((p) => p.tallas.some((talla) => tallas.includes(talla)));
  }
  if (colores.length) {
    resultado = resultado.filter((p) =>
      p.colores.some((color) => colores.includes(color.nombre)),
    );
  }
  if (precioMin !== undefined && precioMin !== null && precioMin !== '') {
    resultado = resultado.filter((p) => p.precio >= Number(precioMin));
  }
  if (precioMax !== undefined && precioMax !== null && precioMax !== '') {
    resultado = resultado.filter((p) => p.precio <= Number(precioMax));
  }

  return ordenar(resultado, orden);
}

async function cargarProductos() {
  if (API_ACTIVA) {
    try {
      const datos = await pedirJson('/api/productos');
      if (datos.length > 0) {
        respaldoActivo = false;
        return datos.map(normalizarProducto);
      }
    } catch {
      /* cae al respaldo */
    }
    activarRespaldo();
  }
  return productosLocales;
}

export async function obtenerProductos(filtros = {}) {
  const lista = await cargarProductos();
  return filtrarProductos(lista, filtros);
}

export async function obtenerProducto(id) {
  const lista = await cargarProductos();
  return lista.find((p) => String(p.id) === String(id)) ?? null;
}

export async function obtenerCategorias() {
  if (API_ACTIVA) {
    try {
      const datos = await pedirJson('/api/categorias');
      if (datos.length > 0) return datos;
    } catch {
      /* cae al respaldo */
    }
    activarRespaldo();
  }
  return categoriasLocales;
}

export async function obtenerMarcas() {
  if (API_ACTIVA) {
    try {
      return await pedirJson('/api/marcas');
    } catch {
      activarRespaldo();
    }
  }
  return [];
}

export async function buscar(termino) {
  const texto = String(termino || '').trim().toLowerCase();
  if (texto.length < 2) return [];
  const lista = await cargarProductos();
  return lista
    .filter((p) =>
      `${p.nombre} ${p.marca} ${p.categoria} ${p.descripcion}`.toLowerCase().includes(texto),
    )
    .slice(0, 8);
}

export const apiActiva = API_ACTIVA;

async function pedirJsonMetodo(ruta, metodo, cuerpo) {
  const respuesta = await fetch(`${BASE}${ruta}`, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  });
  const datos = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    const error = new Error((datos && datos.error) || `Error HTTP ${respuesta.status}`);
    error.status = respuesta.status;
    throw error;
  }
  return datos;
}

export function obtenerCarrito() {
  return pedirJson('/api/carrito');
}

export function agregarCarrito(datos) {
  return pedirJsonMetodo('/api/carrito/agregar', 'POST', datos);
}

export function cambiarCantidadCarrito(id, cantidad) {
  return pedirJsonMetodo('/api/carrito/cantidad', 'POST', { id, cantidad });
}

export function quitarCarrito(id) {
  return pedirJsonMetodo('/api/carrito/quitar', 'POST', { id });
}

export function vaciarCarrito() {
  return pedirJsonMetodo('/api/carrito/vaciar', 'POST', {});
}

export function obtenerFavoritos() {
  return pedirJson('/api/favoritos');
}

export function alternarFavorito(productoId) {
  return pedirJsonMetodo('/api/favoritos/alternar', 'POST', { productoId });
}

export function obtenerCuenta() {
  return pedirJson('/api/cuenta');
}

export function iniciarSesionApi(datos) {
  return pedirJsonMetodo('/api/cuenta/login', 'POST', datos);
}

export function registrarApi(datos) {
  return pedirJsonMetodo('/api/cuenta/registro', 'POST', datos);
}

export function cerrarSesionApi() {
  return pedirJsonMetodo('/api/cuenta/logout', 'POST', {});
}

export function crearPedido(datos) {
  return pedirJsonMetodo('/api/pedidos/crear', 'POST', datos);
}

export function obtenerPedidos() {
  return pedirJson('/api/pedidos');
}
