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
            Software Engineer crafting resilient, multi-brand React and Next.js experiences with pragmatic delivery
            practices
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-in fade-in-50 slide-in-from-left-5 delay-200 duration-700">
            <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-400">
              I&apos;ve helped Goodyear, Hoyo Tech, BMG, and others modernise React platforms, ship smarter interfaces,
              and embed better delivery habits.
            </p>
            <p className="mb-8 leading-relaxed text-slate-600 dark:text-slate-400">
              I love translating product goals into reusable component systems, coaching teams through change, and
              sharing what I learn through open-source and mentoring.
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
                <div className="mb-2 animate-pulse text-3xl font-bold text-slate-900 dark:text-slate-100">15+</div>
                <div className="text-slate-600 dark:text-slate-400">
                  Products delivered across web, mobile, and data/analytics platforms
                </div>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="mb-2 animate-pulse text-3xl font-bold text-slate-900 dark:text-slate-100">3</div>
                <div className="text-slate-600 dark:text-slate-400">
                  Major platform rewrites delivered (Goodyear, Hoyo, BMG)
                </div>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="mb-2 animate-pulse text-3xl font-bold text-slate-900 dark:text-slate-100">8+</div>
                <div className="text-slate-600 dark:text-slate-400">
                  Years engineering end-to-end software solutions
                </div>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="mb-2 animate-pulse text-3xl font-bold text-slate-900 dark:text-slate-100">3+</div>
                <div className="text-slate-600 dark:text-slate-400">
                  Cross-functional squads coached through agile delivery
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
