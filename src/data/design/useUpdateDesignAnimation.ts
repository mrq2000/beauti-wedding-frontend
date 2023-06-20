import { api } from '@/helpers/api';
import { DesignInfo } from '@/interface/design';
import { useMutation, useQueryClient } from 'react-query';

interface UpdateDesignAnimation {
  animation: string;
}
const useUpdateDesignAnimation = (designId: number) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateDesignAnimation) => {
      const response = await api.post(`/designs/${designId}/animation`, {
        ...data,
      });
      return response.data;
    },
    onSuccess: (_, data) => {
      const oldDesignInfo = client.getQueryData(['design', 'info', designId]) as DesignInfo;
      if (oldDesignInfo) {
        client.setQueryData(['design', 'info', designId], {
          ...oldDesignInfo,
          ...data,
        });
      }
    },
  });
};

export default useUpdateDesignAnimation;
