import { auth } from '@/auth';
import { getBands } from '@/lib/firebase/band';

export const GET = auth(async (req) => {
  if (req.auth && req.auth.user) {
    const bands = await getBands();

    return Response.json(bands);
  }

  return Response.json({ message: 'Not authenticated' }, { status: 401 });
});
