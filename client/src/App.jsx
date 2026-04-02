import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Benefits from './components/Benefits';
import PlanComparison from './components/PlanComparison';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { CheckCircle2, X } from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-right fade-in duration-500">
      <div className="bg-white border-l-4 border-green-500 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-xl p-4 flex items-center gap-4 min-w-[320px]">
        <div className="bg-green-100 p-2 rounded-full">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-slate-900 text-sm">Action Successful</h4>
          <p className="text-slate-500 text-xs mt-0.5">{message}</p>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
};

function App() {
  const [purchasedPlans, setPurchasedPlans] = useState([]);
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hg_user')); } catch { return null; }
  });

  // Fetch purchased plans from backend
  useEffect(() => {
    const fetchPurchases = async () => {
      const token = localStorage.getItem('hg_token');
      if (user && token) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/purchases`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setPurchasedPlans(data);
          }
        } catch (error) {
          console.error('Failed to fetch purchases:', error);
        }
      } else {
        setPurchasedPlans([]);
      }
    };

    fetchPurchases();
  }, [user]);

  const handleBuyPlan = async (plan) => {
    const token = localStorage.getItem('hg_token');
    
    if (!user || !token) {
      setToast({
        message: 'Please login to buy a plan.',
        type: 'error'
      });
      // Trigger login modal if possible - Navbar usually handles this, 
      // but we can at least show a toast.
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/purchases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          planName: plan.name,
          insurer: plan.insurer,
          price: plan.price,
          coverage: plan.coverage,
          members: plan.members
        })
      });

      if (response.ok) {
        const data = await response.json();
        setPurchasedPlans(prev => [data.purchase, ...prev]);
        
        setToast({
          message: `${plan.name} has been successfully purchased and stored.`,
          type: 'success'
        });

        setTimeout(() => {
          document.getElementById('purchased-plans')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      } else {
        const errorData = await response.json();
        setToast({
          message: errorData.message || 'Failed to complete purchase.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Purchase error:', error);
      setToast({
        message: 'Network error. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <Navbar user={user} setUser={setUser} />
      <main>
        <Hero />
        <Partners />
        <Benefits />
        <PlanComparison 
          purchasedPlans={purchasedPlans}
          handleBuyPlan={handleBuyPlan}
          showAllPlans={showAllPlans}
          setShowAllPlans={setShowAllPlans}
        />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <Chatbot 
        handleBuyPlan={handleBuyPlan}
        setShowAllPlans={setShowAllPlans}
      />
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}

export default App;
