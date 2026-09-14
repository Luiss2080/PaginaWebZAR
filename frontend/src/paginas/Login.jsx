import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCuenta } from '../contextos/contextos';
import { useSeo } from '../utils/seo';

const emailValido = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());

export default function Login() {
  const { iniciarSesion } = useCuenta();
  const navegar = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({});

  useSeo('Iniciar sesión — ZARA', 'Accede a tu cuenta ZARA para gestionar favoritos y pedidos.');

  const enviar = (evento) => {
    evento.preventDefault();
    const nuevos = {};
    if (!email.trim()) nuevos.email = 'Introduce tu correo electrónico.';
    else if (!emailValido(email)) nuevos.email = 'El correo no es válido.';
    if (!password) nuevos.password = 'Introduce tu contraseña.';
    else if (password.length < 6) nuevos.password = 'La contraseña debe tener al menos 6 caracteres.';

    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    iniciarSesion({ email });
    navegar('/');
  };

  return (
    <div className="contenedor flex justify-center py-20">
      <div className="w-full max-w-sm">
        <h1 className="font-titulo text-3xl">Iniciar sesión</h1>
        <p className="mt-2 text-sm text-gris-medio">
          Accede para gestionar tus favoritos y pedidos.
        </p>

        <form onSubmit={enviar} noValidate className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="etiqueta">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              className="campo mt-2"
              aria-invalid={Boolean(errores.email)}
            />
            {errores.email && <p className="mt-1 text-xs text-tinta">{errores.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="etiqueta">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(evento) => setPassword(evento.target.value)}
              className="campo mt-2"
              aria-invalid={Boolean(errores.password)}
            />
            {errores.password && <p className="mt-1 text-xs text-tinta">{errores.password}</p>}
          </div>

          <button type="submit" className="boton-primario w-full">
            Entrar
          </button>
        </form>

        <p className="mt-6 text-sm text-gris-medio">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="text-tinta underline underline-offset-4">
            Crear una
          </Link>
        </p>
      </div>
    </div>
  );
}
