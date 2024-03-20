import axios from 'axios';
import { Assignment, AssignmentResponse, Assignments } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useAssignment = () => {
  // const queryClient = useQueryClient();

  // const {
  //   data: assignments,
  //   isFetching,
  //   error,
  //   isPending,
  // } = useQuery({
  //   queryKey: ['assignments'],
  //   queryFn: () =>
  //     axios
  //       .get('/api/assignments')
  //       .then((res) => res.data.assignments as Assignments),
  // });

  const mutation = useMutation({
    mutationFn: (newAssignmentResponse: AssignmentResponse) => {
      return axios.post('/api/assignments/responses', newAssignmentResponse);
    },
    onSuccess() {
      toast.success('Assignment submitted');
    },
    onError(error: any) {
      toast.success(error.response.data.message);
    },
  });

  return { mutation };
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
