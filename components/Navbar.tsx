
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/apiService';
import { User } from '../types';

interface NavbarProps {
  cartCount: number;
  toggleCart: () => void;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, toggleCart, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogoutClick = async () => {
    await onLogout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Catalogue', path: '/catalog' },
    { name: 'Story', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-700 ${scrolled ? 'py-4' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex justify-between items-center transition-all duration-500 rounded-full px-8 ${scrolled ? 'glass-panel h-14 border border-white/10 shadow-lg' : 'bg-white/[0.02] border border-white/5 h-16'
            }`}>
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link to="/home" className="flex-shrink-0 flex items-center group">
                <span className={`text-sm md:text-lg font-black tracking-[0.4em] serif uppercase transition-all duration-500 ${location.pathname === '/home' ? 'text-blue-500' : 'text-white hover:text-blue-500'
                  }`}>
                  KHAMRAH
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[9px] tracking-[0.4em] uppercase transition-all duration-300 font-black relative group ${location.pathname === link.path
                    ? 'text-blue-500'
                    : 'text-white/60 hover:text-blue-500'
                    }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Icons & Actions */}
            <div className="flex items-center space-x-6">
              <button className="text-white/40 hover:text-blue-500 transition-colors hidden lg:block">
                <Search size={16} />
              </button>

              {/* User Profile / Login */}
              <div className="relative">
                {user ? (
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 hover:bg-blue-500/20 transition-all"
                  >
                    <UserIcon size={16} strokeWidth={2} />
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    className="hidden sm:block px-6 py-2 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-blue-500 hover:border-blue-500/40 transition-all"
                  >
                    Login
                  </Link>
                )}

                <AnimatePresence>
                  {isUserMenuOpen && user && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute top-full right-0 mt-4 w-64 glass-panel border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-3xl overflow-hidden"
                    >
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-1">Archived Identity</p>
                          <p className="text-xs font-black uppercase tracking-widest text-white truncate">{user.fullName}</p>
                          <p className="text-[8px] uppercase tracking-widest text-blue-500 font-black mt-1">{user.role}</p>
                        </div>

                        <div className="h-px w-full bg-white/5" />

                        <div className="space-y-2">
                          {(user.role === 'admin' || user.role === 'owner') && (
                            <Link
                              to="/admin"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 w-full p-3 rounded-2xl hover:bg-white/5 text-[10px] uppercase tracking-widest font-black text-white/60 hover:text-white transition-all"
                            >
                              <LayoutDashboard size={14} /> Command Center
                            </Link>
                          )}
                          <button
                            onClick={handleLogoutClick}
                            className="flex items-center gap-3 w-full p-3 rounded-2xl hover:bg-red-500/10 text-[10px] uppercase tracking-widest font-black text-white/40 hover:text-red-500 transition-all text-left"
                          >
                            <LogOut size={14} /> Terminate Session
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="group relative flex items-center justify-center"
              >
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 group-hover:text-blue-500 group-hover:border-blue-500/30 transition-all duration-500">
                  <ShoppingBag size={16} strokeWidth={1.5} />
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[7px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                className="md:hidden w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center text-white/60 border border-white/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Futuristic Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-full h-full bg-[#020617] border-l border-white/5 flex flex-col p-12"
            >
              <div className="mt-24 space-y-16">
                <div className="space-y-2">
                  <p className="text-[8px] font-black uppercase tracking-[1em] text-blue-500/50">Olfactory Index</p>
                  <div className="h-px w-20 bg-gradient-to-r from-blue-500/40 to-transparent" />
                </div>

                <div className="flex flex-col space-y-10">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx, type: 'spring', damping: 20 }}
                    >
                      <Link
                        to={link.path}
                        className="group relative flex items-baseline gap-6"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500/20 group-hover:text-blue-500 transition-colors">
                          0{idx + 1}
                        </span>
                        <span className={`text-6xl md:text-8xl serif italic font-black transition-all tracking-tighter ${location.pathname === link.path ? 'text-white' : 'text-white/20'
                          } group-hover:text-blue-500 group-hover:pl-4 transition-all duration-500`}>
                          {link.name}.
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-auto space-y-10 pb-12">
                <div className="h-px w-full bg-white/5" />
                <div className="flex flex-col gap-8">
                  {!user ? (
                    <Link
                      to="/auth"
                      className="text-[10px] font-black uppercase tracking-[0.4em] text-white bg-blue-600 px-10 py-5 rounded-full text-center hover:bg-blue-500 transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)] w-fit"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Unlock Archive
                    </Link>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                        <UserIcon size={18} />
                      </div>
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Secure Session</p>
                        <p className="text-xs font-black uppercase tracking-widest text-white">{user.fullName}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[0.5em] text-white/10">
                    <span>Paris Boutique</span>
                    <span>© 2026 Royale</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
