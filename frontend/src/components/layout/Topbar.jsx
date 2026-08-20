import { Package, Flame, Star } from 'lucide-react';

export default function Topbar() {
  return (
    <div className="bg-[#E63946] text-[#050505] w-full py-3 border-b border-black">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm font-black font-display tracking-widest uppercase">
        
        <span className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer group">
          <Package size={18} strokeWidth={3} className="group-hover:-translate-y-1 transition-transform" />
          ENVÍO GRATIS EN COMPRAS +$150
        </span>
        
        <span className="hidden sm:inline text-black/30">/</span>
        
        <span className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer group">
          <Flame size={18} strokeWidth={3} className="group-hover:-translate-y-1 transition-transform" />
          DROPS EXCLUSIVOS CADA VIERNES
        </span>
        
        <span className="hidden sm:inline text-black/30">/</span>
        
        <span className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer group">
          <Star size={18} strokeWidth={3} className="group-hover:-translate-y-1 transition-transform" />
          MÁS DE 10,000 CLIENTES SATISFECHOS
        </span>
        
      </div>
    </div>
  )
}
