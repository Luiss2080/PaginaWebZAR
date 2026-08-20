import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        {/* Placeholder para otras rutas */}
        <Route path="*" element={<Inicio />} />
      </Routes>
    </Router>
  )
}

export default App
