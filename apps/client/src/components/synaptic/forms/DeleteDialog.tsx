import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  type: 'node' | 'edge'
  title?: string
  connectedEdgesCount?: number
}

export function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  type,
  title,
  connectedEdgesCount = 0,
}: DeleteDialogProps) {
  const getDescription = () => {
    if (type === 'node') {
      return (
        <div className="space-y-2">
          <p>
            <span className="font-medium text-slate-200">{title}</span> 노드를 삭제하시겠습니까?
          </p>
          {connectedEdgesCount > 0 && (
            <p className="text-sm text-yellow-500">
              ⚠️ 이 노드와 연결된 {connectedEdgesCount}개의 연결도 함께 삭제됩니다.
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            이 작업은 되돌릴 수 없습니다.
          </p>
        </div>
      )
    }
    return (
      <div className="space-y-2">
        <p>이 연결을 삭제하시겠습니까?</p>
        <p className="text-sm text-muted-foreground">
          이 작업은 되돌릴 수 없습니다.
        </p>
      </div>
    )
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === 'node' ? '노드 삭제' : '연결 삭제'}
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            {getDescription()}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 