import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import GoogleSignInButton from '@/components/google-sign-in-button';
import SignInForm from '@/components/sign-in-form';

export default async function Page() {
  const session = await auth();
  if (session?.user) redirect('/booking');

  return (
    <div className="flex h-full w-full flex-1 flex-col justify-center">
      <Card className="mx-auto my-10 w-96 max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign in</CardTitle>
          <CardDescription>Enter your email to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SignInForm />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <GoogleSignInButton />
            <div className="mt-4 flex justify-center text-center text-sm">
              <span>{`Don't have an account?\u00A0`}</span>
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
