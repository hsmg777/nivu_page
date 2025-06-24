import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import Main from './pages/Main';
import Pricing from './pages/Pricing';
import Services from './pages/Services';
import NotFound from './pages/NotFound';
import Maintenance from './pages/Maintenance';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        {/* Página de mantenimiento (opcional activar) */}
         <Route path="/" element={<Maintenance />} />

        {/* Página 404 como fallback */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
