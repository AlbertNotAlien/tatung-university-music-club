import {
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  query,
  where,
  DocumentData,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase-app';

export type Event = {
  bandName: string;
  date: { year: number; month: number; date: number; day: number };
  times: string[];
};

export async function getEvents(): Promise<Event[] | undefined> {
  try {
    const colRef = collection(db, 'events');
    const colSnapshot = await getDocs(colRef);
    const data: Event[] = colSnapshot.docs.map((doc) => {
      const { band_name, date, times, ...rest } = doc.data();
      return {
        bandName: band_name,
        date: date,
        times: times,
        ...rest,
      };
    });
    return data;
  } catch (error) {
    console.error('[Firestore] Failed to get events data: ', error);
  }
}

export async function addEvent(data: Event) {
  try {
    const { bandName, date, times } = data;
    const newData = { band_name: bandName, date, times };
    const docRef = await addDoc(collection(db, 'events'), newData);
    return docRef.id;
  } catch (error) {
    console.error('[Firestore] Failed to submit event data: ', error);
  }
}

export type User = {
  id: string | null | undefined;
  email: string | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  displayName: string | null | undefined;
  image: string | null | undefined;
  emailVerified: boolean | null | undefined;
};

export async function getUserByEmail({ email }: { email: string }) {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));

    const querySnapshot = await getDocs(q);
    let users: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    if (users.length > 1) throw new Error('[Firestore] Multiple users found');
    return users[0];
  } catch (error) {
    console.error('[Firestore] Failed to get user data: ', error);
  }
}

export async function addUser(
  uid: string | undefined = '',
  {
    email = '',
    firstName = '',
    lastName = '',
    displayName = '',
    image = '',
    emailVerified = false,
  }: Omit<User, 'id'>,
) {
  try {
    const docRef = doc(db, 'users', uid);
    await setDoc(docRef, {
      id: uid,
      email,
      firstName,
      lastName,
      displayName,
      image,
      emailVerified,
    });
  } catch (error) {
    console.error('[Firestore] Failed to sign up: ', error);
  }
}
