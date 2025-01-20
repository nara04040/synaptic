'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { NoteCard } from './NoteCard'
import { NoteFilters } from './NoteFilters'
import { NoteEditor } from '../NoteEditor/NoteEditor'
import type { Note } from '../shared/NoteTypes'

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([])
  const [filter, setFilter] = useState({ type: 'all', tag: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | undefined>()

  const handleCreateNote = () => {
    setEditingNote(undefined)
    setIsEditing(true)
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setIsEditing(true)
  }

  const handleSaveNote = (noteData: Omit<Note, 'id' | 'metadata'>) => {
    if (editingNote) {
      // 노트 수정
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { 
              ...note, 
              ...noteData, 
              metadata: { 
                ...note.metadata, 
                updated: new Date() 
              } 
            }
          : note
      ))
    } else {
      // 새 노트 생성
      const newNote: Note = {
        id: crypto.randomUUID(),
        ...noteData,
        metadata: {
          created: new Date(),
          updated: new Date(),
          references: []
        }
      }
      setNotes([newNote, ...notes])
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingNote(undefined)
  }

  if (isEditing) {
    return (
      <NoteEditor
        note={editingNote}
        onSave={handleSaveNote}
        onCancel={handleCancelEdit}
      />
    )
  }

  return (
    <div className="space-y-4">
      <NoteFilters onFilterChange={setFilter} />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* 새 노트 생성 카드 */}
        <Card 
          className="hover:border-primary/50 cursor-pointer transition-colors"
          onClick={handleCreateNote}
        >
          <CardHeader className="flex flex-row items-center justify-center h-full">
            <Button variant="ghost" className="h-20 w-20">
              <Plus className="h-10 w-10" />
            </Button>
          </CardHeader>
        </Card>

        {/* 노트 목록 */}
        {notes.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">No notes yet</p>
            </CardContent>
          </Card>
        ) : (
          notes.map((note) => (
            <div key={note.id} onClick={() => handleEditNote(note)}>
              <NoteCard note={note} />
            </div>
          ))
        )}
      </div>
    </div>
  )
} 