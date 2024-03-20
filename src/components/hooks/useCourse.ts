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
  const queryClient = useQueryClient();

  const {
    data: course,
    isFetching,
    isRefetching,
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

  const mutation = useMutation({
    mutationFn: (newEnrollment: { studentId: string; courseId: string }) => {
      return axios.post('/api/courses/enroll', newEnrollment);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['course', _id],
        stale: true,
      });
      toast.success('Course enrolled');
    },
    onError(error: any) {
      toast.success(error.response.data.message);
    },
  });

  return { course, isFetching, isRefetching, error, isPending, mutation };
};

export default useCourse;
export { useCourseById };
