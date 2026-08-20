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
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-display font-black tracking-tighter italic mr-8">
          KICKDISTRICT
        </Link>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-8 font-semibold text-sm">
          {navLinks.map((link, i) => (
            <Link 
              key={i} 
              to={link.path}
              className={`flex items-center gap-1 hover:text-primary transition-colors ${link.isRed ? 'text-primary' : 'text-dark'}`}
            >
              {link.name}
              {link.hasDropdown && <ChevronDown size={14} className="text-gray-400" />}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <button className="hover:text-primary transition-colors">
            <Search size={20} strokeWidth={2.5} />
          </button>
          <button className="hover:text-primary transition-colors hidden sm:block">
            <User size={20} strokeWidth={2.5} />
          </button>
          <button className="hover:text-primary transition-colors relative">
            <ShoppingCart size={20} strokeWidth={2.5} />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>

      </div>
    </nav>
  )
}
