'use client'

import { useState } from 'react'
import { useProfileStore } from '@/store/slices/profileStore'
import { LearningGoalSettings as LearningGoalSettingsType } from '@/types/profile'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Target, Lightbulb, X } from 'lucide-react'

const DAILY_STUDY_TIME_OPTIONS = [
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
  { value: 180, label: '3 hours' },
  { value: 240, label: '4 hours' }
]

const WEEKLY_TARGET_OPTIONS = [
  { value: 3, label: '3 items' },
  { value: 5, label: '5 items' },
  { value: 7, label: '7 items' },
  { value: 10, label: '10 items' }
]

const FOCUS_AREAS_OPTIONS = [
  'Frontend Development',
  'Backend Development',
  'DevOps',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'Cloud Computing',
  'Security'
]

export function LearningGoalSettings() {
  const { settings, updateSettings, error } = useProfileStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedArea, setSelectedArea] = useState<string>('')

  const handleSettingsChange = async (
    key: keyof LearningGoalSettingsType,
    value: number | string[]
  ) => {
    if (!settings?.learningGoals) return

    setIsSubmitting(true)
    try {
      await updateSettings({
        learningGoals: {
          ...settings.learningGoals,
          [key]: value
        }
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddFocusArea = () => {
    if (!selectedArea || !settings?.learningGoals) return

    const newFocusAreas = [...settings.learningGoals.focusAreas]
    if (!newFocusAreas.includes(selectedArea)) {
      handleSettingsChange('focusAreas', [...newFocusAreas, selectedArea])
    }
    setSelectedArea('')
  }

  const handleRemoveFocusArea = (area: string) => {
    if (!settings?.learningGoals) return

    const newFocusAreas = settings.learningGoals.focusAreas.filter(
      (focusArea) => focusArea !== area
    )
    handleSettingsChange('focusAreas', newFocusAreas)
  }

  if (!settings?.learningGoals) {
    return (
      <Alert>
        <AlertDescription>Loading learning goal settings...</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Daily Study Time Target</span>
          </Label>
          <Select
            value={settings.learningGoals.dailyStudyTime.toString()}
            onValueChange={(value: string) => handleSettingsChange('dailyStudyTime', parseInt(value))}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select daily study time" />
            </SelectTrigger>
            <SelectContent>
              {DAILY_STUDY_TIME_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Weekly Completion Target</span>
          </Label>
          <Select
            value={settings.learningGoals.weeklyCompletionTarget.toString()}
            onValueChange={(value: string) => handleSettingsChange('weeklyCompletionTarget', parseInt(value))}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select weekly target" />
            </SelectTrigger>
            <SelectContent>
              {WEEKLY_TARGET_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <Lightbulb className="h-4 w-4" />
            <span>Focus Areas</span>
          </Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {settings.learningGoals.focusAreas.map((area) => (
              <Badge key={area} variant="secondary" className="flex items-center gap-1">
                {area}
                <button
                  onClick={() => handleRemoveFocusArea(area)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`Remove ${area}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Select value={selectedArea} onValueChange={setSelectedArea} disabled={isSubmitting}>
              <SelectTrigger>
                <SelectValue placeholder="Select focus area" />
              </SelectTrigger>
              <SelectContent>
                {FOCUS_AREAS_OPTIONS.filter(
                  (area) => !settings.learningGoals.focusAreas.includes(area)
                ).map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddFocusArea}
              disabled={!selectedArea || isSubmitting}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 