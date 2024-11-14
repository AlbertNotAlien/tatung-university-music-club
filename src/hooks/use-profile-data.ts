import { getUser } from '@/lib/firebase/user';
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export const useProfileData = (email: string) => {
  return useQuery<User>({
    queryFn: async () => await getUser(email),
    queryKey: [email],
  });
};
