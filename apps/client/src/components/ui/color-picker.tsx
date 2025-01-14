"use client"

interface ColorPickerProps {
  color?: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <input
      type="color"
      value={color || '#ffffff'}
      onChange={(e) => onChange(e.target.value)}
      className="w-8 h-8 rounded cursor-pointer"
    />
  )
} 