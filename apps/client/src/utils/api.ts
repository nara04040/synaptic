import { ApiResponse, ApiError, FileUploadLimits } from '@/types/api'

// API 요청 기본 설정
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}

// 파일 업로드 제한 설정
export const FILE_UPLOAD_LIMITS: FileUploadLimits = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
  maxWidth: 2048,
  maxHeight: 2048,
}

// API 요청 래퍼 함수
export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
      credentials: 'include',
    })

    const data = await response.json()

    if (!response.ok) {
      throw {
        code: data.error?.code || 'UNKNOWN_ERROR',
        message: data.error?.message || 'An unknown error occurred',
        details: data.error?.details,
      } as ApiError
    }

    return data as ApiResponse<T>
  } catch (error) {
    if ((error as ApiError).code) {
      throw error
    }
    throw {
      code: 'NETWORK_ERROR',
      message: 'Network request failed',
      details: { originalError: error },
    } as ApiError
  }
}

// 파일 유효성 검사
export function validateFile(file: File): void {
  if (file.size > FILE_UPLOAD_LIMITS.maxSize) {
    throw {
      code: 'FILE_TOO_LARGE',
      message: `File size should not exceed ${FILE_UPLOAD_LIMITS.maxSize / (1024 * 1024)}MB`,
    } as ApiError
  }

  if (!FILE_UPLOAD_LIMITS.allowedTypes.includes(file.type)) {
    throw {
      code: 'INVALID_FILE_TYPE',
      message: `File type should be one of: ${FILE_UPLOAD_LIMITS.allowedTypes.join(', ')}`,
    } as ApiError
  }
}

// 이미지 크기 검사
export async function validateImageDimensions(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      if (
        (FILE_UPLOAD_LIMITS.maxWidth && img.width > FILE_UPLOAD_LIMITS.maxWidth) ||
        (FILE_UPLOAD_LIMITS.maxHeight && img.height > FILE_UPLOAD_LIMITS.maxHeight)
      ) {
        reject({
          code: 'INVALID_IMAGE_DIMENSIONS',
          message: `Image dimensions should not exceed ${FILE_UPLOAD_LIMITS.maxWidth}x${FILE_UPLOAD_LIMITS.maxHeight}`,
        } as ApiError)
      }
      resolve()
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject({
        code: 'INVALID_IMAGE_FILE',
        message: 'Failed to load image file',
      } as ApiError)
    }

    img.src = objectUrl
  })
} 