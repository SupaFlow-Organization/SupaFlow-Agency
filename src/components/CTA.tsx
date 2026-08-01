import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Magnetic, Reveal, springTransition } from '../lib/motion';
import { Button } from '@/components/ui/button';
import content from '@/data/content.json';

interface CTAProps {
  showGradient?: boolean;
}

export default function CTA({ showGradient = false }: CTAProps) {
  const { cta, brand } = content;

  return (
    <section className="relative pb-24 sm:pb-40 pt-10 sm:pt-16 flex flex-col items-center text-center bg-transparent px-5 sm:px-8 lg:px-12">
      {/* Optional Stripe Gradient Glowing Background */}
      {showGradient && (
        <motion.div
          className="absolute inset-0 w-full h-full stripe-gradient opacity-30 blur-[80px] pointer-events-none z-0"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <Reveal className="relative z-10 max-w-4xl w-full mx-auto">
        <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold tracking-tighter leading-[1.05] mb-4 sm:mb-6 whitespace-pre-line">
          {cta.heading}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto">
          {cta.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Magnetic strength={0.15}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={springTransition}>
              <Button asChild>
                <Link to="/book-a-call">
                  {cta.button} <Icon icon="solar:arrow-right-linear" width={14} />
                </Link>
              </Button>
            </motion.div>
          </Magnetic>

          <Magnetic strength={0.15}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={springTransition}>
              <Button variant="secondary" className="ring-black/20" asChild>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@supaflow.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cta.secondaryButton || 'Mail us'} <Icon icon="solar:letter-linear" width={14} />
                </a>
              </Button>
            </motion.div>
          </Magnetic>
        </div>

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@supaflow.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 sm:mt-12 font-mono text-[0.6rem] sm:text-xs text-gray-400 uppercase tracking-widest hover:text-ink transition-colors"
        >
          {brand.email}
        </a>
      </Reveal>
    </section>
  );
}
