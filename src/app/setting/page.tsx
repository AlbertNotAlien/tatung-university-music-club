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
    <Tabs defaultValue="profile" className="mt-4 w-full">
      <TabsList>
        <TabsTrigger value="profile">profile</TabsTrigger>
        <TabsTrigger value="bands">bands</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card className="mx-auto w-full px-24 py-12">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle className="text-2xl">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {userEmail ? <Profile /> : <p>Email not found, please login.</p>}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="bands">
        <Card className="mx-auto w-full px-24 py-12">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle className="text-2xl">Bands</CardTitle>
          </CardHeader>
          <CardContent>
            <Bands />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
