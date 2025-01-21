import { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronsUpDown, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Note } from './NoteTypes'

interface NoteReferenceProps {
  references: string[]
  availableNotes: Note[]
  currentNoteId?: string
  onChange: (references: string[]) => void
}

export function NoteReference({ references, availableNotes, currentNoteId, onChange }: NoteReferenceProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  // Debug logs
  useEffect(() => {
    console.log('=== NoteReference Debug Info ===')
    console.log('Available Notes:', availableNotes)
    console.log('Current Note ID:', currentNoteId)
    console.log('Search Query:', search)
    console.log('Current References:', references)
  }, [availableNotes, currentNoteId, search, references])

  // Filter out current note and filter by search
  const filteredNotes = availableNotes
    .filter(note => !currentNoteId || note.id !== currentNoteId)
    .filter(note => 
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    )

  // Debug filtered results
  useEffect(() => {
    console.log('Filtered Notes:', filteredNotes)
  }, [filteredNotes])

  const handleSelect = (noteId: string) => {
    console.log('Selecting note:', noteId)
    const newReferences = references.includes(noteId)
      ? references.filter(id => id !== noteId)
      : [...references, noteId]
    console.log('New references:', newReferences)
    onChange(newReferences)
  }

  return (
    <div className="space-y-2">
      <Label>References</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {references.length === 0 ? (
              "Select references..."
            ) : (
              `${references.length} reference(s) selected`
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="rounded-lg border border-input bg-background">
            <div className="flex items-center border-b border-border px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {filteredNotes.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No notes found.
                </div>
              ) : (
                <div className="py-2">
                  <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                    Available Notes
                  </div>
                  {filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => {
                        console.log('Clicked note:', note.title)
                        handleSelect(note.id)
                      }}
                      className={cn(
                        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                        references.includes(note.id) && "bg-accent/50"
                      )}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          references.includes(note.id) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex-1">
                        <span>{note.title}</span>
                        {note.tags.length > 0 && (
                          <span className="ml-2 text-sm text-muted-foreground">
                            {note.tags.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {references.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {references.map(refId => {
            const note = availableNotes.find(n => n.id === refId)
            return note && (
              <Badge key={refId} variant="secondary" className="gap-1">
                {note.title}
                <button
                  type="button"
                  onClick={() => handleSelect(refId)}
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
  )
} 