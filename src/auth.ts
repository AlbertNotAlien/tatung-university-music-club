import NextAuth, { User } from 'next-auth';
import Google from 'next-auth/providers/google';
import { getUserByEmail, addUser } from './lib/firebase/api';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, user, profile }) {
      if (!user || !user.email?.length) return false;

      if (account?.provider === 'google') {
        try {
          const isUserExist = await getUserByEmail({
            email: user.email,
          });

          if (isUserExist) {
            return true;
          } else {
            await addUser(user.id, {
              email: user.email,
              displayName: user.name,
              image: user.image,
              firstName: profile ? profile.given_name : '',
              lastName: profile ? profile.family_name : '',
              emailVerified: false,
            });
          }
        } catch (error) {
          console.error('[Auth] Failed to sign in: ', error);
          return false;
        }
      }
      return true;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
});
