import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Placeholder para otras rutas */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
