'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/slices/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { EmailVerificationStep } from './EmailVerificationStep'
import { sendVerificationEmail, resendVerificationEmail } from '@/services/auth'

interface AuthFormProps {
  mode: 'login' | 'register'
}

type RegisterStep = 'FORM' | 'EMAIL_VERIFICATION' | 'COMPLETION'

export const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [registerStep, setRegisterStep] = useState<RegisterStep>('FORM')
  const [formError, setFormError] = useState<string | null>(null)
  
  const { login, register, error, isLoading, clearError, isAuthenticated } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setFormError(null)

    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        // 회원가입 시 이메일 인증 코드 발송
        const response = await sendVerificationEmail(email)
        if (response.success) {
          setRegisterStep('EMAIL_VERIFICATION')
        } else {
          setFormError(response.message)
        }
      }

      if (useAuthStore.getState().isAuthenticated) {
        router.push('/dashboard')
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'An error occurred')
      console.error('Authentication error:', error)
    }
  }

  const handleVerificationComplete = async () => {
    try {
      // 이메일 인증이 완료된 후 실제 회원가입 진행
      await register(email, password, name)
      setRegisterStep('COMPLETION')
      
      if (useAuthStore.getState().isAuthenticated) {
        router.push('/dashboard')
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Registration failed')
      console.error('Registration error:', error)
    }
  }

  const handleResendEmail = async () => {
    try {
      const response = await resendVerificationEmail(email)
      if (!response.success) {
        setFormError(response.message)
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to resend verification email')
      console.error('Error resending email:', error)
    }
  }

  if (mode === 'register' && registerStep === 'EMAIL_VERIFICATION') {
    return (
      <EmailVerificationStep
        email={email}
        onVerificationComplete={handleVerificationComplete}
        onResendEmail={handleResendEmail}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      {(error || formError) && (
        <Alert variant="destructive">
          <AlertDescription>{error || formError}</AlertDescription>
        </Alert>
      )}

      {mode === 'register' && (
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Enter your name"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          placeholder="Enter your email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          placeholder="Enter your password"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : mode === 'login' ? 'Login' : 'Register'}
      </Button>
    </form>
  )
} 