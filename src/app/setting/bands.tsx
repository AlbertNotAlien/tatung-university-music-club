import React from 'react';
import { Band } from '@/types/band';
import { cn } from '@/lib/utils';
import AddNewBandCreator from '@/components/band-form-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const bandDummyData = [
  {
    bandName: 'band-A',
    members: [
      { displayName: 'band-A-member-1', email: '', image: '', isLeader: true },
      { displayName: 'band-A-member-2', email: '', image: '', isLeader: false },
      { displayName: 'band-A-member-3', email: '', image: '', isLeader: false },
      { displayName: 'band-A-member-4', email: '', image: '', isLeader: false },
      { displayName: 'band-A-member-5', email: '', image: '', isLeader: false },
    ],
  },
  {
    bandName: 'band-B',
    members: [
      { displayName: 'band-B-member-1', email: '', image: '', isLeader: false },
      { displayName: 'band-B-member-2', email: '', image: '', isLeader: true },
      { displayName: 'band-B-member-3', email: '', image: '', isLeader: false },
    ],
  },
  {
    bandName: 'band-C',
    members: [
      { displayName: 'band-C-member-1', email: '', image: '', isLeader: false },
      { displayName: 'band-C-member-2', email: '', image: '', isLeader: false },
      { displayName: 'band-C-member-3', email: '', image: '', isLeader: true },
      { displayName: 'band-C-member-4', email: '', image: '', isLeader: false },
    ],
  },
];

const userDataList = [
  {
    displayName: 'AlbertNotAlienButIsHuman',
    email: 'albertnotalien@gmail.com',
    image: '',
    isLeader: false,
  },
  {
    displayName: 'WhoIsABrian8787',
    email: 'briannotalien@gmail.com',
    image: '',
    isLeader: false,
  },
  {
    displayName: 'CindyDontKnowWhy88',
    email: 'cindynotalien@gmail.com',
    image: '',
    isLeader: false,
  },
  {
    displayName: 'DannyIsADoggy83',
    email: 'dannyisadog@gmail.com',
    image: '',
    isLeader: false,
  },
  {
    displayName: 'StanleyHaw94',
    email: 'stanleyhaw94@gmail.com',
    image: '',
    isLeader: false,
  },
  {
    displayName: 'JackyChanGuitar',
    email: 'jackyisacat@gmail.com',
    image: '',
    isLeader: false,
  },
];

function BandCard({ bandName, members }: Band) {
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
            const { displayName, isLeader } = member;
            return (
              <li
                key={displayName}
                className={cn(
                  isLeader ? 'font-bold' : 'font-normal',
                  'relative left-4 list-disc',
                )}
              >
                {displayName}
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
  const defaultValue = { bandName: '', members: [] };

  return (
    <div
      className={cn(
        'grid auto-rows-fr grid-cols-1 grid-rows-[3rem,1fr] gap-4',
        'md:grid md:grid-cols-2 md:grid-rows-none',
        'lg:grid-cols-3',
      )}
    >
      <AddNewBandCreator
        band={defaultValue}
        userData={userDataList}
        bandList={bandDummyData}
        className="h-full md:h-[300px]"
      >
        Add new band
      </AddNewBandCreator>
      {bandDummyData.map((band) => {
        const { bandName, members } = band;
        return (
          <BandCard key={bandName} bandName={bandName} members={members} />
        );
      })}
    </div>
  );
}
