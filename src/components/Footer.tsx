import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Reveal, StaggerReveal, StaggerItem } from '../lib/motion';
import content from '@/data/content.json';

export default function Footer() {
  const { footer, brand } = content;

  return (
    <footer className="bg-ink pt-16 sm:pt-20 border-t border-white/5 relative overflow-hidden px-5 sm:px-8 lg:px-12">
      <StaggerReveal className="max-w-[82.5rem] mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-16 sm:mb-20 relative z-10">
        <StaggerItem className="col-span-2 sm:col-span-2 lg:col-span-1">
          <div className="text-2xl font-semibold tracking-tighter mb-3 sm:mb-4 text-white">{brand.name}<span className="text-pink-500">.</span></div>
          <p className="text-sm text-gray-400 max-w-[15rem] mb-6">
            We launch websites in days.<br />Not months.
          </p>
        </StaggerItem>

        <StaggerItem>
          <nav aria-label="Services" className="col-span-1 flex flex-col gap-2.5 sm:gap-3">
            <div className="font-mono text-[0.6rem] sm:text-xs text-gray-500 uppercase tracking-widest mb-1 sm:mb-2">Services</div>
            {footer.services.map((link) => (
              <Link key={link.label} to="/#services" className={`text-sm font-medium text-gray-300 ${link.hoverColor} transition-colors hover:scale-105 transition-transform w-fit`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </StaggerItem>

        <StaggerItem>
          <nav aria-label="Company" className="col-span-1 flex flex-col gap-2.5 sm:gap-3">
            <div className="font-mono text-[0.6rem] sm:text-xs text-gray-500 uppercase tracking-widest mb-1 sm:mb-2">Company</div>
            {footer.company.map((link) => (
              <Link key={link.label} to={link.href} className={`text-sm font-medium text-gray-300 ${link.hoverColor || 'hover:text-white'} transition-colors hover:scale-105 transition-transform w-fit`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </StaggerItem>

        <StaggerItem>
          <nav aria-label="Social media" className="col-span-1 flex flex-col gap-2.5 sm:gap-3">
            <div className="font-mono text-[0.6rem] sm:text-xs text-gray-500 uppercase tracking-widest mb-1 sm:mb-2">Connect</div>
            {footer.social.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm font-medium text-gray-300 ${link.hoverColor || 'hover:text-white'} transition-colors hover:scale-105 transition-transform w-fit group`}>
                <Icon icon="solar:arrow-right-up-linear" width={14} aria-hidden="true" />
                {link.label}
              </a>
            ))}
          </nav>
        </StaggerItem>
      </StaggerReveal>

      <Reveal className="max-w-[82.5rem] mx-auto pt-6 pb-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </Reveal>

      <div className="relative w-full overflow-hidden flex justify-center z-0 select-none pointer-events-none opacity-[0.03]" aria-hidden="true">
        <span
          className="text-[20vw] font-bold tracking-tighter leading-none whitespace-nowrap text-transparent block"
          style={{ WebkitTextStroke: '2px #FFFFFF' }}
        >
          {brand.footerWatermark}
        </span>
      </div>
    </footer>
  );
}
