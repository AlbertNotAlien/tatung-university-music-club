'use client';

// TODO: auto sign in after sign up

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signUpSchema } from '@/lib/zod';
import { firebaseAuth } from '@/lib/firebase/firebase-app';
import { getUserByEmail, addUser } from '@/lib/firebase/api';
import { Icons } from '@/components/icons';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      displayName: '',
      email: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);

    try {
      const isUserExist = await getUserByEmail({
        email: values.email,
      });
      if (isUserExist) {
        throw new Error('User already exists');
      } else if (firebaseAuth) {
        const userCredential = await createUserWithEmailAndPassword(
          firebaseAuth,
          values.email,
          '',
        );
        await addUser(userCredential.user.uid, {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          displayName: values.displayName,
          image: '',
          emailVerified: false,
        });
        if (!firebaseAuth.currentUser) return;
        await sendEmailVerification(firebaseAuth.currentUser);
        toast({
          title: 'Check your email',
          description:
            'We sent you a login link. Be sure to check your spam too.',
        });

        router.push('/settings');
      } else {
        console.error(
          '[Auth] Failed to sign up: firebaseAuth.currentUser is null',
        );
      }
    } catch (error) {
      toast({
        title: 'Something went wrong.',
        description: `Your sign up request failed. Please try again. ${error}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <div className="flex space-x-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      autoComplete="given-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Last name"
                      autoComplete="family-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Display name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          <div className="flex space-x-[10px]">
            {isLoading && <Icons.Spinner className="h-5 w-5 animate-spin" />}
            <span>Create an account</span>
          </div>
        </Button>
      </form>
    </Form>
  );
}
