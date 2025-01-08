import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateRoadmapRequest, UpdateRoadmapRequest } from '@/types/api';
import { roadmapRepository } from '../repository/roadmap';
import { useUserStore } from '@/store';

export const useRoadmaps = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ['roadmaps', user?.id],
    queryFn: () => roadmapRepository.getByUser(user!.id),
    enabled: !!user,
  });
};

export const useRoadmap = (id: string) => {
  return useQuery({
    queryKey: ['roadmap', id],
    queryFn: () => roadmapRepository.findById(id),
  });
};

export const useCreateRoadmap = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  return useMutation({
    mutationFn: (data: CreateRoadmapRequest) => roadmapRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmaps', user?.id] });
    },
  });
};

export const useUpdateRoadmap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateRoadmapRequest) => roadmapRepository.update(data.id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['roadmap', response.data.id] });
      queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
    },
  });
};

export const useDeleteRoadmap = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  return useMutation({
    mutationFn: (id: string) => roadmapRepository.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['roadmaps', user?.id] });
      queryClient.removeQueries({ queryKey: ['roadmap', id] });
    },
  });
}; 