import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Reveal, TiltCard, springTransition, Magnetic } from '@/lib/motion';
import { getCaseStudyImages, prefetchImages } from '@/lib/prefetch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import { useCustomCursor, useStickyNav } from '@/hooks/useInteractions';
import content from '@/data/content.json';

const getTagVariant = (tag: string): 'orange' | 'pink' | 'purple' | 'blue' | 'secondary' => {
  const t = tag.trim().toLowerCase();
  if (t.includes('brand')) return 'orange';
  if (t.includes('design')) return 'pink';
  if (t.includes('dev') || t.includes('code')) return 'blue';
  if (t.includes('fintech') || t.includes('saas') || t.includes('ui')) return 'purple';
  return 'purple';
};

export default function CaseStudies() {
  const { work } = content;
  const navRef = useStickyNav();
  useCustomCursor();

  return (
    <main className="min-h-screen bg-surface">
      <CustomCursor />
      <Navbar navRef={navRef} />

      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-5 sm:px-8 lg:px-12 max-w-[82.5rem] mx-auto">
        <Reveal className="mb-12 sm:mb-16">
          <div className="mb-8 block w-fit">
            <Magnetic strength={0.15}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={springTransition}>
                <Button variant="secondary" size="sm" asChild className="rounded-full border-black/10">
                  <Link to="/#work">
                    <Icon icon="solar:arrow-left-linear" width={14} className="mr-1.5" />
                    Back to Home
                  </Link>
                </Button>
              </motion.div>
            </Magnetic>
          </div>

          <span className="font-mono text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-[0.1em]">
            // PROOF OF WORK
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-tighter leading-[1.05] mt-3 sm:mt-4 mb-4 sm:mb-6">
            Case Studies.
          </h1>
          <p className="text-gray-600 max-w-2xl text-base sm:text-lg leading-relaxed">
            Explore our curated portfolio of high-converting, custom-engineered digital experiences. Built in days without compromising design or strategy.
          </p>
        </Reveal>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {work.featured.map((project) => {
              const projectTags = project.tags || (project.category ? project.category.split(',').map((s) => s.trim()) : []);
              const imgScale = (project as { imageScale?: number }).imageScale || 1;
              const imgPosition = (project as { imagePosition?: string }).imagePosition || 'center';
              const imgFit = (project as { imageFit?: string }).imageFit;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={springTransition}
                >
                  <Link
                    to={`/case-studies/${project.id}`}
                    onMouseEnter={() => prefetchImages(getCaseStudyImages(project.id))}
                  >
                    <TiltCard className="bento-card p-3 sm:p-4 pb-6 sm:pb-8 group cursor-pointer h-full flex flex-col justify-between">
                      <div>
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
                            <div className="flex flex-wrap gap-1.5 mb-2.5">
                              {projectTags.map((tag) => (
                                <Badge key={tag} variant={getTagVariant(tag)}>
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{project.title}</h2>
                            {project.description && (
                              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed font-normal">
                                {project.description}
                              </p>
                            )}
                          </div>
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="text-xs font-medium hidden sm:flex items-center gap-1 shrink-0 mt-1"
                          >
                            <span>View Case Study</span>
                            <Icon icon="solar:arrow-right-up-linear" width={14} />
                          </motion.div>
                        </div>
                      </div>
                    </TiltCard>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      <CTA showGradient />
      <Footer />
    </main>
  );
}
