import axios from 'axios';
import { Assignment } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';

const useAssignmentResponseById = (_id: string) => {
  const {
    data: response,
    isFetching,
    error,
    isPending,
  } = useQuery({
    queryKey: ['response', _id],
    queryFn: () =>
      axios
        .get('/api/assignments/responses/' + _id)
        .then((res) => res.data.assignmentResponse),
  });

  return { response, isFetching, error, isPending };
};

export { useAssignmentResponseById };
