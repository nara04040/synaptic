'use client'

import { useState } from 'react'
import { useProfileStore } from '@/store/slices/profileStore'
import { Theme } from '@/types/profile'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Monitor, Moon, Sun } from 'lucide-react'

export function ThemeSettings() {
  const { settings, updateSettings, error } = useProfileStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleThemeChange = async (theme: Theme) => {
    if (!settings) return

    setIsSubmitting(true)
    try {
      await updateSettings({
        display: {
          ...settings.display,
          theme
        }
      })
      document.documentElement.setAttribute('data-theme', theme)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!settings) {
    return (
      <Alert>
        <AlertDescription>Loading theme settings...</AlertDescription>
      </Alert>
    )
  }

  const themes = [
    {
      value: Theme.LIGHT,
      label: 'Light',
      icon: Sun,
      description: 'Light theme for daytime use'
    },
    {
      value: Theme.DARK,
      label: 'Dark',
      icon: Moon,
      description: 'Dark theme for nighttime use'
    },
    {
      value: Theme.SYSTEM,
      label: 'System',
      icon: Monitor,
      description: 'Follow system theme preferences'
    }
  ] as const

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <RadioGroup
        value={settings.display.theme}
        onValueChange={(value: string) => handleThemeChange(value as Theme)}
        className="space-y-4"
        disabled={isSubmitting}
      >
        {themes.map(({ value, label, icon: Icon, description }) => (
          <div key={value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={value}
              id={`theme-${value}`}
              aria-label={`Select ${label} theme`}
            />
            <Label
              htmlFor={`theme-${value}`}
              className="flex flex-1 items-center space-x-3 cursor-pointer"
            >
              <Icon className="h-4 w-4" />
              <div className="space-y-0.5">
                <div>{label}</div>
                <div className="text-sm text-muted-foreground">
                  {description}
                </div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
} 