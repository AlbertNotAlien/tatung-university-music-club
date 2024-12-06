import { auth } from '@/auth';
import { addBooking, getBookings } from '@/lib/firebase/booking';
import { getUser } from '@/lib/firebase/user';
import dayjs from 'dayjs';

/**
 * @swagger
 * tags:
 *   - name: Bookings
 *     description: Operations about bookings
 *
 * /api/bookings:
 *   get:
 *     tags:
 *       - Bookings
 *     description: Get all bookings
 *     responses:
 *       200:
 *         content:
 *           application/json:
 */
export const GET = async () => {
  const bookings = await getBookings();

  return Response.json(bookings);
};

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags:
 *       - Bookings
 *     description: Create a booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Booking created
 *       400:
 *         description: Invalid date
 *       401:
 *         description: Not authenticated
 */
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
