'use client'

import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { TagCount } from './NoteTypes'

interface TagCloudProps {
  tags: TagCount[];
  selectedTag?: string;
  onTagSelect: (tag: string) => void;
}

export function TagCloud({ tags, selectedTag, onTagSelect }: TagCloudProps) {
  if (tags.length === 0) return null;

  return (
    <ScrollArea className="h-[120px] w-full rounded-md border p-4">
      <div className="flex flex-wrap gap-2">
        {tags.map(({ name, count }) => (
          <Badge
            key={name}
            variant={selectedTag === name ? "default" : "secondary"}
            className="cursor-pointer hover:bg-primary/90"
            onClick={() => onTagSelect(name)}
          >
            {name} ({count})
          </Badge>
        ))}
      </div>
    </ScrollArea>
  )
} 