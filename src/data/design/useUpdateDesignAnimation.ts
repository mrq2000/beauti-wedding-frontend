import { api } from '@/helpers/api';
import { DesignDraft } from '@/interface/design';
import { useMutation, useQueryClient } from 'react-query';

interface UpdateDesignAnimation {
  animation: string;
}
const useUpdateDesignAnimation = (designId: number) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateDesignAnimation) => {
      const response = await api.post(`/designs/${designId}/draft/animation`, {
        ...data,
      });
      return response.data;
    },
    onSuccess: (_, data) => {
      const oldDesignInfo = client.getQueryData(['design', 'draft', designId]) as DesignDraft;
      if (oldDesignInfo) {
        client.setQueryData<DesignDraft>(['design', 'draft', designId], {
          ...oldDesignInfo,
          ...data,
        });
      }
    },
  });
};

export default useUpdateDesignAnimation;
