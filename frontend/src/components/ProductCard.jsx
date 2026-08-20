import { ShoppingCart, Heart, Search, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  // Default values to prevent errors if API doesn't send them
  const { 
    id = 1, 
    name = "Product Name Goes Here", 
    price = 123.00, 
    oldPrice = 123.00, 
    image = "https://via.placeholder.com/300x300?text=Product",
    rating = 5,
    reviews = 99
  } = product || {};

  return (
    <div className="bg-white group transition-all duration-300">
      <div className="relative overflow-hidden">
        <img src={image} alt={name} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110" />
        
        {/* Hover action buttons */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white text-dark hover:bg-primary hover:text-dark p-2 transition-colors">
            <ShoppingCart size={20} />
          </button>
          <button className="bg-white text-dark hover:bg-primary hover:text-dark p-2 transition-colors">
            <Heart size={20} />
          </button>
          <button className="bg-white text-dark hover:bg-primary hover:text-dark p-2 transition-colors">
            <RefreshCw size={20} />
          </button>
          <button className="bg-white text-dark hover:bg-primary hover:text-dark p-2 transition-colors">
            <Search size={20} />
          </button>
        </div>
      </div>
      
      <div className="text-center p-6 bg-white border border-t-0 border-gray-100">
        <Link to={`/products/${id}`} className="block text-lg font-medium text-dark hover:text-primary transition-colors truncate mb-2">
          {name}
        </Link>
        <div className="flex justify-center items-center gap-2 mb-2">
          <h5 className="font-bold text-lg">${price.toFixed(2)}</h5>
          {oldPrice > price && (
            <h6 className="text-gray-400 line-through">${oldPrice.toFixed(2)}</h6>
          )}
        </div>
        <div className="flex justify-center items-center gap-1 text-primary text-sm">
          {/* Simple star rating mock */}
          {'★'.repeat(rating)}{'☆'.repeat(5-rating)}
          <small className="text-gray-500 ml-1">({reviews})</small>
        </div>
      </div>
    </div>
  )
}
