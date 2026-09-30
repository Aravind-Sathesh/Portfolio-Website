import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/content';

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id='projects' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-4xl font-bold text-foreground mb-12 text-center'>
          Personal Projects
        </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {projects.map((project) => (
              <Card
                key={project.slug}
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
      </div>
    </section>
  );
}
