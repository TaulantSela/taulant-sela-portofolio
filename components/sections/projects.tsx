import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import NextLink from 'next/link';
import { TbBrandGithub } from 'react-icons/tb';

import { featuredProjects } from '@/lib/projects';

export default function Projects() {
  const projects = featuredProjects();

  return (
    <section
      id="projects"
      className="bg-white px-4 py-20 transition-colors duration-500 sm:px-6 lg:px-8 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-6xl">
        <div className="animate-in fade-in-50 slide-in-from-bottom-5 mb-16 text-center duration-700">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">Featured Projects</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            A selection of my recent work and personal projects
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const animationClass =
              index % 3 === 0
                ? 'slide-in-from-left-5'
                : index % 3 === 1
                  ? 'delay-200 slide-in-from-bottom-5'
                  : 'delay-400 slide-in-from-right-5';

            return (
              <Card
                key={project.id}
                className={`group animate-in fade-in-50 ${animationClass} pt-0 pb-6 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl`}
              >
                <div className="aspect-[16/9] overflow-hidden rounded-t-lg bg-slate-900/80">
                  <Image
                    src={project.image || '/placeholder.png'}
                    alt={project.title}
                    height={202}
                    width={360}
                    className={`h-full w-full transition-transform duration-700 group-hover:scale-110 ${
                      project.imageFit === 'contain' ? 'object-contain p-6 group-hover:scale-100' : 'object-cover'
                    }`}
                  />
                </div>
                <CardHeader className="space-y-4">
                  <CardTitle className="text-slate-900 dark:text-slate-100">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <span className="block text-xs tracking-wide text-slate-400 uppercase dark:text-slate-500">
                          {project.role === 'company'
                            ? 'Company Project'
                            : project.role === 'oss'
                              ? 'Open Source'
                              : 'Personal Project'}
                        </span>
                        <span>{project.title}</span>
                      </div>
                      <div className="flex shrink-0 space-x-2">
                        {project.links?.map((link) => {
                          const Icon = link.icon === 'github' ? TbBrandGithub : ExternalLink;
                          return (
                            <NextLink
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 transition-all duration-300 hover:scale-125 hover:text-slate-600 dark:hover:text-slate-300"
                              aria-label={`${project.title} ${link.label}`}
                            >
                              <Icon className="h-4 w-4" />
                            </NextLink>
                          );
                        })}
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription className="dark:text-slate-400">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-between space-y-4 pt-0">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{project.context}</p>
                  <div className="flex flex-wrap gap-1 pt-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs transition-transform duration-300 hover:scale-110"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="animate-in fade-in-50 slide-in-from-bottom-5 mt-12 text-center delay-600 duration-700">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-transparent transition-transform duration-300 hover:scale-105"
          >
            <NextLink href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </NextLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
