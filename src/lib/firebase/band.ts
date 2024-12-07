import { Band } from '@/types/band';
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase-app';
import { getUser } from './user';

const COLLECTION = 'bands';

export const getBands = async (): Promise<Band[]> => {
  try {
    const q = query(collection(db, COLLECTION), where('is_active', '==', true));

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

export const createBand = async (band: Band): Promise<void> => {
  console.log(band);
  try {
    await setDoc(doc(collection(db, COLLECTION)), {
      name: band.name,
      leader_ref: doc(db, 'users', band.leader.email),
      owner_ref: doc(db, 'users', band.owner.email),
      member_refs: band.members.map((member) => doc(db, 'users', member.email)),
      created_at: band.createdAt,
    });
  } catch (e) {
    console.error(e);
    throw new Error('Create band failed');
  }
};

export const deleteBand = async (id: string): Promise<void> => {
  try {
    await updateDoc(doc(db, COLLECTION, id), {
      is_active: false,
    });
  } catch (e) {
    console.error(e);
    throw new Error('Delete band failed');
  }
};

export const getBandByName = async (name: string): Promise<Band | null> => {
  try {
    const q = query(collection(db, COLLECTION), where('name', '==', name));

    const querySnapshot = await getDocs(q);

    const doc = querySnapshot.docs[0];

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
  } catch (e) {
    return null;
  }
};

export const getBandById = async (id: string): Promise<Band | null> => {
  try {
    console.log({ id });
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    if (!data) {
      return null;
    }

    const leaderEmail = data.leader_ref.id;
    const ownerEmail = data.owner_ref.id;
    const leader = await getUser(leaderEmail);
    const owner = await getUser(ownerEmail);
    const memberEmails = data.member_refs.map(
      (member: DocumentReference) => member.id,
    );

    const members = await Promise.all(
      memberEmails.map(async (email: string) => {
        return await getUser(email);
      }),
    );

    return {
      id: data.id,
      name: data.name,
      leader,
      owner,
      members,
      createdAt: data.created_at.toDate(),
    } as Band;
  } catch (e) {
    return null;
  }
};
