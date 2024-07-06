import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Icon } from '@/components/icon';
import { AppearanceToggle } from '@/components/appearance-toggle';

export default function Footer({
  className = '',
}: React.HTMLAttributes<HTMLElement> & { className?: string }) {
  return (
    <footer
      className={cn(
        'container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0',
        className,
      )}
    >
      <div className="flex items-center gap-4 px-8 md:flex-row md:gap-6 md:px-0">
        <Link
          href={siteConfig.links.facebook}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4 opacity-60 transition-opacity hover:opacity-100"
        >
          <Icon name="facebook" />
        </Link>
        <Link
          href={siteConfig.links.instagram}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4 opacity-60 transition-opacity hover:opacity-100"
        >
          <Icon name="instagram" />
        </Link>
        <Link
          href={siteConfig.links.youtube}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4 opacity-60 transition-opacity hover:opacity-100"
        >
          <Icon name="youtube" />
        </Link>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4 opacity-60 transition-opacity hover:opacity-100"
        >
          <Icon name="github" />
        </Link>
      </div>
      <AppearanceToggle />
    </footer>
  );
}
