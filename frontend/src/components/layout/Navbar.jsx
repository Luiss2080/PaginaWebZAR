import { Search, User, ShoppingCart, ChevronDown, Menu, LogOut, Heart, Package as PackageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navLinks = [
    { name: 'NUEVOS', path: '/nuevos' },
    { 
      name: 'JORDAN', 
      path: '/jordan', 
      hasDropdown: true,
      subcategories: [
        { name: 'Air Jordan 1 High', path: '/jordan/1-high' },
        { name: 'Air Jordan 1 Low', path: '/jordan/1-low' },
        { name: 'Air Jordan 4', path: '/jordan/4' },
        { name: 'Collabs Exclusivas', path: '/jordan/collabs' },
      ]
    },
    { 
      name: 'NIKE', 
      path: '/nike', 
      hasDropdown: true,
      subcategories: [
        { name: 'Nike SB Dunk', path: '/nike/sb' },
        { name: 'Air Force 1', path: '/nike/af1' },
        { name: 'Air Max', path: '/nike/airmax' },
        { name: 'Off-White x Nike', path: '/nike/off-white' },
      ]
    },
    { 
      name: 'ADIDAS', 
      path: '/adidas', 
      hasDropdown: true,
      subcategories: [
        { name: 'Yeezy Boost', path: '/adidas/yeezy' },
        { name: 'Samba & Gazelle', path: '/adidas/classics' },
        { name: 'Ultraboost', path: '/adidas/ultraboost' },
        { name: 'Bad Bunny Collabs', path: '/adidas/bad-bunny' },
      ]
    },
    { name: 'OFERTAS', path: '/ofertas', isRed: true },
  ];

  return (
    <nav className="bg-[#050505] sticky top-0 z-50 border-b border-white/10 shadow-2xl font-display relative">
      <div className="container mx-auto px-4 max-w-7xl py-5 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white p-2 -ml-2 hover:text-[#E63946] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={28} strokeWidth={2.5} />
        </button>

        {/* Logo */}
        <Link to="/" className="text-4xl md:text-5xl font-black tracking-tighter italic lg:mr-8 text-white z-50 flex items-center">
          ZAR<span className="text-[#E63946]">KICKS</span>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-bold text-xl tracking-wider">
          {navLinks.map((link, i) => (
            <div 
              key={i} 
              className="relative group h-full py-2"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to={link.path}
                className={`flex items-center gap-1 hover:text-[#E63946] hover:-translate-y-0.5 transition-all duration-300 ${link.isRed ? 'text-[#E63946]' : 'text-gray-200'}`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={18} strokeWidth={3} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180 text-[#E63946]' : 'text-gray-500'}`} />}
              </Link>

              {/* Mega-Menú Dropdown */}
              {link.hasDropdown && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-[#111111] border border-white/10 shadow-2xl z-50"
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#111111] border-t border-l border-white/10 rotate-45"></div>
                      <div className="flex flex-col py-3 relative z-10">
                        {link.subcategories.map((sub, j) => (
                          <Link 
                            key={j} 
                            to={sub.path}
                            className="px-6 py-3 text-gray-300 hover:text-white hover:bg-[#E63946] transition-colors flex items-center gap-2 font-display tracking-widest text-lg"
                          >
                            <ArrowRightMicro />
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 sm:gap-6 text-white z-50">
          <button className="hover:text-[#E63946] transition-colors p-1">
            <Search size={24} strokeWidth={2.5} />
          </button>
          
          {/* User Dropdown */}
          <div 
            className="relative group hidden sm:block h-full py-2"
            onMouseEnter={() => setActiveDropdown('user')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="hover:text-[#E63946] transition-colors p-1 flex items-center gap-1">
              <User size={24} strokeWidth={2.5} />
            </button>
            
            <AnimatePresence>
              {activeDropdown === 'user' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-4 w-56 bg-[#111111] border border-white/10 shadow-2xl z-50"
                >
                  <div className="absolute -top-2 right-4 w-4 h-4 bg-[#111111] border-t border-l border-white/10 rotate-45"></div>
                  <div className="flex flex-col py-2 relative z-10 font-body text-sm font-semibold">
                    <Link to="/perfil" className="px-5 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3">
                      <User size={18} /> Mi Perfil
                    </Link>
                    <Link to="/pedidos" className="px-5 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3">
                      <PackageIcon size={18} /> Mis Pedidos
                    </Link>
                    <Link to="/favoritos" className="px-5 py-3 text-gray-300 hover:text-[#E63946] hover:bg-white/10 transition-colors flex items-center gap-3">
                      <Heart size={18} /> Lista de Deseos
                    </Link>
                    <div className="border-t border-white/10 my-1"></div>
                    <button className="px-5 py-3 text-gray-500 hover:text-white hover:bg-red-900/50 transition-colors flex items-center gap-3 w-full text-left">
                      <LogOut size={18} /> Cerrar Sesión
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart */}
          <button className="group hover:text-[#E63946] transition-colors relative flex items-center p-1">
            <ShoppingCart size={24} strokeWidth={2.5} />
            <span className="absolute -top-1 -right-2 bg-[#E63946] text-white text-[12px] font-bold font-body w-[20px] h-[20px] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#0a0a0a] border-b border-white/10 shadow-xl flex flex-col font-bold text-xl"
          >
            {navLinks.map((link, i) => (
              <div key={i}>
                <Link 
                  to={link.path}
                  className={`px-6 py-5 border-b border-white/5 flex items-center justify-between hover:bg-white/5 ${link.isRed ? 'text-[#E63946]' : 'text-white'}`}
                  onClick={() => !link.hasDropdown && setMobileMenuOpen(false)}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={20} strokeWidth={3} className="text-gray-500" />}
                </Link>
                {/* Mobile Subcategories (simulated open for display) */}
                {link.hasDropdown && (
                  <div className="bg-[#111111] flex flex-col">
                    {link.subcategories.map((sub, j) => (
                      <Link 
                        key={j} 
                        to={sub.path}
                        className="px-10 py-3 text-gray-400 hover:text-white text-lg font-display tracking-wider border-b border-white/5 flex items-center gap-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <ArrowRightMicro /> {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile User Options */}
            <div className="p-6 bg-[#111111] grid grid-cols-2 gap-4">
              <Link to="/perfil" className="flex items-center gap-2 text-gray-300 font-body text-sm font-semibold" onClick={() => setMobileMenuOpen(false)}><User size={16}/> Mi Perfil</Link>
              <Link to="/pedidos" className="flex items-center gap-2 text-gray-300 font-body text-sm font-semibold" onClick={() => setMobileMenuOpen(false)}><PackageIcon size={16}/> Pedidos</Link>
              <Link to="/favoritos" className="flex items-center gap-2 text-[#E63946] font-body text-sm font-semibold" onClick={() => setMobileMenuOpen(false)}><Heart size={16}/> Deseos</Link>
              <button className="flex items-center gap-2 text-gray-500 font-body text-sm font-semibold" onClick={() => setMobileMenuOpen(false)}><LogOut size={16}/> Salir</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Micro Icon Component for Mega-Menu list items
function ArrowRightMicro() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#E63946]">
      <path d="M5 12h14"></path>
      <path d="M12 5l7 7-7 7"></path>
    </svg>
  )
}
