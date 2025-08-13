import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Skills() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="animate-in fade-in-50 slide-in-from-bottom-5 mb-16 text-center duration-700">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
            Skills & Technologies
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Here are the technologies and tools I work with regularly
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="animate-in fade-in-50 slide-in-from-left-5 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Frontend</CardTitle>
              <CardDescription className="dark:text-slate-400">Building beautiful user interfaces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  React
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  Next.js
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  TypeScript
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  Tailwind CSS
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  Vue.js
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  Sass
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-in fade-in-50 slide-in-from-bottom-5 transition-all delay-200 duration-700 hover:-translate-y-2 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Backend</CardTitle>
              <CardDescription className="dark:text-slate-400">Server-side development & APIs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  Node.js
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  Python
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  PostgreSQL
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  MongoDB
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  Express
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  FastAPI
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-in fade-in-50 slide-in-from-right-5 transition-all delay-400 duration-700 hover:-translate-y-2 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Tools & Others</CardTitle>
              <CardDescription className="dark:text-slate-400">Development tools & platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  Git
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  Docker
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  AWS
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  Vercel
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  Figma
                </Badge>
                <Badge variant="secondary" className="transition-transform duration-300 hover:scale-110">
                  Jest
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
