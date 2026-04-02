import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: 'Anjali Sharma',
      location: 'Delhi',
      text: 'The paperless policy issuance was mind-blowing. I got my Family Floater plan in just 5 minutes!',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=anjali'
    },
    {
      name: 'Vikram Mehta',
      location: 'Mumbai',
      text: 'Had a claim last month. The cashless process at Lilavati Hospital was completely seamless. Highly recommended!',
      rating: 4,
      avatar: 'https://i.pravatar.cc/150?u=vikram'
    },
    {
      name: 'Priya Iyer',
      location: 'Bangalore',
      text: 'Comparing plans was so easy. The support team helped me choose the best tax-saving plan for my parents.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=priya'
    }
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">Trusted by 10 Lakh+ Families</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 relative group hover:shadow-xl transition-all duration-300">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-100 group-hover:text-primary/10 transition-colors" />
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-200'}`} 
                  />
                ))}
              </div>

              <p className="text-slate-600 font-medium italic mb-8 leading-relaxed">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border-2 border-primary/10" />
                <div>
                  <h4 className="font-bold text-slate-900 leading-tight">{review.name}</h4>
                  <p className="text-slate-400 text-sm font-medium">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
