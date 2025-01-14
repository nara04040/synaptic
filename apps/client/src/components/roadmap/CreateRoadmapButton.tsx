"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function CreateRoadmapButton() {
  const router = useRouter()

  return (
    <Button 
      onClick={() => router.push("/roadmap/create")}
      className="inline-flex items-center justify-center"
    >
      Create Roadmap
    </Button>
  )
} 