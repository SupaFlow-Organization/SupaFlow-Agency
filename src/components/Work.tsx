import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { Reveal, StaggerReveal, StaggerItem, TiltCard, Magnetic, springTransition } from '../lib/motion';
import { getCaseStudyImages, prefetchImages } from '@/lib/prefetch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import content from '@/data/content.json';

const getTagVariant = (tag: string): 'orange' | 'pink' | 'purple' | 'blue' | 'secondary' => {
  const t = tag.trim().toLowerCase();
  if (t.includes('brand')) return 'orange';
  if (t.includes('design')) return 'pink';
  if (t.includes('dev') || t.includes('code')) return 'blue';
  if (t.includes('fintech') || t.includes('saas') || t.includes('ui')) return 'purple';
  return 'purple';
};

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
          {work.featured.slice(0, 4).map((project) => {
            const projectTags = (project as { tags?: string[]; category?: string }).tags || (project.category ? project.category.split(',').map((s) => s.trim()) : []);
            const imgScale = (project as { imageScale?: number }).imageScale || 1;
            const imgPosition = (project as { imagePosition?: string }).imagePosition || 'center';            const imgFit = (project as { imageFit?: string }).imageFit;

            return (
              <StaggerItem key={project.title} className={project.offset ? 'md:mt-12' : 'mt-0'}>
                <Link
                  to={`/case-studies/${project.id}`}
                  onMouseEnter={() => prefetchImages(getCaseStudyImages(project.id))}
                >
                  <TiltCard className="bento-card p-3 sm:p-4 pb-6 sm:pb-8 group cursor-pointer">
                    <div className={`w-full aspect-[4/3] ${project.bgColor || 'bg-gray-100'} rounded-lg sm:rounded-xl mb-4 sm:mb-6 overflow-hidden relative`}>
                      {project.image && (
                        <motion.div
                          className="absolute inset-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                        >
                          <ImageWithSkeleton
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            containerClassName="h-full w-full"
                            className={`h-full w-full ${imgFit === 'contain' ? 'object-contain p-2.5 sm:p-3.5' : 'object-cover object-top'}`}
                            style={{
                              transform: imgScale !== 1 ? `scale(${imgScale})` : undefined,
                              objectPosition: imgPosition,
                            }}
                          />
                        </motion.div>
                      )}
                    </div>
                    <div className="px-2 sm:px-4 flex justify-between items-start">
                      <div className="pr-4">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {projectTags.map((tag) => (
                            <Badge key={tag} variant={getTagVariant(tag)}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold tracking-tight">{project.title}</h3>
                        {(project as { description?: string }).description && (
                          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                            {(project as { description?: string }).description}
                          </p>
                        )}
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-xs font-medium hidden sm:block shrink-0 mt-1"
                      >
                        View →
                      </motion.div>
                    </div>
                  </TiltCard>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerReveal>

        <Reveal className="mt-8 sm:mt-12 text-center">
          <div className="inline-block">
            <Magnetic strength={0.15}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={springTransition}>
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full px-8 py-6 text-sm font-medium shadow-md group"
                  asChild
                >
                  <Link to="/case-studies">
                    <span>View more work</span>
                    <Icon icon="solar:arrow-right-up-linear" width={16} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
