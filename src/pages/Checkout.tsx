import { motion } from 'motion/react';
import { Truck, Lock, Smartphone, ArrowRight, ShieldCheck, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { quantity, setQuantity } = useCart();
  const unitPrice = 8.50;
  const subtotal = quantity * unitPrice;

  return (
    <div className="pt-24 max-w-6xl mx-auto px-6 md:px-12 pb-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black mb-4">Checkout</h1>
        <p className="text-slate-600 text-lg">Complete your order for artisan sourdough, baked fresh and delivered to your door.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Form Area */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          {/* Shipping */}
          <section>
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
              <Truck className="text-primary" /> Delivery Address & Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">First Name</label>
                <input type="text" placeholder="Jane" className="bg-white border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
                <input type="text" placeholder="Doe" className="bg-white border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Steet Address (Unit No / Building)</label>
                <input type="text" placeholder="123 Bakery Lane, #05-12" className="bg-white border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Mobile Number</label>
                <input type="text" placeholder="9123 4567" className="bg-white border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Postal Code</label>
                <input type="text" placeholder="123456" className="bg-white border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Delivery Instructions (Optional)</label>
                <textarea placeholder="Leave at the gate / Press doorbell" className="bg-white border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all min-h-[100px]" />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
              <Lock className="text-primary" /> Payment Method
            </h2>
            <div className="bg-primary/5 p-10 rounded-[32px] border border-primary/20 flex flex-col items-center text-center gap-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-background-dark shadow-xl">
                <Smartphone size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2">Manual Payment via PayNow</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                   Please PayNow or PayLah! to the following mobile number:
                </p>
                <div className="bg-white p-6 rounded-2xl border-2 border-primary border-dashed shadow-sm">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Mobile Number</p>
                  <p className="text-3xl font-black text-slate-900 tracking-tight">+65 9343 0453</p>
                </div>
                <p className="mt-6 text-sm text-slate-500 italic">
                  *Please include your name in the payment reference. We will bake your order once payment is verified.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white p-10 rounded-[32px] border border-slate-100 shadow-2xl space-y-8">
            <h2 className="text-2xl font-black">Order Summary</h2>
            
            <div className="flex items-center justify-between gap-6 py-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-100 shrink-0">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWwLnpyZhGJ83fDkCtfb9XvkZZpCSVmMZed_Ah9Ziahzu3od7nEvaKRWpGReqgzn-kcL__0FyFQC4mt7o2PvQ4QysQXnUctsMQ68Vfg8m79FQP-GEXmuZHxg0xZ8an4zqDmhthtn8v1ojHWBc9qNk089AKO4ugl2RI_tGV26_wQgY7axyxAVk3nWFL0CBORfXZGkSFq07810dfZqSRmkzui85J4Ccy1tldy5-NSASRQWbepMR8MZr9-42prKSHkSuGheDhAY40AbmI" 
                    alt="Bread"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-black text-lg">The Classic Sourdough</p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden h-8">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2 hover:bg-primary/10 text-primary transition-colors border-r border-slate-200"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm font-black min-w-[30px] text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2 hover:bg-primary/10 text-primary transition-colors border-l border-slate-200"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-slate-400 text-sm">unit{quantity > 1 ? 's' : ''} • ${unitPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded tracking-tighter">PROMO</span>
                    <span className="text-slate-300 line-through text-[10px]">$10.00 retail</span>
                  </div>
                </div>
              </div>
              <p className="font-black text-xl">${subtotal.toFixed(2)}</p>
            </div>

            <div className="space-y-4 py-2 border-b border-slate-100">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="font-bold text-slate-900">$0.00 (waived)</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Taxes</span>
                <span className="font-bold text-slate-900">$0.00 (waived)</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-4">
              <span className="text-2xl font-black">Total</span>
              <span className="text-4xl font-black text-primary">${subtotal.toFixed(2)}</span>
            </div>

            <button className="w-full bg-primary text-background-dark font-black py-6 rounded-2xl flex items-center justify-center gap-3 text-xl hover:brightness-110 shadow-2xl shadow-primary/20 transition-all active:scale-[0.98]">
              Place Order <ArrowRight size={24} />
            </button>

            <div className="text-center space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed px-6">
                Your personal data will be used to process your order and support your experience throughout this website.
              </p>
              <div className="flex items-center justify-center gap-2 text-slate-400 opacity-60">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
