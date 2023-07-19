import { api } from '@/helpers/api';
import { Template } from '@/interface/template';
import { useInfiniteQuery } from 'react-query';

interface IUseGetTemplate {
  limit: number;
}

const useGetTemplates = ({ limit }: IUseGetTemplate) => {
  return useInfiniteQuery(
    ['getTemplates', limit],
    async ({ pageParam = 0 }) => {
      const response = await api.get('/templates', {
        params: {
          offset: pageParam,
          limit,
        },
      });
      return response.data as Template[];
    },
    {
      staleTime: 600000,
      getNextPageParam: (lastPage, allPage) => {
        return lastPage.length >= limit ? allPage.length * limit : undefined;
      },
    },
  );
};

export default useGetTemplates;
