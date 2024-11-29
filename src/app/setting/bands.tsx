import React from 'react';
import { cn } from '@/lib/utils';
import AddNewBandCreator from '@/components/band-form-dialog';
import BandCard from '@/components/band-card';

const bandDummyData = [
  {
    bandName: 'MAMAMIYA',
    members: [
      {
        displayName: 'HeathDolton',
        email: 'heathdolton@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/608862?s=80&v=4',
        isLeader: true,
      },
      {
        displayName: 'Maynard',
        email: 'maynard@gmail.com',
        image:
          'https://avatars.githubusercontent.com/u/13075469?s=80&u=22c3d8a679382343dcc5bfef63b5177647cf379c&v=4',
        isLeader: false,
      },
      {
        displayName: 'Angela',
        email: 'angela@gmail.com',
        image:
          'https://avatars.githubusercontent.com/u/3827372?s=80&u=a9327f0cf5c1622940a0270fcbea7fe330105d93&v=4',
        isLeader: false,
      },
      {
        displayName: 'SamsonBarton',
        email: 'samsonbarton@gmail.com',
        image:
          'https://avatars.githubusercontent.com/u/6465955?s=80&u=bd9e32cf31ef1298707402da4ed944c6dd3f84b0&v=4',
        isLeader: false,
      },
      {
        displayName: 'PercivalClemPercivalClemPercivalClemPercivalClem',
        email: 'percivalclem@gmail.com',
        image:
          'https://avatars.githubusercontent.com/u/5188459?s=80&u=738baeb42b1f92ddd187b10fc834f89a1e8149d2&v=4',
        isLeader: false,
      },
    ],
  },
  {
    bandName: '地獄羊肉爐',
    members: [
      {
        displayName: 'KenBourn',
        email: 'kenbourn@gmail.com',
        image: '',
        isLeader: false,
      },
      {
        displayName: 'ShanaRyan',
        email: 'shanaryan@gmail.com',
        image: '',
        isLeader: true,
      },
      {
        displayName: 'RoyLambert',
        email: 'roylambert@gmail.com',
        image: '',
        isLeader: false,
      },
    ],
  },
  {
    bandName: 'ゲスの極み乙女',
    members: [
      {
        displayName: 'HazelWalker',
        email: 'hazelwalker@gmail.com',
        image:
          'https://avatars.githubusercontent.com/u/1172479?s=80&u=cd1ec54c67ca6e7b93f0288c6b4259c307b42f6f&v=4',
        isLeader: false,
      },
      {
        displayName: 'ToddLawrence',
        email: 'toddlawrence@gmail.com',
        image: '',
        isLeader: false,
      },
      {
        displayName: 'SelenaLamb',
        email: 'selenalamb@gmail.com',
        image: '',
        isLeader: true,
      },
      {
        displayName: 'WinstonRogers',
        email: 'winstonrogers@gmail.com',
        image: '',
        isLeader: false,
      },
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

export default function Bands() {
  const defaultValue = { bandName: '', members: [] };

  return (
    <div
      className={cn(
        'grid grid-cols-1 grid-rows-[3rem,1fr] gap-4',
        'md:auto-rows-fr md:grid-cols-2 md:grid-rows-none',
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
