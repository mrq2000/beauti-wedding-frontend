import { api } from '@/helpers/api';
import { DesignDraft } from '@/interface/design';
import { useMutation, useQueryClient } from 'react-query';

interface UpdateDesignBackgroundImg {
  backgroundImg: string;
}
const useUpdateDesignBackgroundImg = (designId: number) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateDesignBackgroundImg) => {
      const response = await api.post(`/designs/${designId}/draft/background-img`, {
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

export default useUpdateDesignBackgroundImg;
