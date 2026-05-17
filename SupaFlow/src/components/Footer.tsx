import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import content from '@/data/content.json';

export default function Footer() {
  const { footer, brand } = content;

  return (
    <footer className="bg-surface pt-16 sm:pt-20 border-t border-black/5 relative overflow-hidden px-5 sm:px-8 lg:px-12">
      <div className="max-w-[82.5rem] mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-16 sm:mb-20 relative z-10">
        <div className="col-span-2 sm:col-span-2 lg:col-span-1">
          <div className="text-2xl font-semibold tracking-tighter mb-3 sm:mb-4">{brand.name}</div>
          <p className="text-sm text-gray-500 max-w-[15rem] mb-6">
            {brand.footerTagline}
          </p>
        </div>

        <nav aria-label="Services" className="col-span-1 flex flex-col gap-2.5 sm:gap-3">
          <div className="font-mono text-[0.6rem] sm:text-xs text-gray-400 uppercase tracking-widest mb-1 sm:mb-2">Services</div>
          {footer.services.map((link) => (
            <a key={link.label} href="#services" className={`text-sm font-medium ${link.hoverColor} transition-colors hover:scale-105 transition-transform w-fit`}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav aria-label="Company" className="col-span-1 flex flex-col gap-2.5 sm:gap-3">
          <div className="font-mono text-[0.6rem] sm:text-xs text-gray-400 uppercase tracking-widest mb-1 sm:mb-2">Company</div>
          {footer.company.map((link) => (
            link.href.startsWith('/') ? (
              <Link key={link.label} to={link.href} className="text-sm font-medium hover:text-black transition-colors hover:scale-105 transition-transform w-fit">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className="text-sm font-medium hover:text-black transition-colors hover:scale-105 transition-transform w-fit">
                {link.label}
              </a>
            )
          ))}
        </nav>

        <nav aria-label="Social media" className="col-span-1 flex flex-col gap-2.5 sm:gap-3">
          <div className="font-mono text-[0.6rem] sm:text-xs text-gray-400 uppercase tracking-widest mb-1 sm:mb-2">Connect</div>
          {footer.social.map((link) => (
            <a key={link.label} href={link.url} rel="noopener noreferrer" target="_blank" className="text-sm font-medium hover:text-black transition-colors hover:scale-105 transition-transform w-fit flex items-center gap-2">
              {link.label} <Icon icon="solar:arrow-right-up-linear" width={14} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>

      <div className="w-full relative z-10 border-t border-black/5 py-5 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <div className="font-mono text-[0.55rem] sm:text-[0.6rem] text-gray-400 uppercase tracking-widest">
          {brand.copyright}
        </div>
        <div className="font-mono text-[0.55rem] sm:text-[0.6rem] text-gray-400 uppercase tracking-widest flex gap-4">
          <Link to="/privacy" className="hover:text-black hover:scale-105 transition-transform">Privacy</Link>
          <Link to="/terms" className="hover:text-black hover:scale-105 transition-transform">Terms</Link>
        </div>
      </div>

      <div className="relative w-full overflow-hidden flex justify-center z-0 select-none pointer-events-none opacity-5" aria-hidden="true">
        <span
          className="text-[20vw] font-bold tracking-tighter leading-none whitespace-nowrap text-transparent block"
          style={{ WebkitTextStroke: '2px #1A1A1A' }}
        >
          {brand.footerWatermark}
        </span>
      </div>
    </footer>
  );
}
