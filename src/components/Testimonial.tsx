import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { springTransition } from '../lib/motion';
import { useRef } from 'react';
import { useInView } from '../lib/motion';
import content from '@/data/content.json';
import { ImageWithSkeleton } from './ui/image-with-skeleton';

export default function Testimonial() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { testimonials } = content;

  return (
    <section
      aria-label="Client testimonials track record"
      className="dark-section py-20 sm:py-32 bg-ink text-white relative overflow-hidden px-5 sm:px-8 lg:px-12"
    >

      <div className="max-w-[82.5rem] mx-auto relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springTransition, delay: 0.1 }}
            className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight leading-[1.1] mb-5 sm:mb-6"
          >
            {testimonials.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springTransition, delay: 0.2 }}
            className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl mx-auto whitespace-pre-line"
          >
            {testimonials.description}
          </motion.p>
        </div>

        {/* Testimonials 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.list.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...springTransition, delay: 0.15 * idx + 0.2 }}
              className="group relative bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm hover:border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40"
            >
              {/* Top Accent Line on hover */}
              <div
                className="absolute top-0 left-10 right-10 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                style={{ backgroundColor: item.accentColor }}
              />

              {/* Quote Body */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <Icon
                    icon="solar:quote-left-bold"
                    className="text-3xl text-white/10 group-hover:text-white/20 transition-colors"
                  />
                  <span
                    className="px-3 py-1.5 rounded-full text-[0.65rem] font-mono uppercase tracking-widest border bg-white/[0.02]"
                    style={{
                      color: item.accentColor,
                      borderColor: `${item.accentColor}30`,
                    }}
                  >
                    {item.metric}
                  </span>
                </div>
                <blockquote className="text-white/70 text-sm sm:text-base leading-relaxed font-light">
                  {item.quote}
                </blockquote>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-4 pt-5 border-t border-white/[0.05]">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <ImageWithSkeleton
                    src={item.avatar}
                    alt={item.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {item.author}
                  </div>
                  <div className="text-[0.65rem] font-mono uppercase tracking-wider text-white/40 mt-0.5">
                    {item.role} <span className="text-white/20 mx-1">•</span> {item.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
