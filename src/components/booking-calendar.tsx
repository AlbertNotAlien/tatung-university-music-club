'use client';

import React from 'react';
import { ChevronsUp, Plus } from 'lucide-react';
import { Event } from '@/lib/firebase/firestore';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const MONTHS_OF_YEAR = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const HOURS_OF_DAY = [
  { value: '00:00', label: '12 AM' },
  { value: '01:00', label: '1 AM' },
  { value: '02:00', label: '2 AM' },
  { value: '03:00', label: '3 AM' },
  { value: '04:00', label: '4 AM' },

  { value: '05:00', label: '5 AM' },
  { value: '06:00', label: '6 AM' },
  { value: '07:00', label: '7 AM' },
  { value: '08:00', label: '8 AM' },
  { value: '09:00', label: '9 AM' },
  { value: '10:00', label: '10 AM' },
  { value: '11:00', label: '11 AM' },
  { value: '12:00', label: '12 PM' },
  { value: '13:00', label: '1 PM' },
  { value: '14:00', label: '2 PM' },
  { value: '15:00', label: '3 PM' },
  { value: '16:00', label: '4 PM' },
  { value: '17:00', label: '5 PM' },
  { value: '18:00', label: '6 PM' },
  { value: '19:00', label: '7 PM' },
  { value: '20:00', label: '8 PM' },
  { value: '21:00', label: '9 PM' },
  { value: '22:00', label: '10 PM' },
  { value: '23:00', label: '11 PM' },
];

function generateWeekDatesFromDate(date: Date): Date[] {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  return Array.from({ length: 7 }, (_, index) => {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(currentDate.getDate() + index);
    return currentDate;
  });
}

function findEventByHour(events: Event[], date: Date, hour: string) {
  return events.find(
    (event) =>
      event.date.year === date.getFullYear() &&
      event.date.month === date.getMonth() &&
      event.date.date === date.getDate() &&
      event.times.includes(hour),
  );
}

type BookingCalendarProps = {
  events: Event[] | undefined;
};

export function BookingCalendar({ events = [] }: BookingCalendarProps) {
  const selectedDate = new Date();
  const selectedWeek = generateWeekDatesFromDate(selectedDate);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between py-1 md:py-2">
        <h3 className="text-2xl font-semibold md:text-3xl">{`${selectedDate.getFullYear()} ${MONTHS_OF_YEAR[selectedDate.getMonth()]}`}</h3>
      </div>
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-8 md:w-14" />
            {selectedWeek.map((date, index) => (
              <TableHead key={date.toString()} className="p-0 text-xs">
                <div className="flex flex-col items-center justify-center md:flex-row md:gap-x-2 md:text-base">
                  <p>{selectedWeek[index].getDate()}</p>
                  <p>{DAYS_OF_WEEK[date.getDay()]}</p>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={8} className="p-0">
              <Button
                variant="ghost"
                className="flex h-10 w-full items-center justify-center"
              >
                <ChevronsUp className="h-4 stroke-muted-foreground" />
              </Button>
            </TableCell>
          </TableRow>
          {HOURS_OF_DAY.map((hour) => (
            <TableRow key={hour.value}>
              <TableCell className="text-2xs p-0 text-muted-foreground md:text-xs">
                {hour.label}
              </TableCell>
              {selectedWeek.map((date) => {
                const bookedData = findEventByHour(events, date, hour.value);
                return (
                  <TableCell
                    key={date.toString()}
                    className="px-0.5 py-2 md:px-2 md:py-4"
                  >
                    {bookedData ? (
                      <Button
                        variant="outline"
                        className="h-10 max-h-10 w-full whitespace-normal px-1 py-0"
                      >
                        <p className="text-2xs line-clamp-2 md:line-clamp-1 md:text-xs">
                          {bookedData.bandName}
                        </p>
                      </Button>
                    ) : (
                      <Button variant="outline" className="h-10 w-full">
                        <Plus className="w-4 min-w-2" />
                      </Button>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
