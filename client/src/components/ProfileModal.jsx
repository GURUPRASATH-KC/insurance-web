import React from 'react';
import { 
  X, 
  User, 
  Mail, 
  ShieldCheck, 
  Calendar, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  CreditCard,
  Target
} from 'lucide-react';

const ProfileModal = ({ isOpen, onClose, user, purchasedPlans, handleLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300" />
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Profile Cover Area */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Profile Circle */}
          <div className="absolute -bottom-10 left-10 p-1.5 bg-white rounded-full shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white">
              {user?.name?.charAt(0) || <User className="w-10 h-10" />}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="pt-14 px-10 pb-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">{user?.name || 'User Profile'}</h2>
              <div className="flex items-center gap-2 mt-1 text-slate-500">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user?.email || 'user@example.com'}</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm transition-all"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Plans</p>
              <p className="text-xl font-black text-slate-900 mt-1">{purchasedPlans?.length || 0}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-3">
                <Target className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Coverage</p>
              <p className="text-xl font-black text-slate-900 mt-1">₹50L+</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Member Since</p>
              <p className="text-xl font-black text-slate-900 mt-1">2024</p>
            </div>
          </div>

          {/* Recent Purchases List */}
          <div className="mt-10">
            <h3 className="font-black text-slate-900 flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-blue-600" /> Recent Purchases
            </h3>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {purchasedPlans && purchasedPlans.length > 0 ? (
                purchasedPlans.map((plan, idx) => (
                  <div key={idx} className="group p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/20 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{plan.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase tracking-wider">Premium</span>
                          <span className="text-[11px] text-slate-400 font-medium">{plan.insurer}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900 text-sm">{plan.price}</p>
                      <button className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1 mt-1">
                        Policy Copy <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-slate-300" />
                  </div>
                  <h4 className="font-bold text-slate-800">No active plans yet</h4>
                  <p className="text-slate-500 text-xs mt-1 max-w-[200px]">Browse our premium health plans to secure your future today.</p>
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl shadow-xl shadow-slate-100 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            Back to Dashboard <ChevronRight className="w-5 h-5 text-white/50" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
