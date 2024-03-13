import { fetchStudentByUsername } from '@/utils/services/student';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useStudent = (username: string) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['studentData'],
    queryFn: () => fetchStudentByUsername(username), // add type here i.e as Student
  });

  return { data, isFetching, error, isPending };
};

export default useStudent;
