import React from 'react';
import { BookingCalendar } from '@/components/booking-calendar';
import { getEvents } from '@/api/firebase/firestore';

export default async function Page() {
  const events = await getEvents();

  return <BookingCalendar events={events} />;
}
