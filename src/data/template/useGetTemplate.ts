import { useQuery } from 'react-query';
import { api } from '@/helpers/api';
import { Template } from '../../interface/template';

const useGetTemplate = (templateId: number) => {
  return useQuery(
    ['template', templateId],
    async () => {
      const response = await api.get(`/templates/${templateId}`);

      return response.data as Template;
    },
    {
      staleTime: 600000,
      cacheTime: 600000,
    },
  );
};

export default useGetTemplate;
