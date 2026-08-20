import { ShoppingCart, Heart, Search, Menu, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full">
      {/* Topbar */}
      <div className="bg-light hidden lg:block border-b border-gray-200">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm text-gray-500">
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link to="/help" className="hover:text-primary transition-colors">Help</Link>
            <Link to="/faqs" className="hover:text-primary transition-colors">FAQs</Link>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              My Account <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              USD <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              EN <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        <Link to="/" className="text-4xl font-bold text-dark uppercase flex items-center">
          <span className="bg-primary text-dark px-2 mr-1">MULTI</span>
          <span className="bg-dark text-white px-2">SHOP</span>
        </Link>

        <div className="w-full lg:w-1/2 flex">
          <input 
            type="text" 
            placeholder="Search for products" 
            className="w-full px-4 py-2 border border-r-0 border-gray-300 focus:outline-none focus:border-primary"
          />
          <button className="px-4 border border-l-0 border-gray-300 text-primary bg-white hover:bg-gray-50">
            <Search size={20} />
          </button>
        </div>

        <div className="flex flex-col text-right hidden lg:block">
          <p className="text-gray-500 text-sm">Customer Service</p>
          <p className="text-xl font-medium text-dark">+012 345 6789</p>
        </div>
      </div>

      {/* Navbar */}
      <div className="bg-dark text-white">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center h-16">
            <div className="w-64 bg-primary text-dark font-medium h-full flex items-center justify-between px-4 cursor-pointer hidden lg:flex">
              <div className="flex items-center gap-2">
                <Menu size={20} />
                <span>Categories</span>
              </div>
              <ChevronDown size={16} />
            </div>
            
            <nav className="flex gap-6 ml-8 font-medium">
              <Link to="/" className="text-primary">Home</Link>
              <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <Link to="/detail" className="hover:text-primary transition-colors">Shop Detail</Link>
              <Link to="/pages" className="hover:text-primary transition-colors flex items-center gap-1">Pages <ChevronDown size={14}/></Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <Heart size={20} />
              <span className="border border-gray-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">0</span>
            </button>
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <ShoppingCart size={20} />
              <span className="border border-gray-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
