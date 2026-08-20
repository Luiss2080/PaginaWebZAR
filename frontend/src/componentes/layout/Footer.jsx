import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/10 font-body relative overflow-hidden">
      
      {/* Background glow for footer */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E63946]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link to="/" className="text-5xl font-black tracking-tighter italic text-white mb-6 font-display">
              ZAR<span className="text-[#E63946]">KICKS</span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              El epicentro del streetwear global. No solo vendemos sneakers, curamos la cultura urbana. Autenticidad 100% garantizada en cada par que pisa la calle.
            </p>
            
            <div className="flex gap-4">
              <SocialIcon svg={<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>} />
              <SocialIcon svg={<><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>} />
              <SocialIcon svg={<><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></>} />
              <SocialIcon svg={<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>} />
              <SocialIcon svg={<><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></>} />
            </div>
          </div>
          
          {/* Links Column 1 (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-2xl tracking-widest uppercase mb-6 text-white">Comprar</h4>
            <ul className="flex flex-col gap-4 text-gray-400 font-medium">
              <li><Link to="/nuevos" className="hover:text-[#E63946] transition-colors flex items-center gap-2 group"><ArrowHover /> Nuevos Lanzamientos</Link></li>
              <li><Link to="/jordan" className="hover:text-[#E63946] transition-colors flex items-center gap-2 group"><ArrowHover /> Jordan Retro</Link></li>
              <li><Link to="/nike" className="hover:text-[#E63946] transition-colors flex items-center gap-2 group"><ArrowHover /> Nike Exclusivos</Link></li>
              <li><Link to="/adidas" className="hover:text-[#E63946] transition-colors flex items-center gap-2 group"><ArrowHover /> Yeezy & Adidas</Link></li>
              <li><Link to="/ofertas" className="hover:text-[#E63946] transition-colors flex items-center gap-2 group"><ArrowHover /> Ofertas (Sale)</Link></li>
            </ul>
          </div>
          
          {/* Links Column 2 (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-2xl tracking-widest uppercase mb-6 text-white">Soporte</h4>
            <ul className="flex flex-col gap-4 text-gray-400 font-medium">
              <li><Link to="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link to="/envios" className="hover:text-white transition-colors">Envíos y Entregas</Link></li>
              <li><Link to="/devoluciones" className="hover:text-white transition-colors">Devoluciones</Link></li>
              <li><Link to="/tallas" className="hover:text-white transition-colors">Guía de Tallas</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>
          
          {/* Newsletter Column (Span 4) */}
          <div className="lg:col-span-4 bg-[#111111] border border-white/5 p-6 lg:p-8">
            <h4 className="font-display text-3xl tracking-wider uppercase mb-3 text-white flex items-center gap-2">
              <Mail className="text-[#E63946]" /> ACCESO VIP
            </h4>
            <p className="text-gray-400 mb-6 text-sm">
              Únete a nuestra lista para recibir alertas de drops antes que nadie. Cero spam, puro hype.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Tu correo electrónico..." 
                className="bg-[#050505] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#E63946] transition-colors font-body w-full"
                required
              />
              <button 
                type="submit" 
                className="bg-[#E63946] hover:bg-white text-white hover:text-black font-display text-lg tracking-widest uppercase py-3 transition-colors w-full flex items-center justify-center gap-2"
              >
                SUSCRIBIRME <ArrowRight size={18} />
              </button>
            </form>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm font-medium">
            &copy; {new Date().getFullYear()} ZARKICKS. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center gap-6 text-gray-500 text-sm font-medium">
            <Link to="/terminos" className="hover:text-white transition-colors">Términos de Servicio</Link>
            <Link to="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
          </div>
          
          {/* Payment Icons Simulation */}
          <div className="flex gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[10px] font-black text-blue-800">VISA</div>
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[10px] font-black text-red-600">MC</div>
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[10px] font-black text-blue-500 italic">Pay</div>
          </div>
        </div>
        
      </div>
    </footer>
  )
}

function SocialIcon({ svg }) {
  return (
    <a href="#" className="w-10 h-10 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E63946] hover:text-white hover:border-[#E63946] transition-all hover:-translate-y-1">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {svg}
      </svg>
    </a>
  )
}

function ArrowHover() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300">
      <path d="M5 12h14"></path>
      <path d="M12 5l7 7-7 7"></path>
    </svg>
  )
}
