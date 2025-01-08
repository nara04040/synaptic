import { useState } from 'react'
import { useAuthStore } from '@/store/slices/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface AuthFormProps {
  mode: 'login' | 'register'
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  
  const { login, register, error, isLoading, clearError } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    if (mode === 'login') {
      await login(email, password)
    } else {
      await register(email, password, name)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
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