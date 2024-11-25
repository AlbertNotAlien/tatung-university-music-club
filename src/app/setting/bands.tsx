import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const bandDummyData = [
  {
    bandName: 'band-A',
    members: [
      { name: 'band-A-member-1', isLeader: true },
      { name: 'band-A-member-2', isLeader: false },
      { name: 'band-A-member-3', isLeader: false },
      { name: 'band-A-member-4', isLeader: false },
      { name: 'band-A-member-5', isLeader: false },
    ],
  },
  {
    bandName: 'band-B',
    members: [
      { name: 'band-B-member-1', isLeader: false },
      { name: 'band-B-member-2', isLeader: true },
      { name: 'band-B-member-3', isLeader: false },
    ],
  },
  {
    bandName: 'band-C',
    members: [
      { name: 'band-C-member-1', isLeader: false },
      { name: 'band-C-member-2', isLeader: false },
      { name: 'band-C-member-3', isLeader: true },
      { name: 'band-C-member-4', isLeader: false },
    ],
  },
];

type MemberProps = {
  name: string;
  isLeader: boolean;
};

type BandCardProps = {
  bandName: string;
  members: MemberProps[];
};

function BandCard({ bandName, members }: BandCardProps) {
  const sortedMemberList = [...members].sort(
    (a, b) => (b.isLeader ? 1 : 0) - (a.isLeader ? 1 : 0),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{bandName}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {sortedMemberList.map((member) => {
            const { name, isLeader } = member;
            return (
              <li
                key={name}
                className={cn(
                  'relative left-4 list-disc',
                  isLeader ? 'font-bold' : 'font-normal',
                )}
              >
                {name}
                {isLeader && ' (Leader)'}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function Bands() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {bandDummyData.map((band) => {
        const { bandName, members } = band;
        return (
          <BandCard key={bandName} bandName={bandName} members={members} />
        );
      })}
    </div>
  );
}
