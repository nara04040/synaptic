'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NoteTags } from '../shared/NoteTags'
import { NoteReference } from '../shared/NoteReference'
import type { Note, NoteData } from '../shared/NoteTypes'
import { MarkdownEditor } from './MarkdownEditor'
import { useNodeStore } from '../../nodes/NodeStore'

interface NoteEditorProps {
  note?: Note
  onSave: (note: NoteData) => void
  onCancel: () => void
  availableNotes: Note[]
}

export function NoteEditor({ note, onSave, onCancel, availableNotes }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title ?? '')
  const [content, setContent] = useState(note?.content ?? '')
  const [type, setType] = useState<Note['type']>(note?.type ?? 'concept')
  const [tags, setTags] = useState<string[]>(note?.tags ?? [])
  const [references, setReferences] = useState<string[]>(note?.metadata?.references ?? [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      content,
      type,
      tags,
      metadata: {
        references
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note ? 'Edit Note' : 'Create Note'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value: Note['type']) => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select note type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="concept">Concept</SelectItem>
                <SelectItem value="implementation">Implementation</SelectItem>
                <SelectItem value="question">Question</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <MarkdownEditor
              value={content}
              onChange={(value) => setContent(value || '')}
              placeholder="Write your note content..."
            />
          </div>

          <NoteTags tags={tags} onChange={setTags} />

          <NoteReference
            references={references}
            availableNotes={availableNotes}
            currentNoteId={note?.id}
            onChange={setReferences}
          />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {note ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 