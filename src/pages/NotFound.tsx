import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { springTransition, Magnetic } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import CustomCursor from '@/components/CustomCursor';
import { useCustomCursor } from '@/hooks/useInteractions';
import content from '@/data/content.json';

export default function NotFound() {
  useCustomCursor();

  return (
    <div className="min-h-[100dvh] bg-surface flex flex-col">
      <CustomCursor />
      <nav className="fixed top-0 left-0 w-full z-40 py-4 sm:py-6 flex justify-between items-center px-5 sm:px-8 lg:px-12 backdrop-blur-xl bg-white/80 border-b border-black/5">
        <Link to="/" className="text-xl font-semibold tracking-tighter text-ink hover:scale-105 transition-transform">
          {content.brand.name}
        </Link>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="max-w-lg"
        >
          <span className="font-mono text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-[0.1em]">
            // ERROR 404
          </span>
          <h1 className="text-[clamp(4rem,15vw,10rem)] font-semibold tracking-tighter leading-none mt-2 text-ink">
            4<span className="text-gradient">0</span>4
          </h1>
          <p className="text-gray-600 leading-relaxed text-base sm:text-lg mt-4 mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="block w-fit mx-auto">
            <Magnetic strength={0.15}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={springTransition}>
                <Button asChild>
                  <Link to="/">
                    <Icon icon="solar:arrow-left-linear" width={14} />
                    Back to home
                  </Link>
                </Button>
              </motion.div>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
