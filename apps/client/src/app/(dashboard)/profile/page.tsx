'use client'

import { useEffect } from 'react'
import { useProfileStore } from '@/store/slices/profileStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { ProfileForm } from '@/components/profile/ProfileForm'
import { TechStackSelect } from '@/components/profile/TechStackSelect'
import { NotificationSettings } from '@/components/profile/NotificationSettings'
import { ThemeSettings } from '@/components/profile/ThemeSettings'
import { LearningGoalSettings } from '@/components/profile/LearningGoalSettings'

export default function ProfilePage() {
  const { profile, settings, isLoading, error, fetchProfile, fetchSettings } = useProfileStore()

  useEffect(() => {
    fetchProfile()
    fetchSettings()
  }, [fetchProfile, fetchSettings])

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 프로필 정보 카드 */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[300px]" />
                  </div>
                ) : (
                  <ProfileForm />
                )}
              </CardContent>
            </Card>

            {/* 기술 스택 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                ) : (
                  <TechStackSelect />
                )}
              </CardContent>
            </Card>

            {/* 소셜 링크 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* SocialLinks 컴포넌트는 다음 단계에서 구현 */}
                    <p>Social links will be implemented here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 알림 설정 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                ) : (
                  <NotificationSettings />
                )}
              </CardContent>
            </Card>

            {/* 테마 설정 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                ) : (
                  <ThemeSettings />
                )}
              </CardContent>
            </Card>

            {/* 학습 목표 설정 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Goals</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                ) : (
                  <LearningGoalSettings />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 