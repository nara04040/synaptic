import { NoteList } from '@/components/notes/NoteList/NoteList'

export default function NotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Notes</h1>
          <p className="text-muted-foreground">
            Organize and manage your learning notes
          </p>
        </div>
      </div>
      <NoteList />
    </div>
  )
} 