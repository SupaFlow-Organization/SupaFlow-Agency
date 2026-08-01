import { motion } from 'framer-motion';
import GridOverlay from './components/GridOverlay';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import Marquee from './components/Marquee';
import Services from './components/Services';
import WhySupaFlow from './components/WhySupaFlow';
import Process from './components/Process';
import Work from './components/Work';
import Capabilities from './components/Capabilities';
import Testimonial from './components/Testimonial';
import FounderLetter from './components/FounderLetter';
import CTA from './components/CTA';
import Footer from './components/Footer';
import {
  useCustomCursor,
  useHorizontalScroll,
  useStickyNav,
  useLenisScroll,
} from './hooks/useInteractions';
import { useGlobalImagePrefetch } from './lib/prefetch';

export default function App() {
  const navRef = useStickyNav();

  useLenisScroll();
  useCustomCursor();
  useHorizontalScroll();
  useGlobalImagePrefetch();

  return (
    <div>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <GridOverlay />
      <CustomCursor />
      <Navbar navRef={navRef} />
      <main id="main-content">
        <Hero />

        <Marquee />
        <Services />
        <WhySupaFlow />
        <Process />
        <Work />
        <Capabilities />
        <Testimonial />
        
        {/* Shared continuous background container for FounderLetter and CTA */}
        <div className="relative overflow-hidden bg-surface-white">
          <motion.div
            className="absolute inset-0 w-full h-full stripe-gradient opacity-30 blur-[100px] pointer-events-none z-0"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative z-10">
            <FounderLetter />
            <CTA />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
