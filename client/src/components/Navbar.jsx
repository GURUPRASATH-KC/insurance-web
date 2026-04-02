import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-scroll';
import AuthModal from './AuthModal';

const Navbar = ({ user, setUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'benefits' },
    { name: 'Plans', to: 'plans' },
    { name: 'Contact', to: 'footer' },
  ];

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('hg_token');
    localStorage.removeItem('hg_user');
    setUser(null);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="text-secondary w-8 h-8" />
            <span className="text-2xl font-bold text-primary tracking-tight">HealthGuard</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                className="text-slate-700 hover:text-primary font-medium cursor-pointer transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-slate-700 font-medium text-sm">
                  👋 {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-slate-500 hover:text-red-500 text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-700 font-medium py-2"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="flex flex-col gap-2">
                <span className="text-slate-700 font-medium text-sm">👋 {user.name}</span>
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 text-red-500 font-medium text-sm"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setIsAuthOpen(true); setIsMobileMenuOpen(false); }}
                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold w-full"
              >
                Get Started
              </button>
            )}
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navbar;
