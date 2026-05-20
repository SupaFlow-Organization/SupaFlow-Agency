import { Icon } from '@iconify/react';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { Reveal, StaggerReveal, StaggerItem, TiltCard } from '../lib/motion';
import content from '@/data/content.json';

export default function Services() {
  const { services } = content;

  return (
    <section id="services" className="py-20 sm:py-32 px-5 sm:px-8 lg:px-12 bg-surface">
      <div className="max-w-[82.5rem] mx-auto">
        <Reveal className="mb-12 sm:mb-16">
          <span className="font-mono text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-[0.1em]">
            {services.label}
          </span>
          <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-semibold tracking-tight mt-3 sm:mt-4">
            {services.heading}
          </h2>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:auto-rows-[20rem]">
          <StaggerItem className="col-span-1 md:col-span-2 lg:col-span-2 md:row-span-2">
            <TiltCard className="bento-card h-full p-6 sm:p-8 flex flex-col group overflow-hidden relative">
              <div className="z-10">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight mb-2">
                  {services.items[0].title}
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  {services.items[0].description}
                </p>
              </div>
              <div className="flex-grow flex items-center justify-center mt-6 sm:mt-8">
                <div className="w-full h-[180px] sm:h-[200px] md:h-full relative overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] group-hover:scale-[1.02] transition-transform duration-700">
                  <ImageWithSkeleton
                    src={services.items[0].image}
                    alt={services.items[0].title}
                    loading="lazy"
                    containerClassName="absolute inset-0"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TiltCard>
          </StaggerItem>

          <StaggerItem className="col-span-1 md:col-span-2 lg:col-span-2 md:row-span-2">
            <TiltCard className="bento-card h-full p-6 sm:p-8 flex flex-col group bg-surface-muted overflow-hidden relative">
              <div className="z-10">
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2">
                  {services.items[1].title}
                </h3>
                <p className="text-sm text-gray-500">
                  {services.items[1].description}
                </p>
              </div>
              <div className="flex-grow flex items-center justify-center mt-6 sm:mt-8">
                <div className="w-full h-[180px] sm:h-[200px] md:h-full relative overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] group-hover:scale-[1.02] transition-transform duration-700">
                  <ImageWithSkeleton
                    src={services.items[1].image}
                    alt={services.items[1].title}
                    loading="lazy"
                    containerClassName="absolute inset-0"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TiltCard>
          </StaggerItem>

          <StaggerItem className="col-span-1 md:col-span-2 lg:col-span-2">
            <TiltCard className="bento-card h-full p-6 sm:p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center group overflow-hidden relative min-h-[14rem] sm:min-h-0">
              <div className="z-10 max-w-[14rem]">
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2">
                  {services.items[2].title}
                </h3>
                <p className="text-sm text-gray-500">
                  {services.items[2].description}
                </p>
              </div>
              <div className="absolute right-[-10%] top-[45%] sm:top-[20%] w-[65%] sm:w-[60%] h-[55%] sm:h-[120%]">
                <div className="w-full h-full bg-white rounded-tl-xl border-t border-l border-black/10 shadow-lg p-3 flex flex-col group-hover:-translate-x-6 group-hover:translate-y-2 group-hover:-rotate-2 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom-right">
                  <div className="flex gap-2 mb-3 border-b border-black/5 pb-3">
                    <div className="w-3 h-3 rounded-full bg-black/10 transition-colors group-hover:bg-brand-orange/60" />
                    <div className="w-16 h-3 rounded bg-black/5" />
                  </div>
                  <div className="w-full flex-1 rounded-md overflow-hidden relative bg-gray-50 border border-black/5">
                    <ImageWithSkeleton
                      src={services.items[2].image}
                      alt={services.items[2].title}
                      loading="lazy"
                      containerClassName="absolute inset-0"
                      className="w-full h-full object-cover object-left-top group-hover:scale-105 transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                    />
                  </div>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>

          <StaggerItem className="col-span-1 min-h-[16rem] md:min-h-0">
            <TiltCard className="bento-card h-full p-0 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <ImageWithSkeleton
                  src={services.items[3].image}
                  alt={services.items[3].title}
                  loading="lazy"
                  containerClassName="absolute inset-0"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between h-full">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white mb-4 group-hover:-translate-y-1 transition-transform duration-500">
                  <Icon icon={services.items[3].icon!} width={20} />
                </div>
                <div className="mt-auto">
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    {services.items[3].title}
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    {services.items[3].description}
                  </p>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>

          <StaggerItem className="col-span-1 min-h-[16rem] md:min-h-0">
            <TiltCard className="bento-card h-full p-0 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <ImageWithSkeleton
                  src={services.items[4].image}
                  alt={services.items[4].title}
                  loading="lazy"
                  containerClassName="absolute inset-0"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between h-full">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white mb-4 group-hover:-translate-y-1 transition-transform duration-500">
                  <Icon icon={services.items[4].icon!} width={20} />
                </div>
                <div className="mt-auto">
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    {services.items[4].title}
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    {services.items[4].description}
                  </p>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </section>
  );
}
