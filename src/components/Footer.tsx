import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-background-dark text-white py-16 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Branding */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 text-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <path d="M15 15a4 4 0 0 1-5.14 0M12 12v3M9 10c0-1.65 1.35-3 3-3s3 1.35 3 3M4 10c0-1.65 1.35-3 3-3M17 10c0-1.65 1.35-3 3-3M4 10h16M4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Stay Baked Sourdough</h2>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Small-batch organic bakery dedicated to the ancient craft of sourdough fermentation.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-primary uppercase tracking-wider text-sm">Quick Links</h3>
          <nav className="flex flex-col gap-3 text-slate-400 text-sm">
            <Link to="/process" className="hover:text-white transition-colors">Our Baking Process</Link>
            <Link to="/login" className="hover:text-white transition-colors">Subscription Login</Link>
            <Link to="/gifts" className="hover:text-white transition-colors">Gifting Options</Link>
            <Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-primary uppercase tracking-wider text-sm">Stay Crusty</h3>
          <p className="text-slate-400 text-sm">Join our newsletter for fresh loaf alerts and bread tips.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address"
              className="bg-slate-800 border-none rounded-lg px-4 py-3 text-sm w-full focus:ring-1 focus:ring-primary outline-none"
            />
            <button className="bg-primary text-slate-900 px-6 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all">
              Join
            </button>
          </div>
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
