'use client'

import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { useTheme } from 'next-themes'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

interface MarkdownEditorProps {
  value: string
  onChange: (value?: string) => void
  placeholder?: string
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const { theme } = useTheme()

  return (
    <div data-color-mode={theme}>
      <MDEditor
        value={value}
        onChange={onChange}
        height={400}
        placeholder={placeholder}
        preview="edit"
        hideToolbar={false}
        enableScroll={true}
      />
    </div>
  )
} 