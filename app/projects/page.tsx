import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TbBrandGithub } from 'react-icons/tb';

import { projects } from '@/lib/projects';

export default function ProjectsPage() {
  return (
    <main className="px-4 py-20 transition-colors duration-500 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">All Projects</h1>
            <p className="mt-2 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Browse the full collection of company initiatives, open source contributions, and personal products I have
              built.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="self-center sm:self-end">
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Highlights
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group pt-0 pb-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
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
                          <Link
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 transition-all duration-300 hover:scale-125 hover:text-slate-600 dark:hover:text-slate-300"
                            aria-label={`${project.title} ${link.label}`}
                          >
                            <Icon className="h-4 w-4" />
                          </Link>
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
          ))}
        </div>
      </div>
    </main>
  );
}
