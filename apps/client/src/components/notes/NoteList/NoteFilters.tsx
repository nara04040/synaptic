'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TagCount, TagFilter } from '../shared/NoteTypes'

interface NoteFiltersProps {
  tags: TagCount[];
  onFilterChange: (filter: TagFilter) => void;
}

export function NoteFilters({ tags, onFilterChange }: NoteFiltersProps) {
  const [open, setOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>('')

  return (
    <div className="flex gap-4">
      <Select
        onValueChange={(value: string) => onFilterChange({ type: value, tag: selectedTag })}
        defaultValue="all"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="concept">Concept</SelectItem>
          <SelectItem value="implementation">Implementation</SelectItem>
          <SelectItem value="question">Question</SelectItem>
        </SelectContent>
      </Select>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedTag || "Select tag..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search tag..." />
            <CommandEmpty>No tag found.</CommandEmpty>
            <CommandGroup>
              {tags.map(({ name }) => (
                <CommandItem
                  key={name}
                  value={name}
                  onSelect={(currentValue) => {
                    setSelectedTag(currentValue === selectedTag ? '' : currentValue)
                    onFilterChange({ type: 'all', tag: currentValue })
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTag === name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
} 