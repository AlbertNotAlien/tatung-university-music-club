'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signInSchema } from '@/lib/zod';
import { firebaseAuth } from '@/lib/firebase/firebase-app';
import { Icons } from '@/components/icons';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const actionCodeSettings = {
  handleCodeInApp: true,
};

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      setIsLoading(true);
      await sendSignInLinkToEmail(firebaseAuth, values.email, {
        ...actionCodeSettings,
        url: `${window.location.origin}/signin-confirm`,
      });
      window.localStorage.setItem('emailForSignIn', values.email);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <span>Sign in</span>
          </div>
        </Button>
      </form>
    </Form>
  );
}
