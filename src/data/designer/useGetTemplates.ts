import { useQuery } from 'react-query';
import { api } from '@/helpers/api';
import { Template } from '@/interface/template';

const useGetTemplates = () => {
  return useQuery(
    ['designer', 'templates'],
    async () => {
      const response = await api.get(`/designers/templates`);

      return response.data as Template[];
    },
    {
      staleTime: 0,
      cacheTime: 0,
    },
  );
};

export default useGetTemplates;
