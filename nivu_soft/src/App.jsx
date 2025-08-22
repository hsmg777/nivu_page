import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Main from './pages/Main';
import PricingServicesPage from './pages/PricingServices';
import NotFound from './pages/NotFound';
import About from './pages/About';   
import Contact from './pages/Contact'; 

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Main />} />

        <Route path="/pricing" element={<PricingServicesPage />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        {/* Página de mantenimiento (opcional activar) */}
        {/* <Route path="*" element={<Maintenance />} /> */}

        {/* Página 404 como fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;