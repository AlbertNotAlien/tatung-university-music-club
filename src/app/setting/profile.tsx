'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetProfile, useUpdateProfile } from '@/hooks/use-profile-data';
import { useDisclosure } from '@/hooks/use-disclosure';
import { profileSchema } from '@/lib/zod';
import { User } from '@/types/user';
import { Identity } from '@/data/identity-list';
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
  FormMessage,
} from '@/components/ui/form';
import Loading from './loading';
import Error from './error';

// TODO: I need profile list's Identity please provide api for me DEAR DANNY SAMA.

type EditProfileFormProps = {
  user: User;
  onClose: () => void;
  refetch: () => void;
};

function EditProfileForm({ user, onClose, refetch }: EditProfileFormProps) {
  const { firstName, lastName, displayName } = user;
  const { mutateAsync, isPending: isLoading } = useUpdateProfile();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName,
      lastName,
      displayName,
      identity: Identity.Student,
    },
  });

  const { control, handleSubmit } = form;
  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    const newData: User = { ...user, ...data };

    try {
      await mutateAsync(newData);
      refetch();
      onClose();
    } catch (error) {
      console.error('[Update profile] Failed to update profile:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 mt-0 flex flex-row justify-end gap-4">
          <Button type="button" variant="ghost" onClick={onClose}>
            {!isLoading ? 'cancel' : null}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {!isLoading ? 'Save' : 'Loading...'}
          </Button>
        </div>
        <div className="flex flex-col gap-8">
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
                <FormMessage className="col-start-2" />
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
                <FormMessage className="col-start-2" />
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
                <FormMessage className="col-start-2" />
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
                    <SelectContent position="popper">
                      <SelectGroup>
                        {Object.values(Identity).map((identity) => (
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
        </div>
      </form>
    </Form>
  );
}

type ProfileListProps = {
  user: User;
  onOpen: () => void;
};

function ProfileList({ user, onOpen }: ProfileListProps) {
  const { firstName, lastName, displayName } = user;

  return (
    <div className="flex flex-col gap-8">
      <div className="m-0 flex flex-row justify-end gap-4">
        <Button className="relative right-0 w-['300']" onClick={onOpen}>
          Edit Profile
        </Button>
      </div>
      <div className="mt-0 grid h-10 grid-cols-2 items-center">
        <p className="space-y-0 text-base font-semibold text-zinc-600 dark:text-zinc-400">
          First name
        </p>
        <p className="text-black dark:text-zinc-50">{firstName}</p>
      </div>
      <div className="mt-0 grid h-10 grid-cols-2 items-center">
        <p className="space-y-0 text-base font-semibold text-zinc-600 dark:text-zinc-400">
          Last name
        </p>
        <p className="text-black dark:text-zinc-50">{lastName}</p>
      </div>
      <div className="mt-0 grid h-10 grid-cols-2 items-center">
        <p className="space-y-0 text-base font-semibold text-zinc-600 dark:text-zinc-400">
          Display name
        </p>
        <p className="text-black dark:text-zinc-50">{displayName}</p>
      </div>
      <div className="mt-0 grid h-10 grid-cols-2 items-center">
        <p className="space-y-0 text-base font-semibold text-zinc-600 dark:text-zinc-400">
          Identity
        </p>
        <p className="text-black dark:text-zinc-50">{Identity.Student}</p>
      </div>
    </div>
  );
}

export default function Profile({ email }: { email: string }) {
  const { opened: isEditStatus, open, close } = useDisclosure();
  const { data: user, isLoading, isError, refetch } = useGetProfile(email);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (!user) return <p>User not found, please login.</p>;

  return (
    <div className="flex w-full flex-col gap-4">
      {isEditStatus ? (
        <EditProfileForm user={user} onClose={close} refetch={refetch} />
      ) : (
        <ProfileList user={user} onOpen={open} />
      )}
    </div>
  );
}
