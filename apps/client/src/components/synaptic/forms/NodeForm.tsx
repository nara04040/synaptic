import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { NodeType, SynapticNode } from "@/types/synaptic/node"
import { cn } from "@/lib/utils"

const nodeFormSchema = z.object({
  label: z.string()
    .min(1, "제목을 입력해주세요")
    .max(50, "제목은 50자를 넘을 수 없습니다"),
  type: z.enum(["concept", "note", "resource"] as const, {
    required_error: "노드 타입을 선택해주세요",
  }),
  content: z.string()
    .min(1, "내용을 입력해주세요")
    .max(500, "내용은 500자를 넘을 수 없습니다")
    .optional(),
  strength: z.number()
    .min(0, "강도는 0보다 작을 수 없습니다")
    .max(100, "강도는 100을 넘을 수 없습니다")
})

type NodeFormValues = z.infer<typeof nodeFormSchema>

const NODE_TYPES = [
  { value: "concept", label: "개념", description: "핵심 개념이나 아이디어" },
  { value: "note", label: "노트", description: "상세 설명이나 메모" },
  { value: "resource", label: "자료", description: "참고 자료나 링크" },
]

interface NodeFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: NodeFormValues) => void
  onDelete?: () => void
  initialData?: Partial<NodeFormValues>
}

export function NodeForm({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  initialData,
}: NodeFormProps) {
  const form = useForm<NodeFormValues>({
    resolver: zodResolver(nodeFormSchema),
    defaultValues: {
      label: initialData?.label || "",
      type: initialData?.type || "concept",
      content: initialData?.content || "",
      strength: initialData?.strength || 75,
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "노드 편집" : "새 노드 생성"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Edit the properties of this node."
              : "Create a new node in your knowledge map."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input placeholder="노드 제목을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>타입</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="노드 타입을 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {NODE_TYPES.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={type.value}
                          className="flex flex-col items-start"
                        >
                          <span className="font-medium">{type.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {type.description}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>내용</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="노드의 상세 내용을 입력하세요"
                      className="h-24 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="strength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>강도</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={([value]) => field.onChange(value)}
                        className="flex-1"
                      />
                      <span className="w-12 text-center">{field.value}%</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between space-x-2">
              <div className="flex space-x-2">
                <Button variant="outline" onClick={onClose}>
                  취소
                </Button>
                <Button type="submit">
                  {initialData ? "수정" : "생성"}
                </Button>
              </div>
              {initialData && onDelete && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={onDelete}
                  className="px-3"
                >
                  삭제
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 