import type { Note } from '../notes/shared/NoteTypes'
import type { Node, Edge } from './NodeTypes'

export function createNodeFromNote(note: Note, position: { x: number; y: number }): Node {
  return {
    id: `node-${note.id}`,
    type: note.type,
    data: {
      title: note.title,
      content: note.content,
      tags: note.tags,
      noteId: note.id,
      references: note.metadata.references
    },
    position,
    style: {
      width: 200,
      height: 100,
      backgroundColor: getNodeColor(note.type),
      borderColor: getBorderColor(note.type)
    }
  }
}

function getNodeColor(type: string): string {
  switch (type) {
    case 'concept':
      return 'rgba(147, 197, 253, 0.5)' // blue-300
    case 'implementation':
      return 'rgba(167, 243, 208, 0.5)' // green-300
    case 'question':
      return 'rgba(253, 164, 175, 0.5)' // rose-300
    default:
      return 'rgba(226, 232, 240, 0.5)' // slate-200
  }
}

function getBorderColor(type: string): string {
  switch (type) {
    case 'concept':
      return 'rgb(59, 130, 246)' // blue-500
    case 'implementation':
      return 'rgb(34, 197, 94)' // green-500
    case 'question':
      return 'rgb(244, 63, 94)' // rose-500
    default:
      return 'rgb(100, 116, 139)' // slate-500
  }
} 