import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import type { Note } from '../shared/NoteTypes'

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card className="hover:border-primary/50 cursor-pointer transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{note.title}</CardTitle>
          <Badge variant={
            note.type === 'concept' ? 'default' :
            note.type === 'implementation' ? 'secondary' :
            'outline'
          }>
            {note.type}
          </Badge>
        </div>
        <CardDescription>
          {formatDistanceToNow(note.metadata.updated, { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {note.content}
        </p>
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