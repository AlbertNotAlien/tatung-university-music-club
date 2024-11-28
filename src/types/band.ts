export type Member = {
  displayName: string;
  email: string;
  image: string;
  isLeader: boolean;
};

export type Band = {
  bandName: string;
  members: Member[];
};

export type UserDataSearchProps = Omit<Member, 'isLeader'>;
