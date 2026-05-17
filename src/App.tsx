import GridOverlay from './components/GridOverlay';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Process from './components/Process';
import Work from './components/Work';
import Capabilities from './components/Capabilities';
import Testimonial from './components/Testimonial';
import CTA from './components/CTA';
import Footer from './components/Footer';
import {
  useCustomCursor,
  useHorizontalScroll,
  useStickyNav,
  useLenisScroll,
} from './hooks/useInteractions';

export default function App() {
  const navRef = useStickyNav();

  useLenisScroll();
  useCustomCursor();
  useHorizontalScroll();

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
        <Process />
        <Work />
        <Capabilities />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
