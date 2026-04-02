import React from 'react';
import { Hospital, ShieldCheck, HeartPulse, Laptop } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      title: 'Cashless Hospitalization',
      desc: 'Get treatment at 13,000+ network hospitals without paying a single rupee upfront.',
      icon: <Hospital className="w-8 h-8 text-blue-600" />,
      bg: 'bg-blue-50'
    },
    {
      title: 'Tax Benefits (80D)',
      desc: 'Save up to ₹75,000 in taxes every year under Section 80D of the Income Tax Act.',
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      bg: 'bg-green-50'
    },
    {
      title: 'Instant Policy',
      desc: 'No medical check-ups for most plans up to age 45. Get your policy copy in minutes.',
      icon: <Laptop className="w-8 h-8 text-purple-600" />,
      bg: 'bg-purple-50'
    },
    {
      title: 'Family Floater',
      desc: 'Cover your entire family including parents under a single umbrella plan.',
      icon: <HeartPulse className="w-8 h-8 text-red-600" />,
      bg: 'bg-red-50'
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose HealthGuard?</h2>
        <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-lg">
          We work with India's top insurers to bring you the best benefits and absolute peace of mind.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 ${benefit.bg} rounded-2xl flex items-center justify-center mb-6`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
