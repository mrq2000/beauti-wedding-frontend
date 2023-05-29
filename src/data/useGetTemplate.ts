import { api } from '@/helpers/api';
import { Template } from '@/interface/template';
import { useInfiniteQuery } from 'react-query';

interface IUseGetTemplate {
  limit: number;
}

const useGetTemplate = ({ limit }: IUseGetTemplate) => {
  return useInfiniteQuery(
    ['getTemplate', limit],
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
      getNextPageParam: (lastPage, allPage) => (lastPage.length >= limit ? allPage.length * limit : undefined),
    },
  );
};

export default useGetTemplate;
