'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className='relative group'>
      <div className='overflow-hidden rounded-lg' ref={emblaRef}>
        <div className='flex'>
          {images.map((imageUrl, index) => (
            <div key={index} className='flex-[0_0_100%] min-w-0'>
              <div className='relative w-full h-[600px] md:h-[700px] bg-muted/5 flex items-center justify-center'>
                <Image
                  src={imageUrl}
                  alt={`${projectTitle} screenshot ${index + 1}`}
                  fill
                  className='object-contain'
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <Button
            variant='ghost'
            size='icon'
            className='absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
            onClick={scrollPrev}
          >
            <ChevronLeft className='h-6 w-6' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
            onClick={scrollNext}
          >
            <ChevronRight className='h-6 w-6' />
          </Button>
        </>
      )}
    </div>
  );
}
