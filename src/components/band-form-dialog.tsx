'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Band, Member } from '@/types/band';
import { bandFormSchema } from '@/lib/zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { DialogClose } from '@radix-ui/react-dialog';
import UserSearchBarProps from '@/components/user-email-search-bar';
import { cn } from '@/lib/utils';

type BandFormDialogProps = {
  children: string;
  band: Band;
  bandList: Band[];
  description?: string;
  userData: Member[];
  className?: string;
};

export default function BandFormDialog({
  children: buttonTitle,
  band,
  bandList,
  description,
  userData,
  className,
}: BandFormDialogProps) {
  const defaultMember: Member[] = [];

  const { bandName, members } = band;
  const [selectedUsers, setSelectedUsers] = useState(defaultMember);
  // TODO: Set yourself as default and isLeader is true.

  const form = useForm<z.infer<typeof bandFormSchema>>({
    resolver: zodResolver(bandFormSchema),
    defaultValues: {
      bandName,
      members,
    },
  });
  const { control, handleSubmit, setValue } = form;

  const onSubmit = async (data: z.infer<typeof bandFormSchema>) => {
    const myNewBandList: Band[] = [...bandList, data];
    console.log(myNewBandList);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="button"
          className={cn(
            'flex w-full items-center justify-center rounded-lg border bg-card text-card-foreground text-zinc-950 shadow-sm hover:bg-zinc-50 dark:text-zinc-50 dark:hover:bg-zinc-900',
            className,
          )}
        >
          {buttonTitle}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex flex-col w-full h-full md:h-fit md:w-fit"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle className="text-2xl text-center">
            {buttonTitle}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col justify-between h-full md:gap-16"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col justify-start">
              <FormField
                control={control}
                name="bandName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm">Band name</FormLabel>
                    <FormControl>
                      <Input
                        className="px-0 text-2xl font-bold border-none rounded-none outline-none placeholder:font-light placeholder:text-zinc-200 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:dark:opacity-30"
                        {...field}
                        placeholder="Enter your band name"
                      />
                    </FormControl>
                    <FormMessage className="col-start-2" />
                  </FormItem>
                )}
              />
              <Separator className="mt-1 mb-8" />
              <FormField
                control={control}
                name="members"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-sm">Members</FormLabel>
                    <FormControl>
                      <UserSearchBarProps
                        userData={userData}
                        selectedUsers={selectedUsers}
                        onSetSelectedUsers={(users) => {
                          setSelectedUsers(users);
                          setValue('members', users);
                        }}
                        {...field}
                        // TODO: form is not received members data
                      />
                    </FormControl>
                    <FormMessage className="col-start-2" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col justify-start gap-2 md:flex-row-reverse md:gap-4">
              <Button type="submit">Submit</Button>
              <DialogClose>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
