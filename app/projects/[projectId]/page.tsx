import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { DotsBackground } from '@/components/dots-background';

interface Project {
  id: string;
  title: string;
  description: string;
  long_description: string | null;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  created_at: string;
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
    .eq('id', projectId)
    .single();

  return {
    title: project?.title
      ? `${project.title} - Aravind Sathesh`
      : 'Project - Aravind Sathesh',
    description: project?.description || 'Project details',
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
    .eq('id', projectId)
    .single();

  if (error || !project) {
    notFound();
  }

  const typedProject = project as Project;

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
            <p className='text-xl text-muted-foreground mb-6'>
              {typedProject.description}
            </p>
            {/* Project image */}
            {typedProject.image_url && (
              <div className='relative mb-8 overflow-hidden rounded-lg border border-gray-700/20 dark:border-white/5'>
                <Image
                  src={typedProject.image_url}
                  alt={typedProject.title}
                  width={1280}
                  height={720}
                  className='w-full h-auto object-cover object-center'
                  priority
                />
              </div>
            )}
            {/* Action buttons */}
            <div className='flex gap-3 flex-wrap'>
              {typedProject.github_url && (
                <Button asChild>
                  <a
                    href={typedProject.github_url}
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

          {/* Technologies */}
          <Card className='mb-12 border-border'>
            <CardHeader>
              <CardTitle>Technologies Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-2'>
                {typedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className='bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Long description */}
          {typedProject.long_description && (
            <Card className='border-border'>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='prose prose-invert max-w-none'>
                  <p className='text-muted-foreground whitespace-pre-wrap'>
                    {typedProject.long_description}
                  </p>
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
