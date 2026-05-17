import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Magnetic, Reveal, springTransition } from '../lib/motion';
import { Button } from '@/components/ui/button';
import content from '@/data/content.json';

export default function CTA() {
  const { cta, brand } = content;

  return (
    <section className="relative py-24 sm:py-40 overflow-hidden flex flex-col items-center text-center bg-white px-5 sm:px-8 lg:px-12">
      <motion.div
        className="absolute inset-0 w-full h-full stripe-gradient opacity-30 blur-[80px] pointer-events-none z-0"
        animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Reveal className="relative z-10 max-w-2xl">
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-tighter leading-none mb-4 sm:mb-6">
          {cta.heading}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10">
          {cta.description}
        </p>

        <div className="flex items-center justify-center gap-4">
          <Magnetic strength={0.15}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={springTransition}>
              <Button asChild>
                <Link to="/book">
                  {cta.button} <Icon icon="solar:arrow-right-linear" width={14} />
                </Link>
              </Button>
            </motion.div>
          </Magnetic>
        </div>

        <div className="mt-10 sm:mt-12 font-mono text-[0.6rem] sm:text-xs text-gray-400 uppercase tracking-widest">
          {brand.email}
        </div>
      </Reveal>
    </section>
  );
}
