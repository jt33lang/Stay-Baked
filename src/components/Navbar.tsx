import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Subscription', path: '/subscription' },
    { name: 'Our Story', path: '/story' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-primary/20 transition-all">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M15 15a4 4 0 0 1-5.14 0M12 12v3M9 10c0-1.65 1.35-3 3-3s3 1.35 3 3M4 10c0-1.65 1.35-3 3-3M17 10c0-1.65 1.35-3 3-3M4 10h16M4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-primary transition-colors">Stay Baked Sourdough</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary border-b-2 border-primary' : 'text-slate-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-primary/10 text-slate-700 transition-colors">
            <ShoppingBag size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-primary/10 text-slate-700 transition-colors">
            <User size={20} />
          </button>
          <button 
            className="md:hidden p-2 text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background-light border-t border-primary/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium ${
                    location.pathname === link.path ? 'text-primary' : 'text-slate-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
