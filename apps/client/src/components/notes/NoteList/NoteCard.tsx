import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { formatDistanceToNow } from 'date-fns'
import type { Note } from '../shared/NoteTypes'
import MDEditor from '@uiw/react-md-editor'

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onClick: () => void;
}

export function NoteCard({ note, onDelete, onClick }: NoteCardProps) {
  return (
    <Card className="hover:border-primary/50 cursor-pointer transition-colors group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{note.title}</CardTitle>
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Note</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this note? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onDelete(note.id)}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Badge variant={
              note.type === 'concept' ? 'default' :
              note.type === 'implementation' ? 'secondary' :
              'outline'
            }>
              {note.type}
            </Badge>
          </div>
        </div>
        <CardDescription>
          {formatDistanceToNow(note.metadata.updated, { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent onClick={onClick}>
        <div className="prose prose-sm dark:prose-invert max-h-[120px] overflow-hidden">
          <MDEditor.Markdown source={note.content} />
        </div>
        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {note.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 