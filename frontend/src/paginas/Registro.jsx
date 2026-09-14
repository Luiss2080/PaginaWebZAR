import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCuenta } from '../contextos/contextos';
import { useSeo } from '../utils/seo';

const emailValido = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());

export default function Registro() {
  const { registrar } = useCuenta();
  const navegar = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [errores, setErrores] = useState({});

  useSeo('Crear cuenta — ZARA', 'Regístrate en ZARA para guardar favoritos y agilizar tus compras.');

  const enviar = (evento) => {
    evento.preventDefault();
    const nuevos = {};
    if (!nombre.trim()) nuevos.nombre = 'Introduce tu nombre.';
    if (!email.trim()) nuevos.email = 'Introduce tu correo electrónico.';
    else if (!emailValido(email)) nuevos.email = 'El correo no es válido.';
    if (!password) nuevos.password = 'Introduce una contraseña.';
    else if (password.length < 6) nuevos.password = 'La contraseña debe tener al menos 6 caracteres.';
    if (confirmar !== password) nuevos.confirmar = 'Las contraseñas no coinciden.';

    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    registrar({ nombre: nombre.trim(), email });
    navegar('/');
  };

  return (
    <div className="contenedor flex justify-center py-20">
      <div className="w-full max-w-sm">
        <h1 className="font-titulo text-3xl">Crear cuenta</h1>
        <p className="mt-2 text-sm text-gris-medio">
          Regístrate para guardar favoritos y agilizar tus compras.
        </p>

        <form onSubmit={enviar} noValidate className="mt-8 space-y-5">
          <div>
            <label htmlFor="nombre" className="etiqueta">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
              className="campo mt-2"
              aria-invalid={Boolean(errores.nombre)}
            />
            {errores.nombre && <p className="mt-1 text-xs text-tinta">{errores.nombre}</p>}
          </div>

          <div>
            <label htmlFor="email-registro" className="etiqueta">
              Correo electrónico
            </label>
            <input
              id="email-registro"
              type="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              className="campo mt-2"
              aria-invalid={Boolean(errores.email)}
            />
            {errores.email && <p className="mt-1 text-xs text-tinta">{errores.email}</p>}
          </div>

          <div>
            <label htmlFor="password-registro" className="etiqueta">
              Contraseña
            </label>
            <input
              id="password-registro"
              type="password"
              value={password}
              onChange={(evento) => setPassword(evento.target.value)}
              className="campo mt-2"
              aria-invalid={Boolean(errores.password)}
            />
            {errores.password && <p className="mt-1 text-xs text-tinta">{errores.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmar" className="etiqueta">
              Repite la contraseña
            </label>
            <input
              id="confirmar"
              type="password"
              value={confirmar}
              onChange={(evento) => setConfirmar(evento.target.value)}
              className="campo mt-2"
              aria-invalid={Boolean(errores.confirmar)}
            />
            {errores.confirmar && <p className="mt-1 text-xs text-tinta">{errores.confirmar}</p>}
          </div>

          <button type="submit" className="boton-primario w-full">
            Crear cuenta
          </button>
        </form>

        <p className="mt-6 text-sm text-gris-medio">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-tinta underline underline-offset-4">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
