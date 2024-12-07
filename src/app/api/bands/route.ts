import { auth } from '@/auth';
import { createBand, getBandByName, getBands } from '@/lib/firebase/band';
import { getUser } from '@/lib/firebase/user';
import { Band } from '@/types/band';

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
 *         description: Successfully retrieved bands
 */
export const GET = auth(async (req) => {
  if (req.auth && req.auth.user) {
    const bands = await getBands();

    return Response.json(bands);
  }

  return Response.json({ message: 'Not authenticated' }, { status: 401 });
});

/**
 * @swagger
 * /api/bands:
 *   post:
 *     tags:
 *       - Bands
 *     summary: Create a new band
 *     description: This endpoint allows authenticated users to create a new band with a specified leader and members.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the band.
 *                 example: The Rockers
 *               leaderEmail:
 *                 type: string
 *                 description: The email of the band leader. If not provided, the creator's email is used.
 *                 example: leader@example.com
 *               memberEmails:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: A list of emails of band members.
 *                 example: ["member1@example.com", "member2@example.com"]
 *     responses:
 *       201:
 *         description: Successfully created band
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: POST request to the bands page
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Band name is required
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 */
export const POST = auth(async (req) => {
  if (req.auth && req.auth.user) {
    const { user } = req.auth;

    const { email } = user;

    const firebaseUser = await getUser(email as string);

    const { name, leaderEmail, memberEmails } = await req.json();

    if (!name) {
      return Response.json(
        { message: 'Band name is required' },
        { status: 400 },
      );
    }

    const bandNameExisted = await getBandByName(name);

    if (bandNameExisted) {
      return Response.json(
        { message: `Band with name ${name} already exists` },
        { status: 400 },
      );
    }

    let newBandLeader = leaderEmail;

    if (leaderEmail) {
      const leader = await getUser(leaderEmail as string);

      if (!leader) {
        return Response.json({ message: 'Leader not found' }, { status: 400 });
      }
      newBandLeader = leader;
    } else {
      newBandLeader = firebaseUser;
    }

    const newBandMembersEmails = memberEmails || [];

    const members = [];
    for (const email of newBandMembersEmails) {
      const member = await getUser(email);
      if (!member) {
        return Response.json(
          { message: `Member with email ${email} not found` },
          { status: 400 },
        );
      }
      members.push(member);
    }

    const band: Band = {
      name,
      leader: newBandLeader,
      owner: firebaseUser,
      members: [...members],
      createdAt: new Date(),
    };

    await createBand(band);

    return Response.json({ message: 'Band created' }, { status: 201 });
  }
  return Response.json({ message: 'Not authenticated' }, { status: 401 });
});
