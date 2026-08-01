import { useEffect, useRef, type RefObject } from 'react';

/**
 * Hook that triggers IntersectionObserver-based scroll reveal.
 * Adds 'is-visible' class to elements with 'reveal-text' class.
 */
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.reveal-text');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef]);
}

/**
 * Hook for custom cursor logic.
 * Handles dot/outline movement and hover/view states.
 */
export function useCustomCursor() {
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const dot = document.querySelector<HTMLElement>('.cursor-dot');
    const outline = document.querySelector<HTMLElement>('.cursor-outline');
    if (!dot || !outline) return;

    const handleMouseMove = (e: MouseEvent) => {
      dot.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      outline.animate(
        {
          transform: `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`,
        },
        { duration: 200, fill: 'forwards', easing: 'ease-out' }
      );

      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (target) {
        const isDark = target.closest('.dark-section, .bg-ink, [class*="bg-ink"], [class*="bg-black"], [class*="bg-zinc-900"]');
        if (isDark) {
          document.body.classList.add('cursor-light');
        } else {
          document.body.classList.remove('cursor-light');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const hideZones = document.querySelectorAll('.cursor-hide-zone');
    const hideCursor = () => document.body.classList.add('cursor-hidden');
    const showCursor = () => document.body.classList.remove('cursor-hidden');

    hideZones.forEach((zone) => {
      zone.addEventListener('mouseenter', hideCursor);
      zone.addEventListener('mouseleave', showCursor);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      hideZones.forEach((zone) => {
        zone.removeEventListener('mouseenter', hideCursor);
        zone.removeEventListener('mouseleave', showCursor);
      });
    };
  }, []);
}

/**
 * Hook for magnetic button effect on desktop.
 */
export function useMagneticButtons() {
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const buttons = document.querySelectorAll<HTMLElement>('.magnetic');

    const handlers = new Map<HTMLElement, { move: (e: MouseEvent) => void; leave: () => void }>();

    buttons.forEach((btn) => {
      const move = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const tx = x * 0.2;
        const ty = y * 0.2;
        btn.style.transform = `translate(${tx}px, ${ty}px) scale(1.05)`;
      };

      const leave = () => {
        btn.style.transform = `translate(0px, 0px) scale(1)`;
      };

      btn.addEventListener('mousemove', move);
      btn.addEventListener('mouseleave', leave);
      handlers.set(btn, { move, leave });
    });

    return () => {
      handlers.forEach(({ move, leave }, btn) => {
        btn.removeEventListener('mousemove', move);
        btn.removeEventListener('mouseleave', leave);
      });
    };
  }, []);
}

/**
 * Hook for bento card 3D tilt effect on desktop.
 */
export function useBentoTilt() {
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const cards = document.querySelectorAll<HTMLElement>('.interactive-bento');

    const handlers = new Map<HTMLElement, { move: (e: MouseEvent) => void; leave: () => void }>();

    cards.forEach((card) => {
      const move = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        const inners = card.querySelectorAll<HTMLElement>('.bento-inner');
        inners.forEach((inner) => {
          inner.style.transform = `translateZ(30px) translateX(${rotateY * -0.5}px) translateY(${rotateX * 0.5}px)`;
        });
      };

      const leave = () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        const inners = card.querySelectorAll<HTMLElement>('.bento-inner');
        inners.forEach((inner) => {
          inner.style.transform = `translateZ(30px) translateX(0) translateY(0)`;
        });
      };

      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      handlers.set(card, { move, leave });
    });

    return () => {
      handlers.forEach(({ move, leave }, card) => {
        card.removeEventListener('mousemove', move);
        card.removeEventListener('mouseleave', leave);
      });
    };
  }, []);
}

/**
 * Hook for horizontal scroll section.
 */
export function useHorizontalScroll() {
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const wrapper = document.querySelector<HTMLElement>('.horizontal-scroll-wrapper');
    const track = document.querySelector<HTMLElement>('.horizontal-scroll-track');
    if (!wrapper || !track) return;

    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const maxScroll = wrapper.offsetHeight - window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        let progress = Math.abs(rect.top) / maxScroll;
        progress = Math.max(0, Math.min(1, progress));
        const maxTranslate = track.scrollWidth - window.innerWidth;
        track.style.transform = `translate3d(-${progress * maxTranslate}px, 0, 0)`;
      } else if (rect.top > 0) {
        track.style.transform = `translate3d(0, 0, 0)`;
      } else if (rect.bottom < window.innerHeight) {
        const maxTranslate = track.scrollWidth - window.innerWidth;
        track.style.transform = `translate3d(-${maxTranslate}px, 0, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

/**
 * Hook for sticky nav glassmorphism effect.
 */
export function useStickyNav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        nav.style.backdropFilter = 'blur(16px)';
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.05)';
      } else {
        nav.style.backdropFilter = '';
        nav.style.backgroundColor = '';
        nav.style.borderBottom = '';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return navRef;
}

/**
 * Hook for Lenis smooth scroll initialization.
 */
export function useLenisScroll() {
  useEffect(() => {
    let lenisInstance: InstanceType<typeof import('lenis').default> | null = null;

    const initLenis = async () => {
      const { default: Lenis } = await import('lenis');

      // Don't initialize on touch devices < 768px
      if (window.innerWidth < 768 && matchMedia('(pointer: coarse)').matches) {
        return;
      }

      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenisInstance?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      lenisInstance?.destroy();
    };
  }, []);
}
