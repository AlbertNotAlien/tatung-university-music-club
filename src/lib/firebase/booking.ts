import { Booking } from '@/types/booking';
import { db } from '@/lib/firebase/firebase-app';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getCurrentWeekRange } from '../utils';

const COLLECTION = 'bookings';

export const getBookings = async (): Promise<Booking[]> => {
  try {
    const [startDate, endDate] = getCurrentWeekRange();

    const q = query(
      collection(db, COLLECTION),
      where('date', '>=', startDate),
      where('date', '<=', endDate),
    );

    const querySnapshot = await getDocs(q);

    const bookings = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ownerEmail: doc.data().ownerEmail,
        date: doc.data().date.toDate(),
        createdAt: doc.data().createdAt.toDate(),
      } as Booking;
    });

    return bookings;
  } catch (e) {
    console.error(e);
    throw new Error('Get bookings failed');
  }
};
