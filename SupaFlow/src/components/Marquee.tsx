import content from '@/data/content.json';

function MarqueeContent({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="marquee-content font-mono text-xs tracking-[0.1em]" aria-hidden={duplicate}>
      {content.marquee.map((item, i) => (
        <span key={i}>
          <span>{item}</span>
          <span className="mx-2" aria-hidden="true">•</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="w-full bg-ink text-white/70 py-4 border-y border-white/10 relative z-20" role="marquee" aria-label="Services offered">
      <div className="marquee-container">
        <MarqueeContent />
        <MarqueeContent duplicate />
      </div>
    </div>
  );
}
