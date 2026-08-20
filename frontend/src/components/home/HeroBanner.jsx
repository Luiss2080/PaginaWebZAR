import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Star } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative bg-[#0a0a0a] text-white overflow-hidden min-h-[600px] lg:min-h-[750px] flex items-center bg-noise w-full">
      
      {/* Background Gradients & Glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/40 via-[#0a0a0a]/80 to-[#0a0a0a] z-0 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 rounded-full blur-[100px] md:blur-[150px] pointer-events-none z-0"></div>
      
      {/* Background Model Image */}
      <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-0 opacity-40 lg:opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 hidden lg:block"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Cultura Urbana" 
          className="w-full h-full object-cover object-right grayscale-[30%] contrast-125"
        />
        {/* Grunge Text Overlay in Background */}
        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 opacity-10 md:opacity-20 z-10">
          <span className="font-display font-black text-6xl md:text-9xl tracking-tighter text-white/50 writing-vertical-rl rotate-180">
            KICKDISTRICT
          </span>
        </div>
      </div>
      
      {/* Content Container - Centered properly */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full relative z-30 py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Column: Text */}
        <div className="w-full lg:w-1/2 relative z-40 text-center lg:text-left flex flex-col items-center lg:items-start pt-10 lg:pt-0">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6 font-body text-xs font-bold tracking-widest text-white/90">
            <Zap size={14} className="text-primary fill-primary" />
            NUEVA TEMPORADA DISPONIBLE
          </div>

          <div className="relative inline-block mb-4 md:mb-6">
            <h1 className="font-display font-black text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[10rem] xl:text-[11.5rem] leading-[0.8] uppercase tracking-tighter drop-shadow-2xl text-white">
              DUEÑOS
              <br/>
              CALLES
            </h1>
            {/* The cursive 'De Las' overlaid */}
            <span className="absolute top-[35%] sm:top-[38%] md:top-[42%] right-[-10%] sm:right-[-5%] md:right-[-8%] font-marker text-[#E63946] text-4xl sm:text-5xl md:text-7xl -rotate-12 drop-shadow-lg z-50">
              De Las
            </span>
            {/* Star Sparkle */}
            <Star className="absolute -top-4 -left-4 md:-top-6 md:-left-8 w-8 h-8 md:w-12 md:h-12 text-white fill-white animate-pulse" />
          </div>
          
          <p className="text-gray-300 text-base md:text-xl font-medium max-w-lg mb-8 md:mb-10 leading-relaxed font-body mt-2 md:mt-4 lg:border-l-4 border-primary lg:pl-5 text-center lg:text-left">
            Los sneakers más frescos. Los mejores outfits.<br/>
            Construido para la cultura. Usado por ti.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto justify-center lg:justify-start">
            <Link to="/nuevos" className="group bg-[#E63946] hover:bg-white text-white hover:text-[#0a0a0a] font-display text-lg md:text-xl uppercase tracking-widest py-3 md:py-4 px-6 md:px-8 transition-all duration-300 shadow-[0_0_20px_rgba(230,57,70,0.4)] flex items-center justify-center gap-2 w-full sm:w-auto">
              COMPRAR LO NUEVO
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/colecciones" className="bg-transparent border-2 border-white hover:bg-white text-white hover:text-[#0a0a0a] font-display text-lg md:text-xl uppercase tracking-widest py-3 md:py-4 px-6 md:px-8 transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
              EXPLORAR COLECCIONES
            </Link>
          </div>
        </div>

        {/* Right Column: Shoes and Badges */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative h-[350px] sm:h-[450px] md:h-[500px] lg:h-[650px] z-30 flex justify-center items-center">
          
          {/* Floating Shoes */}
          <div className="relative z-30 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[120%] xl:w-[130%] max-w-[800px] animate-[bounce_6s_ease-in-out_infinite] lg:-ml-10">
            {/* Using mix-blend-screen to make black background of the shoe image transparent */}
            <img 
              src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Tenis Exclusivos" 
              className="w-full h-auto object-contain mix-blend-screen drop-shadow-[0_20px_30px_rgba(230,57,70,0.3)]"
              style={{ filter: 'contrast(1.25) brightness(1.1)' }}
            />
          </div>

          {/* Right Vertical Product Badge */}
          <div className="absolute right-0 lg:-right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
            <div className="flex flex-col items-center shadow-2xl">
              <div className="border border-white/20 bg-black/80 backdrop-blur-md px-3 py-6 flex flex-col items-center gap-4 h-[250px] lg:h-[300px] justify-between">
                <span className="text-white text-xs lg:text-sm tracking-[0.2em] font-display font-bold uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  EDICIÓN LIMITADA
                </span>
                <div className="w-px h-10 lg:h-12 bg-white/30"></div>
                <span className="text-white/70 text-[10px] lg:text-xs tracking-widest uppercase font-display" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  CHICAGO REIMAGINED
                </span>
              </div>
              <Link to="/producto/aj1" className="bg-[#E63946] text-white font-display text-sm lg:text-base px-3 py-4 text-center hover:bg-white hover:text-black transition-colors w-full tracking-wider leading-tight">
                COMPRAR<br/>AHORA
              </Link>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  )
}
