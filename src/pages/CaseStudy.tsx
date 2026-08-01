import { useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Reveal, TiltCard, springTransition, Magnetic } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import { useCustomCursor, useStickyNav } from '@/hooks/useInteractions';
import { getCaseStudyImages, prefetchImages } from '@/lib/prefetch';
import content from '@/data/content.json';

const getTagVariant = (tag: string): 'orange' | 'pink' | 'purple' | 'blue' | 'secondary' => {
  const t = tag.trim().toLowerCase();
  if (t.includes('brand')) return 'orange';
  if (t.includes('design')) return 'pink';
  if (t.includes('dev') || t.includes('code')) return 'blue';
  if (t.includes('fintech') || t.includes('saas') || t.includes('ui')) return 'purple';
  return 'purple';
};

export default function CaseStudy() {
  const { id } = useParams();
  const navRef = useStickyNav();
  useCustomCursor();

  // Find the project based on the ID, fallback to ARC (id: "1") if not found.
  const project = content.work.featured.find((p) => p.id === id) || content.work.featured[0];
  const projectTags = project.tags || (project.category ? project.category.split(',').map((s) => s.trim()) : []);

  // Circular rotational recommendation logic for all 6 case studies
  const allProjects = content.work.featured;
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const total = allProjects.length;

  const nextIndex1 = (currentIndex + 1) % total;
  const nextIndex2 = (currentIndex + 2) % total;

  const otherProjects = [
    allProjects[nextIndex1],
    allProjects[nextIndex2]
  ];

  // Determine images based on project. For ARC (id 1), use our realistic images.
  let caseStudyImages = [
    project.image || '',
    '',
    ''
  ];

  if (project.id === '1') {
    caseStudyImages = [
      '/images/arc/arc-1.png',
      '/images/arc/arc-2.png',
      '/images/arc/arc-3.png'
    ];
  } else if (project.id === '2') {
    caseStudyImages = [
      '/images/elevate/elevate-1.png',
      '/images/elevate/elevate-2.png',
      '/images/elevate/eleveta-3.png'
    ];
  } else if (project.id === '3') {
    caseStudyImages = [
      '/images/nexus/nexus-1.png',
      '/images/nexus/nexus-2.png',
      '/images/nexus/nexus-3.png'
    ];
  } else if (project.id === '4') {
    caseStudyImages = [
      '/images/elana/ev-1.png',
      '/images/elana/ev-2.png',
      '/images/elana/ev-3.png'
    ];
  } else if (project.id === '5') {
    caseStudyImages = [
      '/images/verdae/verdae-1.png',
      '/images/verdae/verdae-2.png',
      '/images/verdae/verdae-3.png'
    ];
  } else if (project.id === '6') {
    caseStudyImages = [
      '/images/luckycharm/lucky-1.png',
      '/images/luckycharm/lucky-2.png',
      '/images/luckycharm/lucky-3.png'
    ];
  } else {
    caseStudyImages = [
      project.image || '/images/elevate-real-estate.png',
      '/images/nexus-ai.jpg',
      project.image || '/images/arc-headphone.png'
    ];
  }

  const isZoomOutProject = ['1', '2', '3', '4', '5', '6'].includes(project.id);

  return (
    <main className="min-h-screen bg-surface">
      <CustomCursor />
      <Navbar navRef={navRef} />

      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-5 sm:px-8 lg:px-12 max-w-[82.5rem] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          
          {/* LEFT COLUMN (Sticky) */}
          <div className="lg:w-[38%] lg:sticky lg:top-36 h-fit">
            <Reveal>
              <div className="mb-6 block w-fit">
                <Magnetic strength={0.15}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={springTransition}>
                    <Button variant="secondary" size="sm" asChild className="rounded-full border-black/10 text-xs">
                      <Link to="/case-studies">
                        <Icon icon="solar:arrow-left-linear" width={14} className="mr-1.5" />
                        Back to Cases
                      </Link>
                    </Button>
                  </motion.div>
                </Magnetic>
              </div>

              <span className="font-mono text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-[0.1em]">
                // CASE STUDY
              </span>
              
              <h1 className="text-[clamp(2.5rem,4.5vw,4.25rem)] font-semibold tracking-tighter leading-[1.05] mt-2 mb-4 text-ink">
                {project.title}
              </h1>
              
              {/* Badges using SupaFlow design system */}
              <div className="flex flex-wrap gap-2 mb-6">
                {projectTags.map((tag) => (
                  <Badge key={tag} variant={getTagVariant(tag)}>
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                {project.description} We partnered with {project.title} to design and develop a high-converting digital experience engineered for uncompromising performance and scale.
              </p>

              {/* SupaFlow Styled CTA Button */}
              <div className="block w-fit">
                <Magnetic strength={0.15}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={springTransition}>
                    <Button
                      variant="default"
                      size="lg"
                      className="rounded-full px-7 py-6 text-sm font-medium shadow-md group"
                      asChild
                    >
                      <Link to="/book-a-call">
                        <span>Book a free strategy call</span>
                        <Icon
                          icon="solar:arrow-right-up-linear"
                          width={16}
                          className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </Link>
                    </Button>
                  </motion.div>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN (Images Grid) */}
          <div className="lg:w-[62%] flex flex-col gap-6">
            
            {/* Main large image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springTransition}
              className={`w-full ${project.id === '2' ? 'bg-[#0B0F17]' : project.id === '4' ? 'bg-[#E8E7E5] border border-black/5' : project.id === '5' ? 'bg-[#1C3022]' : project.id === '6' ? 'bg-[#FAF8F5] border border-black/5' : 'bg-black'} rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[2/1] relative group cursor-pointer`}
            >
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              >
                <ImageWithSkeleton
                  src={caseStudyImages[0]}
                  alt={`${project.title} Hero`}
                  containerClassName="h-full w-full"
                  className={`w-full h-full ${isZoomOutProject ? 'object-contain p-3 sm:p-5' : 'object-cover object-top'}`}
                />
              </motion.div>
            </motion.div>

            {/* Bottom two smaller images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springTransition, delay: 0.1 }}
                className={`w-full ${project.id === '1' ? 'bg-[#FF5500]' : project.id === '2' ? 'bg-[#0B0F17]' : project.id === '4' ? 'bg-[#E8E7E5] border border-black/5' : project.id === '5' ? 'bg-[#1C3022]' : project.id === '6' ? 'bg-[#FAF8F5] border border-black/5' : 'bg-black'} rounded-2xl sm:rounded-3xl overflow-hidden aspect-square sm:aspect-[4/3] md:aspect-square relative group cursor-pointer`}
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                >
                  <ImageWithSkeleton
                    src={caseStudyImages[1]}
                    alt={`${project.title} Detail`}
                    containerClassName="h-full w-full"
                    className={`w-full h-full ${isZoomOutProject ? 'object-contain p-2.5 sm:p-4' : 'object-cover object-top'}`}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springTransition, delay: 0.2 }}
                className={`w-full ${project.id === '1' ? 'bg-[#EAE8E1]' : project.id === '2' ? 'bg-[#0B0F17]' : project.id === '4' ? 'bg-[#E8E7E5] border border-black/5' : project.id === '5' ? 'bg-[#1C3022]' : project.id === '6' ? 'bg-[#FAF8F5] border border-black/5' : 'bg-black'} rounded-2xl sm:rounded-3xl overflow-hidden aspect-square sm:aspect-[4/3] md:aspect-square relative group cursor-pointer`}
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                >
                  <ImageWithSkeleton
                    src={caseStudyImages[2]}
                    alt={`${project.title} UI`}
                    containerClassName="h-full w-full"
                    className={`w-full h-full ${isZoomOutProject ? 'object-contain p-2.5 sm:p-4' : 'object-cover object-top'}`}
                  />
                </motion.div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* RECOMMENDED CASE STUDIES SECTION */}
      <section className="py-16 sm:py-20 border-t border-black/10 px-5 sm:px-8 lg:px-12 max-w-[82.5rem] mx-auto">
        <Reveal className="mb-8 sm:mb-10">
          <div>
            <span className="font-mono text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-[0.1em]">
              // MORE SELECTED WORK
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tighter text-ink mt-2">
              Explore other case studies.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {otherProjects.map((other) => {
            const otherTags = other.tags || (other.category ? other.category.split(',').map((s) => s.trim()) : []);
            const imgScale = (other as { imageScale?: number }).imageScale || 1;
            const imgPosition = (other as { imagePosition?: string }).imagePosition || 'center';

            return (
              <Link
                key={other.id}
                to={`/case-studies/${other.id}`}
                onMouseEnter={() => prefetchImages(getCaseStudyImages(other.id))}
              >
                <TiltCard className="bento-card p-3 sm:p-4 pb-6 sm:pb-8 group cursor-pointer h-full flex flex-col justify-between">
                  <div>
                    <div className={`w-full aspect-[4/3] ${other.bgColor || 'bg-gray-100'} rounded-lg sm:rounded-xl mb-4 sm:mb-6 overflow-hidden relative`}>
                      {other.image && (
                        <motion.div
                          className="absolute inset-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                        >
                          <ImageWithSkeleton
                            src={other.image}
                            alt={other.title}
                            loading="lazy"
                            containerClassName="h-full w-full"
                            className="h-full w-full object-cover object-top"
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
                          {otherTags.map((tag) => (
                            <Badge key={tag} variant={getTagVariant(tag)}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">{other.title}</h3>
                        {other.description && (
                          <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
                            {other.description}
                          </p>
                        )}
                      </div>
                      <div className="text-xs font-medium hidden sm:flex items-center gap-1 shrink-0 mt-1">
                        <Icon icon="solar:arrow-right-up-linear" width={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            );
          })}
        </div>
      </section>

      <CTA showGradient />
      <Footer />
    </main>
  );
}
