import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HackathonSubmission, Hackathons } from '@/utils/types';

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
  const queryClient = useQueryClient();
  // Registration status
  // const { data: isRegistered, isLoading: isCheckingRegistrationStatus } =
  //   useQuery({
  //     queryKey: ['isRegisteredForHackathon'],
  //     queryFn: () =>
  //       axios
  //         .get(`/api/hackathons/is-registered/${_id}`)
  //         .then((res) => res.data.isRegistered as boolean),
  //   });

  // Registration
  const { mutateAsync: joinHackathon, isPending: isJoinHackathonPending } =
    useMutation({
      mutationFn: ({
        hackathonId,
        studentId,
      }: {
        hackathonId: string;
        studentId: string;
      }) => axios.post('/api/hackathons/register', { hackathonId, studentId }),
    });

  // Submission
  const { mutateAsync: submitEntry, isPending: isSubmitEntryPending } =
    useMutation({
      mutationFn: (payload: HackathonSubmission) =>
        axios.post('/api/hackathons/submission', payload),
    });

  return {
    joinHackathon,
    isJoinHackathonPending,
    submitEntry,
    isSubmitEntryPending,
  };
};

export { useHackathonById, useHackathons };
