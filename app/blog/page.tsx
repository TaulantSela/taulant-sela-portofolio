import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { blogPosts } from '@/lib/blog-posts';

export default function BlogPage() {
  const posts = blogPosts;

  return (
    <main className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900/50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">All Blog Posts</h1>
            <p className="mt-2 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Explore the full collection of Hoyo Tech insights on ESG, smart environments, and modern web development.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="self-center sm:self-end">
            <Link href="/#blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Highlights
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="group transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <Image
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  height={312}
                  width={312}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="mb-4 line-clamp-3 text-sm">{post.excerpt}</CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <User className="mr-1 h-3 w-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="mr-1 h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                <Link href={post.url} target="_blank" rel="noopener noreferrer" className="mt-4 block">
                  <Button variant="ghost" size="sm" className="group/btn w-full">
                    Read More
                    <ArrowRight className="ml-2 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
