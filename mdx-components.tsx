import type { MDXComponents } from 'mdx/types';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';

/**
 * Required by the App Router: every MDX file rendered under `app/` is compiled
 * against these components. Prose spacing/typography comes from the
 * `prose` classes on the article wrapper, so only behavioural overrides live here.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = '', children, ...props }) => {
      const isInternal = href.startsWith('/') || href.startsWith('#');

      if (isInternal) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }

      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },
    img: ({ src, alt, ...props }) => {
      const className = 'rounded-2xl border border-slate-200 dark:border-white/10';

      // Mirrored posts carry images hotlinked from wherever the original hosted them. Routing those
      // through next/image would mean allow-listing every third-party host, so they stay plain tags.
      if (typeof src !== 'string' || !src.startsWith('/')) {
        // eslint-disable-next-line @next/next/no-img-element
        return (
          <img
            {...props}
            src={typeof src === 'string' ? src : ''}
            alt={alt ?? ''}
            loading="lazy"
            className={className}
          />
        );
      }

      return (
        <Image
          {...(props as ImageProps)}
          src={src}
          width={1200}
          height={675}
          sizes="(min-width: 768px) 720px, 100vw"
          className={className}
          alt={alt ?? ''}
        />
      );
    },
    ...components,
  };
}
