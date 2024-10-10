import {
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  query,
  where,
  DocumentData,
  DocumentReference,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase-app';

type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

type Band = {
  id: string;
  name: string;
  membersRefs: DocumentReference[];
  leaderRef: DocumentReference;
  ownerRef: DocumentReference;
};

export async function getBandById(id: string): Promise<Band | undefined> {
  try {
    const docRef = doc(db, 'bands', id);
    const docSnap = await getDoc(docRef);
    const data: DocumentData | undefined = docSnap.data();
    if (!data) throw new Error('Band not found');
    const band = {
      id: docSnap.id,
      name: data.name,
      membersRefs: data.members_refs,
      leaderRef: data.leader_ref,
      ownerRef: data.owner_ref,
    };
    return band;
  } catch (error) {
    console.error('[Firestore] Failed to get band data: ', error);
  }
}

export type Booking = {
  id: string;
  notifications: Timestamp[];
  timeInfo: {
    startTime: Timestamp;
    endTime: Timestamp;
  };
  userInfo: {
    ownerId: string;
    roomUserId: string;
    temporaryMemberIds: string[];
  };
  version: string;
};

export type BookingWithUserInfo = Omit<Booking, 'userInfo'> & {
  userInfo: Omit<Booking['userInfo'], 'roomUserId'> & {
    roomUser: {
      name: string | null | undefined;
      id: string;
    };
    ownerId: string;
    temporaryMemberIds: string[];
  };
};

async function transformBookingToBookingWithUserInfo(
  booking: Booking,
): Promise<BookingWithUserInfo> {
  const { roomUserId, ...rest } = booking.userInfo;
  const roomUser = await getBandById(roomUserId);

  return {
    ...booking,
    userInfo: {
      roomUser: { name: roomUser?.name, id: roomUserId },
      ...rest,
    },
  };
}

export async function fetchBookings(): Promise<
  BookingWithUserInfo[] | undefined
> {
  try {
    const colRef = collection(db, 'bookings');
    const colSnapshot = await getDocs(colRef);
    const bookings: Booking[] = colSnapshot.docs.map((doc) => {
      const { time_info, user_info, id, notifications, version } = doc.data();
      return {
        timeInfo: {
          startTime: {
            seconds: time_info.start_time.seconds,
            nanoseconds: time_info.start_time.nanoseconds,
          },
          endTime: {
            seconds: time_info.end_time.seconds,
            nanoseconds: time_info.end_time.nanoseconds,
          },
        },
        userInfo: {
          ownerId: user_info.owner_ref.id,
          roomUserId: user_info.room_user_ref.id,
          temporaryMemberIds: user_info.temporary_members.map(
            (temporaryMember: DocumentReference) => temporaryMember.id,
          ),
        },
        id,
        notifications,
        version,
      };
    });

    const bookingsWithUserInfo: BookingWithUserInfo[] = await Promise.all(
      bookings.map(transformBookingToBookingWithUserInfo),
    );

    return bookingsWithUserInfo;
  } catch (error) {
    console.error('[Firestore] Failed to get bookings data: ', error);
  }
}

export async function addBooking(data: Booking) {
  try {
    const { timeInfo, userInfo, ...rest } = data;
    const newData = { time_info: timeInfo, user_info: userInfo, ...rest };
    const docRef = await addDoc(collection(db, 'bookings'), newData);
    return docRef.id;
  } catch (error) {
    console.error('[Firestore] Failed to submit event data: ', error);
  }
}

export type User = {
  id: string | null | undefined;
  email: string | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  displayName: string | null | undefined;
  image: string | null | undefined;
  emailVerified: boolean | null | undefined;
};

export async function getUserByEmail({ email }: { email: string }) {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));

    const querySnapshot = await getDocs(q);
    let users: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    if (users.length > 1) throw new Error('[Firestore] Multiple users found');
    return users[0];
  } catch (error) {
    console.error('[Firestore] Failed to get user data: ', error);
  }
}

export async function addUser(
  uid: string | undefined = '',
  {
    email = '',
    firstName = '',
    lastName = '',
    displayName = '',
    image = '',
    emailVerified = false,
  }: Omit<User, 'id'>,
) {
  try {
    const docRef = doc(db, 'users', uid);
    await setDoc(docRef, {
      id: uid,
      email,
      firstName,
      lastName,
      displayName,
      image,
      emailVerified,
    });
  } catch (error) {
    console.error('[Firestore] Failed to sign up: ', error);
  }
}
