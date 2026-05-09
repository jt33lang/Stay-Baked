import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    reason: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const reasons = [
    'General Inquiry',
    'Subscription Change',
    'Bulk Order Request',
    'Partnership/Wholesale',
    'Feedback/Complaint',
    'Other'
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        contactNumber: '',
        reason: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setErrorMessage('Something went wrong while sending your message. Please try again.');
    }
  };

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 bg-background-light min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Have questions about our sourdough or your subscription? We'd love to hear from you.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 text-center">
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
              <Phone size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Call/WhatsApp</h3>
            <p className="text-sm text-slate-600">+65 93430453</p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Location</h3>
            <p className="text-sm text-slate-600">Bukit Batok, Singapore</p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">Message Received!</h2>
                <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
                  Thank you for reaching out. We will get back to you within <span className="font-bold text-primary">2-3 business days</span>.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Contact Number</label>
                    <input 
                      type="tel" 
                      required
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="81234567"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Reason for Inquiry</label>
                    <select 
                      required
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                    >
                      <option value="" disabled>Select a reason</option>
                      {reasons.map(reason => (
                        <option key={reason} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Your Message</label>
                  <textarea 
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can we help you?"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 font-medium bg-red-50 p-4 rounded-xl">
                    <AlertCircle size={20} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-primary text-slate-900 py-5 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
                >
                  {status === 'submitting' ? (
                    <>Sending Message...</>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
