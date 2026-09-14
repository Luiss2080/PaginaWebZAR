import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Topbar from './Topbar';
import Header from './Header';
import Footer from './Footer';
import DrawerCarrito from '../ui/DrawerCarrito';
import PanelBusqueda from '../ui/PanelBusqueda';
import { suscribirRespaldo } from '../../servicios/api';

export default function Layout() {
  const { pathname, search } = useLocation();
  const [respaldo, setRespaldo] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  useEffect(() => suscribirRespaldo(() => setRespaldo(true)), []);

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      {respaldo && (
        <p className="bg-gris px-4 py-2 text-center text-xs text-gris-medio">
          Mostrando el catálogo local porque el servidor no responde.
        </p>
      )}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <DrawerCarrito />
      <PanelBusqueda />
    </div>
  );
}
