import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInCard } from '../components/ui/sign-in-card-2';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { OrganicBackground } from '../components/ui/organic-background';

const Auth: React.FC<{ onLogin: (user: any) => void }> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleAuthSuccess = (userData: any) => {
    onLogin(userData);
    if (userData.role === 'admin' || userData.role === 'owner') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] flex items-center justify-center">
      <OrganicBackground />

      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(-1)}
        className="fixed top-6 right-6 z-[100] w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors shadow-2xl"
        title="Close and go back"
      >
        <X size={20} />
      </motion.button>

      <div className="relative z-10 w-full max-w-md p-4">
        <SignInCard onLoginSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
};

export default Auth;
