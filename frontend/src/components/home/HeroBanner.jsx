import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, ShieldCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 20 } }
  };

  // Texto circular para SVG
  const circularText = "ORIGINAL HYPE SNEAKERS • EXCLUSIVE DROPS • ";

  return (
    <div className="relative bg-[#050505] text-white overflow-hidden min-h-[600px] lg:h-[calc(100vh-120px)] lg:min-h-[700px] flex items-center w-full">
      
      {/* Fondo y Efectos Dinámicos */}
      <div className="absolute inset-0 bg-noise opacity-70 pointer-events-none z-0"></div>
      
      {/* Luces y brillos animados */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 w-[300px] h-[300px] bg-red-600/30 rounded-full blur-[100px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-red-800/20 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <div className="absolute top-10 right-20 w-[200px] h-[200px] bg-white/5 rounded-full blur-[80px] pointer-events-none z-0"></div>

      {/* Ticker Inferior (Marquesina de texto animada) */}
      <div className="absolute bottom-0 w-full overflow-hidden bg-[#E63946] py-2 z-40 border-t border-b border-black">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center font-display text-black text-xl tracking-widest font-black uppercase"
        >
          {Array(10).fill("• EXCLUSIVE DROPS • HYPE SNEAKERS • LIMITED EDITION • STREETWEAR ").map((text, i) => (
            <span key={i} className="mx-4">{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Contenedor Principal */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full h-full px-6 md:px-12 lg:px-20 xl:px-28 relative z-30 flex flex-col lg:flex-row items-center justify-between pb-16"
      >
        
        {/* TEXTO IZQUIERDO */}
        <div className="w-full lg:w-[45%] relative z-40 text-left flex flex-col items-start pt-10 lg:pt-0">
          
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-[#111111] border border-white/20 px-4 py-1.5 mb-6 font-body text-xs font-bold tracking-widest text-white shadow-lg rounded-full">
            <Zap size={14} className="text-[#E63946] fill-[#E63946] animate-pulse" />
            <span>NUEVA COLECCIÓN:</span> <span className="text-[#E63946]">STREET HEAT</span>
          </motion.div>

          <div className="relative inline-block mb-4 md:mb-6 w-full">
            <motion.h1 variants={itemVariants} className="font-display font-black text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7.5rem] leading-[0.85] uppercase tracking-tighter text-white">
              <span className="block drop-shadow-md">ROMPÉ</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">LAS REGLAS</span>
            </motion.h1>
            
            <motion.span 
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: -15, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 10 }}
              className="absolute top-[35%] right-10 font-marker text-[#E63946] text-3xl sm:text-4xl md:text-5xl drop-shadow-[0_5px_5px_rgba(230,57,70,0.5)] z-50 pointer-events-none"
            >
              Y pisa fuerte
            </motion.span>
          </div>
          
          <motion.p variants={itemVariants} className="text-gray-400 text-base md:text-lg font-medium max-w-md mb-8 leading-relaxed font-body border-l-2 border-[#E63946] pl-4">
            Sneakers limitados para verdaderos coleccionistas. Si es <span className="text-white font-bold">HYPE</span>, lo tenemos nosotros primero. 100% Originales.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex gap-4 w-full sm:w-auto">
            <Link to="/catalogo" className="group bg-[#E63946] text-white font-display text-lg uppercase tracking-widest py-3 px-8 transition-all duration-300 hover:bg-white hover:text-black shadow-[0_0_15px_rgba(230,57,70,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] flex items-center justify-center gap-3 w-full sm:w-auto">
              EXPLORAR DROPS
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Social Links Estilo Urbano */}
          <motion.div variants={itemVariants} className="flex gap-6 mt-10 items-center">
            <span className="text-gray-500 text-sm font-display tracking-widest">SÍGUENOS:</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors font-display text-xl">IG</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors font-display text-xl">X</a>
          </motion.div>
        </div>

        {/* ZAPATILLA GIGANTE DERECHA Y ELEMENTOS FLOTANTES */}
        <motion.div 
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[50%] mt-12 lg:mt-0 relative z-30 flex justify-center lg:justify-end items-center h-[400px] lg:h-full"
        >
          {/* Texto Circular Animado SVG */}
          <div className="absolute top-0 right-[20%] w-32 h-32 animate-spin-slow opacity-40 z-10 pointer-events-none hidden lg:block" style={{ animationDuration: '15s' }}>
            <svg viewBox="0 0 100 100" width="100" height="100">
              <defs>
                <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text fontSize="10.5" fontWeight="bold" fill="white" letterSpacing="2">
                <textPath href="#circle">
                  {circularText}
                </textPath>
              </text>
            </svg>
          </div>

          {/* Zapatilla Transparente Flotante */}
          <motion.div 
            animate={{ y: [-20, 20, -20], rotate: [-2, 1, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-30 w-full lg:w-[130%] max-w-[900px] pointer-events-none"
          >
            {/* Usando una imagen PNG transparente de unos tenis */}
            <img 
              src="https://www.pngall.com/wp-content/uploads/13/Nike-Shoes-Air-Max-PNG.png" 
              alt="Sneaker Hype Transparente" 
              className="w-full h-auto object-contain drop-shadow-[0_30px_30px_rgba(230,57,70,0.5)] scale-110"
              style={{ filter: 'contrast(1.1)' }}
            />
          </motion.div>

          {/* Tarjeta Flotante de Estadísticas (Abajo a la izquierda de la zapatilla) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, type: "spring" }}
            className="absolute bottom-10 left-0 lg:-left-20 z-40 bg-[#111111]/80 backdrop-blur-md border border-white/10 p-4 flex items-center gap-4 shadow-xl rounded-lg hidden sm:flex"
          >
            <div className="bg-[#E63946]/20 p-2 rounded-full">
              <ShieldCheck size={24} className="text-[#E63946]" />
            </div>
            <div>
              <p className="font-display font-bold text-white tracking-widest">100% ORIGINALES</p>
              <p className="text-xs text-gray-400 font-body">Verificados por expertos</p>
            </div>
          </motion.div>

          {/* Tarjeta Flotante de Estadísticas (Arriba a la derecha) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, type: "spring" }}
            className="absolute top-20 right-0 z-40 bg-white text-black p-3 flex items-center gap-3 shadow-[0_10px_30px_rgba(230,57,70,0.3)] hidden md:flex"
          >
            <TrendingUp size={20} className="text-[#E63946]" />
            <div>
              <p className="font-display font-black tracking-widest leading-none">+5K VENDIDOS</p>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  )
}
