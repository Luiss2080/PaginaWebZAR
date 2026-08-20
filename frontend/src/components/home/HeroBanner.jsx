import { Link } from 'react-router-dom';

export default function HeroBanner() {
  return (
    <div className="relative bg-dark text-white overflow-hidden" style={{ minHeight: '600px' }}>
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/40 to-transparent pointer-events-none"></div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 h-full relative z-10 py-20 flex flex-col lg:flex-row items-center">
        
        {/* Left Column: Text */}
        <div className="w-full lg:w-1/2 pr-0 lg:pr-12 z-20">
          <h1 className="font-display font-black text-7xl md:text-8xl lg:text-9xl leading-none uppercase tracking-tighter mb-2">
            OWN <span className="text-primary italic">THE</span><br/>
            STREETS
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-medium max-w-md mb-8 leading-relaxed">
            The freshest sneakers. The hottest fits.<br/>
            Built for culture. Worn by you.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/new-arrivals" className="bg-primary hover:bg-red-700 text-white font-bold uppercase tracking-wider py-4 px-8 transition-colors">
              SHOP NEW ARRIVALS
            </Link>
            <Link to="/drops" className="bg-transparent border border-white hover:bg-white hover:text-dark text-white font-bold uppercase tracking-wider py-4 px-8 transition-colors">
              EXPLORE DROPS
            </Link>
          </div>
        </div>

        {/* Right Column: Images */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative h-[400px] lg:h-[500px]">
          {/* Main Sneaker Image */}
          <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] animate-[bounce_4s_ease-in-out_infinite]">
            <img 
              src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Air Jordan 1 Red" 
              className="w-full h-auto drop-shadow-2xl object-cover mix-blend-screen"
              style={{ filter: 'contrast(1.2)' }}
            />
          </div>
          
          {/* Background Model Image */}
          <div className="absolute top-0 right-0 w-3/4 h-full z-10 opacity-60 mask-image-bottom">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Streetwear Model" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Vertical Tag */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 -rotate-90 z-30 origin-center hidden lg:block">
            <div className="border border-white/20 bg-black/50 backdrop-blur-sm px-4 py-2 flex items-center gap-4">
              <span className="text-white text-xs tracking-[0.2em] font-bold">AIR JORDAN 1</span>
              <div className="w-8 h-px bg-primary"></div>
              <span className="text-primary text-xs font-bold">CHICAGO REIMAGINED</span>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Decorative stars / sparks */}
      <div className="absolute top-10 left-1/2 text-white/50 text-xl">✦</div>
      <div className="absolute top-40 left-1/4 text-white/30 text-sm">✦</div>
    </div>
  )
}
