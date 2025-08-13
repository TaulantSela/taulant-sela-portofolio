import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';

export default function About() {
  return (
    <section
      id="about"
      className="bg-white px-4 py-20 transition-colors duration-500 sm:px-6 lg:px-8 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-6xl">
        <div className="animate-in fade-in-50 slide-in-from-bottom-5 mb-16 text-center duration-700">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">About Me</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            I&apos;m a passionate developer with 5+ years of experience building scalable web applications
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-in fade-in-50 slide-in-from-left-5 delay-200 duration-700">
            <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-400">
              I specialize in modern web technologies and have a strong background in both frontend and backend
              development. My journey started with a Computer Science degree, and I&apos;ve been continuously learning
              and adapting to new technologies ever since.
            </p>
            <p className="mb-8 leading-relaxed text-slate-600 dark:text-slate-400">
              When I&apos;m not coding, you can find me contributing to open-source projects, writing technical blog
              posts, or exploring the latest in web development trends.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105">
                <MapPin className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                <span className="text-slate-600 dark:text-slate-400">Struga, North Macedonia</span>
              </div>
              <div className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105">
                <Calendar className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                <span className="text-slate-600 dark:text-slate-400">5+ Years Experience</span>
              </div>
            </div>
          </div>

          <div className="animate-in fade-in-50 slide-in-from-right-5 grid grid-cols-2 gap-4 delay-400 duration-700">
            <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="mb-2 animate-pulse text-3xl font-bold text-slate-900 dark:text-slate-100">50+</div>
                <div className="text-slate-600 dark:text-slate-400">Projects Completed</div>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="mb-2 animate-pulse text-3xl font-bold text-slate-900 dark:text-slate-100">25+</div>
                <div className="text-slate-600 dark:text-slate-400">Happy Clients</div>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="mb-2 animate-pulse text-3xl font-bold text-slate-900 dark:text-slate-100">100+</div>
                <div className="text-slate-600 dark:text-slate-400">GitHub Commits</div>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="mb-2 animate-pulse text-3xl font-bold text-slate-900 dark:text-slate-100">5+</div>
                <div className="text-slate-600 dark:text-slate-400">Years Experience</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
