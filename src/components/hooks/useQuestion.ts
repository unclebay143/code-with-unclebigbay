import { NewQuestion, Questions } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const useQuestion = () => {
  const queryClient = useQueryClient();

  const {
    data: questions,
    isFetching,
    error,
    isPending,
  } = useQuery({
    queryKey: ['questions'],
    queryFn: () =>
      axios
        .get('/api/questions')
        .then((res) => res.data.questions as Questions)
        .catch((error) => {
          toast.error(error);
          return [];
        }),
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
