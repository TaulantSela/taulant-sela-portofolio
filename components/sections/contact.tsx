import { ContactForm } from '@/components/contact-form';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="animate-in fade-in-50 slide-in-from-bottom-5 mb-16 text-center duration-700">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
            Let&apos;s Work Together
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            I&apos;m always interested in new opportunities and exciting projects. Let&apos;s discuss how we can bring
            your ideas to life.
          </p>
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-3">
          <Card className="animate-in fade-in-50 slide-in-from-left-5 transition-all duration-700 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <Mail className="mx-auto mb-4 h-8 w-8 text-slate-600 transition-transform duration-300 hover:scale-110 dark:text-slate-400" />
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">Email</h3>
              <p className="text-slate-600 dark:text-slate-400">taulant1995@gmail.com</p>
            </CardContent>
          </Card>

          <Card className="animate-in fade-in-50 slide-in-from-bottom-5 transition-all delay-200 duration-700 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <Linkedin className="mx-auto mb-4 h-8 w-8 text-slate-600 transition-transform duration-300 hover:scale-110 dark:text-slate-400" />
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">LinkedIn</h3>
              <p className="text-slate-600 dark:text-slate-400">@taulantsela</p>
            </CardContent>
          </Card>

          <Card className="animate-in fade-in-50 slide-in-from-right-5 transition-all delay-400 duration-700 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <Github className="mx-auto mb-4 h-8 w-8 text-slate-600 transition-transform duration-300 hover:scale-110 dark:text-slate-400" />
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">GitHub</h3>
              <p className="text-slate-600 dark:text-slate-400">@TaulantSela</p>
            </CardContent>
          </Card>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
