
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Landing from './pages/Landing';
import KhameahLanding from './pages/KhameahLanding';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import LoadingPage from './pages/LoadingPage';
import Blueprint from './pages/Blueprint';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import { CartItem, User } from './types';
import { AnimatePresence } from 'framer-motion';
import { supabase } from './lib/supabase';
import { api } from './services/apiService';
import { CustomCursor } from './components/ui/custom-cursor';
import ScrollToTop from './components/ScrollToTop';

const AppContent: React.FC<{
  cart: CartItem[],
  addToCart: (i: CartItem) => void,
  wishlist: string[],
  toggleWishlist: (id: string) => void,
  updateQuantity: (id: string, vid: string, d: number) => void,
  removeFromCart: (id: string, vid: string) => void,
  clearCart: () => void,
  isCartOpen: boolean,
  setIsCartOpen: (o: boolean) => void,
  isLoading: boolean,
  setFinishLoading: () => void,
  user: User | null;
  setUser: (u: User | null) => void;
  isAuthReady: boolean;
}> = ({ cart, addToCart, wishlist, toggleWishlist, updateQuantity, removeFromCart, clearCart, isCartOpen, setIsCartOpen, isLoading, setFinishLoading, user, setUser, isAuthReady }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';
  const isAuth = location.pathname === '/auth';

  // Real-time Visitor Tracking
  useEffect(() => {
    api.trackVisit(location.pathname);
  }, [location.pathname]);

  // Real-time Supabase Auth Listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Olfactory Archive Secure Event:', event);
      if (session?.user) {
        const currentUser = await api.getCurrentSessionUser();
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
    navigate('/home');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <CustomCursor /> */}
      <AnimatePresence>
        {isLoading && (
          <LoadingPage onComplete={() => {
            setFinishLoading();
          }} />
        )}
      </AnimatePresence>

      {!isLanding && !isAuth && !isLoading && (
        <Navbar
          cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
          toggleCart={() => setIsCartOpen(true)}
          user={user}
          onLogout={handleLogout}
        />
      )}

      <main className="flex-grow">
        {!isLoading && (
          <Routes>
            <Route path="/" element={<KhameahLanding />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/products"
              element={
                <Products
                  onAddToCart={addToCart}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                  user={user}
                />
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blueprint" element={<Blueprint />} />
            <Route path="/auth" element={<Auth onLogin={setUser} />} />

            <Route
              path="/admin"
              element={
                !isAuthReady ? (
                  <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                    <div className="w-12 h-12 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                  </div>
                ) : user && (user.role === 'admin' || user.role === 'owner')
                  ? <AdminDashboard />
                  : <Navigate to="/auth" />
              }
            />

            <Route
              path="/product/:slug"
              element={
                <ProductDetail
                  onAddToCart={addToCart}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                />
              }
            />
            <Route path="/checkout" element={<Checkout items={cart} onClearCart={clearCart} onUpdateQuantity={updateQuantity} onRemoveItem={removeFromCart} />} />
          </Routes>
        )}
      </main>

      {!isLanding && !isAuth && !isLoading && <Footer />}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('khamrah-distilled');
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Initial Auth Check
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await api.getCurrentSessionUser();
        setUser(currentUser);
      } catch (err) {
        console.error("Auth init failed:", err);
      } finally {
        setIsAuthReady(true);
      }
    };
    initAuth();
  }, []);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === item.productId && i.variantId === item.variantId);
      if (existing) {
        return prev.map(i => i.productId === item.productId && i.variantId === item.variantId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
        );
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const updateQuantity = (productId: string, variantId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === productId && item.variantId === variantId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart(prev => prev.filter(i => !(i.productId === productId && i.variantId === variantId)));
  };

  const clearCart = () => setCart([]);

  const setFinishLoading = () => {
    setIsLoading(false);
    sessionStorage.setItem('khamrah-distilled', 'true');
    window.scrollTo(0, 0);
    navigate('/');
  };

  return (
    <AppContent
      cart={cart}
      addToCart={addToCart}
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
      updateQuantity={updateQuantity}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
      isCartOpen={isCartOpen}
      setIsCartOpen={setIsCartOpen}
      isLoading={isLoading}
      setFinishLoading={setFinishLoading}
      user={user}
      setUser={setUser}
      isAuthReady={isAuthReady}
    />
  );
};

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  );
};

export default AppWrapper;
