import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

export default function Home() {
  // Mock data for featured products
  const products = Array(8).fill(null).map((_, i) => ({
    id: i + 1,
    name: "Camera Lens 50mm",
    price: 123.00,
    oldPrice: 123.00,
    image: `https://picsum.photos/seed/${i + 10}/300/300`,
    rating: 4,
    reviews: 99
  }));

  const categories = [
    { id: 1, name: 'Category Name', products: 100, image: 'https://picsum.photos/seed/cat1/150/150' },
    { id: 2, name: 'Category Name', products: 100, image: 'https://picsum.photos/seed/cat2/150/150' },
    { id: 3, name: 'Category Name', products: 100, image: 'https://picsum.photos/seed/cat3/150/150' },
    { id: 4, name: 'Category Name', products: 100, image: 'https://picsum.photos/seed/cat4/150/150' },
    { id: 5, name: 'Category Name', products: 100, image: 'https://picsum.photos/seed/cat5/150/150' },
    { id: 6, name: 'Category Name', products: 100, image: 'https://picsum.photos/seed/cat6/150/150' },
    { id: 7, name: 'Category Name', products: 100, image: 'https://picsum.photos/seed/cat7/150/150' },
    { id: 8, name: 'Category Name', products: 100, image: 'https://picsum.photos/seed/cat8/150/150' },
    { id: 9, name: 'Category Name', products: 100, image: 'https://picsum.photos/seed/cat9/150/150' },
    { id: 10, name: 'Category Name', products: 100, image: 'https://picsum.photos/seed/cat10/150/150' },
    { id: 11, name: 'Category Name', products: 100, image: 'https://picsum.photos/seed/cat11/150/150' },
    { id: 12, name: 'Category Name', products: 100, image: 'https://picsum.photos/seed/cat12/150/150' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Features Section */}
        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 flex items-center shadow-sm">
              <h1 className="text-3xl text-primary font-black mr-4">✓</h1>
              <h5 className="font-semibold text-lg text-dark">Quality Product</h5>
            </div>
            <div className="bg-white p-6 flex items-center shadow-sm">
              <h1 className="text-3xl text-primary font-black mr-4">🚚</h1>
              <h5 className="font-semibold text-lg text-dark">Free Shipping</h5>
            </div>
            <div className="bg-white p-6 flex items-center shadow-sm">
              <h1 className="text-3xl text-primary font-black mr-4">🔄</h1>
              <h5 className="font-semibold text-lg text-dark">14-Day Return</h5>
            </div>
            <div className="bg-white p-6 flex items-center shadow-sm">
              <h1 className="text-3xl text-primary font-black mr-4">📞</h1>
              <h5 className="font-semibold text-lg text-dark">24/7 Support</h5>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="container mx-auto px-4 mt-12">
          <h2 className="text-2xl font-bold uppercase mb-6 flex items-center">
            <span className="bg-light pr-3">CATEGORIES</span>
            <div className="h-px bg-gray-300 flex-grow border-dashed border-b border-gray-300"></div>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map(cat => (
              <div key={cat.id} className="bg-white flex items-center p-0 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="w-1/3 overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="w-2/3 pl-4 py-2">
                  <h6 className="font-semibold text-dark truncate">{cat.name}</h6>
                  <small className="text-gray-500">{cat.products} Products</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Products Section */}
        <div className="container mx-auto px-4 mt-12">
          <h2 className="text-2xl font-bold uppercase mb-6 flex items-center">
            <span className="bg-light pr-3">RECENT PRODUCTS</span>
            <div className="h-px bg-gray-300 flex-grow border-dashed border-b border-gray-300"></div>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
