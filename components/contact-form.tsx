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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }

    // Reset success message after 3 seconds
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
      <Card className="animate-in fade-in-50 mx-auto w-full max-w-2xl duration-500">
        <CardContent className="p-8 text-center">
          <CheckCircle className="animate-in zoom-in-50 mx-auto mb-4 h-16 w-16 text-green-500 duration-700" />
          <h3 className="mb-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Message Sent Successfully!</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Thank you for reaching out. I&apos;ll get back to you soon!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-in slide-in-from-bottom-5 mx-auto w-full max-w-2xl duration-700">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Send me a message</CardTitle>
        <CardDescription className="text-center">
          I&apos;d love to hear about your project or just say hello!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="transition-all duration-300 focus:scale-[1.02]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="transition-all duration-300 focus:scale-[1.02]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="transition-all duration-300 focus:scale-[1.02]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="resize-none transition-all duration-300 focus:scale-[1.02]"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
