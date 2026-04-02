import React, { useState } from 'react';
import { Check, Star, ChevronDown, ChevronUp, Heart, Building2, Shield, Info, ArrowRight, X } from 'lucide-react';

export const PLANS = [
    {
      name: 'Basic Plan',
      insurer: 'Care Health',
      logoText: 'Care',
      logoColor: 'text-sky-500',
      price: '₹450/mo',
      gstPremium: '₹531 Incl. GST',
      coverage: '5 Lakhs',
      cashlessHospitals: '16,000+',
      tag: 'For Individuals',
      badge: 'Unlimited SI launched',
      features: [
        'Private AC Room cover',
        'In-patient treatment',
        'Pre & Post Hospitalization',
        'Road Ambulance cover',
        'Free Annual Health Check-up'
      ],
      popular: true
    },
    {
      name: 'Family Plan',
      insurer: 'Niva Bupa',
      logoText: 'Niva',
      logoColor: 'text-indigo-600',
      price: '₹850/mo',
      gstPremium: '₹1,003 Incl. GST',
      coverage: '10 Lakhs',
      cashlessHospitals: '13,500+',
      tag: 'For Couples',
      badge: 'Limited Time Discount',
      features: [
        'Private AC Room cover',
        'Maternity Cover (Optional)',
        'Restore Benefit (Unlimited)',
        'Pre & Post Hospitalization',
        'No Claim Bonus up to 100%'
      ],
      popular: true
    },
    {
      name: 'Premium Plan',
      insurer: 'STAR Health',
      logoText: 'STAR',
      logoColor: 'text-blue-700',
      price: '₹1400/mo',
      gstPremium: '₹1,652 Incl. GST',
      coverage: '25 Lakhs',
      cashlessHospitals: '14,000+',
      tag: 'For Families',
      badge: 'Claim Samadhaan approx 120 mins',
      features: [
        'Covers up to 6 members',
        'Maternity & New Born cover',
        'Unlimited Restore Benefit',
        'Global Cover (Selected)',
        'Premium Support Manager'
      ],
      popular: true
    },
    {
      name: 'Senior Care Plan',
      insurer: 'HDFC ERGO',
      logoText: 'HDFC',
      logoColor: 'text-red-600',
      price: '₹1,850/mo',
      gstPremium: '₹2,183 Incl. GST',
      coverage: '15 Lakhs',
      cashlessHospitals: '12,000+',
      tag: 'For 60+ Age Group',
      badge: '',
      features: [
        'Pre-existing Disease Cover',
        'Domiciliary Hospitalization',
        'Critical Illness Rider',
        'Dedicated Relationship Manager',
        'Annual Health Check-up'
      ],
      popular: false
    },
    {
      name: 'Student Plan',
      insurer: 'Digit',
      logoText: 'Digit',
      logoColor: 'text-orange-500',
      price: '₹299/mo',
      gstPremium: '₹352 Incl. GST',
      coverage: '2 Lakhs',
      cashlessHospitals: '10,000+',
      tag: 'Budget Friendly',
      badge: '',
      features: [
        'Accidental Hospitalization',
        'Emergency Ambulance',
        'Mental Health Cover',
        'Cashless at 5000+ Hospitals',
        'Sports Injury Cover'
      ],
      popular: false
    },
    {
      name: 'Elite Plan',
      insurer: 'ICICI Lombard',
      logoText: 'ICICI',
      logoColor: 'text-orange-700',
      price: '₹3,200/mo',
      gstPremium: '₹3,776 Incl. GST',
      coverage: '1 Crore',
      cashlessHospitals: '9,000+',
      tag: 'Ultimate Shield',
      badge: 'Zero Deductibles',
      features: [
        'Unlimited Room Rent',
        'Global Treatment Coverage',
        'Unlimited Restore Benefit',
        'Concierge Medical Services',
        'Zero Co-payment, Zero Deductible'
      ],
      popular: false
    },
    {
      name: 'Maternity Cover',
      insurer: 'Care Health',
      logoText: 'Care',
      logoColor: 'text-sky-500',
      price: '₹1,200/mo',
      gstPremium: '₹1,416 Incl. GST',
      coverage: '10 Lakhs',
      cashlessHospitals: '16,000+',
      tag: 'For Growing Families',
      badge: '',
      features: [
        'Maternity & Newborn Cover',
        'No Waiting Period (Day 1)',
        'Vaccination Coverage',
        'Pediatric Consultations',
        'Cashless Deliveries'
      ],
      popular: false
    },
    {
      name: 'Critical Illness',
      insurer: 'Tata AIG',
      logoText: 'TATA',
      logoColor: 'text-blue-900',
      price: '₹650/mo',
      gstPremium: '₹767 Incl. GST',
      coverage: '50 Lakhs',
      cashlessHospitals: '7,500+',
      tag: 'Lump Sum Payout',
      badge: '',
      features: [
        'Covers 36 Critical Illnesses',
        '100% Payout on Diagnosis',
        'Loss of Income Protection',
        'Second Medical Opinion',
        'No Medical Tests up to 45'
      ],
      popular: false
    },
    {
      name: 'Super Top-up',
      insurer: 'Niva Bupa',
      logoText: 'Niva',
      logoColor: 'text-indigo-600',
      price: '₹350/mo',
      gstPremium: '₹413 Incl. GST',
      coverage: '1 Crore',
      cashlessHospitals: '13,500+',
      tag: 'Enhance Your Cover',
      badge: '',
      features: [
        'Over & Above Base Plan',
        'Deductible of 5 Lakhs',
        'Pre & Post Hospitalization',
        'Organ Donor Expenses',
        'Lifetime Renewability'
      ],
      popular: false
    },
    {
      name: 'Women\'s Premium',
      insurer: 'STAR Health',
      logoText: 'STAR',
      logoColor: 'text-blue-700',
      price: '₹950/mo',
      gstPremium: '₹1,121 Incl. GST',
      coverage: '15 Lakhs',
      cashlessHospitals: '14,000+',
      tag: 'Tailored for Women',
      badge: '',
      features: [
        'Breast Cancer Screening Cover',
        'PCOD/PCOS Consultations',
        'Enhanced Maternity Coverage',
        'Mental Health Therapy',
        'Osteoporosis Care'
      ],
      popular: false
    },
    {
      name: 'Heart Care',
      insurer: 'Care Health',
      logoText: 'Care',
      logoColor: 'text-sky-500',
      price: '₹1,500/mo',
      gstPremium: '₹1,770 Incl. GST',
      coverage: '20 Lakhs',
      cashlessHospitals: '16,000+',
      tag: 'Cardiac Protection',
      badge: '',
      features: [
        'Cardiac Ailments Day 1',
        'Post-Surgery Rehab Cover',
        'No Claim Bonus Up to 150%',
        'Annual Cardiac Checkup',
        'Global Treatment Option'
      ],
      popular: false
    },
    {
      name: 'Ayush Plus',
      insurer: 'HDFC ERGO',
      logoText: 'HDFC',
      logoColor: 'text-red-600',
      price: '₹400/mo',
      gstPremium: '₹472 Incl. GST',
      coverage: '5 Lakhs',
      cashlessHospitals: '12,000+',
      tag: 'Alternative Medicine',
      badge: '',
      features: [
        'Ayurveda Treatment Cover',
        'Homeopathy and Unani',
        'Wellness & Yoga Sessions',
        'Zero Deductibles',
        'Cashless at Ayush Centers'
      ],
      popular: false
    }
];

