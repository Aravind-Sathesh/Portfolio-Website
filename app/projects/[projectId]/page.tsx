import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { DotsBackground } from '@/components/dots-background';
import { ProjectGallery } from '@/components/project-gallery';

interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  cover_image_url: string | null;
  skills: string[];
  description_markdown: string | null;
  gallery_image_urls: string[];
  live_url: string | null;
  repo_url: string | null;
  project_date: string;
  status: string;
  category: string;
  is_featured: boolean;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', projectId)
    .single();

  return {
    title: project?.title
      ? `${project.title} - Aravind Sathesh`
      : 'Project - Aravind Sathesh',
    description: project?.tagline || 'Project details',
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', projectId)
    .single();

  if (error || !project) {
    notFound();
  }

  const typedProject = project as Project;

  // Format the date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  // Combine cover image with gallery images for carousel
  const allImages = [
    ...(typedProject.cover_image_url ? [typedProject.cover_image_url] : []),
    ...(typedProject.gallery_image_urls || []),
  ];

  return (
    <main className='min-h-screen bg-background text-foreground'>
      <DotsBackground />
      <Navbar />

      <div className='pt-24 pb-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Back button */}
          <Link href='/#projects'>
            <Button variant='ghost' className='mb-8'>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to Projects
            </Button>
          </Link>

          {/* Project header */}
          <div className='mb-12'>
            <h1 className='text-5xl font-bold text-foreground mb-4'>
              {typedProject.title}
            </h1>
            <p className='text-xl text-muted-foreground mb-4'>
              {typedProject.tagline}
            </p>
            <div className='flex items-center gap-2 text-sm text-muted-foreground mb-6'>
              <Calendar className='h-4 w-4' />
              <span>{formatDate(typedProject.project_date)}</span>
              <span className='mx-2'>•</span>
              <span className='capitalize'>
                {typedProject.status.replace('_', ' ')}
              </span>
            </div>

            {/* Image Carousel */}
            {allImages.length > 0 && (
              <div className='mb-8'>
                <ProjectGallery
                  images={allImages}
                  projectTitle={typedProject.title}
                />
              </div>
            )}

            {/* Action buttons */}
            <div className='flex gap-3 flex-wrap'>
              {typedProject.repo_url && (
                <Button asChild>
                  <a
                    href={typedProject.repo_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Github className='h-4 w-4 mr-2' />
                    View Code
                  </a>
                </Button>
              )}
              {typedProject.live_url && (
                <Button asChild variant='outline'>
                  <a
                    href={typedProject.live_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <ExternalLink className='h-4 w-4 mr-2' />
                    Live Deployment
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Skills/Technologies */}
          <Card className='mb-12 border-border'>
            <CardHeader>
              <CardTitle>Technologies & Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-2'>
                {typedProject.skills.map((skill) => (
                  <span
                    key={skill}
                    className='bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Markdown description */}
          {typedProject.description_markdown && (
            <Card className='mb-12 border-border'>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground'>
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className='text-3xl font-bold mt-8 mb-4'>
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className='text-2xl font-bold mt-6 mb-3'>
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className='text-xl font-semibold mt-5 mb-2'>
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className='mb-4 leading-relaxed'>{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className='mb-4 ml-6 list-disc space-y-2'>
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className='mb-4 ml-6 list-decimal space-y-2'>
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className='leading-relaxed'>{children}</li>
                      ),
                      code: ({ children }) => (
                        <code className='bg-primary/10 text-primary px-1.5 py-0.5 rounded text-sm'>
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre className='bg-muted p-4 rounded-lg overflow-x-auto mb-4'>
                          {children}
                        </pre>
                      ),
                    }}
                  >
                    {typedProject.description_markdown}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
