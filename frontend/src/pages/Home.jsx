import Topbar from '../components/layout/Topbar';
import Navbar from '../components/layout/Navbar';
import HeroBanner from '../components/home/HeroBanner';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Cabecera (Fase 1) */}
      <Topbar />
      <Navbar />
      
      <main className="flex-grow">
        {/* Banner Principal (Fase 1) */}
        <HeroBanner />
        
        {/* Placeholder para futuras fases */}
        <div className="container mx-auto px-4 py-20 text-center border-t border-gray-100 mt-8">
          <h2 className="text-3xl font-display text-gray-300">
            [AQUÍ IRÁ LA SECCIÓN DE CATEGORÍAS - FASE 2]
          </h2>
          <p className="text-gray-400 mt-2">
            Estamos construyendo esta interfaz progresivamente.
          </p>
        </div>
      </main>
    </div>
  )
}
