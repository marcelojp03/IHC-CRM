"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ProspectCard } from "@/components/prospects/prospect-card"
import { Badge } from "@/components/ui/badge"
import type { Prospect } from "@/types/prospect"
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  closestCorners,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanColumn } from "@/components/prospects/kanban-column"

interface ProspectsKanbanTabsProps {
  prospects: Prospect[]
  onStatusChange: (prospectId: string, status: string) => void
  onViewProspect: (prospect: Prospect) => void
}

export function ProspectsKanbanTabs({ prospects, onStatusChange, onViewProspect }: ProspectsKanbanTabsProps) {
  const [activeProspect, setActiveProspect] = useState<Prospect | null>(null)

  // Configuración de sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  // Agrupar prospectos por estado
  const prospectsByStatus = {
    nuevo: prospects.filter((p) => p.status === "nuevo"),
    contactado: prospects.filter((p) => p.status === "contactado"),
    "en conversación": prospects.filter((p) => p.status === "en conversación"),
    negociación: prospects.filter((p) => p.status === "negociación"),
    ganado: prospects.filter((p) => p.status === "ganado"),
    perdido: prospects.filter((p) => p.status === "perdido"),
  }

  // Configuración de estados con colores suaves
  const statusConfig = [
    { id: "nuevo", label: "Nuevo", color: "#FEF3C7", textColor: "#92400E" },
    { id: "contactado", label: "Contactado", color: "#FED7AA", textColor: "#9A3412" },
    { id: "en conversación", label: "En Conversación", color: "#DBEAFE", textColor: "#1E40AF" },
    { id: "negociación", label: "Negociación", color: "#E9D5FF", textColor: "#7C3AED" },
    { id: "ganado", label: "Ganado", color: "#D1FAE5", textColor: "#059669" },
    { id: "perdido", label: "Perdido", color: "#FEE2E2", textColor: "#DC2626" },
  ]

  // Función para manejar el inicio del arrastre
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const prospectId = active.id as string
    const prospect = prospects.find((p) => p.id === prospectId)
    if (prospect) {
      setActiveProspect(prospect)
    }
  }

  // Función para manejar el fin del arrastre
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const prospectId = active.id as string
      const newStatus = over.id as string

      // Actualizar el estado del prospecto
      onStatusChange(prospectId, newStatus)
    }

    setActiveProspect(null)
  }

  // Función para manejar cuando se arrastra sobre una columna
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    // Si se está arrastrando sobre la misma columna, no hacemos nada
    if (activeId === overId) return

    // Verificar si el over es una columna (no otro prospecto)
    const isColumn = Object.keys(prospectsByStatus).includes(overId as string)

    if (isColumn) {
      const prospectId = activeId as string
      const newStatus = overId as string

      // Actualizar temporalmente para feedback visual
      onStatusChange(prospectId, newStatus)
    }
  }

  return (
    <Tabs defaultValue="all" className="h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between mb-4">
        <TabsList className="grid grid-cols-7 w-full max-w-4xl">
          <TabsTrigger value="all" className="text-xs">
            Todos ({prospects.length})
          </TabsTrigger>
          {statusConfig.map((status) => (
            <TabsTrigger key={status.id} value={status.id} className="text-xs">
              {status.label} ({prospectsByStatus[status.id as keyof typeof prospectsByStatus].length})
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <TabsContent value="all" className="h-full">
          <ScrollArea className="h-full w-full">
            <div className="flex h-full gap-4 p-4">
              {statusConfig.map((status) => {
                const statusProspects = prospectsByStatus[status.id as keyof typeof prospectsByStatus]

                return (
                  <SortableContext
                    key={status.id}
                    items={statusProspects.map((p) => p.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <KanbanColumn
                      id={status.id}
                      title={status.label}
                      color={status.color}
                      textColor={status.textColor}
                      count={statusProspects.length}
                    >
                      {statusProspects.map((prospect) => (
                        <ProspectCard
                          key={prospect.id}
                          prospect={prospect}
                          isDraggable={true}
                          onMove={onStatusChange}
                        />
                      ))}
                    </KanbanColumn>
                  </SortableContext>
                )
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>

        {statusConfig.map((status) => {
          const statusProspects = prospectsByStatus[status.id as keyof typeof prospectsByStatus]

          return (
            <TabsContent key={status.id} value={status.id} className="h-full">
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: status.color }} />
                    <h3 className="text-lg font-semibold">{status.label}</h3>
                    <Badge variant="outline" style={{ borderColor: status.color, color: status.color }}>
                      {statusProspects.length}
                    </Badge>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {statusProspects.map((prospect) => (
                    <ProspectCard key={prospect.id} prospect={prospect} isDraggable={false} onMove={onStatusChange} />
                  ))}
                </div>
              </div>
            </TabsContent>
          )
        })}

        {/* Overlay que muestra el elemento siendo arrastrado */}
        <DragOverlay>
          {activeProspect && <ProspectCard prospect={activeProspect} isDraggable={false} isOverlay={true} />}
        </DragOverlay>
      </DndContext>
    </Tabs>
  )
}
