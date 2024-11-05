import React from 'react';
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

export default async function Page() {
  const session = await auth();
  if (session?.user) redirect('/booking');

  return (
    <div className="flex h-full w-full flex-1 flex-col justify-center">
      <Card className="mx-auto my-10 w-96 max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign in</CardTitle>
          <CardDescription>
            Sign in to start booking the rehearsal room.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleSignInButton />
        </CardContent>
      </Card>
    </div>
  );
}
