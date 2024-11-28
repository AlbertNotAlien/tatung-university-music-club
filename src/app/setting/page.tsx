import React from 'react';
import { auth } from '@/auth';
import Profile from '@/app/setting/profile';
import Bands from '@/app/setting/bands';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function Page() {
  const session = await auth();
  const userEmail = session?.user?.email;

  return (
    <Tabs defaultValue="profile" className="w-full mt-4">
      <TabsList>
        <TabsTrigger value="profile">profile</TabsTrigger>
        <TabsTrigger value="bands">bands</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card className="w-full mx-auto border-0 shadow-none">
          <CardHeader className="flex flex-row justify-between px-0">
            <CardTitle className="text-2xl">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {userEmail ? <Profile /> : <p>Email not found, please login.</p>}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="bands">
        <Card className="w-full mx-auto border-0 shadow-none">
          <CardHeader className="flex flex-row justify-between px-0">
            <CardTitle className="text-2xl">My bands</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Bands />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
