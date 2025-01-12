'use client'

import { useState } from 'react'
import { useProfileStore } from '@/store/slices/profileStore'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { EmailNotificationSettings } from '@/types/profile'

export function NotificationSettings() {
  const { settings, updateSettings, error } = useProfileStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleToggle = async (key: keyof EmailNotificationSettings) => {
    if (!settings?.emailNotifications) return

    setIsSubmitting(true)
    try {
      await updateSettings({
        emailNotifications: {
          ...settings.emailNotifications,
          [key]: !settings.emailNotifications[key]
        }
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!settings?.emailNotifications) {
    return (
      <Alert>
        <AlertDescription>Loading notification settings...</AlertDescription>
      </Alert>
    )
  }

  const notifications = [
    {
      id: 'dailyDigest' as keyof EmailNotificationSettings,
      label: 'Daily Digest',
      description: 'Receive a daily summary of your learning progress'
    },
    {
      id: 'weeklyProgress' as keyof EmailNotificationSettings,
      label: 'Weekly Progress',
      description: 'Get weekly insights about your achievements'
    },
    {
      id: 'learningReminders' as keyof EmailNotificationSettings,
      label: 'Learning Reminders',
      description: 'Receive reminders for scheduled learning sessions'
    },
    {
      id: 'roadmapUpdates' as keyof EmailNotificationSettings,
      label: 'Roadmap Updates',
      description: 'Get notified about updates to your learning roadmaps'
    }
  ]

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {notifications.map(({ id, label, description }) => (
          <div key={id} className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor={id}>{label}</Label>
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            </div>
            <Switch
              id={id}
              checked={settings.emailNotifications[id]}
              onCheckedChange={() => handleToggle(id)}
              disabled={isSubmitting}
              aria-label={`Toggle ${label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
} 