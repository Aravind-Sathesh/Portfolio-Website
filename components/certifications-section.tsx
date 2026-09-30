import { ArrowUpRight } from 'lucide-react';
import type { Certification } from '@/lib/content';

const formatDate = (date: string) =>
  new Date(`${date}-01`).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

export function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  return (
    <section id='certifications' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-4xl font-bold text-foreground mb-12 text-center'>
          Certifications
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {certifications.map((cert) => (
            <a
              key={cert.url}
              href={cert.url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Verify ${cert.title} from ${cert.issuer} (opens in a new tab)`}
              className='group flex items-start gap-4 rounded-xl border border-gray-700/20 dark:border-white/25 bg-card p-5 transition-all duration-300 hover:border-primary/30'
            >
              <img
                src={cert.logo}
                alt=''
                className='h-12 w-12 rounded-lg object-contain shrink-0 bg-white p-2'
              />
              <div className='min-w-0 flex-1'>
                <p className='font-semibold text-foreground leading-snug'>{cert.title}</p>
                <p className='text-sm text-muted-foreground mt-1'>
                  {cert.issuer} · {formatDate(cert.date)}
                </p>
              </div>
              <ArrowUpRight className='h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary' />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
