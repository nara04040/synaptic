'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { NoteCard } from './NoteCard'
import { NoteFilters } from './NoteFilters'
import { NoteEditor } from '../NoteEditor/NoteEditor'
import type { Note } from '../shared/NoteTypes'
import { TagCloud } from '../shared/TagCloud'
import type { TagCount } from '../shared/NoteTypes'

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([])
  const [filter, setFilter] = useState({ type: 'all', tag: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | undefined>()
  const [tags, setTags] = useState<TagCount[]>([])

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

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  // 태그 통계 계산
  useEffect(() => {
    const tagCounts = notes.reduce((acc: Record<string, number>, note) => {
      note.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1
      })
      return acc
    }, {})

    const tagCountArray = Object.entries(tagCounts).map(([name, count]) => ({
      name,
      count
    }))

    setTags(tagCountArray)
  }, [notes])

  // 필터링된 노트 계산
  const filteredNotes = notes.filter(note => {
    const typeMatch = filter.type === 'all' || note.type === filter.type
    const tagMatch = !filter.tag || note.tags.includes(filter.tag)
    return typeMatch && tagMatch
  })

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
      <div className="space-y-4">
        <NoteFilters tags={tags} onFilterChange={setFilter} />
        <TagCloud
          tags={tags}
          selectedTag={filter.tag}
          onTagSelect={(tag) => setFilter(prev => ({ ...prev, tag }))}
        />
      </div>
      
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
        {filteredNotes.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">No notes yet</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note}
              onDelete={handleDeleteNote}
              onClick={() => handleEditNote(note)}
            />
          ))
        )}
      </div>
    </div>
  )
} 