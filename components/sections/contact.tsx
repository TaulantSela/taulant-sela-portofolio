import Link from 'next/link';

import { ContactForm } from '@/components/contact-form';
import { Card, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb';

export default function Contact() {
  const contactCards = [
    {
      title: 'Email',
      subtitle: 'taulant1995@gmail.com',
      href: 'mailto:taulant1995@gmail.com',
      Icon: Mail,
    },
    {
      title: 'LinkedIn',
      subtitle: '@taulantsela',
      href: 'https://www.linkedin.com/in/taulantsela',
      Icon: TbBrandLinkedin,
    },
    {
      title: 'GitHub',
      subtitle: '@TaulantSela',
      href: 'https://github.com/TaulantSela',
      Icon: TbBrandGithub,
    },
  ];

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
          {contactCards.map(({ title, subtitle, href, Icon }, index) => {
            const isExternal = href.startsWith('http');
            const linkProps = isExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <Link key={title} href={href} {...linkProps} className="group block h-full" prefetch={false}>
                <Card
                  className={`animate-in fade-in-50 transition-all duration-700 hover:-translate-y-1 hover:shadow-lg ${
                    index === 0 ? 'slide-in-from-left-5' : index === 1 ? 'delay-200 slide-in-from-bottom-5' : 'delay-400 slide-in-from-right-5'
                  }`}
                >
                  <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                    <Icon className="h-8 w-8 text-slate-600 transition-transform duration-300 group-hover:scale-110 dark:text-slate-400" />
                    <div>
                      <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                      <p className="text-sm text-slate-600 transition-colors group-hover:text-purple-600 dark:text-slate-400 dark:group-hover:text-purple-400">
                        {subtitle}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
