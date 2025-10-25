import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github } from 'lucide-react';

export function ContactSection() {
  return (
    <section id='contact' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='text-4xl font-bold text-foreground mb-6'>
          Let's Work Together
        </h2>
        <p className='text-lg text-muted-foreground mb-12 max-w-2xl mx-auto'>
          I'm always interested in hearing about new projects and opportunities.
          Feel free to reach out!
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button size='lg' asChild>
            <a href='mailto:aravind.sathesh@gmail.com' className='gap-2'>
              <Mail className='h-4 w-4' />
              Email Me
            </a>
          </Button>
          <Button size='lg' variant='outline' asChild>
            <a
              href='https://linkedin.com/in/aravind-sathesh'
              target='_blank'
              rel='noopener noreferrer'
              className='gap-2'
            >
              <Linkedin className='h-4 w-4' />
              LinkedIn
            </a>
          </Button>
          <Button size='lg' variant='outline' asChild>
            <a
              href='https://github.com/Aravind-Sathesh'
              target='_blank'
              rel='noopener noreferrer'
              className='gap-2'
            >
              <Github className='h-4 w-4' />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
