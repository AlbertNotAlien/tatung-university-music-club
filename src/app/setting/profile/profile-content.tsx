'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '@/lib/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Profile } from '@/lib/firebase/api/profile';

const identityList = [
  '-- Please select --',
  'Student',
  'Student from other school',
  'Already graduated',
];

function EditProfileForm({ profile }: { profile: Profile | undefined }) {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
  });

  const { control, handleSubmit } = form;
  const onSubmit = (values: z.infer<typeof profileSchema>) => {};

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="grid h-10 grid-cols-2 items-center space-y-0">
              <FormLabel className="text-base font-semibold text-zinc-600 dark:text-zinc-400">
                First name
              </FormLabel>
              <FormControl>
                <Input className="mb-80" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="grid h-10 grid-cols-2 items-center space-y-0">
              <FormLabel className="text-base font-semibold text-zinc-600 dark:text-zinc-400">
                Last name
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="displayName"
          render={({ field }) => (
            <FormItem className="grid h-10 grid-cols-2 items-center space-y-0">
              <FormLabel className="text-base font-semibold text-zinc-600 dark:text-zinc-400">
                Display name
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="identity"
          render={({ field }) => (
            <FormItem className="grid h-10 grid-cols-2 items-center space-y-0">
              <FormLabel className="text-base font-semibold text-zinc-600 dark:text-zinc-400">
                Identity
              </FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="-- Please select --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {identityList &&
                        identityList.map((identity) => (
                          <SelectItem key={identity} value={identity}>
                            {identity}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function ProfileTable({ profile }: { profile: Profile | undefined }) {
  if (!profile) return null;

  const { firstName, lastName, displayName, identity } = profile;

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-0 grid h-10 grid-cols-2 items-center">
        <p className="space-y-0 text-base font-semibold text-zinc-600 dark:text-zinc-400">
          First name
        </p>
        <p className="text-black dark:text-zinc-50">{firstName || null}</p>
      </div>
      <div className="mt-0 grid h-10 grid-cols-2 items-center">
        <p className="space-y-0 text-base font-semibold text-zinc-600 dark:text-zinc-400">
          Last name
        </p>
        <p className="text-black dark:text-zinc-50"> {lastName || null}</p>
      </div>
      <div className="mt-0 grid h-10 grid-cols-2 items-center">
        <p className="space-y-0 text-base font-semibold text-zinc-600 dark:text-zinc-400">
          Display name
        </p>
        <p className="text-black dark:text-zinc-50"> {displayName || null}</p>
      </div>
      <div className="mt-0 grid h-10 grid-cols-2 items-center">
        <p className="space-y-0 text-base font-semibold text-zinc-600 dark:text-zinc-400">
          Identity
        </p>
        <p className="text-black dark:text-zinc-50">
          {identity || '-- Please select --'}
        </p>
      </div>
    </div>
  );
}

export default function ProfileContent({
  profile,
}: {
  profile: Profile | undefined;
}) {
  const [isEditStatus, setIsEditStatus] = useState(true);

  const ChangeEditStatus = () => {
    setIsEditStatus(!isEditStatus);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-row justify-end">
        {isEditStatus ? (
          <Button onClick={() => ChangeEditStatus()}>Edit Profile</Button>
        ) : (
          <div className="flex flex-row gap-2">
            <Button variant="ghost" onClick={() => ChangeEditStatus()}>
              Cancel
            </Button>
            <Button onClick={() => ChangeEditStatus()}>Save</Button>
          </div>
        )}
      </div>
      {isEditStatus ? (
        <ProfileTable profile={profile} />
      ) : (
        <EditProfileForm profile={profile} />
      )}
    </div>
  );
}
