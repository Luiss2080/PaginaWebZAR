import { Link } from 'react-router-dom';

const imagenHero =
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=80';

export default function BannerPrincipal() {
  return (
    <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-gris">
      <img
        src={imagenHero}
        alt="Modelo con prendas de la nueva colección"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-tinta/25" />

      <div className="contenedor relative flex h-full flex-col items-start justify-end pb-16 text-blanco sm:pb-24">
        <p className="etiqueta">Nueva colección</p>
        <h1 className="mt-4 max-w-2xl font-titulo text-4xl leading-tight sm:text-5xl lg:text-6xl">
          El guardarropa esencial de la temporada
        </h1>
        <Link
          to="/catalogo"
          className="mt-8 bg-blanco px-8 py-3 text-[11px] uppercase tracking-[0.22em] text-tinta transition-colors hover:bg-tinta hover:text-blanco"
        >
          Ver la colección
        </Link>
      </div>
    </section>
  );
}
