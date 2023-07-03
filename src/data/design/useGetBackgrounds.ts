import { useQuery } from 'react-query';
import { api } from '@/helpers/api';

const useGetBackgrounds = () => {
  return useQuery(
    ['getBackgrounds'],
    async () => {
      const response = await api.get(`/backgrounds`);

      return response.data as { backgroundImg: string; id: number }[];
    },
    {
      staleTime: 600000,
      cacheTime: 600000,
    },
  );
};

export default useGetBackgrounds;
