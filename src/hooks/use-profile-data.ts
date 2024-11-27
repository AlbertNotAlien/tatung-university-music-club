import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from '@/types/user';

export const useGetProfile = () => {
  return useQuery<User>({
    queryFn: async (): Promise<User> => {
      const response = await axios({
        url: '/api/me',
      });

      return response.data;
    },
    queryKey: [],
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (newData: User) => {
      try {
        await axios({
          url: '/api/me',
          method: 'PUT',
          data: JSON.stringify(newData),
        });
      } catch {
        console.error('Failed to update profile.');
      }
    },
  });
};
