import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { springTransition } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import { useCustomCursor } from '@/hooks/useInteractions';
import content from '@/data/content.json';

export default function Book() {
  useCustomCursor();
  const { book, brand } = content;

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '30min' });
      cal('ui', { theme: 'light', hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  return (
    <div className="min-h-[100dvh] bg-surface">
      <CustomCursor />
      <nav className="fixed top-0 left-0 w-full z-40 py-4 sm:py-6 flex justify-between items-center px-5 sm:px-8 lg:px-12 backdrop-blur-xl bg-white/80 border-b border-black/5">
        <Link to="/" className="text-xl font-semibold tracking-tighter text-ink hover:scale-105 transition-transform">
          {brand.name}
        </Link>
        <Button variant="secondary" asChild>
          <Link to="/" className="hover:scale-105 transition-transform">
            <Icon icon="solar:arrow-left-linear" width={14} />
            {book.backButton}
          </Link>
        </Button>
      </nav>

      <div className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[82.5rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springTransition}
            className="mb-10 sm:mb-14"
          >
            <span className="font-mono text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-[0.1em]">
              {book.label}
            </span>
            <h1 className="text-[clamp(2rem,5vw,4rem)] font-semibold tracking-tighter mt-3 sm:mt-4 max-w-[20ch]">
              {book.heading}
            </h1>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg max-w-2xl mt-4">
              {book.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.15 }}
            className="w-full min-h-[600px] rounded-[1.25rem] border border-black/[0.06] bg-white overflow-hidden cursor-hide-zone"
          >
            <Cal
              namespace="30min"
              calLink="supaflow-works/30min"
              style={{ width: '100%', height: '100%', overflow: 'scroll' }}
              config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'light' }}
            />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
