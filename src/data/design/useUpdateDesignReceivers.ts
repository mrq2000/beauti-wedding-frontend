import { api } from '@/helpers/api';
import { DesignInfo } from '@/interface/design';
import { useMutation, useQueryClient } from 'react-query';

interface UpdateDesignReceivers {
  receivers: string;
}
const useUpdateDesignReceivers = (designId: number) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateDesignReceivers) => {
      const response = await api.post(`/designs/${designId}/receivers`, {
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

export default useUpdateDesignReceivers;
