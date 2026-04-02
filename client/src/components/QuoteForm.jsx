import React, { useState } from 'react';
import axios from 'axios';
import { User, MapPin, Users, Activity, CheckCircle2 } from 'lucide-react';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: '',
    familyMembers: 'Self',
    coverageAmount: '5 Lakhs'
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE}/api/leads`, formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', age: '', city: '', familyMembers: 'Self', coverageAmount: '5 Lakhs' });
    } catch (err) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.response?.data?.message || 'Submission failed. Please try again.' 
      });
    }
  };

  if (status.success) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center shadow-xl border border-green-50 max-w-lg mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Quote Request Sent!</h3>
        <p className="text-slate-600 mb-6 font-medium">Thank you for choosing HealthGuard. Our insurance expert will call you shortly with personalized plans.</p>
        <button 
          onClick={() => setStatus({ loading: false, success: false, error: null })}
          className="btn-primary w-full"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div id="quote-form" className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
      <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-slate-100 overflow-hidden">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Get Instant Quote</h2>
          <p className="text-slate-500 font-medium mt-2 text-lg">Save up to 25% on annual premiums</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex. Rahul Kumar"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 ml-1">Current Age</label>
            <div className="relative">
              <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Ex. 28"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 ml-1">City / Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Ex. Mumbai"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 ml-1">Family Members</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                name="familyMembers"
                value={formData.familyMembers}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none font-medium text-slate-700"
              >
                <option>Self</option>
                <option>Self + Spouse</option>
                <option>Self + Spouse + Kids</option>
                <option>Parents</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-600 ml-1">Desired Coverage Amount</label>
            <div className="flex gap-4">
              {['5 Lakhs', '10 Lakhs', '25 Lakhs', '50 Lakhs'].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setFormData({ ...formData, coverageAmount: amount })}
                  className={`flex-1 py-4 px-2 rounded-2xl font-bold transition-all border ${
                    formData.coverageAmount === amount 
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={status.loading}
              className={`w-full py-5 rounded-2xl bg-secondary text-white font-bold text-xl shadow-xl shadow-secondary/20 hover:scale-[1.01] active:scale-95 transition-all ${
                status.loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {status.loading ? 'Processing...' : 'Get Instant Quote'}
            </button>
            {status.error && (
              <p className="text-red-500 text-center mt-4 font-semibold">{status.error}</p>
            )}
            <p className="text-slate-400 text-xs text-center mt-6">
              By clicking "Get Instant Quote", you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;
