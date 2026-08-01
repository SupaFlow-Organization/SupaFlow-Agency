import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Reveal, StaggerReveal, StaggerItem, springTransition } from '../lib/motion';
import content from '@/data/content.json';

export default function Capabilities() {
  const { capabilities } = content;

  return (
    <section className="py-20 sm:py-32 bg-white border-t border-black/5 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[82.5rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal className="mb-8 sm:mb-12">
            <span className="font-mono text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-[0.1em]">{capabilities.label}</span>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mt-3 sm:mt-4">{capabilities.heading}</h2>
            {capabilities.description && (
              <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-xl leading-relaxed">{capabilities.description}</p>
            )}
          </Reveal>
          <StaggerReveal className="flex flex-wrap gap-2 sm:gap-3">
            {capabilities.techStack.map((tech) => (
              <StaggerItem key={tech.label}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springTransition}
                  className="px-3 sm:px-4 py-2 border border-black/10 rounded-full flex items-center gap-2 text-sm bg-surface hover:bg-white hover:border-black/20 transition-colors cursor-pointer"
                >
                  <Icon icon={tech.icon} className={tech.iconClass || ''} />
                  <span className="font-mono text-[0.65rem] sm:text-xs">{tech.label}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>

        <StaggerReveal className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
          {capabilities.stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={springTransition}
                className="bento-card p-4 sm:p-6 flex flex-col justify-center items-center text-center bg-surface-muted border-none shadow-none"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter text-ink">
                  {stat.value}
                  {stat.suffix && <span className={stat.suffixColor}>{stat.suffix}</span>}
                </div>
                <div className="font-mono text-[0.55rem] sm:text-[0.65rem] text-gray-500 uppercase mt-1.5 sm:mt-2">{stat.label}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
