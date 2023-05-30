import { api } from '@/helpers/api';
import { useMutation } from 'react-query';

interface CheckDomainResult {
  isExist: boolean;
}
const useCheckDomain = () => {
  return useMutation(async (domain: string) => {
    const response = await api.get('/designs/check-domain', {
      params: {
        domain,
      },
    });
    return response.data as CheckDomainResult;
  });
};

export default useCheckDomain;
