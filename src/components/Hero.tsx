import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Magnetic, springTransition } from '../lib/motion';
import { Button } from '@/components/ui/button';
import content from '@/data/content.json';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: springTransition },
};

const clientItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { ...springTransition, stiffness: 80 } },
};

export default function Hero() {
  const { hero, brand } = content;

  return (
    <section aria-labelledby="hero-heading" className="relative min-h-[100dvh] flex flex-col justify-center pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden px-5 sm:px-8 lg:px-12">
      <motion.div
        className="absolute top-[-20%] right-0 w-[70vw] h-[70vh] stripe-gradient opacity-60 blur-[60px] pointer-events-none -z-10 rotate-12 transform-gpu"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <div className="max-w-[82.5rem] mx-auto w-full relative z-10">
        <motion.div
          className="flex flex-col gap-5 sm:gap-6 items-start"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={item} className="font-mono text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-[0.1em]">
            {brand.tagline}
          </motion.span>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="text-[clamp(2.5rem,8.5vw,8.5rem)] leading-[0.95] font-semibold tracking-tighter text-ink max-w-[15ch]"
          >
            {hero.heading}{' '}
            <span className="text-gradient">{hero.headingHighlight}</span> {hero.headingSuffix}
          </motion.h1>

          <motion.p variants={item} className="text-gray-600 font-normal leading-relaxed text-base sm:text-lg max-w-2xl">
            {hero.description}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3 sm:gap-4 pt-4 items-center">
            <Magnetic strength={0.15}>
              <Button asChild>
                <motion.a
                  href="#work"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springTransition}
                >
                  {hero.cta}{' '}
                  <Icon icon="solar:arrow-right-up-linear" width={16} />
                </motion.a>
              </Button>
            </Magnetic>
            <Magnetic strength={0.15}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={springTransition}>
                <Button variant="secondary" asChild>
                  <Link to="/book">
                    {hero.ctaSecondary}
                  </Link>
                </Button>
              </motion.div>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 sm:mt-32 border-t border-black/5 pt-6 sm:pt-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 1.0 } },
          }}
        >
          <motion.p variants={clientItem} className="font-mono text-[0.65rem] sm:text-xs text-gray-400 mb-4 sm:mb-6 uppercase tracking-[0.1em]">
            {hero.clientsLabel}
          </motion.p>
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-8 lg:gap-x-12 opacity-40 grayscale">
            {hero.clients.map((name) => (
              <motion.div key={name} variants={clientItem} className="font-semibold tracking-tight whitespace-nowrap text-base sm:text-lg lg:text-xl">
                {name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
