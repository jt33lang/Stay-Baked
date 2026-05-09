import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { Truck, Lock, Smartphone, ArrowRight, ShieldCheck, Plus, Minus, CheckCircle2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import React, { useState, useEffect } from 'react';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan');
  
  const { quantity, setQuantity } = useCart();
  
  const isSubscription = plan === 'solo' || plan === 'family';
  const planName = plan === 'family' ? 'The Family Subscription' : plan === 'solo' ? 'The Solo Subscription' : 'The Classic Sourdough';
  const planPrice = plan === 'family' ? 28.00 : plan === 'solo' ? 8.50 : 8.50;
  
  const unitPrice = planPrice;
  const subtotal = isSubscription ? planPrice : quantity * unitPrice;

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    mobileNumber: '',
    postalCode: '',
    deliveryInstructions: '',
    subscribeMonthly: isSubscription
  });

  useEffect(() => {
    if (isSubscription) {
      setFormData(prev => ({ ...prev, subscribeMonthly: true }));
    }
  }, [isSubscription]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePlaceOrder = async () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = ['firstName', 'lastName', 'address', 'mobileNumber', 'postalCode'];
    
    requiredFields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        newErrors[field] = 'This field is required';
      }
    });

    // Format validation
    if (formData.mobileNumber && !/^\d{8}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Mobile number must be exactly 8 digits without spaces';
    }
    if (formData.postalCode && !/^\d{6}$/.test(formData.postalCode.trim())) {
      newErrors.postalCode = 'Postal code must be exactly 6 digits';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to the first error
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    const orderId = `order_${Date.now()}`;
    const ordersPath = 'orders';

    try {
      console.log('Attempting to place order...', { orderId, quantity, subtotal });
      await setDoc(doc(db, ordersPath, orderId), {
        ...formData,
        quantity: isSubscription ? 1 : quantity,
        totalAmount: subtotal,
        plan: plan || 'one-time',
        planName,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      console.log('Order successfully placed in Firestore');
      setShowModal(true);
    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Failed to place order. Please check your internet connection or try again later.');
      handleFirestoreError(error, OperationType.WRITE, ordersPath);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            
            {Object.keys(errors).length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600"
              >
                <X className="shrink-0" size={20} />
                <p className="text-sm font-bold">Please correct the highlighted fields before placing your order.</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Jane" 
                  className={`bg-white border ${errors.firstName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'} rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all`} 
                />
                {errors.firstName && <span className="text-xs font-bold text-red-500 mt-1">{errors.firstName}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe" 
                  className={`bg-white border ${errors.lastName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'} rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all`} 
                />
                {errors.lastName && <span className="text-xs font-bold text-red-500 mt-1">{errors.lastName}</span>}
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Street Address (Unit No / Building)</label>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Bakery Lane, #05-12" 
                  className={`bg-white border ${errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'} rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all`} 
                />
                {errors.address && <span className="text-xs font-bold text-red-500 mt-1">{errors.address}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Mobile Number</label>
                <input 
                  type="text" 
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="91234567" 
                  className={`bg-white border ${errors.mobileNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'} rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all`} 
                />
                {errors.mobileNumber && <span className="text-xs font-bold text-red-500 mt-1">{errors.mobileNumber}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Postal Code</label>
                <input 
                  type="text" 
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="123456" 
                  className={`bg-white border ${errors.postalCode ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'} rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all`} 
                />
                {errors.postalCode && <span className="text-xs font-bold text-red-500 mt-1">{errors.postalCode}</span>}
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Delivery Instructions (Optional)</label>
                <textarea 
                  name="deliveryInstructions"
                  value={formData.deliveryInstructions}
                  onChange={handleInputChange}
                  placeholder="Leave at the gate / Press doorbell" 
                  className="bg-white border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all min-h-[100px]" 
                />
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
                  *Please ensure to include your name (same as the information above in the Delivery Details). We will bake your order once payment is verified.
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
                  <p className="font-black text-lg">{planName}</p>
                  <div className="flex items-center gap-3 mt-1">
                    {!isSubscription ? (
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
                    ) : (
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">SUBSCRIPTION</span>
                    )}
                    <p className="text-slate-400 text-sm">
                      {isSubscription ? 'Fixed Plan' : `unit${quantity > 1 ? 's' : ''}`} • ${unitPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded tracking-tighter">PROMO</span>
                    <span className="text-slate-300 line-through text-[10px]">
                      ${(isSubscription ? (plan === 'family' ? 34.00 : 10.00) : 10.00).toFixed(2)} retail
                    </span>
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
                <span>Delivery Charges</span>
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

            {/* Subscription Prompt */}
            {!isSubscription && (
              <div className="bg-primary/10 p-6 rounded-3xl border border-primary/20 space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">Want regular fresh bakes?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    Get fresh Sourdough for 1 month and save 18%. Weekly Delivery. Minimum commitment for 1 month only.
                  </p>
                </div>
                <Link 
                  to="/checkout?plan=family"
                  className="w-full bg-white border-2 border-primary text-slate-900 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-primary/10 transition-all shadow-sm"
                >
                  Subscribe to Monthly Plan (1 Month)
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}

            <button 
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full bg-primary text-background-dark font-black py-6 rounded-2xl flex items-center justify-center gap-3 text-xl hover:brightness-110 shadow-2xl shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'} <ArrowRight size={24} />
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

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg p-12 rounded-[40px] shadow-2xl text-center flex flex-col items-center gap-8"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-background-dark shadow-xl">
                <CheckCircle2 size={48} />
              </div>

              <div>
                <h3 className="text-3xl font-black mb-4">Order Received!</h3>
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  Thank you for your support! Every dough is promised to be made with love :)
                </p>
              </div>

              <div className="w-full bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col gap-2">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Next Steps</p>
                <p className="text-slate-600">Please complete the PayNow payment to verify your order. We'll send a WhatsApp notification once verified!</p>
              </div>

              <button 
                onClick={() => setShowModal(false)}
                className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:brightness-125 transition-all"
              >
                Back to Home
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
