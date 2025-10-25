'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { createClient } from '@/lib/supabase/client';

interface Experience {
  id: string;
  title: string;
  company: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  logo: string | null;
}

export function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('experience')
          .select('*')
          .order('start_date', { ascending: false });

        if (error) throw error;
        setExperiences(data || []);
      } catch (error) {
        console.error('Error fetching experience:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

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

        {loading ? (
          <div className='space-y-6'>
            {[1, 2, 3].map((i) => (
              <Card key={i} className='border-gray-700/20 dark:border-white/5'>
                <CardHeader>
                  <div className='flex justify-between items-start flex-wrap gap-3'>
                    <div className='flex items-start gap-4 flex-1'>
                      <Skeleton className='h-12 w-12 rounded-lg shrink-0' />
                      <div className='space-y-2 flex-1'>
                        <Skeleton className='h-7 w-64' />
                        <Skeleton className='h-5 w-48' />
                      </div>
                    </div>
                    <Skeleton className='h-8 w-40' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className='h-4 w-full mb-2' />
                  <Skeleton className='h-4 w-5/6' />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className='space-y-6'>
            {experiences.map((exp) => (
              <Card
                key={exp.id}
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
                        <p className='text-base text-muted-foreground mt-2'>
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
                            line.trim() && <li key={index}>{line.trim()}</li>
                        )}
                    </ul>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
