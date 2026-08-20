import { Link } from 'react-router-dom';

export default function HeroBanner() {
  return (
    <div className="relative bg-[#0a0a0a] text-white overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center bg-noise">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-red-800/20 rounded-full blur-[150px] pointer-events-none"></div>
      
      {/* Background Model Image with Gradient Masks */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-10 opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Streetwear Model" 
          className="w-full h-full object-cover object-right grayscale-[20%] contrast-125"
        />
        {/* Grunge Text Overlay in Background */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20 z-10 hidden lg:block">
          <span className="font-display font-black text-9xl tracking-tighter text-white/50 writing-vertical-rl rotate-180">
            KICKDISTRICT
          </span>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-6 lg:px-10 h-full relative z-30 py-20 flex flex-col lg:flex-row items-center">
        
        {/* Left Column: Text */}
        <div className="w-full lg:w-7/12 relative z-40">
          <div className="relative inline-block mb-4">
            <h1 className="font-display font-black text-8xl md:text-[9rem] lg:text-[11rem] leading-[0.8] uppercase tracking-tighter drop-shadow-2xl">
              OWN
              <br/>
              STREETS
            </h1>
            {/* The cursive 'The' overlaid */}
            <span className="absolute top-[28%] -right-8 md:-right-16 font-marker text-primary text-5xl md:text-7xl -rotate-12 drop-shadow-lg z-50">
              The
            </span>
            {/* Star Sparkle */}
            <svg className="absolute -top-6 -left-8 w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor"/>
            </svg>
          </div>
          
          <p className="text-gray-300 text-lg md:text-xl font-medium max-w-md mb-10 leading-relaxed font-body mt-6 border-l-4 border-primary pl-4">
            The freshest sneakers. The hottest fits.<br/>
            Built for culture. Worn by you.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/new-arrivals" className="bg-[#E63946] hover:bg-white hover:text-[#0a0a0a] text-white font-display text-xl uppercase tracking-widest py-3 px-8 transition-all duration-300 shadow-[0_0_20px_rgba(230,57,70,0.4)]">
              SHOP NEW ARRIVALS
            </Link>
            <Link to="/drops" className="bg-transparent border-2 border-white hover:bg-white hover:text-[#0a0a0a] text-white font-display text-xl uppercase tracking-widest py-3 px-8 transition-all duration-300">
              EXPLORE DROPS
            </Link>
          </div>
        </div>

        {/* Right Column: Shoes and Badges */}
        <div className="w-full lg:w-5/12 mt-16 lg:mt-0 relative h-[400px] lg:h-[600px] z-30">
          
          {/* Floating Shoes */}
          <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] lg:-translate-y-[70%] w-[120%] lg:w-[140%] max-w-[800px] animate-[bounce_5s_ease-in-out_infinite]">
            <img 
              src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Air Jordan Sneakers" 
              className="w-full h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] object-contain mix-blend-normal"
              style={{ filter: 'contrast(1.15) saturate(1.2)' }}
            />
          </div>

          {/* Right Vertical Product Badge */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
            <div className="flex flex-col items-center">
              <div className="border border-white/20 bg-black/60 backdrop-blur-md px-3 py-6 flex flex-col items-center gap-4 h-[250px] justify-between">
                <span className="text-white text-xs tracking-[0.2em] font-display font-bold uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  AIR JORDAN 1
                </span>
                <div className="w-px h-8 bg-white/30"></div>
                <span className="text-white/70 text-[10px] tracking-widest uppercase font-display" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  CHICAGO REIMAGINED
                </span>
              </div>
              <Link to="/product/aj1" className="bg-[#E63946] text-white font-display text-sm px-3 py-4 text-center hover:bg-white hover:text-black transition-colors w-full">
                SHOP<br/>NOW
              </Link>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  )
}
