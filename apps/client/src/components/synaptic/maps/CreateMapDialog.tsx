import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateMap } from '@/hooks/useCreateMap'

interface CreateMapDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateMapDialog({ open, onOpenChange }: CreateMapDialogProps) {
  const router = useRouter()
  const { createMap, isLoading } = useCreateMap()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newMap = await createMap({ title, description })
      router.push(`/synapticmap/${newMap.id}`)
      onOpenChange(false)
    } catch (error) {
      console.error('맵 생성 실패:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-slate-200">새로운 Synaptic Map 만들기</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">제목</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="맵의 제목을 입력하세요"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-400">설명</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="맵에 대한 설명을 입력하세요"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              생성하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 