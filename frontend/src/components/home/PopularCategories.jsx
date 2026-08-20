import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PopularCategories() {
  
  const categories = [
    {
      title: "AIR JORDAN RETRO",
      subtitle: "HERENCIA EN LA CANCHA",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
      rowSpan: "row-span-1 lg:row-span-2",
      path: "/jordan"
    },
    {
      title: "YEEZY & BOOST",
      subtitle: "VANGUARDIA",
      image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      path: "/adidas"
    },
    {
      title: "NIKE DUNK SB",
      subtitle: "CULTURA SKATE",
      image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      path: "/nike/sb"
    },
    {
      title: "ACCESORIOS HYPE",
      subtitle: "DETALLES QUE IMPORTAN",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      colSpan: "col-span-1 md:col-span-2",
      rowSpan: "row-span-1",
      path: "/accesorios"
    }
  ];

  return (
    <section className="bg-[#050505] py-24 border-t border-white/10 relative overflow-hidden">
      
      {/* Glow de fondo decorativo */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E63946]/5 rounded-full blur-[150px] -z-10 pointer-events-none -translate-y-1/2"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28">
        
        {/* Cabecera de la sección */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-1 bg-[#E63946]"></div>
              <span className="text-[#E63946] font-display tracking-[0.2em] font-bold text-sm">EXPLORA POR ESTILO</span>
            </div>
            <h2 className="text-white font-display font-black text-5xl md:text-6xl uppercase tracking-wider">
              CATEGORÍAS <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">POPULARES</span>
            </h2>
          </div>
          
          <Link to="/catalogo" className="group flex items-center gap-2 text-gray-400 hover:text-white font-display text-lg tracking-widest transition-colors border-b border-gray-800 hover:border-[#E63946] pb-1">
            VER TODAS LAS COLECCIONES
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-[#E63946]" />
          </Link>
        </div>

        {/* Cuadrícula Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[300px] lg:auto-rows-[350px]">
          {categories.map((cat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              key={i} 
              className={`relative overflow-hidden group rounded-sm bg-[#111111] ${cat.colSpan} ${cat.rowSpan} border border-white/5 cursor-pointer`}
            >
              {/* Capa de la imagen con zoom en Hover */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-60 grayscale-[30%] group-hover:grayscale-0"
                style={{ backgroundImage: `url(${cat.image})` }}
              ></div>
              
              {/* Capa de oscurecimiento y color rojo en Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-colors duration-500 group-hover:bg-[#E63946]/30 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-500"></div>

              {/* Contenido (Textos y Botón) */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <span className="text-gray-400 font-body text-xs md:text-sm font-bold tracking-[0.2em] mb-2 translate-y-4 group-hover:translate-y-0 group-hover:text-white/80 transition-all duration-300">
                  {cat.subtitle}
                </span>
                
                <h3 className="text-white font-display font-black text-3xl md:text-4xl uppercase tracking-wider leading-none mb-6 group-hover:text-[#E63946] transition-colors duration-300">
                  {cat.title}
                </h3>
                
                {/* Botón que aparece desde abajo */}
                <div className="overflow-hidden">
                  <Link to={cat.path} className="inline-flex items-center gap-3 bg-white text-black font-display px-6 py-3 uppercase tracking-widest text-sm translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#E63946] hover:text-white">
                    COMPRAR AHORA <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
