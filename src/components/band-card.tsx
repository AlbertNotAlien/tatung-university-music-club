'use client';

import React from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { useDisclosure } from '@/hooks/use-disclosure';
import { Band } from '@/types/band';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

function CardDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <GoKebabHorizontal size={28} className="rotate-90" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function BandCard({ bandName, members }: Band) {
  const { opened, toggle } = useDisclosure();
  const memberList = [...members].sort((a, b) => {
    if (window.innerWidth > 768) {
      return (a.isLeader ? 1 : 0) - (b.isLeader ? 1 : 0);
    }
    if (opened) {
      return (b.isLeader ? 1 : 0) - (a.isLeader ? 1 : 0);
    }
    return (a.isLeader ? 1 : 0) - (b.isLeader ? 1 : 0);
  });

  return (
    <Card>
      <CardHeader className="flex w-full flex-row items-center justify-between space-y-0 py-3 pl-6 pr-3">
        <CardTitle>{bandName}</CardTitle>
        <CardDropdownMenu />
      </CardHeader>
      <Separator />
      <CardContent className="relative p-6">
        <ul
          className={cn(
            opened ? 'flex-row justify-start' : 'flex-row-reverse justify-end',
            'relative flex w-full flex-wrap items-center gap-2',
          )}
        >
          {memberList.map((member) => {
            const { displayName, image, email, isLeader } = member;
            const avatarFallback = displayName.charAt(0).toUpperCase();

            return (
              <li
                key={email}
                className={cn(
                  opened
                    ? '-left-2 -top-2 items-center gap-2 bg-muted/40 p-2 pr-4'
                    : '-mr-4',
                  'relative flex max-w-[100%] flex-row rounded-full',
                )}
              >
                <Avatar
                  className={cn(
                    !opened &&
                      'outline-solid outline outline-2 outline-background',
                    'p-0',
                  )}
                >
                  <AvatarImage src={image} className="rounded-full" />
                  <AvatarFallback
                    className={cn(isLeader ? 'font-extrabold' : 'font-normal')}
                  >
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <p
                  className={cn(
                    isLeader ? 'font-extrabold' : 'font-normal',
                    opened ? 'w-fit opacity-100' : 'w-0 opacity-0',
                    'truncate',
                  )}
                >
                  {displayName}
                </p>
              </li>
            );
          })}
        </ul>
        <Button
          type="button"
          role="switch"
          className="z-1 absolute inset-0 h-full w-full bg-transparent hover:bg-transparent focus:bg-transparent focus:outline-none focus:ring-0 md:hidden"
          onClick={toggle}
        />
      </CardContent>
    </Card>
  );
}
