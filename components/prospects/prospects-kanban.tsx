"use client"

import { useState } from "react"
import { type DragEndEvent, type DragStartEvent, useDraggable, useDroppable } from "@dnd-kit/core"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { Prospect } from "@/types"
import { useToast } from "@/hooks/use-toast"

interface ProspectsKanbanProps {
  prospects: Prospect[]
  onStatusChange: (prospectId: string, newStatus: string) => void
  onViewProspect: (prospectId: string) => void
}

export function ProspectsKanban({ prospects, onStatusChange, onViewProspect }: ProspectsKanbanProps) {
  const [activeProspect, setActiveProspect] = useState<Prospect | null>(null)
  const { toast } = useToast()

  const statuses = ["Lead", "Contacted", "In Progress", "Closed"]

  const getProspectsByStatus = (status: string) => {
    return prospects.filter((prospect) => prospect.status === status)
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveProspect(prospects.find((prospect) => prospect.id === event.active.id) || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const prospectId = active.id as string
      const newStatus = over.id as string

      // Find the prospect to get its name
      const prospect = prospects.find((p) => p.id === prospectId)

      onStatusChange(prospectId, newStatus)

      if (prospect) {
        toast({
          title: "Estado actualizado",
          description: `${prospect.name} movido a "${newStatus}".`,
        })
      }
    }

    setActiveProspect(null)
  }

  const handleDragCancel = () => {
    setActiveProspect(null)
  }

  return (
    <div className="flex gap-4">
      {statuses.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          prospects={getProspectsByStatus(status)}
          onStatusChange={onStatusChange}
          onViewProspect={onViewProspect}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          handleDragCancel={handleDragCancel}
          activeProspect={activeProspect}
        />
      ))}
    </div>
  )
}

interface KanbanColumnProps {
  status: string
  prospects: Prospect[]
  onStatusChange: (prospectId: string, newStatus: string) => void
  onViewProspect: (prospectId: string) => void
  handleDragStart: (event: DragStartEvent) => void
  handleDragEnd: (event: DragEndEvent) => void
  handleDragCancel: () => void
  activeProspect: Prospect | null
}

function KanbanColumn({
  status,
  prospects,
  onStatusChange,
  onViewProspect,
  handleDragStart,
  handleDragEnd,
  handleDragCancel,
  activeProspect,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  })

  return (
    <Card className="w-80 flex-grow">
      <CardHeader>
        <CardTitle>{status}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <ScrollArea className="h-[80vh] w-full rounded-md border">
          <div ref={setNodeRef} className="h-full w-full p-2">
            {prospects.map((prospect) => (
              <KanbanCard
                key={prospect.id}
                prospect={prospect}
                onStatusChange={onStatusChange}
                onViewProspect={onViewProspect}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                handleDragCancel={handleDragCancel}
                activeProspect={activeProspect}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

interface KanbanCardProps {
  prospect: Prospect
  onStatusChange: (prospectId: string, newStatus: string) => void
  onViewProspect: (prospectId: string) => void
  handleDragStart: (event: DragStartEvent) => void
  handleDragEnd: (event: DragEndEvent) => void
  handleDragCancel: () => void
  activeProspect: Prospect | null
}

function KanbanCard({
  prospect,
  onStatusChange,
  onViewProspect,
  handleDragStart,
  handleDragEnd,
  handleDragCancel,
  activeProspect,
}: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: prospect.id,
  })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>{prospect.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{prospect.email}</p>
        </CardContent>
        <Separator />
        <CardFooter className="justify-between">
          <p className="text-sm text-muted-foreground">{prospect.createdAt}</p>
          <Button size="sm" onClick={() => onViewProspect(prospect.id)}>
            View
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
