import type React from "react"
import { useDroppable } from "@dnd-kit/core"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface KanbanColumnProps {
  id: string
  title: string
  color: string
  textColor: string
  count: number
  children: React.ReactNode
}

export function KanbanColumn({ id, title, color, textColor, count, children }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div className="flex-shrink-0 flex flex-col w-80 h-full">
      <div
        className="rounded-t-md p-3 font-medium border-b"
        style={{
          backgroundColor: color,
          color: textColor,
          borderColor: textColor + "40",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold">{title}</span>
          <span
            className="text-xs font-bold px-2 py-1 rounded-full"
            style={{
              backgroundColor: textColor + "30",
              color: textColor,
            }}
          >
            {count}
          </span>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 overflow-hidden rounded-b-md border border-t-0 bg-muted/30",
          isOver && "ring-2 ring-primary/20 bg-muted/50",
        )}
      >
        <ScrollArea className="h-full">
          <div className="p-2 space-y-2">
            {children}
            {count === 0 && (
              <div className="h-24 flex items-center justify-center text-sm text-muted-foreground">
                No hay prospectos
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
