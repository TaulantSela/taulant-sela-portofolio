import { AuroraBackground } from '@/components/aurora-background';
import Hero from '@/components/hero';
import { Blog } from '@/components/sections/blog';
import Contact from '@/components/sections/contact';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import { fetchLatestBlogPosts } from '@/lib/blog-posts';
import { fetchContactSectionContent } from '@/lib/contact-content';
import { fetchMarqueeItems } from '@/lib/marquee-items';
import { fetchFeaturedProjects } from '@/lib/projects';

export default async function Portfolio() {
  const [marqueeItems, featuredProjects, latestPosts, contactContent] = await Promise.all([
    fetchMarqueeItems(),
    fetchFeaturedProjects(3),
    fetchLatestBlogPosts(3),
    fetchContactSectionContent(),
  ]);

  if (!contactContent) {
    throw new Error('Contact section content is not configured in Contentful.');
  }

  return (
    <div className="relative overflow-hidden">
      <AuroraBackground variant="portfolio" />
      <div className="relative flex flex-col gap-24 py-24 sm:gap-28 sm:py-32 lg:gap-32">
        <Hero marqueeItems={marqueeItems} />
        {featuredProjects.length ? (
          <Projects projects={featuredProjects} />
        ) : (
          <section
            id="projects"
            className="relative isolate px-6 text-slate-900 transition-colors duration-500 sm:px-10 lg:px-16 dark:text-white"
          >
            <div className="relative mx-auto flex max-w-6xl flex-col gap-8">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-12 text-center text-slate-500 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/15 dark:bg-white/5 dark:text-white/60">
                No projects published yet.
              </div>
            </div>
          </section>
        )}
        <Skills />
        {latestPosts.length ? (
          <Blog posts={latestPosts} />
        ) : (
          <section
            id="blog"
            className="relative isolate px-6 text-slate-950 transition-colors duration-500 sm:px-10 lg:px-16 dark:text-white"
          >
            <div className="relative mx-auto flex max-w-6xl flex-col gap-8">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-12 text-center text-slate-500 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/15 dark:bg-white/5 dark:text-white/60">
                No blog posts published yet.
              </div>
            </div>
          </section>
        )}
        <Contact content={contactContent} />
      </div>
    </div>
  );
}
