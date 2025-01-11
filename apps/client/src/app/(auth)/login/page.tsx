"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
          />
        </div>
        <div className="space-y-2">
          <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            autoComplete="current-password"
          />
        </div>
        <Button className="w-full">
          Sign In
        </Button>
      </div>
      <div className="text-center text-sm">
        <Link href="/register" className="underline underline-offset-4 hover:text-primary">
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </div>
  )
} 