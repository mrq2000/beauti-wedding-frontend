import { useMutation, useQueryClient } from 'react-query';

import { api } from '@/helpers/api';
import { DesignDraft } from '@/interface/design';

interface UpdateDesignDataParams {
  data: string;
  designId: number;
}
const useUpdateDraftData = () => {
  const client = useQueryClient();

  return useMutation(
    async ({ data, designId }: UpdateDesignDataParams) => {
      const response = await api.post(`/designs/${designId}/draft/data`, {
        data,
      });
      return response.data;
    },
    {
      onSuccess: (_, { data, designId }) => {
        const oldDesignDraft = client.getQueryData(['design', 'draft', designId]) as DesignDraft;
        if (oldDesignDraft) {
          client.setQueryData<DesignDraft>(['design', 'draft', designId], {
            ...oldDesignDraft,
            data,
          });
        }
      },
    },
  );
};

export default useUpdateDraftData;
