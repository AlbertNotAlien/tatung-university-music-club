import { auth } from '@/auth';
import { getUser } from '@/lib/firebase/user';

export const GET = auth(async (req) => {
  if (req.auth && req.auth.user) {
    const { user } = req.auth;

    const { email } = user;

    const firebaseUser = await getUser(email as string);

    return Response.json({ user: firebaseUser });
  }

  return Response.json({ message: 'Not authenticated' }, { status: 401 });
});

export async function PUT(request: Request) {
  return Response.json({}, { status: 201 });
}
