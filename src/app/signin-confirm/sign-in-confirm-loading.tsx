'use client';

import React, { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase/firebase-app';

export default function SignInConfirmLoading() {
  useEffect(() => {
    const signInConfirm = async () => {
      if (isSignInWithEmailLink(firebaseAuth, window.location.href)) {
        const email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          console.error('[Auth] Email not found in local storage');
          return;
        }
        const credential = await signInWithEmailLink(
          firebaseAuth,
          email,
          window.location.href,
        );
        await signIn('credentials', {
          user: JSON.stringify(credential.user),
          redirect: true,
          callbackUrl: '/',
        });

        window.localStorage.removeItem('emailForSignIn');
      }
    };

    signInConfirm();
  }, []);

  return <p>Loading...</p>;
}
