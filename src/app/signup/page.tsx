import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import GoogleSignInButton from '@/components/google-sign-in-button';
import SignUpForm from './sign-up-form';

export default function Page() {
  return (
    <div className="flex h-full w-full flex-1 flex-col justify-center">
      <Card className="mx-auto my-10 w-96 max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SignUpForm />
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
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/signin" className="underline">
                Sign in
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
