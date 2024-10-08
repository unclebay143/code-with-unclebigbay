import { Student } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const useCurrentStudent = () => {
  const queryClient = useQueryClient();

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['currentStudentData'],
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    queryFn: () =>
      axios.get('/api/auth/student').then((res) => res.data.student as Student),
  });

  const update = useMutation({
    mutationFn: (studentData: any) => {
      return axios.patch(`/api/students/${studentData?.username}`, studentData);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['currentStudentData'] });
      toast.success('Profile updated.'); // Todo: make this toast message dynamic through prop, i.e usage anonymity message
    },
    onError(error: any) {
      toast.success(error.response.data.message);
    },
  });

  return { data, isFetching, error, isPending, update };
};

export default useCurrentStudent;
