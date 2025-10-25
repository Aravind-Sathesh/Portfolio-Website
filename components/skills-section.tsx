'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { createClient } from '@/lib/supabase/client';
import { useTheme } from 'next-themes';
import * as simpleIcons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  svg?: string | null; // Optional SVG URL from database
  type?: 'icon' | 'text-only'; // Type of skill display
}

const getIconForSkill = (skillName: string): SimpleIcon | null => {
  const normalized = skillName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/\./g, 'dot')
    .replace(/-/g, '')
    .replace(/\+\+/g, 'plusplus')
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp');

  const iconKey = `si${normalized.charAt(0).toUpperCase()}${normalized.slice(
    1
  )}` as keyof typeof simpleIcons;
  const icon = simpleIcons[iconKey];

  if (icon && typeof icon === 'object' && 'path' in icon && 'hex' in icon) {
    return icon as SimpleIcon;
  }

  return null;
};

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        setSkills(data || []);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  // Separate icon and text-only categories
  const iconCategories = categories.filter((category) => {
    const categorySkills = skills.filter((s) => s.category === category);
    return categorySkills.some((s) => s.type !== 'text-only');
  });

  const textOnlyCategories = categories.filter((category) => {
    const categorySkills = skills.filter((s) => s.category === category);
    return (
      categorySkills.length > 0 &&
      categorySkills.every((s) => s.type === 'text-only')
    );
  });

  return (
    <section id='skills' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-4xl font-bold text-foreground mb-12 text-center'>
          Skills & Expertise
        </h2>

        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='space-y-6'>
                <Skeleton className='h-8 w-40' />
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-6'>
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className='flex flex-col items-center gap-3'>
                      <Skeleton className='h-20 w-20 rounded-xl' />
                      <Skeleton className='h-4 w-16' />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Icon-based categories in grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
              {iconCategories.map((category) => (
                <div key={category} className='space-y-6'>
                  <h3 className='text-2xl font-semibold text-foreground'>
                    {category}
                  </h3>
                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center'>
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill) => {
                        const icon = getIconForSkill(skill.name);
                        const isSvg = skill.svg?.endsWith('.svg');

                        return (
                          <div
                            key={skill.id}
                            className='group flex flex-col items-center gap-4 transition-transform duration-300 hover:scale-105'
                          >
                            <div
                              className='relative h-20 w-20 rounded-xl bg-card border border-border shadow-sm flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/50'
                              title={skill.name}
                            >
                              {icon ? (
                                <svg
                                  role='img'
                                  viewBox='0 0 24 24'
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-8 w-8 transition-all duration-300 fill-foreground/85 antialiased'
                                  style={{
                                    shapeRendering: 'geometricPrecision',
                                  }}
                                >
                                  <path d={icon.path} />
                                </svg>
                              ) : skill.svg && isSvg ? (
                                <img
                                  src={skill.svg}
                                  alt={skill.name}
                                  className='h-8 w-8 object-contain transition-all duration-300 filter-[brightness(0)_saturate(100%)_opacity(0.85)] dark:filter-[brightness(0)_saturate(100%)_invert(1)_opacity(0.85)]'
                                  style={{
                                    imageRendering: 'crisp-edges',
                                  }}
                                />
                              ) : skill.svg ? (
                                <img
                                  src={skill.svg}
                                  alt={skill.name}
                                  className='h-8 w-8 object-contain transition-all duration-300'
                                  style={{
                                    imageRendering: 'crisp-edges',
                                  }}
                                />
                              ) : (
                                <span className='text-2xl font-bold text-muted-foreground'>
                                  {skill.name.substring(0, 2).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <span className='text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-medium line-clamp-2'>
                              {skill.name}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>

            {/* Text-only categories in tables */}
            {textOnlyCategories.length > 0 && (
              <div className='mt-12 space-y-8'>
                {textOnlyCategories.map((category) => {
                  const categorySkills = skills.filter(
                    (skill) => skill.category === category
                  );

                  return (
                    <div key={category} className='space-y-4'>
                      <h3 className='text-2xl font-semibold text-foreground'>
                        {category}
                      </h3>
                      <div className='rounded-lg border border-border overflow-hidden shadow-sm'>
                        <table className='w-full'>
                          <tbody>
                            {categorySkills.map((skill, index) => (
                              <tr
                                key={skill.id}
                                className={`bg-card hover:bg-accent transition-colors duration-200`}
                              >
                                <td className='px-4 py-3 text-foreground'>
                                  {skill.name}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
