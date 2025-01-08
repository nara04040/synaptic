import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateProgressRequest } from '@/types/api';
import { learningRepository } from '../repository/learning';
import { useUserStore } from '@/store';

export const useLearningProgress = (nodeId: string) => {
  return useQuery({
    queryKey: ['learning', nodeId],
    queryFn: () => learningRepository.getByNode(nodeId),
  });
};

export const useUserProgress = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ['learning', 'user', user?.id],
    queryFn: () => learningRepository.getByUser(user!.id),
    enabled: !!user,
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  return useMutation({
    mutationFn: (data: UpdateProgressRequest) => learningRepository.update(data.nodeId, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['learning', response.data.nodeId] });
      queryClient.invalidateQueries({ queryKey: ['learning', 'user', user?.id] });
    },
  });
}; 