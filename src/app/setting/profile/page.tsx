import React from 'react';
import { auth } from '@/auth';
import ProfileContent from '@/app/setting/profile/profile-content';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProfile } from '@/lib/firebase/api/profile';

export default async function Page() {
  const session = await auth();
  if (!session?.user) return null;

  const profile = await getProfile(session);
  console.log('profile', profile);

  return (
    <Card className="mx-auto w-[960px] px-24 py-12">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-2xl">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileContent profile={profile} />
      </CardContent>
    </Card>
  );
}
