import { fetchStudentByUsername } from '@/utils/services/client/student.client';
import { Student } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';

const useStudent = (username: string) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['studentData', username],
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    retry: false,
    enabled: !!username, // prevent immediate searching on mount
    queryFn: () => fetchStudentByUsername(username), // add type here i.e as Student
  });

  return { data: data as Student, isFetching, error, isPending };
};

export default useStudent;
