import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

// Read at build time from content/. Images are referenced by filename in the
// JSON and served from public/media/, produced by scripts/build-media.mjs.

const CONTENT = join(process.cwd(), 'content');

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  status: string;
  project_date: string;
  is_featured: boolean;
  display_order: number;
  skills: string[];
  repo_url: string | null;
  live_url: string | null;
  cover_image_url: string | null;
  gallery_image_urls: string[];
  description_markdown: string;
}

export interface Skill {
  name: string;
  category: string;
  type: 'icon' | 'text-only';
  svg?: string;
  // Brand colour for a single-colour svg, or 'original' to show the file's own colours.
  color?: string;
}

export interface Experience {
  title: string;
  company: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  logo: string | null;
  description: string | null;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  logo: string;
  url: string;
}

const readJson = <T>(...path: string[]): T =>
  JSON.parse(readFileSync(join(CONTENT, ...path), 'utf8'));

// content/<dir>/<file> -> /media/<dir>/<file with .webp>; must mirror build-media.mjs.
function mediaUrl(dir: string, file: string): string {
  if (!existsSync(join(CONTENT, dir, file))) {
    throw new Error(`content/${dir}/${file} is referenced but does not exist`);
  }
  const out = extname(file).toLowerCase() === '.svg' ? file : file.slice(0, -extname(file).length) + '.webp';
  return `/media/${dir}/${out}`.split('/').map(encodeURIComponent).join('/');
}

function loadProject(slug: string): Project {
  const dir = `projects/${slug}`;
  const { cover, gallery = [], ...meta } = readJson<Omit<Project, 'slug' | 'cover_image_url' | 'gallery_image_urls' | 'description_markdown'> & { cover: string | null; gallery?: string[] }>(dir, 'project.json');
  return {
    ...meta,
    slug,
    cover_image_url: cover ? mediaUrl(dir, cover) : null,
    gallery_image_urls: gallery.map((f) => mediaUrl(dir, f)),
    description_markdown: readFileSync(join(CONTENT, dir, 'description.md'), 'utf8'),
  };
}

export function getProjects(): Project[] {
  return readdirSync(join(CONTENT, 'projects'), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => loadProject(e.name))
    .sort((a, b) => a.display_order - b.display_order || b.project_date.localeCompare(a.project_date));
}

export function getProject(slug: string): Project | null {
  return existsSync(join(CONTENT, 'projects', slug, 'project.json')) ? loadProject(slug) : null;
}

export function getSkills(): Skill[] {
  return readJson<Skill[]>('skills.json').map((s) => (s.svg ? { ...s, svg: mediaUrl('logos', s.svg) } : s));
}

export function getExperience(): Experience[] {
  return readJson<Experience[]>('experience.json')
    .map((e) => ({ ...e, logo: e.logo ? mediaUrl('logos', e.logo) : null }))
    .sort((a, b) => b.start_date.localeCompare(a.start_date));
}

export function getCertifications(): Certification[] {
  return readJson<Certification[]>('certifications.json')
    .map((c) => ({ ...c, logo: mediaUrl('logos', c.logo) }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
