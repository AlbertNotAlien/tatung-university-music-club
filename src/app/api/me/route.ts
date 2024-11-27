import { auth } from '@/auth';
import { getUser, updateUser } from '@/lib/firebase/user';

export const GET = auth(async (req) => {
  if (req.auth && req.auth.user) {
    const { user } = req.auth;

    const { email } = user;

    const firebaseUser = await getUser(email as string);

    return Response.json(firebaseUser);
  }

  return Response.json({ message: 'Not authenticated' }, { status: 401 });
});

export const PUT = auth(async (req) => {
  if (req.auth && req.auth.user) {
    const { user } = req.auth;

    const { email } = user;

    const data = await req.json();

    const firebaseUser = await getUser(email as string);

    const newUserData = {
      ...firebaseUser,
      ...data,
    };

    await updateUser(newUserData);

    return Response.json({}, { status: 201 });
  }

  return Response.json({ message: 'Not authenticated' }, { status: 401 });
});
