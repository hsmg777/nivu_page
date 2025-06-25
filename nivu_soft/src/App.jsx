import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Main from './pages/Main';
import Pricing from './pages/Pricing';
import Services from './pages/Services';
import NotFound from './pages/NotFound';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Main />} />

        <Route path="/services" element={<Services />} />

        <Route path="/pricing" element={<Pricing />} />

        <Route path="/aboutpage" element={<AboutPage />} />

        {/* Página de mantenimiento (opcional activar) */}
        {/* <Route path="*" element={<Maintenance />} /> */}

        {/* Página 404 como fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;