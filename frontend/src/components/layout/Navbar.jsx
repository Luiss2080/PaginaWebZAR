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
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm font-display relative">
      <div className="container mx-auto px-4 max-w-7xl py-4 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-black p-2 -ml-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} strokeWidth={2.5} />
        </button>

        {/* Logo */}
        <Link to="/" className="text-3xl md:text-4xl font-black tracking-tighter italic lg:mr-8 text-black z-50">
          SNEAKERZAR
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8 font-bold text-lg tracking-wide">
          {navLinks.map((link, i) => (
            <Link 
              key={i} 
              to={link.path}
              className={`flex items-center gap-1 hover:text-primary transition-colors ${link.isRed ? 'text-[#E63946]' : 'text-black'}`}
            >
              {link.name}
              {link.hasDropdown && <ChevronDown size={16} strokeWidth={3} className="text-black/60" />}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 sm:gap-6 text-black z-50">
          <button className="hover:text-primary transition-colors p-1">
            <Search size={22} strokeWidth={2.5} />
          </button>
          <button className="hover:text-primary transition-colors hidden sm:block p-1">
            <User size={22} strokeWidth={2.5} />
          </button>
          <button className="hover:text-primary transition-colors relative flex items-center p-1">
            <ShoppingCart size={22} strokeWidth={2.5} />
            <span className="absolute -top-1 -right-2 bg-[#E63946] text-white text-[11px] font-bold font-body w-[18px] h-[18px] rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl flex flex-col font-bold text-lg">
          {navLinks.map((link, i) => (
            <Link 
              key={i} 
              to={link.path}
              className={`p-4 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 ${link.isRed ? 'text-[#E63946]' : 'text-black'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
              {link.hasDropdown && <ChevronDown size={16} strokeWidth={3} className="text-black/40" />}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
