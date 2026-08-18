import { useEffect } from 'react';
import content from '@/data/content.json';

const prefetchedUrls = new Set<string>();

/**
 * Prefetches a single image URL into browser cache.
 */
export function prefetchImage(src: string) {
  if (!src || prefetchedUrls.has(src)) return;
  prefetchedUrls.add(src);
  const img = new Image();
  img.src = src;
}

/**
 * Prefetches multiple image URLs in parallel.
 */
export function prefetchImages(srcs: string[]) {
  srcs.forEach((src) => {
    if (src) prefetchImage(src);
  });
}

/**
 * Returns all image URLs for a specific case study project ID.
 */
export function getCaseStudyImages(projectId: string): string[] {
  const project = content.work.featured.find((p) => p.id === projectId) || content.work.featured[0];
  
  if (projectId === '1') {
    return [
      '/images/arc/arc-1.png',
      '/images/arc/arc-2.png',
      '/images/arc/arc-3.png',
      '/images/arc-headphone.png'
    ];
  }

  if (projectId === '2') {
    return [
      '/images/elevate/elevate-1.png',
      '/images/elevate/elevate-2.png',
      '/images/elevate/eleveta-3.png',
      '/images/elevate-real-estate.png'
    ];
  }

  if (projectId === '3') {
    return [
      '/images/nexus/nexus-1.png',
      '/images/nexus/nexus-2.png',
      '/images/nexus/nexus-3.png'
    ];
  }

  if (projectId === '4') {
    return [
      '/images/elana/ev-1.png',
      '/images/elana/ev-2.png',
      '/images/elana/ev-3.png'
    ];
  }

  if (projectId === '5') {
    return [
      '/images/verdae/verdae-1.png',
      '/images/verdae/verdae-2.png',
      '/images/verdae/verdae-3.png'
    ];
  }

  if (projectId === '6') {
    return [
      '/images/luckycharm/lucky-1.png',
      '/images/luckycharm/lucky-2.png',
      '/images/luckycharm/lucky-3.png'
    ];
  }

  return [
    project.image || '/images/elevate-real-estate.png',
    '/images/arc-headphone.png'
  ];
}

/**
 * Hook to automatically prefetch all portfolio & case study images during idle browser time.
 */
export function useGlobalImagePrefetch() {
  useEffect(() => {
    const allImages: string[] = [];

    // Collect Work images
    content.work.featured.forEach((item) => {
      if (item.image) allImages.push(item.image);
    });

    // Collect Process Day images
    content.process.steps.forEach((step) => {
      if (step.image) allImages.push(step.image);
    });

    // Collect ARC case study images
    allImages.push('/images/arc/arc-1.png', '/images/arc/arc-2.png', '/images/arc/arc-3.png');

    // Collect Elevate case study images
    allImages.push('/images/elevate/elevate-1.png', '/images/elevate/elevate-2.png', '/images/elevate/eleveta-3.png');

    // Collect Nexus AI case study images
    allImages.push('/images/nexus/nexus-1.png', '/images/nexus/nexus-2.png', '/images/nexus/nexus-3.png');

    // Collect Luma Studio case study images
    allImages.push('/images/elana/ev-1.png', '/images/elana/ev-2.png', '/images/elana/ev-3.png');

    // Collect VERDAE case study images
    allImages.push('/images/verdae/verdae-1.png', '/images/verdae/verdae-2.png', '/images/verdae/verdae-3.png');

    // Collect Luckycharm case study images
    allImages.push('/images/luckycharm/lucky-1.png', '/images/luckycharm/lucky-2.png', '/images/luckycharm/lucky-3.png');

    const runPrefetch = () => {
      prefetchImages(allImages);
    };

    if ('requestIdleCallback' in window) {
      const id = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(runPrefetch);
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
        }
      };
    } else {
      const timeoutId = setTimeout(runPrefetch, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, []);
}
