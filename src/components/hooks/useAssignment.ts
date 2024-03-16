import axios from 'axios';
import { Assignment, Assignments } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';

const useAssignment = () => {
  const {
    data: assignments,
    isFetching,
    error,
    isPending,
  } = useQuery({
    queryKey: ['assignments'],
    queryFn: () =>
      axios
        .get('/api/assignments')
        .then((res) => res.data.assignments as Assignments),
  });

  return { assignments, isFetching, error, isPending };
};

const useAssignmentById = (_id: string) => {
  const {
    data: assignment,
    isFetching,
    error,
    isPending,
  } = useQuery({
    queryKey: ['assignment', _id],
    queryFn: () =>
      axios
        .get('/api/assignments/' + _id)
        .then((res) => res.data.assignment as Assignment),
  });

  return { assignment, isFetching, error, isPending };
};

export default useAssignment;
export { useAssignmentById };
