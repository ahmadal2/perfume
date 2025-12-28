import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInCard } from '../components/ui/sign-in-card-2';

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
    <SignInCard onLoginSuccess={handleAuthSuccess} />
  );
};

export default Auth;
