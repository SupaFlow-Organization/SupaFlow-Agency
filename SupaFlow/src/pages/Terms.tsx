import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { springTransition } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import { useCustomCursor } from '@/hooks/useInteractions';
import content from '@/data/content.json';

export default function Terms() {
  useCustomCursor();
  const { terms, brand } = content;

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
            Back to home
          </Link>
        </Button>
      </nav>

      <div className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springTransition}
            className="mb-12 sm:mb-16"
          >
            <span className="font-mono text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-[0.1em]">
              {terms.label}
            </span>
            <h1 className="text-[clamp(2rem,5vw,4rem)] font-semibold tracking-tighter mt-3 sm:mt-4">
              {terms.heading}
            </h1>
            <p className="text-gray-500 text-sm mt-4 font-mono">
              {terms.lastUpdated}
            </p>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg max-w-2xl mt-6">
              {terms.intro}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.15 }}
            className="space-y-10 sm:space-y-12"
          >
            {terms.sections.map((section, i) => (
              <div key={i} className="border-t border-black/5 pt-8">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight mb-4">
                  {section.title}
                </h2>
                <div className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
