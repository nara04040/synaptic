export class UserResponseDto {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: Date;
}

export class PublicUserResponseDto {
  id: string;
  name: string | null;
  avatar_url: string | null;
}