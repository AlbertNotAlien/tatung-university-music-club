import { auth } from '@/auth';
import { getUser, updateUser } from '@/lib/firebase/user';

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations about user
 *
 * /api/me:
 *   get:
 *     tags:
 *       - User
 *     description: Get current user data
 *     responses:
 *       200:
 *         description: Successfully retrieved user data
 */
export const GET = auth(async (req) => {
  if (req.auth && req.auth.user) {
    const { user } = req.auth;

    const { email } = user;

    const firebaseUser = await getUser(email as string);

    return Response.json(firebaseUser);
  }

  return Response.json({ message: 'Not authenticated' }, { status: 401 });
});

/**
 * @swagger
 * /api/me:
 *   put:
 *     tags:
 *       - User
 *     description: Update current user data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *        description: User data updated
 */
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
