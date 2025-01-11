"use client"

import * as React from "react"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Synaptic. All rights reserved.</p>
      </footer>
    </div>
  )
} 