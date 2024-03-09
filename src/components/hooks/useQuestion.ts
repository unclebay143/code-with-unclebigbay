import { Questions } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useQuestion = () => {
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
        .then((res) => res.data.questions as Questions),
  });

  return { questions, isFetching, error, isPending };
};

export default useQuestion;
