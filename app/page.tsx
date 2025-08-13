import Footer from '@/components/footer';
import Hero from '@/components/hero';
import Navigation from '@/components/navigation';
import About from '@/components/sections/about';
import { Blog } from '@/components/sections/blog';
import Contact from '@/components/sections/contact';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 transition-colors duration-500 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}
