'use client'

import { useState } from 'react'
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
  const [references, setReferences] = useState<string[]>(note?.metadata.references ?? [])
  const [isReferenceOpen, setIsReferenceOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter notes based on search query
  const filteredNotes = availableNotes
    .filter(n => !note || n.id !== note.id) // Exclude current note
    .filter(n => 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )

  // Debug logs
  console.log('Available Notes:', availableNotes)
  console.log('Filtered Notes:', filteredNotes)
  console.log('Current References:', references)
  console.log('Search Query:', searchQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Debug log before save
    console.log('Saving note with references:', references)
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

          <div className="space-y-2">
            <Label>References</Label>
            <Popover open={isReferenceOpen} onOpenChange={setIsReferenceOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isReferenceOpen}
                  className="w-full justify-between"
                >
                  {references.length === 0 
                    ? "Select references..." 
                    : `${references.length} reference(s) selected`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search notes..." 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandEmpty>No notes found.</CommandEmpty>
                  <CommandGroup>
                    {filteredNotes.map((refNote) => (
                      <CommandItem
                        key={refNote.id}
                        value={refNote.id}
                        onSelect={() => {
                          console.log('Selecting note:', refNote.id)
                          const newReferences = references.includes(refNote.id)
                            ? references.filter(id => id !== refNote.id)
                            : [...references, refNote.id]
                          console.log('New references:', newReferences)
                          setReferences(newReferences)
                          setIsReferenceOpen(false) // Close the popover after selection
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            references.includes(refNote.id) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {refNote.title}
                        {refNote.tags.length > 0 && (
                          <span className="ml-2 text-muted-foreground">
                            ({refNote.tags.join(', ')})
                          </span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {references.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {references.map(refId => {
                  const refNote = filteredNotes.find(n => n.id === refId)
                  return (
                    <Badge
                      key={refId}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {refNote?.title}
                      <button
                        onClick={() => setReferences(prev => prev.filter(id => id !== refId))}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>

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