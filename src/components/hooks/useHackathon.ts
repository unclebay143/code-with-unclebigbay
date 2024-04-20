import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Hackathon, Hackathons } from '@/utils/types';

const useHackathons = () => {
  const {
    data: hackathons,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['hackathons'],
    queryFn: () =>
      axios
        .get('/api/hackathons')
        .then((res) => res.data.hackathons as Hackathons),
  });

  return { hackathons, isLoading, error };
};

const useHackathonById = (_id: string) => {
  const { data: isRegistered, isLoading: isCheckingRegistrationStatus } =
    useQuery({
      queryKey: ['isRegisteredForHackathon'],
      queryFn: () =>
        axios
          .get(`/api/hackathons/is-registered/${_id}`)
          .then((res) => res.data.isRegistered as boolean),
    });

  const { mutateAsync: joinHackathon } = useMutation({
    mutationFn: ({
      hackathonId,
      studentId,
    }: {
      hackathonId: string;
      studentId: string;
    }) => axios.post('/api/hackathons/register', { hackathonId, studentId }),
  });

  return {
    isRegistered,
    isCheckingRegistrationStatus,
    joinHackathon,
  };
};

export { useHackathonById, useHackathons };
