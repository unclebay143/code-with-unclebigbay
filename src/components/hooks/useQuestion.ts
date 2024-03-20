import axios from 'axios';
import { toast } from 'sonner';
import { NewQuestion, Questions } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useQuestion = () => {
  const queryClient = useQueryClient();

  const {
    data: questions,
    isFetching,
    error,
    isPending,
  } = useQuery({
    queryKey: ['questions'],
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    queryFn: () =>
      axios
        .get('/api/questions')
        .then((res) => res.data.questions as Questions),
  });

  const mutation = useMutation({
    mutationFn: (newQuestion: NewQuestion) => {
      return axios.post('/api/questions', newQuestion);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      toast.success('New question added.');
    },
    onError(error: any) {
      toast.success(error.response.data.message);
    },
  });

  return { questions, isFetching, error, isPending, mutation };
};

export default useQuestion;
