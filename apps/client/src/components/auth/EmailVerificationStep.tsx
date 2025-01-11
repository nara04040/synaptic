'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { verifyEmailCode } from '@/services/auth'

interface EmailVerificationStepProps {
  email: string;
  onVerificationComplete: () => void;
  onResendEmail: () => void;
}

export const EmailVerificationStep = ({
  email,
  onVerificationComplete,
  onResendEmail,
}: EmailVerificationStepProps) => {
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsVerifying(true)

    try {
      const response = await verifyEmailCode(email, verificationCode)
      if (response.success) {
        onVerificationComplete()
      } else {
        setError(response.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid verification code. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-xl font-semibold tracking-tight">
          Verify your email
        </h2>
        <p className="text-sm text-muted-foreground">
          We've sent a verification code to {email}
        </p>
      </div>

      <form onSubmit={handleVerification} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="verificationCode">Verification Code</Label>
          <Input
            id="verificationCode"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            required
            disabled={isVerifying}
          />
        </div>

        <div className="space-y-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onResendEmail}
            disabled={isVerifying}
          >
            Resend Code
          </Button>
        </div>
      </form>
    </div>
  )
} 