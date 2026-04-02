import { Shield, Phone, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="footer" className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="text-secondary w-8 h-8" />
              <span className="text-2xl font-bold tracking-tight">HealthGuard</span>
            </div>
            <p className="text-blue-100/70 font-medium leading-relaxed mb-8">
              Empowering millions of Indians with transparent, affordable, and accessible health insurance solutions since 2012.
            </p>
            <div className="flex gap-4">
              <Globe className="w-5 h-5 hover:text-secondary cursor-pointer" />
              <Globe className="w-5 h-5 hover:text-secondary cursor-pointer" />
              <Globe className="w-5 h-5 hover:text-secondary cursor-pointer" />
              <Globe className="w-5 h-5 hover:text-secondary cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-blue-100/70 font-medium">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Compare Plans</li>
              <li className="hover:text-white cursor-pointer">Network Hospitals</li>
              <li className="hover:text-white cursor-pointer">Claim Process</li>
            </ul>
          </div>

          {/* Policy Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Policies</h4>
            <ul className="space-y-4 text-blue-100/70 font-medium">
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
              <li className="hover:text-white cursor-pointer">Cookie Policy</li>
              <li className="hover:text-white cursor-pointer">Disclaimer</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-blue-100/70 font-medium">
                <Phone className="w-5 h-5 text-secondary" />
                1800-419-5000 (Toll Free)
              </li>
              <li className="flex items-center gap-3 text-blue-100/70 font-medium">
                <Mail className="w-5 h-5 text-secondary" />
                support@healthguard.in
              </li>
              <li className="mt-6">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/5">
                  <span className="text-xs uppercase font-bold text-blue-200">Corporate HQ</span>
                  <p className="text-sm mt-1 text-white">402, Skyline Towers, BKC, Mumbai 400051</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-blue-100/40 text-sm font-medium">
          <p>© 2026 HealthGuard Insurance Broking Pvt. Ltd. All Rights Reserved. IRDAI License No. 442</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
