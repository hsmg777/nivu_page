import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { AdminSubscriptions } from './components/AdminSubscriptions';
import { PaymentPortal } from './components/PaymentPortal';
import { Login } from './components/Login';

const HomePage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />
      <CTA />
    </main>
    <Footer />
  </>
);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('nivu_admin_token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/suscripciones" element={
            <ProtectedRoute>
              <AdminSubscriptions />
            </ProtectedRoute>
          } />
          <Route path="/pagar" element={<PaymentPortal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
