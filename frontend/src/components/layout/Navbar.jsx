import { Search, User, ShoppingCart, ChevronDown, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'NUEVOS', path: '/nuevos' },
    { name: 'JORDAN', path: '/jordan', hasDropdown: true },
    { name: 'NIKE', path: '/nike', hasDropdown: true },
    { name: 'ADIDAS', path: '/adidas', hasDropdown: true },
    { name: 'YEEZY', path: '/yeezy', hasDropdown: true },
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
        <div className="hidden lg:flex items-center gap-6 xl:gap-10 font-bold text-xl tracking-wider">
          {navLinks.map((link, i) => (
            <Link 
              key={i} 
              to={link.path}
              className={`flex items-center gap-1 hover:text-[#E63946] hover:-translate-y-0.5 transition-all duration-300 ${link.isRed ? 'text-[#E63946]' : 'text-gray-200'}`}
            >
              {link.name}
              {link.hasDropdown && <ChevronDown size={18} strokeWidth={3} className="text-gray-500" />}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 sm:gap-8 text-white z-50">
          <button className="hover:text-[#E63946] transition-colors p-1">
            <Search size={24} strokeWidth={2.5} />
          </button>
          <button className="hover:text-[#E63946] transition-colors hidden sm:block p-1">
            <User size={24} strokeWidth={2.5} />
          </button>
          <button className="group hover:text-[#E63946] transition-colors relative flex items-center p-1">
            <ShoppingCart size={24} strokeWidth={2.5} />
            <span className="absolute -top-1 -right-2 bg-[#E63946] text-white text-[12px] font-bold font-body w-[20px] h-[20px] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/10 shadow-xl flex flex-col font-bold text-2xl">
          {navLinks.map((link, i) => (
            <Link 
              key={i} 
              to={link.path}
              className={`p-6 border-b border-white/5 flex items-center justify-between hover:bg-white/5 ${link.isRed ? 'text-[#E63946]' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
              {link.hasDropdown && <ChevronDown size={20} strokeWidth={3} className="text-gray-500" />}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
