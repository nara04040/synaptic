'use client'

import { useState } from 'react'
import { useProfileStore } from '@/store/slices/profileStore'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, X } from 'lucide-react'

// 기술 스택 목록 (실제로는 API에서 가져오거나 더 큰 목록을 사용할 수 있습니다)
const TECH_STACKS = [
  { value: 'react', label: 'React' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'spring', label: 'Spring' },
  { value: 'docker', label: 'Docker' },
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'aws', label: 'AWS' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'postgresql', label: 'PostgreSQL' },
] as const

export function TechStackSelect() {
  const { profile, updateProfile, error } = useProfileStore()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string[]>(profile?.techStack || [])

  const handleSelect = (tech: string) => {
    setSelectedTech(current => {
      if (current.includes(tech)) {
        return current.filter(t => t !== tech)
      }
      return [...current, tech]
    })
  }

  const handleRemove = (tech: string) => {
    setSelectedTech(current => current.filter(t => t !== tech))
  }

  const handleSave = async () => {
    setIsSubmitting(true)
    try {
      await updateProfile({ techStack: selectedTech })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={isSubmitting}
          >
            Select technologies...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search technologies..." />
            <CommandEmpty>No technology found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {TECH_STACKS.map((tech) => (
                <CommandItem
                  key={tech.value}
                  value={tech.value}
                  onSelect={() => handleSelect(tech.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTech.includes(tech.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {tech.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {selectedTech.map((tech) => {
          const techInfo = TECH_STACKS.find(t => t.value === tech)
          if (!techInfo) return null
          
          return (
            <Badge
              key={tech}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {techInfo.label}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => handleRemove(tech)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {techInfo.label}</span>
              </button>
            </Badge>
          )
        })}
      </div>

      <Button
        onClick={handleSave}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Saving...' : 'Save Tech Stack'}
      </Button>
    </div>
  )
} 