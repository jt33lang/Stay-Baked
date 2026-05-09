import { motion } from 'motion/react';
import { Share2, Heart, Clock, Wheat, ListFilter, Salad, Plus, Minus, ShoppingBasket } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Product() {
  const { quantity, setQuantity } = useCart();

  return (
    <div className="pt-24 max-w-5xl mx-auto px-6 md:px-12">
      {/* Product Header Icons */}
      <div className="flex justify-end gap-3 mb-6">
        <button className="p-3 bg-primary/10 rounded-xl text-slate-900 hover:bg-primary/20 transition-colors">
          <Share2 size={20} />
        </button>
        <button className="p-3 bg-primary/10 rounded-xl text-slate-900 hover:bg-primary/20 transition-colors">
          <Heart size={20} />
        </button>
      </div>

      {/* Hero Gallery */}
      <section className="mb-12 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[40px] overflow-hidden aspect-[16/10] shadow-2xl relative"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA65WdVw4NEEZcrBLmBZy8TgTzikkd5EGaLRWhDyAH40EJtk9k45N7fRyGJ1lJrcdnQmJISNTGJPGJpmWJA-ThUfYsqbOCOVYhMWVSvqkzPegJnoOKlWqrPEBDFiczUEiiTmDeCyZSkYAdIGyJGoNYmd2hdB6YNnx2ed4ytdYZQ4MhTFjhxRuqJE_fYBmcuZ6dPxLM6RXe3AwGsf75Bt4gpnplpx3CqGHLabe7ekkV2oEFbINoQK4s7P2-0z7DRubidEUx86HdD5u6K" 
            alt="The Classic Sourdough" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-lg"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/50"></div>
          </div>
        </motion.div>
      </section>

      {/* Product Content */}
      <section className="grid grid-cols-1 lg:grid-cols-1 gap-12 mb-20">
        <div className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-8 border-b border-primary/10">
            <div>
              <h1 className="text-4xl md:text-6xl font-black mb-2">The Classic Sourdough Loaf</h1>
              <p className="text-primary text-xl font-bold">Artisanal 24-hour slow fermented bread</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black text-slate-900">$8.50</div>
              <div className="text-slate-400 line-through font-bold mt-1">$10.00 retail</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-primary/20 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3 text-primary">
                <Clock size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Fermentation</span>
              </div>
              <p className="text-3xl font-black">24 Hours</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-primary/20 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3 text-primary">
                <Wheat size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Wheat Type</span>
              </div>
              <p className="text-3xl font-black">Organic Heritage</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-black flex items-center gap-3">The Story</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Our signature loaf is a labor of love. Crafted using a heritage sourdough starter passed down through three generations, each loaf undergoes a rigorous 24-hour cold fermentation process. This allows the complex flavors of our 100% organic stone-ground heritage wheat to fully develop, resulting in a perfectly tangy interior and a thick, blistered crust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <ListFilter size={20} className="text-primary" /> Ingredients
              </h4>
              <ul className="space-y-3">
                {['100% Organic Heritage Wheat Flour', 'Filtered Spring Water', 'Hand-harvested Sea Salt', 'Wild Yeast Culture (The Mother)'].map((ing, i) => (
                  <li key={i} className="flex gap-4 items-center text-slate-700 font-medium">
                    <div className="w-2 h-2 rounded-full bg-primary" /> {ing}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-100 p-8 rounded-3xl">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Salad size={20} className="text-slate-500" /> Nutrition Facts
              </h4>
              <div className="space-y-3">
                {[
                  { label: 'Serving Size', val: '1 Slice (50g)' },
                  { label: 'Calories', val: '120' },
                  { label: 'Total Fat', val: '0.5g' },
                  { label: 'Total Carbs', val: '24g' },
                  { label: 'Protein', val: '4g' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="font-bold text-slate-900">{row.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">The Crust & The Crumb</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { src: 'https://lh3.googleusercontent.com/d/1WtA7c_7SLeKd6SWtQIEmsmvg8Pym0-Ra', alt: 'Artisanal sourdough slices with toys' },
                { src: 'https://lh3.googleusercontent.com/d/1Jg72AtD3jSLziWah_iPLMmjliJaD1nV8', alt: 'Whole sourdough loaf on cooling rack' },
                { src: 'https://lh3.googleusercontent.com/d/1AvpjoROKpc-nvxpEGCxe6cKn6E8gaILT', alt: 'Fresh sourdough cut in half' },
                { src: 'https://lh3.googleusercontent.com/d/1ZSr_glkwUbSacWCp-pPE_GzR_s1P-uV3', alt: 'Corgi looking at sourdough slice' },
                { src: 'https://lh3.googleusercontent.com/d/1shFUuDJFGH17gcJabLmKyfA4y3z-ouyh', alt: 'Sourdough loaf with headphones' },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-primary/10"
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background-light/80 backdrop-blur-xl border-t border-primary/20 p-6 z-40">
        <div className="max-w-5xl mx-auto flex items-center gap-6">
          <div className="flex items-center bg-white border border-primary/30 rounded-2xl overflow-hidden h-16">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-6 hover:bg-primary/10 text-primary transition-colors"
            >
              <Minus size={24} />
            </button>
            <span className="px-6 text-xl font-black min-w-[60px] text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="px-6 hover:bg-primary/10 text-primary transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>
          <Link to="/checkout" className="flex-1 bg-primary text-background-dark h-16 rounded-2xl text-xl font-black flex items-center justify-center gap-3 shadow-2xl hover:brightness-110 active:scale-95 transition-all">
            <ShoppingBasket size={24} /> Add to Cart - ${(quantity * 8.5).toFixed(2)}
          </Link>
        </div>
      </div>
      
      {/* Spacer for sticky bar */}
      <div className="h-32"></div>
    </div>
  );
}
