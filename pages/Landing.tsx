import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartItem } from '../types';
import { KineticStats } from '../components/ui/kinetic-stats';
// import { HorizontalGallery } from '../components/ui/horizontal-gallery'; // Unused
import { NoiseOverlay } from '../components/ui/noise-overlay';
import { OrganicBackground } from '../components/ui/organic-background';
import Footer from '../components/Footer';
import { NavBar } from '../components/ui/tubelight-navbar';
import { Home, Search, BookOpen, User } from 'lucide-react';

// Khameah Components
import HeroMarquee from '../components/khameah/HeroMarquee';
import HeroStatement from '../components/khameah/HeroStatement';
import SectionProductShowcase from '../components/khameah/SectionProductShowcase';
import ParallaxTextWaves from '../components/khameah/ParallaxTextWaves';
import SectionWhyChooseUs from '../components/khameah/SectionWhyChooseUs';
import ContactFormSequence from '../components/khameah/ContactFormSequence';
import SectionCollections from '../components/khameah/SectionCollections';
import { ScentSignature } from '../components/ui/scent-signature';

interface LandingProps {
    onAddToCart: (item: CartItem) => void;
}

const Landing: React.FC<LandingProps> = ({ onAddToCart }) => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    const [products, setProducts] = React.useState<any[]>([]);

    React.useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await import('../services/apiService').then(m => m.api.getPublicProducts());
                setProducts(data);
            } catch (e) {
                console.error("Failed to load products for gallery", e);
            }
        };
        loadProducts();
    }, []);

    const navItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'Catalogue', url: '/catalog', icon: Search },
        { name: 'Story', url: '/contact', icon: BookOpen },
        { name: 'Login', url: '/auth', icon: User }
    ];

    return (
        <div ref={containerRef} className="bg-[#000000] text-blue-400 relative tech-grid min-h-screen">
            <NavBar items={navItems} />
            <div className="sapphire-vignette fixed inset-0 pointer-events-none z-50 opacity-10" />
            <NoiseOverlay />
            <OrganicBackground />
            <ScentSignature />

            {/* Mouse Follow Glow */}
            <div
                className="fixed inset-0 pointer-events-none z-10 opacity-20"
                style={{
                    background: `radial-gradient(circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.1), transparent 80%)`
                }}
                onMouseMove={(e) => {
                    const target = e.currentTarget as HTMLDivElement;
                    if (target) {
                        target.style.setProperty('--mouse-x', `${e.clientX}px`);
                        target.style.setProperty('--mouse-y', `${e.clientY}px`);
                    }
                }}
            />

            {/* SECTION 1: Opening Hero with Infinite Marquee */}
            <HeroMarquee />

            {/* SECTION 2: Main Hero Statement */}
            <HeroStatement />

            {/* SECTION 3: Product Showcase - Pin & Cycle */}
            <SectionProductShowcase />

            {/* SECTION 4: Animated Text Waves */}
            <ParallaxTextWaves />

            {/* SECTION 5: Why Choose Us / Benefits */}
            <SectionWhyChooseUs />

            {/* SECTION 6: Statistics Counter */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-12 py-40 px-6 max-w-7xl mx-auto">
                <KineticStats value={15} suffix="" label="Countries We Ship To" />
                <KineticStats value={50000} suffix="+" label="Happy Customers" />
                <KineticStats value={100} suffix="+" label="Unique Scents" />
            </section>

            {/* SECTION 7: Collections / Use Cases */}
            <SectionCollections />

            {/* SECTION 8: Contact Form - Sequential Fade */}
            <ContactFormSequence />

            {/* SECTION 9: Footer */}
            <Footer />

        </div>
    );
};

export default Landing;
