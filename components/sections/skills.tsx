import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const categories = [
  {
    title: 'Frontend & UI Engineering',
    description: 'React ecosystems, design systems, and high-performing interfaces',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Design Systems', 'Accessibility'],
  },
  {
    title: 'Platform & Data Integrations',
    description: 'Connecting products to resilient backends and partner ecosystems',
    skills: ['Node.js', 'REST & GraphQL APIs', 'PostgreSQL', 'Snowflake', 'Adobe Experience Manager'],
  },
  {
    title: 'Leadership & Delivery',
    description: 'Guiding cross-functional teams with clarity and quality',
    skills: ['Scrum & Agile Facilitation', 'Product Discovery', 'Backlog Management', 'Technical Documentation'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="animate-in fade-in-50 slide-in-from-bottom-5 mb-16 text-center duration-700">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
            Skills & Technologies
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Reflecting the stacks and practices that power my work across Goodyear, Hoyo Tech, BMG Production Music, and
            beyond
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((category, index) => (
            <Card
              key={category.title}
              className={`animate-in fade-in-50 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl ${
                index === 0
                  ? 'slide-in-from-left-5'
                  : index === 1
                    ? 'slide-in-from-bottom-5 delay-200'
                    : 'slide-in-from-right-5 delay-400'
              }`}
            >
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100">{category.title}</CardTitle>
                <CardDescription className="dark:text-slate-400">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="transition-transform duration-300 hover:scale-110"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
