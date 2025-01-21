'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { NoteCard } from './NoteCard'
import { NoteFilters } from './NoteFilters'
import { NoteEditor } from '../NoteEditor/NoteEditor'
import type { Note, NoteData } from '../shared/NoteTypes'
import { TagCloud } from '../shared/TagCloud'
import type { TagCount } from '../shared/NoteTypes'
import { useNodeStore } from '../../nodes/NodeStore'
import { createNodeFromNote } from '../../nodes/NodeCreator'
import { updateNodeConnections, syncNoteEdges } from '../../nodes/NodeLinker'

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([])
  const [filter, setFilter] = useState({ type: 'all', tag: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | undefined>()
  const [tags, setTags] = useState<TagCount[]>([])
  const { addNode, updateNode, removeNode } = useNodeStore()

  const handleCreateNote = () => {
    console.log('=== Create Note Debug Info ===')
    console.log('Current notes:', notes)
    setEditingNote(undefined)
    setIsEditing(true)
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setIsEditing(true)
  }

  const handleSaveNote = (noteData: NoteData) => {
    console.log('=== Note Save Debug Info ===')
    console.log('Incoming note data:', noteData)
    console.log('Current notes:', notes)
    
    if (editingNote) {
      // 노트 수정
      const updatedNote = {
        ...editingNote,
        ...noteData,
        metadata: {
          ...editingNote.metadata,
          updated: new Date(),
          references: noteData.metadata?.references ?? []
        }
      }
      console.log('Updating existing note:', updatedNote)
      console.log('References being saved:', updatedNote.metadata.references)
      
      setNotes(notes.map(note => 
        note.id === editingNote.id ? updatedNote : note
      ))
      
      // 노드 업데이트
      const nodeId = `node-${editingNote.id}`
      console.log('Updating node:', nodeId)
      updateNode(nodeId, {
        type: noteData.type,
        data: {
          title: noteData.title,
          content: noteData.content,
          tags: noteData.tags,
          noteId: editingNote.id,
          references: noteData.metadata?.references ?? []
        }
      })

      // Debug log for node store state
      console.log('Node store state after update:', useNodeStore.getState())

      // 태그 기반 연결 업데이트
      const node = useNodeStore.getState().nodes.find(n => n.id === nodeId)
      if (node) {
        updateNodeConnections(node)
      }

      // 참조 기반 연결 업데이트
      syncNoteEdges(updatedNote)
    } else {
      // 새 노트 생성
      const newNote: Note = {
        id: crypto.randomUUID(),
        ...noteData,
        metadata: {
          created: new Date(),
          updated: new Date(),
          references: noteData.metadata?.references ?? []
        }
      }
      console.log('Creating new note:', newNote)
      console.log('References for new note:', newNote.metadata.references)
      
      setNotes([newNote, ...notes])
      
      // 새 노드 생성
      const newNode = createNodeFromNote(newNote, {
        x: Math.random() * 500,
        y: Math.random() * 500
      })
      console.log('Creating new node:', newNode)
      addNode(newNode)

      // Debug log for node store state after creation
      console.log('Node store state after creation:', useNodeStore.getState())

      // 태그 기반 연결 생성
      updateNodeConnections(newNode)

      // 참조 기반 연결 생성
      syncNoteEdges(newNote)
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingNote(undefined)
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
    // 노드 삭제
    removeNode(`node-${id}`)
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
    console.log('=== NoteEditor Render Debug Info ===')
    console.log('Editing Note:', editingNote)
    console.log('Available Notes:', notes)
    console.log('Filtered Available Notes:', notes.filter(n => n.id !== editingNote?.id))
    
    return (
      <NoteEditor
        note={editingNote}
        onSave={handleSaveNote}
        onCancel={handleCancelEdit}
        availableNotes={notes}
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