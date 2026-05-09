import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Leaf, Droplet, Wind, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-12">
        <div 
          className="relative min-h-[600px] flex flex-col items-center justify-center rounded-3xl overflow-hidden p-8 md:p-12 text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 30, 16, 0.4), rgba(34, 30, 16, 0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2iUNXb5X_jMDNGxayA2hHCWCP53aOSjhuLad1jg5y9zrxr9HwKolUov4eUVFeGRToPkyLz1Awi0Oagg9rZddaASSqjpq_-QRmULC4lB1qqmBboGZAByzETlJSkTFOaKeD7ga-j8Nf3FyrCsY_PBU1F_SULO9JSD4dTQKN7-w-Jj3-IH5COIgmcvmIsQdoQo3NZVrOAO0_Eie4Dk9zqHCn5oZZYm94nObvpy8WQSmZ1slz5OrAfsDTRXNA4f7g0DFJ4yfC78_GQckE")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl z-10"
          >
            <h1 className="text-white text-5xl md:text-8xl font-black leading-none tracking-tight mb-6">
              Handcrafted Sourdough, Organic Roots
            </h1>
            <p className="text-white/90 text-lg md:text-2xl font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
              100% organic ingredients, baked at home, delivered to you for a fraction of retail prices.
            </p>
            <Link to="/shop" className="bg-primary text-background-dark px-10 py-5 rounded-xl text-xl font-bold hover:scale-105 transition-transform shadow-2xl flex items-center gap-3 mx-auto w-fit">
              Shop Now <ArrowRight size={24} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Holy Trinity */}
      <section id="ingredients" className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6">The Holy Trinity of Sourdough</h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
            Pure, simple, and 100% organic. No additives, no shortcuts, just nature in every bite.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Leaf, title: 'Organic Flour', desc: 'Stone-ground organic wheat for superior nutrition and deep, complex flavors.' },
            { icon: Droplet, title: 'Filtered Water', desc: 'Pure water to maintain the sourdough\'s delicate ecosystem and wild yeast health.' },
            { icon: Wind, title: 'Sea Salt', desc: 'Hand-harvested sea salt for the perfect mineral balance and flavor profile.' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-3xl border border-primary/10 shadow-sm text-center flex flex-col items-center group hover:shadow-xl hover:border-primary/30 transition-all"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="bg-primary/5 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { step: '1', title: 'Order Your Loaf', desc: 'Select your favorite variety from our weekly baking schedule.' },
              { step: '2', title: 'Slow Fermentation', desc: 'We let our dough rise for 24+ hours for better digestibility and taste.' },
              { step: '3', title: 'Fresh Delivery', desc: 'Warm from the oven to your doorstep within hours of baking.' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-background-dark text-3xl font-black shadow-lg">
                  {item.step}
                </div>
                <h4 className="text-2xl font-bold">{item.title}</h4>
                <p className="text-slate-600 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="bg-background-dark rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl relative grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
          <div className="flex-1 p-12 md:p-20 flex flex-col justify-center gap-8">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1 rounded-full w-fit">
              <RefreshCw size={14} />
              <span className="text-xs font-bold uppercase tracking-widest text-[#f4c025]">Subscription Service</span>
            </div>
            <h2 className="text-white text-4xl md:text-6xl font-black leading-tight">
              Subscribe & Save 18% <span className="text-primary">on Every Loaf</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              Never run out of fresh bread again. Choose your favorite loaves and we'll deliver them warm to your doorstep every week. 
            </p>
            <div className="space-y-4">
              {[
                'Fresh Bread Always: Scheduled deliveries mean bread for breakfast.',
                '18% Permanent Discount: Always cheaper than one-off orders.',
                'Easy Management: Pause, skip, or cancel anytime with one click.'
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start text-white/90">
                  <CheckCircle2 size={24} className="text-primary shrink-0" />
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
            <Link to="/subscription" className="bg-primary text-background-dark w-fit px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-transform mt-4 text-center">
              Subscribe Now
            </Link>
          </div>
          <div className="flex-1 relative min-h-[400px] hidden md:block overflow-hidden">
             <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA65WdVw4NEEZcrBLmBZy8TgTzikkd5EGaLRWhDyAH40EJtk9k45N7fRyGJ1lJrcdnQmJISNTGJPGJpmWJA-ThUfYsqbOCOVYhMWVSvqkzPegJnoOKlWqrPEBDFiczUEiiTmDeCyZSkYAdIGyJGoNYmd2hdB6YNnx2ed4ytdYZQ4MhTFjhxRuqJE_fYBmcuZ6dPxLM6RXe3AwGsf75Bt4gpnplpx3CqGHLabe7ekkV2oEFbINoQK4s7P2-0z7DRubidEUx86HdD5u6K"
              alt="Fresh Sourdough"
              className="absolute inset-0 w-full h-full object-cover scale-110 rotate-3"
            />
            <div className="absolute bottom-10 left-10 bg-primary text-background-dark px-10 py-6 rounded-2xl shadow-2xl">
              <p className="text-4xl font-black">-18%</p>
              <p className="text-sm font-bold uppercase tracking-tight">Weekly Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="savings" className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <div className="mb-12">
          <h2 className="text-4xl font-black mb-4">Real Value, Real Bread</h2>
          <p className="text-slate-600 text-lg">We cut out retail markups and industrial overhead to bring you better bread for less.</p>
        </div>
        <div className="bg-white rounded-3xl border border-primary/20 shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/10">
                <th className="p-8 font-bold uppercase tracking-wider text-sm">Feature</th>
                <th className="p-8 font-bold uppercase tracking-wider text-sm text-primary">Our Home-Baked</th>
                <th className="p-8 font-bold uppercase tracking-wider text-sm">Store Prices</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {[
                { label: 'Quality', ours: '100% Organic & Wild Yeast', store: 'Commercial Yeast & Additives' },
                { label: 'Price per Loaf', ours: '$8.50 (delivery included)', store: '$18.00 - 25.00' },
                { label: 'Freshness', ours: 'Baked to Order Today', store: '2-5 Days Old' },
                { label: 'Preparation', ours: '24h Cold Fermentation', store: 'Rapid 2h Rise' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-primary/5 transition-colors">
                  <td className="p-8 font-bold text-slate-800">{row.label}</td>
                  <td className="p-8 font-bold text-primary">{row.ours}</td>
                  <td className="p-8 text-slate-500">{row.store}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
