import { API_ENDPOINTS } from '@/config/api'

interface EmailVerificationResponse {
  success: boolean;
  message: string;
}

export const sendVerificationEmail = async (email: string): Promise<EmailVerificationResponse> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.AUTH}/verify-email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error('Failed to send verification email')
    }

    return response.json()
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw error
  }
}

export const verifyEmailCode = async (email: string, code: string): Promise<EmailVerificationResponse> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.AUTH}/verify-email/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    })

    if (!response.ok) {
      throw new Error('Invalid verification code')
    }

    return response.json()
  } catch (error) {
    console.error('Error verifying email:', error)
    throw error
  }
}

export const resendVerificationEmail = async (email: string): Promise<EmailVerificationResponse> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.AUTH}/verify-email/resend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error('Failed to resend verification email')
    }

    return response.json()
  } catch (error) {
    console.error('Error resending verification email:', error)
    throw error
  }
} 