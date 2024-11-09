import { db } from '@/lib/firebase/firebase-app';
import { User } from '@/types/user';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

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

export const updateUser = async (user: User): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION, user.email);

    await updateDoc(docRef, {
      ...user,
      updatedAt: new Date().toISOString(),
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to update user, user: ${JSON.stringify(user)}`);
  }
};
