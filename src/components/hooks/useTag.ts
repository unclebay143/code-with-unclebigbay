import axios from 'axios';
import { toast } from 'sonner';
import { Tag, Tags } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useTag = () => {
  const queryClient = useQueryClient();

  const {
    data: tags,
    isFetching,
    error,
    isPending,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: () => axios.get('/api/tags').then((res) => res.data.tags as Tags),
  });

  const mutation = useMutation({
    mutationFn: (newTag: Tag) => {
      return axios.post('/api/tags', newTag);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast.success('New Tag added.');
    },
    onError({ message }) {
      toast.success(message);
    },
  });

  return { tags, isFetching, error, isPending, mutation };
};

export default useTag;
