import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './componentes/layout/Layout';
import Inicio from './paginas/Inicio';
import Catalogo from './paginas/Catalogo';
import DetalleProducto from './paginas/DetalleProducto';
import Favoritos from './paginas/Favoritos';
import Login from './paginas/Login';
import Registro from './paginas/Registro';
import Estatica from './paginas/Estatica';
import NoEncontrado from './paginas/NoEncontrado';
import Checkout from './paginas/Checkout';
import Pedidos from './paginas/Pedidos';
import CuentaProveedor from './contextos/CuentaProveedor';
import FavoritosProveedor from './contextos/FavoritosProveedor';
import CarritoProveedor from './contextos/CarritoProveedor';
import BusquedaProveedor from './contextos/BusquedaProveedor';

export default function App() {
  return (
    <BrowserRouter>
      <CuentaProveedor>
        <FavoritosProveedor>
          <CarritoProveedor>
            <BusquedaProveedor>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<Inicio />} />
                  <Route path="catalogo" element={<Catalogo />} />
                  <Route path="producto/:id" element={<DetalleProducto />} />
                  <Route path="favoritos" element={<Favoritos />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="pedidos" element={<Pedidos />} />
                  <Route path="login" element={<Login />} />
                  <Route path="registro" element={<Registro />} />
                  <Route path="pagina/:slug" element={<Estatica />} />
                  <Route path="*" element={<NoEncontrado />} />
                </Route>
              </Routes>
            </BusquedaProveedor>
          </CarritoProveedor>
        </FavoritosProveedor>
      </CuentaProveedor>
    </BrowserRouter>
  );
}
