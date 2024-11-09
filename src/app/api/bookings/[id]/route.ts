import { auth } from '@/auth';
import { deleteBooking } from '@/lib/firebase/booking';
import { getUser } from '@/lib/firebase/user';

export const DELETE = auth(async (req, { params }) => {
  if (req.auth && req.auth.user) {
    try {
      const { user } = req.auth;
      const { email } = user;
      const { id } = params as { id: string };

      const firebaseUser = await getUser(email as string);

      if (!firebaseUser) {
        return Response.json({ message: 'User not found' }, { status: 404 });
      }

      await deleteBooking(id, firebaseUser);
      return Response.json(
        { message: 'Delete booking successfully' },
        { status: 200 },
      );
    } catch (e) {
      console.error(e);
      return Response.json(
        { message: 'Delete booking failed' },
        { status: 400 },
      );
    }
  }
  return Response.json({ message: 'Not authenticated' }, { status: 401 });
});
