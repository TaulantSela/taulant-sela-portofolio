'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? 'Failed to send message');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Something went wrong while sending your message. Please try again later or reach out directly.');
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <Card className="animate-in fade-in-50 mx-auto flex h-full w-full max-w-2xl flex-col border border-slate-200 bg-white/95 p-8 text-slate-900 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur duration-500 dark:border-white/10 dark:bg-white/[0.08] dark:text-white dark:shadow-[0_24px_70px_rgba(15,23,42,0.55)]">
        <CardContent className="flex flex-1 flex-col items-center justify-center p-0 text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-400 dark:text-emerald-300" />
          <h3 className="mb-2 text-2xl font-semibold">Message sent successfully!</h3>
          <p className="text-sm text-slate-600 dark:text-white/70">
            Thank you for reaching out. I&apos;ll get back to you soon!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-in slide-in-from-bottom-5 mx-auto flex h-full w-full max-w-2xl flex-col border border-slate-200 bg-white/95 text-slate-900 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur duration-700 dark:border-white/10 dark:bg-slate-950/70 dark:text-white dark:shadow-[0_24px_70px_rgba(15,23,42,0.55)]">
      <CardHeader className="border-b border-slate-200/70 pb-8 text-center dark:border-white/10">
        <CardTitle className="text-2xl">Send me a message</CardTitle>
        <CardDescription className="text-slate-600 dark:text-white/60">
          I&apos;d love to hear about your project or just say hello!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-8">
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6">
          {errorMessage ? (
            <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:border-red-500/40 dark:text-red-300">
              {errorMessage}
            </p>
          ) : null}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs tracking-[0.3em] text-slate-500 uppercase dark:text-white/60">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-slate-200 bg-white text-slate-900 transition duration-300 placeholder:text-slate-400 focus:border-slate-400 focus:ring-0 focus:outline-none dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/40 dark:focus:border-white/40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs tracking-[0.3em] text-slate-500 uppercase dark:text-white/60">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-slate-200 bg-white text-slate-900 transition duration-300 placeholder:text-slate-400 focus:border-slate-400 focus:ring-0 focus:outline-none dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/40 dark:focus:border-white/40"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-xs tracking-[0.3em] text-slate-500 uppercase dark:text-white/60">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="border-slate-200 bg-white text-slate-900 transition duration-300 placeholder:text-slate-400 focus:border-slate-400 focus:ring-0 focus:outline-none dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/40 dark:focus:border-white/40"
            />
          </div>
          <div className="flex flex-1 flex-col space-y-2">
            <Label htmlFor="message" className="text-xs tracking-[0.3em] text-slate-500 uppercase dark:text-white/60">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="flex-1 resize-none border-slate-200 bg-white text-slate-900 transition duration-300 placeholder:text-slate-400 focus:border-slate-400 focus:ring-0 focus:outline-none dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/40 dark:focus:border-white/40"
            />
          </div>
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-slate-900 text-white transition duration-300 hover:-translate-y-1 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white dark:border-slate-900" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit message
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
