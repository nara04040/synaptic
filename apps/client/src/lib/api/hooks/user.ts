import { useMutation, useQuery } from '@tanstack/react-query';
import { LoginRequest, RegisterRequest } from '@/types/api';
import { userRepository } from '../repository/user';
import { useUserStore } from '@/store';
import { User } from '@/types/store';

export const useLogin = () => {
  const { login: setUser } = useUserStore();

  return useMutation({
    mutationFn: (data: LoginRequest) => userRepository.login(data),
    onSuccess: (response) => {
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    },
  });
};

export const useRegister = () => {
  const { login: setUser } = useUserStore();

  return useMutation({
    mutationFn: (data: RegisterRequest) => userRepository.register(data),
    onSuccess: (response) => {
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    },
  });
};

export const useMe = () => {
  const { login: setUser } = useUserStore();

  return useQuery({
    queryKey: ['me'],
    queryFn: () => userRepository.me(),
    enabled: !!localStorage.getItem('token'),
  });
}; 