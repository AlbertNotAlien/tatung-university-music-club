import { Band } from '@/types/band';
import {
  collection,
  doc,
  DocumentReference,
  getDocs,
  query,
} from 'firebase/firestore';
import { db } from './firebase-app';
import { getUser } from './user';

const COLLECTION = 'bands';

export const getBands = async (): Promise<Band[]> => {
  try {
    const q = query(collection(db, COLLECTION));

    const querySnapshot = await getDocs(q);

    const bands = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const leaderEmail = doc.data().leader_ref.id;
        const ownerEmail = doc.data().owner_ref.id;
        const leader = await getUser(leaderEmail);
        const owner = await getUser(ownerEmail);
        const memberEmails = doc
          .data()
          .member_refs.map((member: DocumentReference) => member.id);

        const members = await Promise.all(
          memberEmails.map(async (email: string) => {
            return await getUser(email);
          }),
        );

        return {
          id: doc.id,
          name: doc.data().name,
          leader,
          owner,
          members,
          createdAt: doc.data().created_at.toDate(),
        } as Band;
      }),
    );

    return bands;
  } catch (e) {
    console.error(e);
    throw new Error('Get bands failed');
  }
};
