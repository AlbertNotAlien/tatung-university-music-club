import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase-app';
import { Session } from 'next-auth';

export type Profile = {
  firstName: string;
  lastName: string;
  displayName: string;
  identity: string;
};

export async function getProfile(
  session: Session,
): Promise<Profile | undefined> {
  try {
    const userId = session?.user?.id;

    if (!userId) {
      console.error('[Firestore] User ID is undefined');
      return undefined;
    }

    const colRef = doc(db, 'users', userId);

    const colSnapshot = await getDoc(colRef);

    if (!colSnapshot.exists()) {
      console.log('No such colSnapshot document!');
      return undefined;
    }

    const profileData = colSnapshot.data() as Profile;
    return profileData;
  } catch (error) {
    console.error('[Firestore] Failed to get profile data: ', error);
  }
}
