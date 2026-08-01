'use client';

import * as React from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export type ImageWithSkeletonProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  containerClassName?: string;
  skeletonClassName?: string;
};

export function ImageWithSkeleton({
  className,
  containerClassName,
  skeletonClassName,
  alt = '',
  src,
  onLoad,
  onError,
  ...props
}: ImageWithSkeletonProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [skeletonVisible, setSkeletonVisible] = useState(true);

  useLayoutEffect(() => {
    setLoaded(false);
    setError(false);
    setSkeletonVisible(true);
  }, [src]);

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
      setSkeletonVisible(false);
    }
  }, [src]);

  useLayoutEffect(() => {
    if (loaded || error) {
      // Hide skeleton instantly if preloaded, or brief fade if newly loaded
      setSkeletonVisible(false);
    }
  }, [loaded, error]);

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {skeletonVisible && (
        <Skeleton
          variant="media"
          className={cn(
            'absolute inset-0 z-[1] min-h-full min-w-full rounded-none transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            (loaded || error) && 'opacity-0',
            skeletonClassName
          )}
          aria-hidden
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={cn(
          className,
          'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          !loaded ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setError(true);
          onError?.(event);
        }}
        {...props}
      />
    </div>
  );
}
