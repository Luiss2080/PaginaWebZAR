import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  // Variantes de animación para framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 50, damping: 15 } }
  };

  return (
    <div className="relative bg-[#050505] text-white overflow-hidden min-h-[700px] lg:min-h-[850px] flex items-center w-full">
      
      {/* Fondo Animado de Ruido y Luces */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-full bg-noise z-0 pointer-events-none"
      />
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      {/* Carrusel/Parallax de Imágenes en Movimiento */}
      <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent z-10 hidden lg:block"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>
        
        <motion.img 
          initial={{ scale: 1.2, x: 50 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1552346154-21d32810baa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Cultura Sneaker" 
          className="w-full h-full object-cover object-center grayscale-[20%] contrast-125 opacity-60 mix-blend-luminosity"
        />
        
        {/* Elementos gráficos flotantes */}
        <motion.div 
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[10%] top-[20%] z-20 border border-white/20 bg-white/5 backdrop-blur-sm p-4 hidden md:block"
        >
          <img src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-32 h-auto mix-blend-screen" alt="Sneaker Detail"/>
        </motion.div>
      </div>
      
      {/* Contenedor Principal */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1400px] h-full relative z-30 py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between"
      >
        
        {/* Columna Izquierda: Texto Animado */}
        <div className="w-full lg:w-3/5 relative z-40 text-left flex flex-col items-start pt-10 lg:pt-0">
          
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-5 py-2 rounded-full mb-8 font-body text-xs md:text-sm font-bold tracking-widest text-primary shadow-[0_0_15px_rgba(230,57,70,0.2)]">
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Zap size={16} className="fill-primary" />
            </motion.div>
            SNEAKER CULTURE EXCLUSIVA
          </motion.div>

          <div className="relative inline-block mb-6 md:mb-8 w-full">
            <motion.h1 variants={itemVariants} className="font-display font-black text-[5rem] sm:text-[7rem] md:text-[9.5rem] lg:text-[11rem] xl:text-[13rem] leading-[0.75] uppercase tracking-tighter drop-shadow-2xl text-white">
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">DUEÑOS</span>
              <span className="block">CALLES</span>
            </motion.h1>
            
            {/* Texto Cursiva Animado */}
            <motion.span 
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: -12, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 10 }}
              className="absolute top-[32%] right-[10%] sm:right-[20%] lg:right-[30%] font-marker text-[#E63946] text-5xl sm:text-6xl md:text-8xl drop-shadow-[0_10px_20px_rgba(230,57,70,0.6)] z-50 pointer-events-none"
            >
              De Las
            </motion.span>
          </div>
          
          <motion.p variants={itemVariants} className="text-gray-300 text-lg md:text-2xl font-medium max-w-xl mb-10 leading-relaxed font-body mt-2 border-l-4 border-primary pl-6">
            Lanzamientos premium. Marcas icónicas.<br/>
            No seguimos tendencias, <span className="text-white font-bold">las creamos.</span>
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link to="/nuevos" className="group relative overflow-hidden bg-[#E63946] text-white font-display text-xl uppercase tracking-widest py-4 px-10 transition-all duration-300 shadow-[0_0_30px_rgba(230,57,70,0.5)] flex items-center justify-center gap-3 w-full sm:w-auto">
              <span className="relative z-10 flex items-center gap-2">
                VER CATÁLOGO
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 h-full w-0 bg-white group-hover:w-full transition-all duration-500 ease-out z-0"></div>
              <span className="absolute z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 group-hover:text-black transition-opacity duration-300">
                VER CATÁLOGO
                <ArrowRight size={24} className="translate-x-2" />
              </span>
            </Link>

            <button className="group flex items-center gap-4 text-white hover:text-primary transition-colors duration-300 w-full sm:w-auto justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-white/30 group-hover:border-primary flex items-center justify-center bg-white/5 backdrop-blur-sm transition-colors">
                <Play size={20} className="ml-1 group-hover:fill-primary" />
              </div>
              <span className="font-display text-xl tracking-widest">VER VIDEO</span>
            </button>
          </motion.div>
        </div>

        {/* Columna Derecha: Tarjeta Interactiva Flotante */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-2/5 mt-16 lg:mt-0 relative z-50 flex justify-center lg:justify-end"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="w-[320px] md:w-[380px] bg-[#111111]/90 backdrop-blur-xl border border-white/10 p-6 shadow-2xl relative group cursor-pointer"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-display text-white text-3xl uppercase tracking-wider">DROP SEMANAL</h4>
                  <p className="text-gray-400 font-body text-sm">Stock Limitado</p>
                </div>
                <div className="bg-primary px-3 py-1 text-white font-bold font-body text-xs">MAÑANA 10AM</div>
              </div>
              
              <div className="h-48 flex items-center justify-center mb-6 bg-white/5 overflow-hidden">
                <motion.img 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Sneaker Drop" 
                  className="w-full h-auto object-contain mix-blend-screen scale-125"
                />
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                <div>
                  <p className="text-gray-300 font-body text-sm">Nike SB Dunk Low</p>
                  <p className="font-display text-white text-2xl tracking-wide">$120.00</p>
                </div>
                <button className="bg-white text-black hover:bg-primary hover:text-white font-display px-6 py-2 uppercase tracking-wider transition-colors duration-300">
                  NOTIFICARME
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
      </motion.div>
    </div>
  )
}
