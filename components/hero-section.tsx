'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className='min-h-screen flex items-center justify-center pt-16'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <div className='mb-8 flex justify-center'>
          <div className='p-2 border-2 border-dashed border-gray-400 rounded-full animate-spin-slow'>
            <div className='relative w-48 h-48 sm:w-40 sm:h-40 lg:w-64 lg:h-64 rounded-full overflow-hidden animate-spin-reverse'>
              <Image
                src='/profile.jpg'
                alt='Profile photo'
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>
        </div>
        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-semibold font-mono tracking-tight antialiased text-foreground mb-4 text-balance'>
          Aravind Sathesh
        </h1>
        <h2 className='text-xl sm:text-2xl lg:text-3xl font-light text-foreground mb-6 text-balance uppercase'>
          Full-Stack Developer
        </h2>
        <p className='text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance'>
          Building scalable, reliable systems that power seamless experiences.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button
            size='lg'
            className='gap-2'
            onClick={() => scrollToSection('projects')}
          >
            View My Work
            <ArrowRight className='h-4 w-4' />
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='bg-background'
            onClick={() => scrollToSection('contact')}
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
