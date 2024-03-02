import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useStudent = (username: string) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['studentData'],
    queryFn: () =>
      axios.get(`/api/students/${username}`).then((res) => res.data.student), // add type here i.e as Student
  });

  return { data, isFetching, error, isPending };
};

export default useStudent;
