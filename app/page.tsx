import Hero from '@/components/hero';
import About from '@/components/sections/about';
import { Blog } from '@/components/sections/blog';
import Contact from '@/components/sections/contact';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';

export default function Portfolio() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
    </>
  );
}
