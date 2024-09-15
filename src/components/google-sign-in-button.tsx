'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);
        await signIn('google');
      }}
    >
      <div className="flex space-x-[10px]">
        {isLoading ? (
          <Icons.Spinner className="h-5 w-5 animate-spin" />
        ) : (
          <Image src="/google.svg" alt="Google" width={20} height={20} />
        )}
        <span>Sign in with Google</span>
      </div>
    </Button>
  );
}
