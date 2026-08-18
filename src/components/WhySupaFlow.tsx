import { Icon } from '@iconify/react';
import { Reveal, StaggerReveal, StaggerItem } from '../lib/motion';

const pillars = [
  {
    number: '01',
    icon: 'solar:rocket-2-linear',
    iconColor: '#FF6B35',
    tag: 'Speed',
    title: 'Built for businesses that move fast.',
    body: "Your business doesn't stop while an agency spends three months perfecting a homepage. Our process has been refined through more than 100 launches to remove delays without compromising strategy, craftsmanship, or quality.",
    highlight: "You launch faster because we've already solved the problems that slow most projects down.",
    dark: false,
  },
  {
    number: '02',
    icon: 'solar:shield-check-linear',
    iconColor: '#FF1F8F',
    tag: 'Trust',
    title: 'Designed to earn trust before your first conversation.',
    body: 'People decide whether they trust your business long before they speak to you. Every layout, headline, interaction, and animation is intentionally designed to make that decision easier.',
    highlight: "Beautiful websites don't grow businesses. Trusted ones do.",
    dark: true,
  },
  {
    number: '03',
    icon: 'solar:chart-2-linear',
    iconColor: '#7B2CBF',
    tag: 'Value',
    title: 'Built like a business asset, not a design project.',
    body: "A website shouldn't just win design awards. It should generate enquiries, support sales, increase credibility, and reduce friction.",
    highlight: 'And continue working long after launch. That\'s exactly what we build.',
    dark: false,
  },
];

export default function WhySupaFlow() {
  return (
    <section className="py-20 sm:py-32 bg-white border-t border-black/5 px-5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-[82.5rem] mx-auto">

        {/* Header */}
        <Reveal className="mb-16 sm:mb-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <span className="font-mono text-[0.65rem] sm:text-xs text-gray-400 uppercase tracking-[0.15em] mb-4 block">
              03 / Why SupaFlow
            </span>
            <h2 className="text-[clamp(2.4rem,5.5vw,5rem)] font-semibold tracking-tight leading-[1.0]">
              Three promises.<br />
              <span className="text-gray-400">Every project.</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm sm:text-base max-w-xs leading-relaxed sm:text-right">
            Same standards. Every engagement.
            <br />No exceptions, no excuses.
          </p>
        </Reveal>

        {/* Pillars */}
        <StaggerReveal className="flex flex-col gap-4 sm:gap-5">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.number}>
              <div
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${pillar.dark
                  ? 'bg-ink text-white'
                  : 'bg-surface-muted border border-black/[0.06]'
                  }`}
                onMouseEnter={(e) => {
                  const num = e.currentTarget.querySelector('.num-target') as HTMLElement;
                  if (num) num.style.color = pillar.iconColor;
                }}
                onMouseLeave={(e) => {
                  const num = e.currentTarget.querySelector('.num-target') as HTMLElement;
                  if (num) num.style.color = pillar.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
                }}
              >
                <div className="relative z-10 p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-center">

                  {/* Left column */}
                  <div className="flex flex-col gap-5">
                    {/* Tag + number row */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.65rem] font-mono uppercase tracking-widest ${pillar.dark ? 'bg-white/10 text-white/70' : 'bg-black/[0.06] text-gray-500'
                          }`}
                      >
                        <Icon icon={pillar.icon} width={12} style={{ color: pillar.iconColor }} />
                        {pillar.tag}
                      </span>
                    </div>

                    {/* Big number */}
                    <span
                      className="num-target font-mono text-[5rem] sm:text-[7rem] font-bold leading-none select-none transition-colors duration-500"
                      style={{ color: pillar.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }}
                    >
                      {pillar.number}
                    </span>
                  </div>

                  {/* Right column */}
                  <div className="flex flex-col gap-5 lg:gap-6">
                    <h3
                      className={`text-[clamp(1.4rem,3vw,2.4rem)] font-semibold tracking-tight leading-[1.1] ${pillar.dark ? 'text-white' : 'text-ink'
                        }`}
                    >
                      {pillar.title}
                    </h3>

                    <p className={`text-sm sm:text-base leading-relaxed ${pillar.dark ? 'text-white/60' : 'text-gray-500'}`}>
                      {pillar.body}
                    </p>

                    {/* Highlight bar */}
                    <div
                      className={`mt-2 pl-4 border-l-2 ${pillar.dark ? 'border-white/20' : 'border-black/15'
                        }`}
                      style={{ borderColor: pillar.iconColor + '60' }}
                    >
                      <p
                        className={`text-sm sm:text-[0.95rem] font-medium leading-relaxed italic ${pillar.dark ? 'text-white/80' : 'text-ink'
                          }`}
                      >
                        {pillar.highlight}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subtle gradient orb for dark card */}
                {pillar.dark && (
                  <div
                    className="absolute top-0 right-0 w-[40%] h-full opacity-20 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at top right, ${pillar.iconColor}55 0%, transparent 70%)`,
                    }}
                  />
                )}

                {/* Hover glow accent for light cards */}
                {!pillar.dark && (
                  <div
                    className="absolute bottom-0 right-0 w-[30%] h-[60%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at bottom right, ${pillar.iconColor}20 0%, transparent 70%)`,
                    }}
                  />
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
