'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Rules', path: '/rules' },
  { name: 'Booking', path: '/booking' },
];

export default function Navigation() {
  const pathname = usePathname();
  const checkActivePath = (path: string) => path === pathname;

  return (
    <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.path}
          className={cn(
            'transition-colors hover:text-foreground',
            checkActivePath(link.path)
              ? 'text-foreground'
              : 'text-muted-foreground',
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
