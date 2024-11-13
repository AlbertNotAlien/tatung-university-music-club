'react';
import ProfileContent from '@/app/setting/profile/profile-content';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <Card className="mx-auto w-[960px] px-24 py-12">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-2xl">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileContent />
      </CardContent>
    </Card>
  );
}
