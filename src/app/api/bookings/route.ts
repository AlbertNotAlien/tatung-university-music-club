import { auth } from '@/auth';
import { getBookings } from '@/lib/firebase/booking';

export const GET = async () => {
  const bookings = await getBookings();

  return Response.json(bookings);
};
