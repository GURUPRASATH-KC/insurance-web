import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What is health insurance?',
      a: 'Health insurance is a type of insurance coverage that pays for medical and surgical expenses incurred by the insured. It can reimburse the insured for expenses incurred from illness or injury, or pay the care provider directly.'
    },
    {
      q: 'How does the claim process work?',
      a: 'For cashless claims, simply present your health card at any network hospital. Our team handles the billing directly. For reimbursement, submit your original bills and medical reports through our app or portal within 30 days.'
    },
    {
      q: 'What is the waiting period?',
      a: 'A waiting period is the time during which you cannot claim benefits for certain conditions. Common waiting periods include 30 days for general illness, 2 years for specific ailments, and 1 to 4 years for pre-existing diseases.'
    },
    {
      q: 'Can I cover my parents under my plan?',
      a: 'Yes, most "Family Floater" plans allow you to add dependent parents. Alternatively, you can buy separate "Senior Citizen" health plans which offer specialized benefits for elders.'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-12">Got Questions?</h2>
        
        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-2 rounded-[24px] overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'border-primary ring-4 ring-primary/5 shadow-lg' : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-8 py-6 flex justify-between items-center bg-white text-lg font-bold text-slate-900"
              >
                {faq.q}
                {openIndex === index ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-8 bg-white text-slate-600 font-medium leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
