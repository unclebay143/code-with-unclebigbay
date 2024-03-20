import axios from 'axios';
import { toast } from 'sonner';
import { Course, Courses } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useCourse = () => {
  const queryClient = useQueryClient();
  const {
    data: courses,
    isFetching,
    error,
    isPending,
  } = useQuery({
    queryKey: ['courses'],
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    queryFn: () =>
      axios.get('/api/courses').then((res) => res.data.courses as Courses),
  });

  const mutation = useMutation({
    mutationFn: (newCourse: Course) => {
      return axios.post('/api/courses', newCourse);
    },
    onSuccess({ data }) {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      const courseId = data.course._id;
      toast.success('New course added.');
      window.location.href = `/dashboard/courses/${courseId}`;
    },
    onError(error: any) {
      toast.success(error.response.data.message);
    },
  });

  return { courses, isFetching, error, isPending, mutation };
};

const useCourseById = (_id: string) => {
  const {
    data: course,
    isFetching,
    error,
    isPending,
  } = useQuery({
    queryKey: ['course', _id],
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    queryFn: () =>
      axios.get('/api/courses/' + _id).then((res) => res.data.course as Course),
  });

  return { course, isFetching, error, isPending };
};

export default useCourse;
export { useCourseById };
