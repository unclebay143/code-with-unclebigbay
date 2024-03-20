import axios from 'axios';
import { toast } from 'sonner';
import { Audit, Audits } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useAudit = () => {
  const queryClient = useQueryClient();
  const {
    data: audits,
    isFetching,
    error,
    isPending,
  } = useQuery({
    queryKey: ['audits'],
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    queryFn: () =>
      axios.get('/api/audits').then((res) => res.data.audit as Audits),
  });

  const mutation = useMutation({
    mutationFn: (newAudit: Audit) => {
      return axios.post('/api/audits', newAudit);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['audits'] });
    },
    onError(error: any) {
      toast.success(error.response.data.message);
    },
  });

  return { audits, isFetching, error, isPending, mutation };
};

export default useAudit;
