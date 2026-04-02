import React from 'react';

const Partners = () => {
  const partners = [
    { name: 'Star Health', logo: 'https://logo.clearbit.com/starhealth.in' },
    { name: 'HDFC ERGO', logo: 'https://logo.clearbit.com/hdfcergo.com' },
    { name: 'ICICI Lombard', logo: 'https://logo.clearbit.com/icicilombard.com' },
    { name: 'Niva Bupa', logo: 'https://logo.clearbit.com/nivabupa.com' },
    { name: 'Care Insurance', logo: 'https://logo.clearbit.com/careinsurance.com' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <p className="text-center text-slate-400 font-bold uppercase tracking-widest text-sm mb-12">
          Trusted by 50+ IRDAI Approved Insurers
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner) => (
            <div key={partner.name} className="flex flex-col items-center gap-4">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-12 md:h-16 w-auto object-contain"
                onError={(e) => { e.target.src = `https://via.placeholder.com/150x50?text=${partner.name}`; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
