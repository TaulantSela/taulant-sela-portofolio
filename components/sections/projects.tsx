import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Link } from 'lucide-react';
import Image from 'next/image';
import { TbBrandGithub } from 'react-icons/tb';

export default function Projects() {
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
          <Card className="group animate-in fade-in-50 slide-in-from-left-5 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl">
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <Image
                src="/modern-ecommerce-dashboard.png"
                alt="E-commerce Platform"
                height={202}
                width={360}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-slate-900 dark:text-slate-100">
                E-commerce Platform
                <div className="flex space-x-2">
                  <Link
                    href="#"
                    className="text-slate-400 transition-all duration-300 hover:scale-125 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <TbBrandGithub className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="text-slate-400 transition-all duration-300 hover:scale-125 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </CardTitle>
              <CardDescription className="dark:text-slate-400">
                Full-stack e-commerce solution with payment integration and admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs transition-transform duration-300 hover:scale-110">
                  React
                </Badge>
                <Badge variant="outline" className="text-xs transition-transform duration-300 hover:scale-110">
                  Node.js
                </Badge>
                <Badge variant="outline" className="text-xs transition-transform duration-300 hover:scale-110">
                  Stripe
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="group animate-in fade-in-50 slide-in-from-bottom-5 transition-all delay-200 duration-700 hover:-translate-y-2 hover:shadow-xl">
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <Image
                src="/task-management-app.png"
                alt="Task Management App"
                height={202}
                width={360}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-slate-900 dark:text-slate-100">
                Task Management App
                <div className="flex space-x-2">
                  <Link
                    href="#"
                    className="text-slate-400 transition-all duration-300 hover:scale-125 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <TbBrandGithub className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="text-slate-400 transition-all duration-300 hover:scale-125 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </CardTitle>
              <CardDescription className="dark:text-slate-400">
                Collaborative task management tool with real-time updates and team features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs transition-transform duration-300 hover:scale-110">
                  Next.js
                </Badge>
                <Badge variant="outline" className="text-xs transition-transform duration-300 hover:scale-110">
                  Socket.io
                </Badge>
                <Badge variant="outline" className="text-xs transition-transform duration-300 hover:scale-110">
                  MongoDB
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="group animate-in fade-in-50 slide-in-from-right-5 transition-all delay-400 duration-700 hover:-translate-y-2 hover:shadow-xl">
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <Image
                src="/weather-app-interface.png"
                alt="Weather Dashboard"
                height={202}
                width={360}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-slate-900 dark:text-slate-100">
                Weather Dashboard
                <div className="flex space-x-2">
                  <Link
                    href="#"
                    className="text-slate-400 transition-all duration-300 hover:scale-125 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <TbBrandGithub className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="text-slate-400 transition-all duration-300 hover:scale-125 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </CardTitle>
              <CardDescription className="dark:text-slate-400">
                Beautiful weather app with location-based forecasts and interactive maps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs transition-transform duration-300 hover:scale-110">
                  Vue.js
                </Badge>
                <Badge variant="outline" className="text-xs transition-transform duration-300 hover:scale-110">
                  API
                </Badge>
                <Badge variant="outline" className="text-xs transition-transform duration-300 hover:scale-110">
                  Charts
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="animate-in fade-in-50 slide-in-from-bottom-5 mt-12 text-center delay-600 duration-700">
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent transition-transform duration-300 hover:scale-105"
          >
            View All Projects
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
