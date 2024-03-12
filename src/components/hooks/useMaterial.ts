import axios from 'axios';
import { toast } from 'sonner';
import { Material, Materials } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

const useMaterial = () => {
  const queryClient = useQueryClient();
  const {
    data: materials,
    isFetching,
    error,
    isPending,
  } = useQuery({
    queryKey: ['materials'],
    queryFn: () =>
      axios
        .get('/api/materials')
        .then((res) => res.data.materials as Materials),
  });

  const mutation = useMutation({
    mutationFn: (newMaterial: Material) => {
      return axios.post('/api/materials', newMaterial);
    },
    onSuccess({ data }) {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
      const courseId = data.material._id;
      toast.success('New material added.');
      window.location.href = `/dashboard/courses/${courseId}`;
    },
    onError(error: any) {
      toast.success(error.response.data.message);
    },
  });

  return { materials, isFetching, error, isPending, mutation };
};

const useMaterialById = (_id: string) => {
  const {
    data: material,
    isFetching,
    error,
    isPending,
  } = useQuery({
    queryKey: ['material', _id],
    queryFn: () =>
      axios
        .get('/api/materials/' + _id)
        .then((res) => res.data.material as Material),
  });

  return { material, isFetching, error, isPending };
};

export default useMaterial;
export { useMaterialById };
