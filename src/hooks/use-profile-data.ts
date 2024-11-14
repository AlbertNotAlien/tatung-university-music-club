import { getUser } from '@/lib/firebase/user';
import { User } from '@/types/user';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetProfile = (email: string) => {
  return useQuery<User>({
    queryFn: async () => await getUser(email),
    queryKey: [email],
  });
};

const updateData = async (newData: User) => {
  const response = await fetch('/api/me', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return response.json();
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateData,
  });
};
