import { auth } from '@/auth';
import { addBooking, getBookings } from '@/lib/firebase/booking';
import { getUser } from '@/lib/firebase/user';
import dayjs from 'dayjs';

export const GET = async () => {
  const bookings = await getBookings();

  return Response.json(bookings);
};

export const POST = auth(async (req) => {
  if (req.auth && req.auth.user) {
    try {
      const { date } = await req.json();

      if (!dayjs(date).isValid()) {
        return Response.json({ message: 'Invalid date' }, { status: 400 });
      }

      const validDate = dayjs(date).toDate();

      const { email } = req.auth.user;

      const firebaseUser = await getUser(email as string);

      await addBooking({
        user: firebaseUser,
        date: validDate,
      });

      return Response.json(
        {
          message: 'Booking created',
        },
        { status: 201 },
      );
    } catch (e) {
      console.error(e);
      return Response.json({ message: (e as Error).message }, { status: 400 });
    }
  }
  return Response.json({ message: 'Not authenticated' }, { status: 401 });
});
