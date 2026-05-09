import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Subscription from './pages/Subscription';
import Product from './pages/Product';
import Checkout from './pages/Checkout';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/shop" element={<Product />} />
              <Route path="/checkout" element={<Checkout />} />
              {/* Fallback routes to show something for now */}
              <Route path="/story" element={<Home />} />
              <Route path="/contact" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}
