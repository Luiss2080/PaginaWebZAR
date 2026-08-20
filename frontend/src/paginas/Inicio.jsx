import Topbar from '../components/layout/Topbar';
import Navbar from '../components/layout/Navbar';
import HeroBanner from '../components/home/HeroBanner';
import PopularCategories from '../components/home/PopularCategories';
import FeaturedDrops from '../components/home/FeaturedDrops';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      {/* Cabecera */}
      <Topbar />
      <Navbar />
      
      <main className="flex-grow">
        {/* Banner Principal */}
        <HeroBanner />
        
        {/* Cuerpo Principal del E-commerce (Fase 2) */}
        <PopularCategories />
        <FeaturedDrops />
        
      </main>

      {/* Pie de Página (Fase 1.5) */}
      <Footer />
    </div>
  )
}
