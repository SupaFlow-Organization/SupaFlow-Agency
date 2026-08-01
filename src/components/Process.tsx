import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { Reveal, springTransition, useInView } from '../lib/motion';
import { useMobile } from '../hooks/useMobile';
import content from '@/data/content.json';

const steps = content.process.steps;

function ProcessCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ ...springTransition, delay: index * 0.1 }}
      className="process-card h-[24rem] sm:h-[28rem] bg-surface border border-black/5 rounded-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden group min-w-[calc(100vw-2.5rem)] sm:min-w-[22rem] md:min-w-[28rem] transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5"
    >
      {/* Number watermark top-right */}
      <span className={`font-mono text-3xl sm:text-4xl text-black/10 font-semibold absolute top-6 sm:top-8 right-6 sm:right-8 transition-colors z-10 ${step.hoverColor}`}>
        {step.number}
      </span>

      {/* Top-left dash */}
      <div className="absolute top-6 sm:top-8 left-6 sm:left-8 w-12 h-1 border-t-2 border-black/20 z-10" />

      {/* Image */}
      {step.image && (
        <div className="absolute inset-x-6 sm:inset-x-8 top-20 sm:top-24 bottom-36 sm:bottom-40 flex items-center justify-center pointer-events-none opacity-100">
          <div className="w-full aspect-video relative overflow-hidden rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <ImageWithSkeleton
              src={step.image}
              alt={step.title}
              containerClassName="absolute inset-0"
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </div>
        </div>
      )}

      {/* Title + description at bottom */}
      <div className="mt-auto z-10 relative">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 sm:mb-3">
          {step.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">{step.description}</p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const isMobile = useMobile();

  return (
    <section id="process" className="horizontal-scroll-wrapper bg-white -mb-24 sm:-mb-32 lg:-mb-48 relative z-0">
      <div className="horizontal-scroll-sticky">
        <div className="relative md:absolute top-0 pt-24 md:pt-0 md:top-32 z-10 left-0 right-0 px-5 sm:px-8 lg:px-12 mb-6 md:mb-0">
          <div className="max-w-[82.5rem] mx-auto">
            <Reveal>
              <span className="font-mono text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-[0.1em]">
                {content.process.label}
              </span>
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-semibold tracking-tight mt-3 sm:mt-4">
                {content.process.heading}
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="horizontal-scroll-track w-full">
          {!isMobile && <div className="min-w-[5vw]" />}

          {steps.map((step, i) => (
            <ProcessCard key={step.number} step={step} index={i} />
          ))}

          {!isMobile && <div className="min-w-[10vw]" />}
        </div>
      </div>
    </section>
  );
}
