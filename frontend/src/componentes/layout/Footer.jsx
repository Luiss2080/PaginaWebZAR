import { useState } from 'react';
import { Link } from 'react-router-dom';

const columnas = [
  {
    titulo: 'Comprar',
    enlaces: [
      { etiqueta: 'Novedades', to: '/catalogo' },
      { etiqueta: 'Mujer', to: '/catalogo?categoria=mujer' },
      { etiqueta: 'Hombre', to: '/catalogo?categoria=hombre' },
      { etiqueta: 'Niños', to: '/catalogo?categoria=ninos' },
      { etiqueta: 'Accesorios', to: '/catalogo?categoria=accesorios' },
    ],
  },
  {
    titulo: 'Ayuda',
    enlaces: [
      { etiqueta: 'Envíos', to: '/pagina/envios' },
      { etiqueta: 'Devoluciones', to: '/pagina/devoluciones' },
      { etiqueta: 'Guía de tallas', to: '/pagina/tallas' },
      { etiqueta: 'Contacto', to: '/pagina/contacto' },
    ],
  },
  {
    titulo: 'Legal',
    enlaces: [
      { etiqueta: 'Términos', to: '/pagina/terminos' },
      { etiqueta: 'Privacidad', to: '/pagina/privacidad' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState('inactivo');

  const enviar = (evento) => {
    evento.preventDefault();
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setEstado(valido ? 'ok' : 'error');
    if (valido) setEmail('');
  };

  return (
    <footer className="border-t border-borde bg-blanco">
      <div className="contenedor grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Link to="/" className="font-titulo text-3xl font-semibold tracking-[0.28em]">
            ZARA
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-gris-medio">
            Colecciones de temporada para mujer, hombre y niños. Diseño atemporal, materiales
            duraderos y envíos a todo el país.
          </p>

          <form onSubmit={enviar} className="mt-8 max-w-sm" noValidate>
            <label htmlFor="newsletter" className="etiqueta">
              Recibe las novedades
            </label>
            <div className="mt-3 flex border-b border-tinta">
              <input
                id="newsletter"
                type="email"
                value={email}
                onChange={(evento) => {
                  setEmail(evento.target.value);
                  setEstado('inactivo');
                }}
                placeholder="tu@correo.com"
                className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-gris-medio"
              />
              <button type="submit" className="etiqueta whitespace-nowrap px-2">
                Suscribirme
              </button>
            </div>
            {estado === 'ok' && (
              <p className="mt-2 text-xs text-tinta">Gracias, te hemos añadido a la lista.</p>
            )}
            {estado === 'error' && (
              <p className="mt-2 text-xs text-gris-medio">Introduce un correo válido.</p>
            )}
          </form>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columnas.map((columna) => (
            <div key={columna.titulo}>
              <h2 className="etiqueta">{columna.titulo}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {columna.enlaces.map((enlace) => (
                  <li key={enlace.to}>
                    <Link
                      to={enlace.to}
                      className="text-sm text-gris-medio transition-colors hover:text-tinta"
                    >
                      {enlace.etiqueta}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-borde">
        <div className="contenedor flex flex-col items-center justify-between gap-2 py-6 text-xs text-gris-medio sm:flex-row">
          <p>© {new Date().getFullYear()} ZARA. Todos los derechos reservados.</p>
          <p>Demo sin pasarela de pago real.</p>
        </div>
      </div>
    </footer>
  );
}
