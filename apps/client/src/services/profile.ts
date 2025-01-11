import { API_ENDPOINTS } from '@/config/api'
import { Profile, ProfileSettings } from '@/types/profile'
import { ProfileResponse, ProfileSettingsResponse, AvatarUploadResponse } from '@/types/api'
import { apiRequest, validateFile, validateImageDimensions } from '@/utils/api'

// 프로필 조회
export async function getProfile(): Promise<Profile> {
  const response = await apiRequest<Profile>(API_ENDPOINTS.PROFILE.BASE)
  return response.data!
}

// 프로필 업데이트
export async function updateProfile(profileData: Partial<Profile>): Promise<Profile> {
  const response = await apiRequest<Profile>(API_ENDPOINTS.PROFILE.BASE, {
    method: 'PATCH',
    body: JSON.stringify(profileData),
  })
  return response.data!
}

// 프로필 설정 조회
export async function getProfileSettings(): Promise<ProfileSettings> {
  const response = await apiRequest<ProfileSettings>(API_ENDPOINTS.PROFILE.SETTINGS)
  return response.data!
}

// 프로필 설정 업데이트
export async function updateProfileSettings(
  settings: Partial<ProfileSettings>
): Promise<ProfileSettings> {
  const response = await apiRequest<ProfileSettings>(API_ENDPOINTS.PROFILE.SETTINGS, {
    method: 'PATCH',
    body: JSON.stringify(settings),
  })
  return response.data!
}

// 프로필 이미지 업로드
export async function uploadProfileImage(file: File): Promise<string> {
  // 파일 유효성 검사
  validateFile(file)
  await validateImageDimensions(file)

  const formData = new FormData()
  formData.append('avatar', file)

  const response = await apiRequest<AvatarUploadResponse>(API_ENDPOINTS.PROFILE.AVATAR, {
    method: 'POST',
    body: formData,
  })

  return response.data!.data.imageUrl
}

// 프로필 이미지 삭제
export async function deleteProfileImage(): Promise<void> {
  await apiRequest(API_ENDPOINTS.PROFILE.AVATAR, {
    method: 'DELETE',
  })
} 