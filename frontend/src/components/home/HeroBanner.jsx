import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 60, damping: 15 } }
  };

  return (
    <div className="relative bg-[#050505] text-white overflow-hidden h-[calc(100vh-120px)] min-h-[600px] flex items-center w-full">
      
      {/* Fondo y Efectos */}
      <div className="absolute inset-0 bg-noise opacity-80 pointer-events-none z-0"></div>
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-800/20 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Contenedor Principal: Fluido al 100% del ancho con px-8 a px-20 */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full h-full px-6 md:px-12 lg:px-20 xl:px-28 relative z-30 flex flex-col lg:flex-row items-center justify-between"
      >
        
        {/* TEXTO IZQUIERDO: Ocupa exactamente su mitad, sin encimarse */}
        <div className="w-full lg:w-[50%] relative z-40 text-left flex flex-col items-start pt-10 lg:pt-0">
          
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-[#111111] border border-white/10 px-5 py-2 mb-6 font-body text-xs md:text-sm font-bold tracking-widest text-white shadow-lg">
            <Zap size={16} className="text-[#E63946] fill-[#E63946] animate-pulse" />
            <span className="text-gray-300">NUEVA COLECCIÓN:</span> <span className="text-white">STREET HEAT</span>
          </motion.div>

          <div className="relative inline-block mb-4 md:mb-6 w-full">
            <motion.h1 variants={itemVariants} className="font-display font-black text-[5.5rem] sm:text-[7rem] md:text-[8.5rem] lg:text-[10rem] xl:text-[11.5rem] leading-[0.8] uppercase tracking-tighter text-white">
              <span className="block drop-shadow-lg">ROMPÉ</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">LAS REGLAS</span>
            </motion.h1>
            
            <motion.span 
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: -15, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 10 }}
              className="absolute top-[28%] right-0 font-marker text-[#E63946] text-4xl sm:text-5xl md:text-6xl drop-shadow-[0_10px_10px_rgba(230,57,70,0.4)] z-50 pointer-events-none"
            >
              Y pisa fuerte
            </motion.span>
          </div>
          
          <motion.p variants={itemVariants} className="text-gray-300 text-lg md:text-xl font-medium max-w-lg mb-8 leading-relaxed font-body border-l-4 border-[#E63946] pl-5">
            Sneakers limitados para verdaderos coleccionistas. Si es <span className="text-white font-bold">HYPE</span>, lo tenemos nosotros primero.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex gap-4 w-full sm:w-auto">
            <Link to="/catalogo" className="group bg-[#E63946] text-white font-display text-xl uppercase tracking-widest py-4 px-8 transition-all duration-300 hover:bg-white hover:text-black shadow-[0_0_20px_rgba(230,57,70,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] flex items-center justify-center gap-3 w-full sm:w-auto">
              EXPLORAR DROPS
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* ZAPATILLA GIGANTE DERECHA: Usando una imagen con fondo verdaderamente NEGRO para que mix-blend-screen funcione y sea transparente */}
        <motion.div 
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="w-full lg:w-[45%] mt-12 lg:mt-0 relative z-30 flex justify-end items-center h-full"
        >
          <motion.div 
            animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-30 w-[120%] lg:w-[130%] max-w-[1000px] pointer-events-none"
          >
            {/* Zapatilla con fondo NEGRO. mix-blend-screen elimina el negro al 100% dejándola transparente */}
            <img 
              src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Air Jordan Transparente" 
              className="w-full h-auto object-contain mix-blend-screen drop-shadow-[0_20px_40px_rgba(230,57,70,0.4)]"
              style={{ filter: 'contrast(1.2) brightness(1.1)' }}
            />
          </motion.div>

          {/* BADGE LATERAL ESTILO URBANO - Ajustado al borde derecho */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
            <div className="flex flex-col items-center bg-[#050505] border border-white/10 p-2 shadow-2xl">
              <div className="px-3 py-8 flex flex-col items-center gap-6 h-[300px] justify-between">
                <Target size={24} className="text-[#E63946]" />
                <span className="text-white text-sm tracking-[0.3em] font-display font-bold uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  EDICIÓN LIMITADA
                </span>
                <div className="w-px h-12 bg-white/20"></div>
                <span className="text-white/50 text-[11px] tracking-widest uppercase font-display" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  NIKE AIR HYPE
                </span>
              </div>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </div>
  )
}
