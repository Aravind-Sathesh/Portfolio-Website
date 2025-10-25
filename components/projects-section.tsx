'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id='projects' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-4xl font-bold text-foreground mb-12 text-center'>
          Personal Projects
        </h2>

        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className='border-gray-700/20 dark:border-white/25'>
                <div className='relative h-72 mx-6 rounded-lg overflow-hidden'>
                  <Skeleton className='w-full h-full' />
                </div>
                <CardHeader>
                  <Skeleton className='h-8 w-3/4' />
                </CardHeader>
                <CardContent className='space-y-4'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-5/6' />
                  <div className='flex gap-2'>
                    <Skeleton className='h-7 w-20' />
                    <Skeleton className='h-7 w-24' />
                    <Skeleton className='h-7 w-16' />
                  </div>
                  <div className='flex gap-3 pt-2'>
                    <Skeleton className='h-10 flex-1' />
                    <Skeleton className='h-10 w-32' />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {projects.map((project) => (
              <Card
                key={project.id}
                className='border-gray-700/20 dark:border-white/25 flex flex-col hover:border-primary/30 transition-all duration-300 overflow-hidden'
              >
                {project.image_url && (
                  <div className='relative h-72 overflow-hidden mx-6 rounded-lg border border-gray-700/20 dark:border-white/25'>
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center top',
                      }}
                    />
                  </div>
                )}
                <CardHeader className='-mb-4'>
                  <CardTitle className='text-2xl'>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className='flex-1 flex flex-col'>
                  <p className='text-base text-muted-foreground mb-6 flex-1 leading-relaxed'>
                    {project.description}
                  </p>
                  <div className='mb-6'>
                    <div className='flex flex-wrap gap-2'>
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className='text-sm bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full backdrop-blur-sm'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='flex gap-3'>
                    <Button
                      variant='outline'
                      size='lg'
                      asChild
                      className='flex-1 backdrop-blur-sm'
                    >
                      <Link href={`/projects/${project.id}`}>
                        <ArrowRight className='h-4 w-4 mr-2' />
                        View Details
                      </Link>
                    </Button>
                    {project.live_url && (
                      <Button
                        variant='outline'
                        size='lg'
                        asChild
                        className='backdrop-blur-sm'
                      >
                        <a
                          href={project.live_url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Check it out <ExternalLink className='h-5 w-5' />
                        </a>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button
                        variant='outline'
                        size='lg'
                        asChild
                        className='backdrop-blur-sm'
                      >
                        <a
                          href={project.github_url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Github className='h-5 w-5' />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
