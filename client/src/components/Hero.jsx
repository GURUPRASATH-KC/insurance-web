import React from 'react';
import { ArrowRight, CheckCircle, Shield } from 'lucide-react';
import heroImage from '../assets/hero.png';

const Hero = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-slate-50">
      {/* Decorative Blur Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div>
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-primary rounded-full text-sm font-bold mb-6">
                ✨ Rated #1 in Claim Settlement
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Protect Your <span className="text-secondary">Health,</span> <br /> 
                Secure Your <span className="text-primary">Future</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Compare and buy the best health insurance plans instantly. 
                Experience seamless protection with 13,000+ network hospitals 
                and 24/7 claim assistance.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="btn-primary flex items-center gap-2 group">
                  Get Instant Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-white border border-slate-200 rounded-xl font-semibold hover:border-primary transition-all"
                >
                  Compare Plans
                </button>
              </div>

              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span>Cashless Claims</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span>Tax Benefits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element / Placeholder Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-white p-4 rounded-[40px] shadow-2xl relative z-10">
                <img 
                  src={heroImage} 
                  alt="Healthy Family" 
                  className="rounded-[30px] w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl z-20 hidden md:block border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Shield className="text-secondary w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">100%</div>
                    <div className="text-xs text-slate-500 font-medium">Digital Process</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
