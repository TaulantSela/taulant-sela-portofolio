import { AuroraBackground } from '@/components/aurora-background';
import Hero from '@/components/hero';
import { Blog } from '@/components/sections/blog';
import Contact from '@/components/sections/contact';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';

export default function Portfolio() {
  return (
    <div className="relative overflow-hidden">
      <AuroraBackground variant="portfolio" />
      <div className="relative flex flex-col gap-24 px-6 py-16 sm:gap-28 sm:px-10 sm:py-24 lg:gap-32 lg:px-16">
        <Hero />
        <Projects />
        <Skills />
        <Blog />
        <Contact />
      </div>
    </div>
  );
}
