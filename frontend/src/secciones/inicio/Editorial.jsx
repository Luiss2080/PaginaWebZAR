import { Link } from 'react-router-dom';

const imagenEditorial =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80';

export default function Editorial() {
  return (
    <section className="border-t border-borde">
      <div className="grid lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-6 py-16 lg:order-1 lg:px-20 lg:py-24">
          <p className="etiqueta text-gris-medio">La campaña</p>
          <h2 className="mt-3 max-w-md font-titulo text-3xl leading-tight sm:text-4xl">
            Diseño atemporal, hecho para durar
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-gris-medio">
            Tejidos naturales, patrones depurados y una paleta neutra que combina con todo. Piezas
            pensadas para acompañarte temporada tras temporada.
          </p>
          <Link to="/catalogo" className="mt-8 self-start boton-secundario">
            Descubrir la colección
          </Link>
        </div>

        <div className="order-1 aspect-[4/3] bg-gris lg:order-2 lg:aspect-auto">
          <img
            src={imagenEditorial}
            alt="Interior de tienda con la colección expuesta"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
