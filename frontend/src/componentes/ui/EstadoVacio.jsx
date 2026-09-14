export default function EstadoVacio({ titulo, mensaje, children }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <h2 className="font-titulo text-2xl sm:text-3xl">{titulo}</h2>
      {mensaje && <p className="mt-3 max-w-md text-sm text-gris-medio">{mensaje}</p>}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
