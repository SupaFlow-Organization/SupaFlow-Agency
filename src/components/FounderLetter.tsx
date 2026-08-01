import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView, springTransition } from '../lib/motion';
import { ImageWithSkeleton } from './ui/image-with-skeleton';

const letterParagraphs = [
  "We've spent years watching businesses lose opportunities — not because they had a bad product, but because they had a website that failed to communicate its value.",
  "The biggest problem wasn't design.",
  "It was momentum.",
  "Projects dragged on for months. Communication slowed. Launches slipped. Businesses waited.",
  "We built SupaFlow around a simple belief:",
  "Great websites shouldn't take forever. They should launch quickly, earn trust immediately, and continue creating value for years.",
  "That's the standard we've committed ourselves to on every project.",
];

export default function FounderLetter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      aria-label="Founder letter"
      className="py-20 sm:py-32 lg:py-40 bg-transparent text-ink relative px-5 sm:px-8 lg:px-12"
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.02),_transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        ref={ref}
        className="max-w-[70rem] mx-auto relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...springTransition, stiffness: 60 }}
      >
        <div className="bg-white border border-ink/5 shadow-2xl shadow-black/5 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
            {/* Left — label & Avatar */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:border-r border-ink/5 lg:pr-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.65rem] font-mono uppercase tracking-widest bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-purple-700 border border-purple-500/20 w-fit">
                <Icon icon="solar:letter-bold" className="text-pink-500" />
                Note from the Founder
              </span>

              <div className="hidden lg:block mt-auto pt-10">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-ink/10 mb-4">
                  <ImageWithSkeleton
                    src="/images/profile-pic.jpg"
                    alt="Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-semibold text-ink">Bhushan Sadavarti</p>
                <p className="font-mono text-[0.65rem] text-ink/40 uppercase tracking-wider mt-1">Founder, SupaFlow</p>
              </div>
            </div>

            {/* Right — letter body */}
            <div className="lg:col-span-8">
              <motion.div
                className="flex flex-col gap-6 sm:gap-8"
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                }}
              >
                {letterParagraphs.map((para, i) => {
                  const isHighlight =
                    para === "It was momentum." ||
                    para === "We built SupaFlow around a simple belief:" ||
                    para === "Great websites shouldn't take forever. They should launch quickly, earn trust immediately, and continue creating value for years.";

                  return (
                    <motion.p
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: springTransition },
                      }}
                      className={
                        isHighlight
                          ? 'text-[clamp(1.25rem,3vw,2rem)] font-medium tracking-tight leading-[1.3] text-ink'
                          : 'text-sm sm:text-[1.05rem] text-ink/70 leading-relaxed font-light max-w-2xl'
                      }
                    >
                      {para}
                    </motion.p>
                  );
                })}

                {/* Mobile Signature (hidden on desktop) */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { delay: 0.8, duration: 0.6 } },
                  }}
                  className="lg:hidden flex items-center gap-4 pt-6 border-t border-ink/10 mt-4"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-ink/10">
                    <ImageWithSkeleton
                      src="/images/profile-pic.jpg"
                      alt="Founder"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Bhushan Sadavarti</p>
                    <p className="font-mono text-[0.6rem] sm:text-xs text-ink/40 uppercase tracking-wider mt-1">Founder, SupaFlow</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
