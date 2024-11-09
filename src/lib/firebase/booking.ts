import { Booking } from '@/types/booking';
import { db } from '@/lib/firebase/firebase-app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { getCurrentWeekRange } from '../utils';
import { User } from '@/types/user';

const COLLECTION = 'bookings';

interface AddBookingParams {
  user: User;
  date: Date;
}

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

export const getBookingById = async (id: string): Promise<Booking> => {
  try {
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return data as Booking;
  } catch (e) {
    console.error(e);
    throw new Error('Get booking failed');
  }
};

export const deleteBooking = async (id: string, user: User): Promise<void> => {
  try {
    const booking = await getBookingById(id);

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.ownerEmail !== user.email) {
      throw new Error('Unauthorized');
    }

    await deleteDoc(doc(db, COLLECTION, id));
  } catch (e) {
    console.error(e);
    throw new Error('Delete booking failed');
  }
};

export const addBooking = async (params: AddBookingParams) => {
  const { user, date } = params;

  const q = query(
    collection(db, COLLECTION),
    where('date', '>=', date),
    where('date', '<=', date),
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length > 0) {
    throw new Error('Booking already exists');
  }

  await addDoc(collection(db, COLLECTION), {
    ownerEmail: user.email,
    date: date,
    createdAt: new Date(),
  });
};
