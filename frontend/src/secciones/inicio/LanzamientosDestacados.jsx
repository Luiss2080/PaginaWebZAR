import { ArrowRight, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FeaturedDrops() {
  const products = [
    {
      id: 1,
      name: "Air Jordan 4 'Bred Reimagined'",
      brand: "JORDAN",
      price: "$215.00",
      image: "https://images.unsplash.com/photo-1552346154-21d32810baa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "NUEVO DROP",
      isHot: true
    },
    {
      id: 2,
      name: "Yeezy Boost 350 V2 'Onyx'",
      brand: "ADIDAS",
      price: "$230.00",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "RESTOCK",
      isHot: false
    },
    {
      id: 3,
      name: "Nike SB Dunk Low 'Travis Scott'",
      brand: "NIKE",
      price: "$850.00",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "LIMITADO",
      isHot: true
    },
    {
      id: 4,
      name: "New Balance 550 'White Green'",
      brand: "NEW BALANCE",
      price: "$110.00",
      image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "",
      isHot: false
    }
  ];

  return (
    <section className="bg-[#0a0a0a] py-24 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28">
        
        {/* Cabecera de la sección */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-2 justify-center">
            <span className="text-[#E63946] font-display tracking-[0.2em] font-bold text-sm">STOCK RECIÉN LLEGADO</span>
          </div>
          <h2 className="text-white font-display font-black text-5xl md:text-6xl uppercase tracking-wider relative inline-block">
            LANZAMIENTOS <span className="text-[#E63946]">DESTACADOS</span>
            <Star className="absolute -top-4 -right-8 text-[#E63946] fill-[#E63946] animate-pulse hidden sm:block" size={24} />
          </h2>
          <p className="text-gray-400 font-body max-w-lg mt-4">
            Los sneakers más buscados del momento. Stock limitado, asegura tu par antes de que se agoten (SOLD OUT).
          </p>
        </div>

        {/* Cuadrícula de Tarjetas de Producto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={product.id} 
              className="bg-[#111111] border border-white/10 group cursor-pointer hover:border-white/30 transition-colors flex flex-col h-full"
            >
              {/* Imagen y Etiquetas */}
              <div className="relative aspect-square overflow-hidden bg-[#050505] p-6 flex items-center justify-center">
                
                {/* Badges Flotantes */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  {product.badge && (
                    <span className="bg-white text-black font-display text-xs px-2 py-1 tracking-widest font-bold">
                      {product.badge}
                    </span>
                  )}
                  {product.isHot && (
                    <span className="bg-[#E63946] text-white font-display text-xs px-2 py-1 tracking-widest font-bold flex items-center gap-1">
                      HYPE 🔥
                    </span>
                  )}
                </div>

                {/* Imagen del zapato con hover scale */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl mix-blend-lighten grayscale-[20%] group-hover:grayscale-0"
                />

                {/* Overlay oscuro sutil que se desvanece */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
              </div>

              {/* Información del Producto */}
              <div className="p-6 flex flex-col flex-grow relative overflow-hidden">
                <span className="text-gray-500 font-display tracking-widest text-sm mb-1">{product.brand}</span>
                <h3 className="text-white font-display text-2xl tracking-wide leading-tight mb-2 group-hover:text-[#E63946] transition-colors">{product.name}</h3>
                <p className="text-white font-body font-bold text-xl mt-auto pt-4">{product.price}</p>
                
                {/* Botón animado de compra que se desliza desde abajo */}
                <button className="absolute bottom-0 left-0 w-full bg-[#E63946] text-white font-display text-lg tracking-widest py-4 flex items-center justify-center gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <ShoppingCart size={20} /> AÑADIR AL CARRO
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botón central para ver todos */}
        <div className="mt-16 flex justify-center">
          <Link to="/catalogo" className="bg-transparent border border-white/20 text-white hover:bg-white hover:text-black font-display text-xl tracking-widest px-10 py-4 transition-all flex items-center gap-3 group">
            VER TODOS LOS SNEAKERS <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  )
}
