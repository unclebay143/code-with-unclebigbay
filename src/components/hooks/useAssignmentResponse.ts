import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useAssignmentResponseById = (_id: string) => {
  const { data, isFetching, error, isPending } = useQuery({
    queryKey: ['response', _id],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: () =>
      axios.get('/api/assignments/responses/' + _id).then((res) => res.data),
  });

  return { data, isFetching, error, isPending };
};

export { useAssignmentResponseById };
