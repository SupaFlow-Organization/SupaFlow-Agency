import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Reveal, StaggerReveal, StaggerItem, TiltCard, springTransition } from '../lib/motion';
import { Badge } from '@/components/ui/badge';
import content from '@/data/content.json';

export default function Work() {
  const { work } = content;

  return (
    <section id="work" className="py-20 sm:py-32 bg-surface relative px-5 sm:px-8 lg:px-12">
      <div className="max-w-[82.5rem] mx-auto">
        <Reveal className="mb-12 sm:mb-16">
          <span className="font-mono text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-[0.1em]">{work.label}</span>
          <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-semibold tracking-tight mt-3 sm:mt-4">{work.heading}</h2>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {work.featured.map((project) => (
            <StaggerItem key={project.title} className={project.offset ? 'md:mt-12' : 'mt-0'}>
              <TiltCard className="bento-card p-3 sm:p-4 pb-6 sm:pb-8 group cursor-pointer">
                <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg sm:rounded-xl mb-4 sm:mb-6 overflow-hidden relative">
                  {project.image && (
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                    />
                  )}
                </div>
                <div className="px-2 sm:px-4 flex justify-between items-end">
                  <div>
                    <Badge variant="outline" className="mb-1 sm:mb-2">{project.category}</Badge>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight">{project.title}</h3>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="text-xs font-medium hidden sm:block"
                  >
                    View →
                  </motion.div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <motion.div
          className="border-t border-black/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <ul>
            {work.list.map((project) => (
              <motion.li
                key={project.title}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={springTransition}
                className="group relative border-b border-black/10 py-4 sm:py-6 flex flex-row justify-between items-center cursor-pointer"
              >
                <h4 className="text-lg sm:text-xl lg:text-2xl font-medium tracking-tight group-hover:pl-2 sm:group-hover:pl-4 transition-all duration-300">{project.title}</h4>
                <div className="flex items-center gap-3 sm:gap-4">
                  <Badge variant="outline">{project.type}</Badge>
                  <Icon icon="solar:arrow-right-up-linear" className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300 hidden sm:block" />
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
