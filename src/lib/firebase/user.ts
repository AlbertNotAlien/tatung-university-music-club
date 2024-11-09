import { db } from '@/lib/firebase/firebase-app';
import { User } from '@/types/user';
import { doc, getDoc } from 'firebase/firestore';

const COLLECTION = 'users';

export const getUser = async (email: string): Promise<User> => {
  try {
    const docRef = doc(db, COLLECTION, email);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return data as User;
  } catch (e) {
    console.error(e);
    throw new Error(`User not found, email: ${email}`);
  }
};
