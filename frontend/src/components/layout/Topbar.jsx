export default function Topbar() {
  return (
    <div className="bg-primary text-white w-full py-2">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-xs sm:text-sm font-semibold tracking-wide uppercase">
        <span className="flex items-center gap-2">
          📦 ENVÍO GRATIS EN PEDIDOS SOBRE $150
        </span>
        <span className="hidden sm:inline">|</span>
        <span className="flex items-center gap-2">
          🔥 NUEVOS LANZAMIENTOS CADA VIERNES
        </span>
        <span className="hidden sm:inline">|</span>
        <span className="flex items-center gap-2">
          ★ MÁS DE 10,000 RESEÑAS 5 ESTRELLAS
        </span>
      </div>
    </div>
  )
}
