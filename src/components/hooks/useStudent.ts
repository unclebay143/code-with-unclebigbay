import { fetchStudentByUsername } from '@/utils/services/student';
import { useQuery } from '@tanstack/react-query';

const useStudent = (username: string) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['studentData'],
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    queryFn: () => fetchStudentByUsername(username), // add type here i.e as Student
  });

  return { data, isFetching, error, isPending };
};

export default useStudent;
