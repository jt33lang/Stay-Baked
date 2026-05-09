import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBasket, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function FloatingCartButton() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { quantity } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const isHomeOrStory = location.pathname === '/' || location.pathname === '/story' || location.pathname === '/subscription';
      
      if (isHomeOrStory) {
        // Show after scrolling past hero (approx 500px)
        setIsVisible(window.scrollY > 500);
      } else {
        // On other pages (like checkout or product), we might not want this specific floating button
        // since Product already has a sticky bar.
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-8 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none"
        >
          <div className="flex gap-3 pointer-events-auto">
            <Link 
              to="/shop"
              className="bg-background-dark text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform"
            >
              <ShoppingBasket size={20} className="text-primary" />
              Shop Now
            </Link>
            <Link 
              to="/checkout"
              className="bg-primary text-background-dark px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform"
            >
              Checkout Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
