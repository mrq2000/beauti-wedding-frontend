import { Info } from '@/editor/interface/info';
import { api } from '@/helpers/api';
import { DesignInfo } from '@/interface/design';
import { useMutation, useQueryClient } from 'react-query';

const useUpdateDesignUserInfo = (designId: number) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data: Info) => {
      const response = await api.post(`/designs/${designId}/user-info`, {
        ...data,
      });
      return response.data;
    },
    onSuccess: (_, data) => {
      const oldDesignInfo = client.getQueryData(['design', 'info', designId]) as DesignInfo;
      if (oldDesignInfo) {
        client.setQueryData<DesignInfo>(['design', 'info', designId], {
          ...oldDesignInfo,
          ...data,
        });
      }
    },
  });
};

export default useUpdateDesignUserInfo;
