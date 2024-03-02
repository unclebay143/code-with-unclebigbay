import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCurrentStudent = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios.get('/api/auth/student').then((res) => res.data.student), // add type here i.e as Student
  });

  return { data, isFetching, error, isPending };
};

export default useCurrentStudent;
