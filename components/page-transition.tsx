'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PageTransition() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');

    if (hasLoadedBefore) {
      setIsVisible(false);
      setHasLoaded(true);
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem('hasLoadedBefore', 'true');
      setIsVisible(false);
      setHasLoaded(true);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  if (hasLoaded && !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='fixed inset-0 z-100 flex items-center justify-center bg-background'
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className='relative w-full h-full overflow-hidden'>
            {/* Single clean sweep */}
            <motion.div
              className='absolute inset-0 bg-primary/5'
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
              }}
            />

            {/* Center symbol */}
            <motion.div
              className='absolute inset-0 flex items-center justify-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className='text-5xl font-mono font-bold text-foreground/15'>
                {'{ }'}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
