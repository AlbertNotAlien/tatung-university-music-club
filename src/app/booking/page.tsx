import React from 'react';
import { BookingCalendar } from '@/components/booking-calendar';
import { fetchBookings } from '@/lib/firebase/api';

export default async function Page() {
  const bookings = await fetchBookings();

  return <BookingCalendar bookings={bookings} />;
}
