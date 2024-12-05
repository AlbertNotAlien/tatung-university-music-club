import { User } from './user';

export type Band = {
  id: string;
  name: string;
  leader: User;
  owner: User;
  members: User[];
  createdAt: Date;
};
