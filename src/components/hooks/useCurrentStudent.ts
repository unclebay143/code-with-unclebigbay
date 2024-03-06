import { Student } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCurrentStudent = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['currentStudentData'],
    queryFn: () =>
      axios.get('/api/auth/student').then((res) => res.data.student as Student),
  });

  return { data, isFetching, error, isPending };
};

export default useCurrentStudent;
