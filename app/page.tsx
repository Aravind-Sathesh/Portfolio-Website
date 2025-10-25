import { Navbar } from '@/components/navbar';
import { DotsBackground } from '@/components/dots-background';
import { HeroSection } from '@/components/hero-section';
import { SkillsSection } from '@/components/skills-section';
import { ExperienceSection } from '@/components/experience-section';
import { ProjectsSection } from '@/components/projects-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className='min-h-screen bg-background text-foreground'>
      <DotsBackground />
      <div className='relative z-10'>
        <Navbar />
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
