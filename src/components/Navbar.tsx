import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMobile } from '../hooks/useMobile';
import { Magnetic, springTransition } from '../lib/motion';
import { Button } from '@/components/ui/button';
import content from '@/data/content.json';

interface NavbarProps {
  navRef: RefObject<HTMLElement | null>;
}

export default function Navbar({ navRef }: NavbarProps) {
  const isMobile = useMobile(1024);
  const [menuOpen, setMenuOpen] = useState(false);
  const { navbar, brand } = content;
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside the nav element
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const navEl = navRef?.current;
      const menuEl = menuContainerRef.current;
      if (
        navEl &&
        !navEl.contains(e.target as Node) &&
        (!menuEl || !menuEl.contains(e.target as Node))
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen, navRef]);

  return (
    <>
      <nav
        id="navbar"
        ref={navRef}
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 sm:py-6 flex justify-between items-center px-5 sm:px-8 lg:px-12 ${menuOpen ? 'bg-white' : ''}`}
      >
        <Link
          to="/"
          className="text-xl font-semibold tracking-tighter z-10 text-ink hover:scale-105 transition-transform"
        >
          {brand.name}
        </Link>

        {!isMobile && (
          <div className="flex items-center gap-8 text-sm font-medium text-gray-500 z-10">
            {navbar.menuItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ y: -1 }}
                transition={springTransition}
                className="hover:text-black transition-colors hover:scale-105"
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 z-10">
          <Magnetic strength={0.12}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={springTransition}>
              <Button asChild>
                <Link to="/book-a-call">
                  {navbar.cta}
                  <Icon icon="solar:arrow-right-linear" width={14} />
                </Link>
              </Button>
            </motion.div>
          </Magnetic>

          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full border border-black/10 z-10"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={springTransition}
                className="w-4 h-[1.5px] bg-ink block"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                transition={springTransition}
                className="w-4 h-[1.5px] bg-ink block"
              />
            </button>
          )}
        </div>

        <AnimatePresence>
          {isMobile && menuOpen && (
            <motion.div
              ref={menuContainerRef}
              id="mobile-menu"
              role="menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-full left-0 w-full bg-white/98 backdrop-blur-2xl border-b border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden z-50"
            >
              <motion.div
                className="flex flex-col px-6 py-8 gap-1"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                }}
              >
                {navbar.menuItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={springTransition}
                    className="flex items-center justify-between py-4 border-b border-black/5 last:border-b-0 group"
                  >
                    <span className="text-lg font-medium text-ink tracking-tight group-hover:translate-x-2 transition-transform duration-300">{item.label}</span>
                    <span className="font-mono text-[0.6rem] text-gray-400 uppercase tracking-widest">{item.num}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop shadow layer when mobile menu is open - clicking it closes the menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 cursor-pointer"
          />
        )}
      </AnimatePresence>
    </>
  );
}
