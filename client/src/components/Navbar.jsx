import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-scroll';
import AuthModal from './AuthModal';

const Navbar = ({ user, setUser, setIsProfileOpen, handleLogout }) => {
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

  // Remove local handleLogout as it's passed via props and handled globally in App.jsx
  // const handleLogout = () => {
  //   localStorage.removeItem('hg_token');
  //   localStorage.removeItem('hg_user');
  //   setUser(null);
  // };

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
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-slate-700 font-bold text-sm hover:text-primary transition-colors">
                    {user.name.split(' ')[0]}
                  </span>
                </button>
                <div className="w-px h-4 bg-slate-200" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-slate-400 hover:text-red-500 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
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
              <div className="flex flex-col gap-3 p-2 bg-slate-50 rounded-2xl mt-2">
                <button 
                  onClick={() => { setIsProfileOpen(true); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-3 text-slate-700 font-bold text-sm p-2"
                >
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col items-start">
                    <span>{user.name}</span>
                    <span className="text-[10px] text-blue-600 uppercase tracking-widest font-black">View Profile</span>
                  </div>
                </button>
                <div className="h-px bg-slate-200 mx-2" />
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 text-red-500 font-bold text-sm p-2 px-4"
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
