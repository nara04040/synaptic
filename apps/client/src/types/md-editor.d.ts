declare module '@uiw/react-md-editor' {
  import React from 'react'
  
  export interface MDEditorProps {
    value: string
    onChange?: (value?: string) => void
    height?: number
    placeholder?: string
    preview?: 'live' | 'edit' | 'preview'
    hideToolbar?: boolean
    enableScroll?: boolean
  }

  const MDEditor: React.ForwardRefExoticComponent<MDEditorProps> & {
    Markdown: React.FC<{ source: string }>
  }
  
  export default MDEditor
} 