'use client'

import { Dashboard } from '@/components/landing/dashboard';
import { FeaturesGrid } from '@/components/landing/features-grid';
import { Hero } from '@/components/landing/hero';
import { InteractiveDemo } from '@/components/landing/interactive-demo';
import { MyRoadmap } from '@/components/landing/my-roadmap';
import { Navigation } from '@/components/landing/navigation'
import { Header } from '@/components/layouts/Header'
// import { useEffect } from 'react'
import { redirect } from 'next/navigation'
// import { useAuthStore } from '@/store/slices/authStore'

export default function HomePage() {
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     redirect('/dashboard')
  //   } else {
  //     redirect('/login')
  //   }
  // }, [isAuthenticated])
  // redirect('/dashboard')

  // return null
  const isAuthenticated = true;

  return (
    <main className='min-h-screen bg-white dark:bg-gray-900'>
      {/* <Navigation isAuthenticated={isAuthenticated}/> */}
      <Hero />
      {isAuthenticated ? (
        <>
        <Dashboard />
        <MyRoadmap />
        </>
        ) : (
          <FeaturesGrid/>
        )}
        <InteractiveDemo />
    </main>
  )
}
