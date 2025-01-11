"use client"

import * as React from "react"
import { Navigation } from "../landing/navigation"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const isAuthenticated = true;

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navigation isAuthenticated={isAuthenticated} />
      <main className="flex-1 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-8">
          <div className="max-w-[935px] lg:max-w-screen-xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
} 