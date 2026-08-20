import { Search, User, ShoppingCart, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const navLinks = [
    { name: 'NEW ARRIVALS', path: '/new-arrivals' },
    { name: 'SNEAKERS', path: '/sneakers', hasDropdown: true },
    { name: 'APPAREL', path: '/apparel', hasDropdown: true },
    { name: 'ACCESSORIES', path: '/accessories', hasDropdown: true },
    { name: 'SALE', path: '/sale', isRed: true },
    { name: 'BRANDS', path: '/brands', hasDropdown: true },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm font-display">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-3xl md:text-4xl font-black tracking-tighter italic mr-2 md:mr-8 text-black">
          KICKDISTRICT
        </Link>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-bold text-lg tracking-wide">
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
        <div className="flex items-center gap-4 sm:gap-6 text-black">
          <button className="hover:text-primary transition-colors">
            <Search size={22} strokeWidth={2.5} />
          </button>
          <button className="hover:text-primary transition-colors hidden sm:block">
            <User size={22} strokeWidth={2.5} />
          </button>
          <button className="hover:text-primary transition-colors relative flex items-center">
            <ShoppingCart size={22} strokeWidth={2.5} />
            <span className="absolute -top-2 -right-3 bg-[#E63946] text-white text-[11px] font-bold font-body w-[18px] h-[18px] rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>

      </div>
    </nav>
  )
}
