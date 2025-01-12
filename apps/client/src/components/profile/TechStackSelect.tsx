'use client'

import { useState } from 'react'
import { useProfileStore } from '@/store/slices/profileStore'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, Plus, X } from 'lucide-react'

const PREDEFINED_TECH_STACKS = [
  // Frontend
  'React', 'Vue', 'Angular', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'TailwindCSS',
  // Backend
  'Node.js', 'Python', 'Java', 'Spring', 'Express', 'Django', 'FastAPI',
  // Database
  'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch',
  // DevOps
  'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'CI/CD', 'Git',
  // Mobile
  'React Native', 'Flutter', 'Swift', 'Kotlin',
  // Testing
  'Jest', 'Cypress', 'Selenium', 'Playwright',
  // Other
  'GraphQL', 'REST', 'WebSocket', 'gRPC'
]

export function TechStackSelect() {
  const { profile, updateProfile, error } = useProfileStore()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customTech, setCustomTech] = useState('')

  const handleSelect = async (tech: string) => {
    if (!profile) return

    const newTechStack = profile.techStack.includes(tech)
      ? profile.techStack.filter((t) => t !== tech)
      : [...profile.techStack, tech]

    setIsSubmitting(true)
    try {
      await updateProfile({ techStack: newTechStack })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddCustomTech = async () => {
    if (!profile || !customTech.trim()) return

    const formattedTech = customTech.trim()
    if (profile.techStack.includes(formattedTech)) {
      setCustomTech('')
      return
    }

    setIsSubmitting(true)
    try {
      await updateProfile({
        techStack: [...profile.techStack, formattedTech]
      })
      setCustomTech('')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveTech = async (tech: string) => {
    if (!profile) return

    setIsSubmitting(true)
    try {
      await updateProfile({
        techStack: profile.techStack.filter((t) => t !== tech)
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!profile) {
    return (
      <Alert>
        <AlertDescription>Loading tech stack...</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap gap-2">
        {profile.techStack.map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {tech}
            <button
              onClick={() => handleRemoveTech(tech)}
              className="text-muted-foreground hover:text-foreground"
              aria-label={`Remove ${tech}`}
              disabled={isSubmitting}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isOpen}
              className="justify-between"
              disabled={isSubmitting}
            >
              Select technologies...
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput
                placeholder="Search technologies..."
                value={search}
                onValueChange={setSearch}
              />
              <CommandEmpty>No technology found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-auto">
                {PREDEFINED_TECH_STACKS.map((tech) => (
                  <CommandItem
                    key={tech}
                    value={tech}
                    onSelect={() => {
                      handleSelect(tech)
                      setIsOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        profile.techStack.includes(tech)
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {tech}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex gap-2">
          <input
            type="text"
            value={customTech}
            onChange={(e) => setCustomTech(e.target.value)}
            placeholder="Add custom tech..."
            className="px-3 py-2 border rounded-md text-sm"
            disabled={isSubmitting}
          />
          <Button
            size="icon"
            variant="outline"
            onClick={handleAddCustomTech}
            disabled={!customTech.trim() || isSubmitting}
            aria-label="Add custom technology"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 