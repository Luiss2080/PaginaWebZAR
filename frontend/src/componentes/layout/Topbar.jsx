export default function Topbar() {
  return (
    <div className="border-b border-borde bg-tinta text-blanco">
      <div className="contenedor flex flex-col items-center justify-center gap-1 py-2 text-center sm:flex-row sm:gap-8">
        <span className="etiqueta">Envíos gratis a partir de 30 €</span>
        <span className="etiqueta hidden sm:inline">Devoluciones gratuitas en 30 días</span>
      </div>
    </div>
  );
}
