'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface NoteFiltersProps {
  onFilterChange: (filter: { type: string; tag: string }) => void;
}

export function NoteFilters({ onFilterChange }: NoteFiltersProps) {
  return (
    <div className="flex gap-4">
      <Select
        onValueChange={(value: string) => onFilterChange({ type: value, tag: '' })}
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

      <Input
        placeholder="Search by tag..."
        className="max-w-[200px]"
        onChange={(e) => onFilterChange({ type: 'all', tag: e.target.value })}
      />
    </div>
  )
} 