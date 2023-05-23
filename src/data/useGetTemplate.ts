import { api } from '@/helpers/api';
import { useQuery, UseQueryResult } from 'react-query';

interface IUseGetTemplate {
  offset: number;
  limit: number;
}

interface TemplateResult {
  id: number;
  preview_img_url: string;
}
const useGetTemplate = ({ offset, limit }: IUseGetTemplate): UseQueryResult<TemplateResult[]> => {
  return useQuery(
    ['getTemplate', offset, limit],
    async () => {
      const response = await api.get('/templates', {
        params: {
          offset,
          limit,
        },
      });
      return response.data;
    },
    {
      staleTime: 600000,
      cacheTime: 600000,
    },
  );
};

export default useGetTemplate;
