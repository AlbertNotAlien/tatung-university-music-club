import { auth } from '@/auth';
import { listUsers } from '@/lib/firebase/user';

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - User
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 */
export const GET = auth(async (req) => {
  if (req.auth && req.auth.user) {
    const users = await listUsers();

    return Response.json(users);
  }

  return Response.json({ message: 'Not authenticated' }, { status: 401 });
});
