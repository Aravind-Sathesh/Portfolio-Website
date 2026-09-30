import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Experience } from '@/lib/content';

export function ExperienceSection({
  experiences,
}: {
  experiences: Experience[];
}) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <section id='experience' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-4xl font-bold text-foreground mb-12 text-center'>
          Experience
        </h2>

        <div className='space-y-6'>
          {experiences.map((exp) => (
            <Card
              key={`${exp.company}-${exp.start_date}`}
              className='border-gray-700/20 dark:border-white/25 flex flex-col hover:border-primary/30 transition-all duration-300'
            >
              <CardHeader>
                <div className='flex justify-between items-start flex-wrap gap-3'>
                  <div className='flex items-start gap-4'>
                    {exp.logo && (
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className='h-16 w-16 rounded-lg object-contain shrink-0 bg-white/5 p-1.5'
                      />
                    )}
                    <div>
                      <CardTitle className='text-2xl'>{exp.title}</CardTitle>
                      <p className='text-base text-muted-foreground mt-1'>
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <span className='text-sm bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full backdrop-blur-sm'>
                    {formatDate(exp.start_date)} -{' '}
                    {exp.is_current
                      ? 'Present'
                      : formatDate(exp.end_date || '')}
                  </span>
                </div>
              </CardHeader>
              {exp.description && (
                <CardContent>
                  <ul className='list-disc pl-5 space-y-2 text-base text-muted-foreground leading-relaxed'>
                    {exp.description
                      .split(/\\n|\n/)
                      .map(
                        (line, index) =>
                          line.trim() && <li key={index}>{line.trim()}</li>,
                      )}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
