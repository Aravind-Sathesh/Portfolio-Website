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
  slug: string;
  title: string;
  tagline: string;
  cover_image_url: string | null;
  skills: string[];
  live_url: string | null;
  repo_url: string | null;
  is_featured: boolean;
  display_order: number;
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
          .select(
            'id, slug, title, tagline, cover_image_url, skills, live_url, repo_url, is_featured, display_order'
          )
          .eq('is_featured', true)
          .order('display_order', { ascending: true })
          .order('project_date', { ascending: false });

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
                className='border-gray-700/20 pt-0 dark:border-white/25 flex flex-col hover:border-primary/30 transition-all duration-300'
              >
                {project.cover_image_url && (
                  <div className='relative h-48 sm:h-56 md:h-72 overflow-hidden mx-4 sm:mx-6 mt-4 sm:mt-6 rounded-lg border border-gray-700/20 dark:border-white/25'>
                    <Image
                      src={project.cover_image_url}
                      alt={project.title}
                      fill
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center top',
                      }}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className='text-2xl truncate'>
                    {project.title}
                  </CardTitle>
                  <p className='text-muted-foreground truncate pt-1'>
                    {project.tagline}
                  </p>
                </CardHeader>
                <CardContent className='flex-1 flex flex-col'>
                  <div className='mb-6 -mx-6 px-6 sm:mx-0 sm:px-0'>
                    <div className='flex sm:flex-wrap gap-2 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 scrollbar-hide'>
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className='text-sm bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full backdrop-blur-sm whitespace-nowrap shrink-0'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='flex flex-col sm:flex-row gap-3'>
                    {/* First row on mobile: Code and Details side by side */}
                    <div className='flex gap-3 sm:contents'>
                      {project.repo_url && (
                        <Button
                          variant='outline'
                          size='lg'
                          asChild
                          className='flex-1 sm:flex-none backdrop-blur-sm'
                        >
                          <a
                            href={project.repo_url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Github className='h-4 w-4 mr-2' />
                            Code
                          </a>
                        </Button>
                      )}
                      <Button
                        variant='default'
                        size='lg'
                        asChild
                        className='flex-1 sm:flex-none sm:ml-auto backdrop-blur-sm'
                      >
                        <Link href={`/projects/${project.slug}`}>
                          View Details
                          <ArrowRight className='h-4 w-4 ml-2' />
                        </Link>
                      </Button>
                    </div>

                    {/* Second row on mobile: Live Deployment full width */}
                    {project.live_url && (
                      <Button
                        variant='outline'
                        size='lg'
                        asChild
                        className='w-full sm:w-auto backdrop-blur-sm'
                      >
                        <a
                          href={project.live_url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <ExternalLink className='h-4 w-4 mr-2' />
                          Live Deployment
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
