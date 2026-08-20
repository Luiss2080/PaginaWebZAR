export default function Topbar() {
  return (
    <div className="bg-[#E63946] text-black w-full py-2.5">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-xs sm:text-sm font-black font-display tracking-widest uppercase">
        <span className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
          📦 ENVÍO GRATIS SOBRE $150
        </span>
        <span className="hidden sm:inline text-black/40">|</span>
        <span className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
          🔥 NUEVOS DROPS CADA VIERNES
        </span>
        <span className="hidden sm:inline text-black/40">|</span>
        <span className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
          ★ +10K RESEÑAS 5 ESTRELLAS
        </span>
      </div>
    </div>
  )
}
