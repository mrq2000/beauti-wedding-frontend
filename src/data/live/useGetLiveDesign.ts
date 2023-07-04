import { useQuery } from 'react-query';
import { api } from '@/helpers/api';
import { DesignInfo, DesignDraft } from '@/interface/design';

interface DesignData extends DesignInfo {
  designPublic: DesignDraft;
}

interface Response {
  design: DesignData;
  name: string;
}
const useGetLiveDesign = (designDomain: string, receiverId: string) => {
  return useQuery(
    [designDomain, receiverId],
    async () => {
      const response = await api.get(`/live/${designDomain}/${receiverId}`);

      return response.data as Response;
    },
    {
      staleTime: 0,
      cacheTime: 0,
    },
  );
};

export default useGetLiveDesign;
