'use client'

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
  redirect('/dashboard')

  // return null
}
