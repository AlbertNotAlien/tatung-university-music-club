import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/api/firebase/firebase-app';

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
