import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import content from '@/data/content.json';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Gather all critical site images for preloading
  const imagesToLoad = useMemo(() => {
    const urls: string[] = [
      '/images/profile-pic.jpg',
      // Services section images
      ...content.services.items.map((item) => item.image).filter(Boolean),
      // Work featured items
      ...content.work.featured.map((item) => item.image).filter(Boolean),
      // Process step images
      ...content.process.steps.map((step) => step.image).filter(Boolean),
      // Testimonial avatars
      ...content.testimonials.list.map((item) => item.avatar).filter(Boolean),
    ];

    // Deduplicate
    return Array.from(new Set(urls));
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    let isCancelled = false;
    const total = imagesToLoad.length;

    if (total === 0) {
      setProgress(100);
      return;
    }

    const loadSingleImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        const finish = () => {
          if (!isCancelled) {
            loadedCount++;
            const currentPct = Math.min(100, Math.round((loadedCount / total) * 100));
            setProgress(currentPct);
          }
          resolve();
        };

        img.onload = async () => {
          try {
            if ('decode' in img) {
              await img.decode();
            }
          } catch {
            // Ignore decode error fallback
          }
          finish();
        };
        img.onerror = finish;
        img.src = src;
      });
    };

    Promise.all(imagesToLoad.map(loadSingleImage)).then(() => {
      if (!isCancelled) {
        setProgress(100);
      }
    });

    // Fallback timer: 10s max for extreme slow network
    const timer = setTimeout(() => {
      if (!isCancelled) {
        setProgress(100);
      }
    }, 10000);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [imagesToLoad]);

  // Smoothly interpolate displayProgress towards actual progress
  useEffect(() => {
    let animationFrameId: number;

    const animateProgress = () => {
      setDisplayProgress((prev) => {
        if (prev < progress) {
          const next = prev + Math.max(1, Math.ceil((progress - prev) * 0.15));
          return next > 100 ? 100 : next;
        }
        return prev;
      });

      animationFrameId = requestAnimationFrame(animateProgress);
    };

    animationFrameId = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [progress]);

  // Trigger onComplete when displayProgress reaches 100%
  useEffect(() => {
    if (displayProgress >= 100) {
      const doneTimer = setTimeout(() => {
        onComplete();
      }, 350);
      return () => clearTimeout(doneTimer);
    }
  }, [displayProgress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAFAFC] text-ink overflow-hidden cursor-wait"
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1"
        >
          <span className="font-sans text-2xl sm:text-3xl font-semibold tracking-tighter text-ink">
            {content.brand.name}<span className="text-pink-500">.</span>
          </span>
        </motion.div>

        {/* Minimal Progress Bar */}
        <div className="w-36 sm:w-48 h-[2px] bg-black/10 rounded-full overflow-hidden mt-6 relative">
          <motion.div
            className="h-full bg-ink rounded-full"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="font-mono text-xs text-ink/40 tracking-widest mt-3">
          {displayProgress}%
        </div>
      </div>
    </motion.div>
  );
}
