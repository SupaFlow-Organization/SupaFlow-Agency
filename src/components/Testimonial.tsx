import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { springTransition } from '../lib/motion';
import { useRef } from 'react';
import { useInView } from '../lib/motion';
import content from '@/data/content.json';

export default function Testimonial() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { testimonial } = content;

  return (
    <section aria-label="Client testimonial" className="py-20 sm:py-32 bg-ink text-white relative overflow-hidden px-5 sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05),_#1A1A1A_50%,_#1A1A1A)] pointer-events-none" aria-hidden="true" />

      <motion.div
        ref={ref}
        className="max-w-4xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...springTransition, stiffness: 60 }}
      >
        <Icon icon="solar:quote-left-bold" className="text-3xl sm:text-4xl text-white/20 mb-6 sm:mb-8 mx-auto" aria-hidden="true" />
        <figure>
          <motion.blockquote
            className="text-[clamp(1.25rem,3vw,2.5rem)] font-medium leading-tight tracking-tight mb-8 sm:mb-12"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ ...springTransition, delay: 0.2 }}
          >
            <p>"{testimonial.quote}"</p>
          </motion.blockquote>
          <motion.figcaption
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <cite className="text-sm font-semibold not-italic">{testimonial.author}</cite>
            <span className="font-mono text-[0.6rem] sm:text-xs text-white/50 uppercase tracking-wider">{testimonial.role}</span>
          </motion.figcaption>
        </figure>
      </motion.div>
    </section>
  );
}
