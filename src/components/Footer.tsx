import { Link } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await addDoc(collection(db, 'newsletter_subscriptions'), {
        email,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setErrorMessage('Failed to join newsletter. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <footer className="bg-background-dark text-white py-16 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Branding */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="https://lh3.googleusercontent.com/d/1FYeNAcPifDunkvz7YnzqrA0YcvUjUyC7" 
              alt="Stay Baked Sourdough" 
              className="h-14 w-auto object-contain brightness-110 rounded-lg"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-xl font-bold text-primary">Stay Baked Sourdough</h2>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Small-batch organic bakery dedicated to the ancient craft of sourdough fermentation.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-primary uppercase tracking-wider text-sm">Quick Links</h3>
          <nav className="flex flex-col gap-3 text-slate-400 text-sm">
            <Link to="/story" className="hover:text-white transition-colors">Our Story</Link>
            <Link to="/subscription" className="hover:text-white transition-colors">Subscription</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-primary uppercase tracking-wider text-sm">Stay Crusty</h3>
          <p className="text-slate-400 text-sm">Join our newsletter for fresh loaf alerts and bread tips.</p>
          
          {status === 'success' ? (
            <div className="flex items-center gap-2 text-primary font-bold animate-in fade-in slide-in-from-top-1">
              <CheckCircle2 size={20} />
              <span>You're in! Welcome to the family.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'submitting'}
                  className="bg-slate-800 border-none rounded-lg px-4 py-3 text-sm w-full focus:ring-1 focus:ring-primary outline-none disabled:opacity-50"
                  required
                />
                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-primary text-slate-900 px-6 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {status === 'submitting' ? 'Joining...' : 'Join'}
                </button>
              </div>
              {status === 'error' && (
                <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
                  <AlertCircle size={14} />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
        <p>© 2024 Artisanal Sourdough Co. All rights reserved. 100% Organic & Sourdough Certified.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-slate-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
