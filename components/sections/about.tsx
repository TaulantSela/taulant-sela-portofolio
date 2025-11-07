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
            Software Engineer focused on crafting resilient, multi-brand experiences for global products across React,
            Next.js, and modern delivery practices
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-in fade-in-50 slide-in-from-left-5 delay-200 duration-700">
            <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-400">
              From stewarding Goodyear&apos;s AEM-to-React migration across 30+ European markets to orchestrating the
              Hoyo Tech smart office and HoyoHome rebuilds, I specialise in untangling complex frontends and guiding
              teams through change. My background spans Valtech, Hoyo Tech, BMG Production Music, MonoChain, and more.
            </p>
            <p className="mb-8 leading-relaxed text-slate-600 dark:text-slate-400">
              I enjoy partnering with product, design, and engineering to define component architectures, design
              systems, and delivery rituals that scale. Outside of client work I contribute to open source, document
              lessons learned, and mentor engineers looking to level-up in the React ecosystem.
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
                <div className="mb-2 animate-pulse text-3xl font-bold text-slate-900 dark:text-slate-100">30+</div>
                <div className="text-slate-600 dark:text-slate-400">
                  Markets shipped across Goodyear&apos;s TBU network
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
                <div className="mb-2 animate-pulse text-3xl font-bold text-slate-900 dark:text-slate-100">5+</div>
                <div className="text-slate-600 dark:text-slate-400">Years shaping React and Next.js products</div>
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
