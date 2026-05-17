import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

export function useMobile(breakpoint: number = 768) {
  return useSyncExternalStore(
    subscribe,
    () => window.innerWidth < breakpoint,
    () => false
  );
}
