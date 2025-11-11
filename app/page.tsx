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
      <div className="relative flex flex-col gap-24 py-24 sm:gap-28 sm:py-32 lg:gap-32">
        <Hero />
        <Projects />
        <Skills />
        <Blog />
        <Contact />
      </div>
    </div>
  );
}
