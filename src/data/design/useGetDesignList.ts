import { useQuery } from 'react-query';
import { api } from '@/helpers/api';
import { DesignInfo } from '../../interface/design';

interface DesignResponse extends DesignInfo {
  designPublic: boolean;
}
const useGetDesignList = () => {
  return useQuery(
    ['design list'],
    async () => {
      const response = await api.get('/designs');

      return response.data as DesignResponse[];
    },
    {
      staleTime: 0,
      cacheTime: 0,
    },
  );
};

export default useGetDesignList;
