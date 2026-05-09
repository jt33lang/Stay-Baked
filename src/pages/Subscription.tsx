import { motion } from 'motion/react';
import { Truck, Tag, CalendarIcon, CheckCircle2, ArrowRight, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Subscription() {
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
          className="relative min-h-[460px] flex flex-col justify-end rounded-3xl overflow-hidden p-12 md:p-20 shadow-2xl"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 30, 16, 0.2), rgba(34, 30, 16, 0.8)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtcH3dYQfA4nCLS6DtNQG9B7OlGt5VpXndsWcvEHuYdB6ByzT9UCrWSShSHcfSBtJSYkFOYpfL3J_7Cg1WSEFAh2tDiUrcp6zQjEuLkyTHGM6_UcQKmJVM-CcDdLxXWhOXX8vWZW7ZXhEcqpSmgQbHo2L11yJ6nI87GToTxdRyYAHnhatA1DUXiAf4PT8lEiIZYiD4NvmTqJzbG_q5G9g1ki16OaAJ0gvwM9i3YcjcIOOQHyOm7PfrYrSWAoBTk9vnMDEbdlMSA7xr")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-2xl">
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Bread Subscription</span>
            <h1 className="text-white text-5xl md:text-8xl font-black mb-6">Subscribe & Save</h1>
            <p className="text-white/80 text-xl font-normal leading-relaxed max-w-lg">
              Experience the joy of 100% organic sourdough delivered to your door. Save 18% on every loaf and never run out again.
            </p>
          </div>
        </div>
      </section>

      {/* Why Subscribe */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <h2 className="text-4xl md:text-6xl font-black">Why Subscribe?</h2>
          <div className="w-24 h-2 bg-primary rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: 'Never Run Out', desc: 'Fresh, organic sourdough arrives at your doorstep every single week, guaranteed.' },
            { icon: Tag, title: 'Save 18%', desc: 'Subscribers always pay 18% less than one-time retail prices on every single order.' },
            { icon: CalendarIcon, title: 'Total Flexibility', desc: 'Life Happens. Minimum commitment is 1 month. Pause anytime.' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-3xl border border-primary/10 shadow-sm flex flex-col items-start hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Plan Selection */}
      <section className="bg-primary/5 py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Choose Your Weekly Plan</h2>
            <p className="text-slate-600 text-lg">All plans feature 100% organic flour and long-fermentation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Plan 1 */}
            <motion.div 
              {...fadeIn}
              className="bg-white rounded-[32px] p-10 flex flex-col shadow-lg border border-primary/5 hover:border-primary/20 transition-all"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black">The Solo</h3>
                  <p className="text-slate-500 font-medium">1 Loaf per week</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-primary">$8.50</p>
                  <p className="text-slate-400 line-through text-sm">$10.00 retail</p>
                </div>
              </div>
              <ul className="space-y-5 mb-10 flex-1">
                {['Freshly Baked', 'Eco-friendly packaging', 'Weekly porch delivery'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-700 text-lg">
                    <CheckCircle2 size={24} className="text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/checkout?plan=solo" className="w-full bg-primary text-background-dark font-black py-5 rounded-2xl flex items-center justify-center gap-3 group text-center block">
                Subscribe Now <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>

            {/* Plan 2 */}
            <motion.div 
               {...fadeIn}
               transition={{ delay: 0.2 }}
               className="bg-white rounded-[32px] p-10 flex flex-col shadow-2xl border-4 border-primary relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-primary text-background-dark font-black text-[10px] uppercase tracking-[0.2em] px-8 py-2 rotate-45 transform translate-x-6 translate-y-2">
                Most Popular
              </div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black">The Family</h3>
                  <p className="text-slate-500 font-medium">4 Loaves per month</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-primary">$28.00</p>
                  <p className="text-slate-400 line-through text-sm">$34.00 retail</p>
                </div>
              </div>
              <ul className="space-y-5 mb-10 flex-1">
                {['Always First Batch', 'Priority morning delivery', '18% Reduced Price for Supporting Us!'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-700 text-lg">
                    <CheckCircle2 size={24} className="text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/checkout?plan=family" className="w-full bg-primary text-background-dark font-black py-5 rounded-2xl flex items-center justify-center gap-3 group text-center block">
                Subscribe Now <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Organic Commitment */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <motion.div {...fadeIn} className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-square">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoVE0W00Tfsmy0c-C1eyHRLv8B4SQlccmtheX07HVE4_VOIQ9Yl07m9jqxRKxoHZfNUSLWZcUWYgb_sBToufEbutwKo9eorUHTDV_LeO5_DXRskg-PshtSsuOPeAkrkn3JFM6wjI_cZ7RXGsHQlgzdzMu-rraa6xGUPitC09_TGPyJgNJv_0swksflVtWiskp4nWTqGSV6NOm86-wrZQBB3sRHIpBYTG6hp07PtVDirVLQ4jE-fhMRFbkLDs4ceX3PhOUrG2xuPusC"
            alt="Organic Sourdough"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
        <div className="flex flex-col gap-8">
          <div className="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-sm">
            <Leaf size={20} /> Commitment to Quality
          </div>
          <h2 className="text-4xl md:text-6xl font-black">100% Organic, Always.</h2>
          <p className="text-slate-600 text-xl leading-relaxed">
            We believe that great bread starts with the soil. That's why every single loaf we bake uses 100% organic, stone-milled heirloom grains. No pesticides, no commercial yeast, and no shortcuts. Just water, salt, and flour, fermented for 24 hours for better digestion and deep flavor.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-background-light bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-lg font-medium"><span className="text-primary font-black">500+</span> Bread Lovers Subscribed</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24 border-t border-primary/10">
        <h3 className="text-3xl font-black mb-12 text-center">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-xl font-bold mb-4">Can I change my delivery day or address?</h4>
            <p className="text-slate-600 leading-relaxed">Yes. Please Contact us at +65 93430453. We seek your understanding that we are a small home-based bakery and will do our best to adjust accordingly.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">What time is delivery?</h4>
            <p className="text-slate-600 leading-relaxed">We deliver between 6:00 AM and 10:30 AM to ensure you have fresh bread for your breakfast or lunch.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