const HospitalModal = ({ isOpen, onClose, planName, hospitalCount }) => {
  if (!isOpen) return null;

  const hospitals = [
    { name: 'Apollo Hospital', location: 'Greams Road, Chennai', rating: 4.8 },
    { name: 'Fortis Malar Hospital', location: 'Adyar, Chennai', rating: 4.5 },
    { name: 'MIOT International', location: 'Manapakkam, Chennai', rating: 4.6 },
    { name: 'Global Health City', location: 'Perumbakkam, Chennai', rating: 4.4 },
    { name: 'Sri Ramachandra Medical Centre', location: 'Porur, Chennai', rating: 4.7 },
    { name: 'Billroth Hospital', location: 'Shenoy Nagar, Chennai', rating: 4.2 },
    { name: 'Kauvery Hospital', location: 'Alwarpet, Chennai', rating: 4.5 },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-teal-600 to-emerald-500 p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Network Hospitals</h3>
            <p className="text-teal-50 text-sm opacity-90">{planName} • {hospitalCount} Cashless Facilities</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {hospitals.map((h, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:bg-teal-50 group-hover:border-teal-100">
                    <Building2 className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{h.name}</h4>
                    <p className="text-slate-500 text-[11px] mt-0.5">{h.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500 justify-end">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span className="text-xs font-bold">{h.rating}</span>
                  </div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase">Cashless</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all shadow-md active:scale-95"
          >
            Close List
          </button>
        </div>
      </div>
    </div>
  );
};

const PlanCard = ({ plan, index, isOpen, toggle, handleBuyPlan, openHospitalModal }) => {
  const isFamilyPlan = plan.name.toLowerCase().includes('family') || plan.name.toLowerCase().includes('maternity');
  const [members, setMembers] = useState(isFamilyPlan ? 2 : 1);
  const [coverAmount, setCoverAmount] = useState(plan.coverage);

  // Parse coverage integer to allow dynamic multiplier
  const baseCoverMatch = plan.coverage.match(/\d+/);
  const baseCoverVal = baseCoverMatch ? parseInt(baseCoverMatch[0], 10) : 5;
  const selectedCoverMatch = coverAmount.match(/\d+/);
  const selectedCoverVal = selectedCoverMatch ? parseInt(selectedCoverMatch[0], 10) : 5;
  
  // Create cover options (base, base*2, base*5) up to 1 Crore max
  const coverOptions = [baseCoverVal, baseCoverVal * 2, baseCoverVal * 5].map(v => v >= 100 ? '1 Crore' : `${v} Lakhs`);
  const uniqueCoverOptions = [...new Set(coverOptions)];

  // Price base calculation
  const basePriceStr = plan.price.replace(/[^\d]/g, '');
  const basePrice = parseInt(basePriceStr, 10);
  
  // Adjust base price based on selected coverage
  const coverMultiplier = Math.max(1, selectedCoverVal / baseCoverVal);
  const adjustedBasePrice = basePrice * (1 + (coverMultiplier - 1) * 0.35); // Reduced from 40% to 35% cost jump

  let calculatedPrice = adjustedBasePrice;
  if (isFamilyPlan) {
    // Family plan base price already covers 2 people. Each extra member adds 15% instead of 25%.
    const extraMembers = Math.max(0, members - 2);
    calculatedPrice = adjustedBasePrice + (adjustedBasePrice * 0.15 * extraMembers);
  } else {
    calculatedPrice = adjustedBasePrice * members;
  }
  
  calculatedPrice = Math.round(calculatedPrice);
  const calculatedGst = Math.round(calculatedPrice * 1.18);

  const formattedPrice = `₹${calculatedPrice.toLocaleString()}/month`;
  const formattedGst = `₹${calculatedGst.toLocaleString()} Incl. GST`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-lg transition-shadow relative flex flex-col group z-10">
      {plan.badge && (
         <div className="absolute top-0 right-0 bg-indigo-100 text-indigo-700 text-[11px] font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-xl z-20">
           {plan.badge}
         </div>
      )}

      <div className="p-5 md:p-6 flex flex-col md:flex-row gap-6 md:items-start">
        {/* Left - Premium Branding */}
        <div className="w-full md:w-40 shrink-0 flex flex-col items-center justify-center pt-2">
           <div className="border-2 border-teal-100 rounded-2xl w-32 h-[80px] flex flex-col items-center justify-center bg-white shadow-[0_4px_12px_rgba(20,184,166,0.08)] mb-3 relative overflow-hidden group/logo">
             <div className="absolute top-0 left-0 w-full h-1 bg-teal-500" />
             <div className="flex flex-col items-center">
               <Shield className="w-6 h-6 text-teal-600 mb-1 drop-shadow-sm" />
               <span className="text-[14px] font-black text-slate-800 uppercase tracking-tight leading-none">Health<span className="text-teal-600">Guard</span></span>
             </div>
           </div>
           <button className="text-[13px] text-blue-600 font-medium hover:underline flex items-center gap-1 group/insurer">
             About Insurer <ChevronDown className="w-3 h-3 -rotate-90 group-hover/insurer:translate-x-0.5 transition-transform" />
           </button>
        </div>

        {/* Middle - Plan Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="pr-4">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 pr-10">{plan.name} <span className="text-sm font-normal text-slate-500 ml-1">(Direct)</span></h3>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <div className="bg-green-100 p-1 rounded-md flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5 text-green-700" />
                </div>
                <span className="text-sm font-medium text-slate-700">{plan.cashlessHospitals} Cashless hospitals.</span>
                <button 
                  onClick={() => openHospitalModal(plan.name, plan.cashlessHospitals)}
                  className="text-sm text-green-600 font-medium hover:underline ml-1 cursor-pointer"
                >
                  View list <span className="text-[10px] ml-0.5">▶</span>
                </button>
              </div>
            </div>
            <button className="p-2.5 text-slate-400 hover:text-red-500 transition-colors bg-slate-50 hover:bg-red-50 rounded-full border border-slate-100 shrink-0">
               <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Members & Coverage Row */}
          <div className="flex flex-wrap items-end gap-x-5 gap-y-6 mt-6 md:mt-8">
            <div className="relative flex flex-col">
              <p className="text-[12px] font-medium text-slate-500 mb-1.5">Members</p>
              <div className="relative flex items-center bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-sm hover:border-blue-400 transition-colors focus-within:border-blue-400 cursor-pointer">
                <select 
                  value={members}
                  onChange={(e) => setMembers(parseInt(e.target.value, 10))}
                  className="bg-transparent font-bold text-slate-800 text-[15px] appearance-none cursor-pointer outline-none pr-7 w-[95px] z-10"
                >
                  {(isFamilyPlan ? [2, 3, 4, 5, 6] : [1, 2, 3]).map(num => (
                    <option key={num} value={num}>{num} Member{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
              </div>
            </div>

            <div className="relative flex flex-col">
              <p className="text-[12px] font-medium text-slate-500 mb-1.5">Cover Amount</p>
              <div className="relative flex items-center bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-sm hover:border-blue-400 transition-colors focus-within:border-blue-400 cursor-pointer">
                <select 
                  value={coverAmount}
                  onChange={(e) => setCoverAmount(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 text-[15px] appearance-none cursor-pointer outline-none pr-7 w-[90px] z-10"
                >
                  {uniqueCoverOptions.map(amt => (
                    <option key={amt} value={amt}>{amt}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
              </div>
            </div>

            <div className="pl-5 border-l border-slate-200">
              <p className="text-[12px] font-medium text-slate-500 mb-1">Premium (1 year)</p>
              <div className="flex flex-col">
                <span className="text-[22px] font-black text-slate-900 leading-none">{formattedPrice}</span>
                <span className="text-[11px] font-medium text-slate-500 line-through decoration-slate-400 mt-1">{formattedGst}</span>
              </div>
            </div>

            <div className="ml-auto w-full md:w-auto mt-4 md:mt-0">
               <button 
                  onClick={() => handleBuyPlan({...plan, members, price: formattedPrice})} 
                  className="w-full md:w-auto bg-[#ff602f] hover:bg-[#eb5224] text-white font-bold py-3.5 px-6 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
               >
                 Buy Plan <Shield className="w-4 h-4 fill-white/20" />
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`bg-slate-50/80 border-t border-slate-100 p-3 px-6 flex items-center ${isOpen ? '' : 'rounded-b-2xl'}`}>
        <button onClick={toggle} className="text-[13px] text-blue-600 font-medium flex items-center gap-1 hover:underline">
           {isOpen ? 'Hide features' : 'View all features'} {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5 -rotate-90" />}
        </button>
      </div>

      {/* Expanded Features Dropdown */}
      <div className={`transition-all duration-300 overflow-hidden rounded-b-2xl ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`} >
        <div className="border-t border-slate-100 p-6 bg-slate-50 border-b border-t-white shadow-inner">
           <h4 className="font-bold text-slate-800 mb-4">Plan Benefits</h4>
           <div className="grid md:grid-cols-2 gap-y-3 gap-x-8">
              {plan.features.map((feature, i) => (
                 <div key={i} className="flex items-start gap-3">
                   <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                   <span className="text-sm text-slate-600">{feature}</span>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const PlanComparison = ({ purchasedPlans, handleBuyPlan, showAllPlans, setShowAllPlans }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hospitalModal, setHospitalModal] = useState({ isOpen: false, planName: '', hospitalCount: '' });

  const openHospitalModal = (planName, hospitalCount) => {
    setHospitalModal({ isOpen: true, planName, hospitalCount });
  };

  const closeHospitalModal = () => {
    setHospitalModal({ ...hospitalModal, isOpen: false });
  };

  const toggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="plans" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="flex items-center gap-4">
            {showAllPlans && (
              <button 
                onClick={() => setShowAllPlans(false)}
                className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all active:scale-90"
                title="Go Back"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
            )}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Compare Quotes</h2>
              <p className="text-slate-500 text-sm">
                {showAllPlans ? `Found ${PLANS.length} premium plans for you.` : 'Find the perfect health shield for your family.'}
              </p>
            </div>
          </div>

        </div>

        {!showAllPlans && (
          <div className="flex flex-col items-center justify-center py-20 bg-white border-2 border-dashed border-slate-200 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-blue-50 p-4 rounded-full mb-6">
              <Shield className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to find your plan?</h3>
            <p className="text-slate-500 text-sm mb-8 text-center max-w-md">
              We've analyzed multiple options to find the best health protection tailored for you.
            </p>
            <button 
              onClick={() => setShowAllPlans(true)}
              className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 shadow-lg shadow-blue-100"
            >
              Explore All Plans <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex flex-col gap-5 animate-fade-in transition-all duration-500">
          {showAllPlans && PLANS.map((plan, index) => (
            <PlanCard 
              key={index}
              plan={plan}
              index={index}
              isOpen={expandedIndex === index}
              toggle={() => toggle(index)}
              handleBuyPlan={handleBuyPlan}
              openHospitalModal={openHospitalModal}
            />
          ))}
        </div>
        
        <HospitalModal 
          isOpen={hospitalModal.isOpen} 
          onClose={closeHospitalModal}
          planName={hospitalModal.planName}
          hospitalCount={hospitalModal.hospitalCount}
        />

        {/* Purchased Plans Section */}
        {purchasedPlans && purchasedPlans.length > 0 && (
          <div id="purchased-plans" className="mt-20 border-t border-slate-200 pt-16 animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Purchased Plans</h2>
              <p className="text-slate-500">Manage and view details for the plans you've acquired.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedPlans.map((plan, index) => (
                <div key={index} className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 text-green-600 p-2 rounded-xl">
                       <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{plan.name}</h4>
                      <p className="text-[11px] text-green-600 font-bold uppercase tracking-wide">Active Policy</p>
                    </div>
                  </div>
                  <div className="space-y-2 mt-6">
                    <div className="flex justify-between text-sm border-b border-slate-50 pb-2">
                      <span className="text-slate-500">Coverage</span>
                      <span className="font-bold text-slate-800">{plan.coverage}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1">
                      <span className="text-slate-500">Premium</span>
                      <span className="font-bold text-slate-800">{plan.price}</span>
                    </div>
                  </div>
                  <button className="w-full mt-5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm text-slate-700 hover:border-green-500 hover:text-green-600 transition-colors">
                    View Policy Document
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlanComparison;
