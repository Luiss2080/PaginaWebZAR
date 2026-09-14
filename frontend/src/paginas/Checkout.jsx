import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCarrito, useCuenta } from '../contextos/contextos';
import { apiActiva, crearPedido } from '../servicios/api';
import { calcularEnvio, formatearPrecio } from '../utils/formato';
import { useSeo } from '../utils/seo';
import EstadoVacio from '../componentes/ui/EstadoVacio';
import Breadcrumbs from '../componentes/ui/Breadcrumbs';

const camposIniciales = {
  nombre: '',
  direccion: '',
  ciudad: '',
  codigoPostal: '',
  pais: 'España',
  telefono: '',
  metodoPago: 'tarjeta',
};

export default function Checkout() {
  const { lineas, subtotal, vaciar } = useCarrito();
  const { usuario } = useCuenta();
  const [campos, setCampos] = useState(camposIniciales);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState(null);

  useSeo('Tramitar pedido — ZARA', 'Confirma tu pedido y la dirección de envío.');

  const envio = calcularEnvio(subtotal);
  const total = subtotal + envio;

  const actualizar = (clave, valor) => setCampos((previos) => ({ ...previos, [clave]: valor }));

  const confirmar = async (evento) => {
    evento.preventDefault();
    const nuevos = {};
    if (!campos.nombre.trim()) nuevos.nombre = 'Introduce el nombre.';
    if (!campos.direccion.trim()) nuevos.direccion = 'Introduce la dirección.';
    if (!campos.ciudad.trim()) nuevos.ciudad = 'Introduce la ciudad.';
    if (!campos.codigoPostal.trim()) nuevos.codigoPostal = 'Introduce el código postal.';
    if (!campos.pais.trim()) nuevos.pais = 'Introduce el país.';
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    setEnviando(true);
    try {
      if (apiActiva) {
        const datos = await crearPedido(campos);
        setNumeroPedido(datos.pedido.numero);
      } else {
        setNumeroPedido(`DEMO-${Date.now().toString().slice(-6)}`);
      }
      await vaciar();
    } catch (error) {
      setErrores({ general: error.message || 'No se pudo completar el pedido.' });
    } finally {
      setEnviando(false);
    }
  };

  if (numeroPedido) {
    return (
      <div className="contenedor">
        <EstadoVacio
          titulo="¡Pedido confirmado!"
          mensaje={`Tu número de pedido es ${numeroPedido}. Te hemos enviado un correo con los detalles.`}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/pedidos" className="boton-primario">
              Ver mis pedidos
            </Link>
            <Link to="/catalogo" className="boton-secundario">
              Seguir comprando
            </Link>
          </div>
        </EstadoVacio>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="contenedor">
        <EstadoVacio
          titulo="Inicia sesión para continuar"
          mensaje="Necesitas una cuenta para confirmar el pedido. Tu carrito se conserva."
        >
          <Link to="/login" className="boton-primario">
            Iniciar sesión
          </Link>
        </EstadoVacio>
      </div>
    );
  }

  if (lineas.length === 0) {
    return (
      <div className="contenedor">
        <EstadoVacio
          titulo="Tu carrito está vacío"
          mensaje="Añade prendas antes de tramitar el pedido."
        >
          <Link to="/catalogo" className="boton-primario">
            Ir al catálogo
          </Link>
        </EstadoVacio>
      </div>
    );
  }

  return (
    <div className="contenedor">
      <Breadcrumbs
        items={[
          { label: 'Inicio', to: '/' },
          { label: 'Catálogo', to: '/catalogo' },
          { label: 'Tramitar pedido' },
        ]}
      />

      <h1 className="font-titulo text-3xl sm:text-4xl">Tramitar pedido</h1>

      <form
        onSubmit={confirmar}
        noValidate
        className="mt-10 grid gap-12 pb-20 lg:grid-cols-[1fr_360px]"
      >
        <div className="space-y-5">
          <h2 className="etiqueta text-gris-medio">Dirección de envío</h2>

          <Campo
            id="nombre"
            etiqueta="Nombre y apellidos"
            valor={campos.nombre}
            onChange={actualizar}
            error={errores.nombre}
          />
          <Campo
            id="direccion"
            etiqueta="Dirección"
            valor={campos.direccion}
            onChange={actualizar}
            error={errores.direccion}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Campo
              id="ciudad"
              etiqueta="Ciudad"
              valor={campos.ciudad}
              onChange={actualizar}
              error={errores.ciudad}
            />
            <Campo
              id="codigoPostal"
              etiqueta="Código postal"
              valor={campos.codigoPostal}
              onChange={actualizar}
              error={errores.codigoPostal}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Campo
              id="pais"
              etiqueta="País"
              valor={campos.pais}
              onChange={actualizar}
              error={errores.pais}
            />
            <Campo
              id="telefono"
              etiqueta="Teléfono (opcional)"
              valor={campos.telefono}
              onChange={actualizar}
            />
          </div>

          <div>
            <label htmlFor="metodoPago" className="etiqueta">
              Método de pago
            </label>
            <select
              id="metodoPago"
              value={campos.metodoPago}
              onChange={(evento) => actualizar('metodoPago', evento.target.value)}
              className="campo mt-2"
            >
              <option value="tarjeta">Tarjeta (demo)</option>
              <option value="paypal">PayPal (demo)</option>
              <option value="contra-reembolso">Contra reembolso (demo)</option>
            </select>
          </div>

          {errores.general && (
            <p role="alert" className="text-xs text-tinta">
              {errores.general}
            </p>
          )}
        </div>

        <aside className="h-max border border-borde p-6">
          <h2 className="etiqueta">Resumen</h2>
          <ul className="mt-5 space-y-4">
            {lineas.map((linea) => (
              <li key={linea.idLinea} className="flex gap-3">
                <img src={linea.imagen} alt={linea.nombre} className="h-16 w-12 object-cover" />
                <div className="flex-1 text-sm">
                  <p className="leading-snug">{linea.nombre}</p>
                  <p className="text-xs text-gris-medio">
                    {linea.talla} · {linea.color} · x{linea.cantidad}
                  </p>
                </div>
                <span className="text-sm">{formatearPrecio(linea.precio * linea.cantidad)}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-6 space-y-2 border-t border-borde pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-gris-medio">Subtotal</dt>
              <dd>{formatearPrecio(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gris-medio">Envío</dt>
              <dd>{envio === 0 ? 'Gratis' : formatearPrecio(envio)}</dd>
            </div>
            <div className="flex justify-between border-t border-borde pt-2 text-base">
              <dt>Total</dt>
              <dd>{formatearPrecio(total)}</dd>
            </div>
          </dl>

          <button
            type="submit"
            disabled={enviando}
            className="boton-primario mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {enviando ? 'Procesando…' : 'Confirmar pedido'}
          </button>
          <p className="mt-3 text-xs text-gris-medio">
            Pago simulado: no se realizará ningún cargo real.
          </p>
        </aside>
      </form>
    </div>
  );
}

function Campo({ id, etiqueta, valor, onChange, error, tipo = 'text' }) {
  return (
    <div>
      <label htmlFor={id} className="etiqueta">
        {etiqueta}
      </label>
      <input
        id={id}
        type={tipo}
        value={valor}
        onChange={(evento) => onChange(id, evento.target.value)}
        className="campo mt-2"
        aria-invalid={Boolean(error)}
      />
      {error && <p className="mt-1 text-xs text-tinta">{error}</p>}
    </div>
  );
}
