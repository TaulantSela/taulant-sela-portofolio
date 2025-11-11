import Hero from '@/components/hero';
import { Blog } from '@/components/sections/blog';
import Contact from '@/components/sections/contact';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import { fetchLatestBlogPosts } from '@/lib/blog/blog-posts';
import { fetchBlogSectionContent } from '@/lib/blog/blog-section-content';
import { fetchContactSectionContent } from '@/lib/contact/contact-section-content';
import { fetchHeroSectionContent } from '@/lib/hero/hero-section-content';
import { fetchFeaturedProjects } from '@/lib/projects/projects';
import { fetchProjectsSectionContent } from '@/lib/projects/projects-section-content';
import { fetchSkillsSectionContent } from '@/lib/skills/skills-section-content';

export default async function Portfolio() {
  const [heroContent, projectsContent, featuredProjects, skillsContent, blogContent, latestPosts, contactContent] =
    await Promise.all([
      fetchHeroSectionContent(),
      fetchProjectsSectionContent(),
      fetchFeaturedProjects(3),
      fetchSkillsSectionContent(),
      fetchBlogSectionContent(),
      fetchLatestBlogPosts(3),
      fetchContactSectionContent(),
    ]);

  if (!heroContent) {
    throw new Error('Hero section content is not configured in Contentful.');
  }

  if (!projectsContent) {
    throw new Error('Projects section content is not configured in Contentful.');
  }

  if (!skillsContent) {
    throw new Error('Skills section content is not configured in Contentful.');
  }

  if (!blogContent) {
    throw new Error('Blog section content is not configured in Contentful.');
  }

  if (!contactContent) {
    throw new Error('Contact section content is not configured in Contentful.');
  }

  return (
    <div className="relative overflow-hidden">
      <div className="relative flex flex-col gap-24 py-24 sm:gap-28 sm:py-32 lg:gap-32">
        <Hero content={heroContent} />
        {featuredProjects.length ? (
          <Projects projects={featuredProjects} content={projectsContent} />
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
        <Skills content={skillsContent} />
        {latestPosts.length ? (
          <Blog posts={latestPosts} content={blogContent} />
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
