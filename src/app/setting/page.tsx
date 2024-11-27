import React from 'react';
import { auth } from '@/auth';
import Profile from '@/app/setting/profile';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page() {
  const session = await auth();
  const userEmail = session?.user?.email;

  return (
    <Card className="mx-auto w-[960px] px-24 py-12">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-2xl">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {userEmail ? <Profile /> : <p>Email not found, please login.</p>}
      </CardContent>
    </Card>
  );
}
