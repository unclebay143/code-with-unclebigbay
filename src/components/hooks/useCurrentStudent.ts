import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCurrentStudent = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => axios.get('/api/auth/student').then((res) => res.data),
  });

  return { data, isFetching, error, isPending };
};

export default useCurrentStudent;
