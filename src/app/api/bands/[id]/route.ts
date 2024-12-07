import { auth } from '@/auth';
import { deleteBand, getBandById } from '@/lib/firebase/band';
import { getUser } from '@/lib/firebase/user';

/**
 * @swagger
 * /api/bands/{id}:
 *   delete:
 *     summary: Delete a band by its ID
 *     description: Deletes a band if the authenticated user is the owner or leader of the band.
 *     tags:
 *       - Bands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the band to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Band deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Band deleted
 *       400:
 *         description: Band ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Band ID is required
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: User is not the owner or leader of the band
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not the owner or leader of this band
 *       404:
 *         description: Band not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Band not found
 */
export const DELETE = auth(async (req, { params }) => {
  if (req.auth && req.auth.user) {
    const { user } = req.auth;

    const { email } = user;

    const firebaseUser = await getUser(email as string);

    const { id } = params as { id: string };

    console.log(id);

    if (!id) {
      return Response.json({ message: 'Band ID is required' }, { status: 400 });
    }

    const band = await getBandById(id);

    if (!band) {
      return Response.json({ message: 'Band not found' }, { status: 404 });
    }

    if (
      band.owner.email !== firebaseUser.email ||
      band.leader.email !== firebaseUser.email
    ) {
      return Response.json(
        { message: 'You are not the owner or leader of this band' },
        { status: 403 },
      );
    }

    await deleteBand(id);

    return Response.json({ message: 'Band deleted' });
  }

  return Response.json({ message: 'Unauthorized' }, { status: 401 });
});
