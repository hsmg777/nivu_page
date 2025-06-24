import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './Pages/Main';
import Pricing from './Pages/Pricing';
import Services from './Pages/Services';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Main />} />

        <Route path="/services" element={<Services />} />

        <Route path="/pricing" element={<Pricing />} />

        {/* Página de mantenimiento (opcional activar) */}
        {/* <Route path="*" element={<Maintenance />} /> */}

        {/* Página 404 como fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;