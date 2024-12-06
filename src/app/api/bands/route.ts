import { auth } from '@/auth';
import { getBands } from '@/lib/firebase/band';

/**
 * @swagger
 * tags:
 *   - name: Bands
 *     description: Operations about bands
 *
 * /api/bands:
 *   get:
 *     tags:
 *       - Bands
 *     description: Get all bands
 *     responses:
 *       200:
 *         content:
 *           application/json:
 */
export const GET = auth(async (req) => {
  if (req.auth && req.auth.user) {
    const bands = await getBands();

    return Response.json(bands);
  }

  return Response.json({ message: 'Not authenticated' }, { status: 401 });
});
