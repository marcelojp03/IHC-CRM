"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { TaskCard } from "@/components/tasks/task-card"
import type { Task } from "@/types/task"
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
import { KanbanColumn } from "@/components/tasks/kanban-column"
import { useToast } from "@/hooks/use-toast"

interface TasksKanbanProps {
  tasks: Task[]
  onViewTask: (task: Task) => void
  onStatusChange: (taskId: string, status: string) => void
}

export function TasksKanban({ tasks, onViewTask, onStatusChange }: TasksKanbanProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [activeView, setActiveView] = useState<"status" | "priority">("status")
  const { toast } = useToast()

  // Configuración de sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  // Agrupar tareas por estado
  const tasksByStatus = {
    pendiente: tasks.filter((t) => t.status === "pendiente"),
    "en progreso": tasks.filter((t) => t.status === "en progreso"),
    vencida: tasks.filter((t) => t.status === "vencida"),
    completada: tasks.filter((t) => t.status === "completada"),
  }

  // Agrupar tareas por prioridad
  const tasksByPriority = {
    alta: tasks.filter((t) => t.priority === "alta"),
    media: tasks.filter((t) => t.priority === "media"),
    baja: tasks.filter((t) => t.priority === "baja"),
  }

  // Configuración de columnas por estado con colores mejorados
  const statusColumns = [
    { id: "pendiente", label: "Pendiente", color: "#FEF3C7", textColor: "#92400E" },
    { id: "en progreso", label: "En Progreso", color: "#DBEAFE", textColor: "#1E40AF" },
    { id: "vencida", label: "Vencida", color: "#FEE2E2", textColor: "#DC2626" },
    { id: "completada", label: "Completada", color: "#D1FAE5", textColor: "#059669" },
  ]

  // Configuración de columnas por prioridad
  const priorityColumns = [
    { id: "alta", label: "Alta", color: "#FEE2E2", textColor: "#DC2626" },
    { id: "media", label: "Media", color: "#FEF3C7", textColor: "#92400E" },
    { id: "baja", label: "Baja", color: "#D1FAE5", textColor: "#059669" },
  ]

  // Función para manejar el inicio del arrastre
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const taskId = active.id as string
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setActiveTask(task)
    }
  }

  // Función para manejar el fin del arrastre
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const taskId = active.id as string
      const newValue = over.id as string
      const task = tasks.find((t) => t.id === taskId)

      // Actualizar el estado de la tarea
      if (activeView === "status") {
        onStatusChange(taskId, newValue)
        if (task) {
          toast({
            title: "Tarea actualizada",
            description: `"${task.title}" movida a "${newValue}".`,
          })
        }
      }
    }

    setActiveTask(null)
  }

  // Función para manejar cuando se arrastra sobre una columna
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    // Si se está arrastrando sobre la misma columna, no hacemos nada
    if (activeId === overId) return

    // Verificar si el over es una columna (no otra tarea)
    const isColumn =
      activeView === "status"
        ? Object.keys(tasksByStatus).includes(overId as string)
        : Object.keys(tasksByPriority).includes(overId as string)

    if (isColumn && activeView === "status") {
      const taskId = activeId as string
      const newValue = overId as string
      onStatusChange(taskId, newValue)
    }
  }

  return (
    <Tabs
      defaultValue="status"
      className="h-[calc(100vh-8rem)]"
      onValueChange={(value) => setActiveView(value as "status" | "priority")}
    >
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="status">Por Estado</TabsTrigger>
          <TabsTrigger value="priority">Por Prioridad</TabsTrigger>
        </TabsList>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <TabsContent value="status" className="h-full">
          <ScrollArea className="h-full w-full">
            <div className="flex h-full gap-4 p-4">
              {statusColumns.map((column) => {
                const columnTasks = tasksByStatus[column.id as keyof typeof tasksByStatus]

                return (
                  <SortableContext
                    key={column.id}
                    items={columnTasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <KanbanColumn
                      id={column.id}
                      title={column.label}
                      color={column.color}
                      textColor={column.textColor}
                      count={columnTasks.length}
                    >
                      {columnTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          isDraggable={true}
                          viewType="status"
                          onView={() => onViewTask(task)}
                          onStatusChange={onStatusChange}
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

        <TabsContent value="priority" className="h-full">
          <ScrollArea className="h-full w-full">
            <div className="flex h-full gap-4 p-4">
              {priorityColumns.map((column) => {
                const columnTasks = tasksByPriority[column.id as keyof typeof tasksByPriority]

                return (
                  <SortableContext
                    key={column.id}
                    items={columnTasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <KanbanColumn
                      id={column.id}
                      title={column.label}
                      color={column.color}
                      textColor={column.textColor}
                      count={columnTasks.length}
                    >
                      {columnTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          isDraggable={true}
                          viewType="priority"
                          onView={() => onViewTask(task)}
                          onStatusChange={onStatusChange}
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

        {/* Overlay que muestra el elemento siendo arrastrado */}
        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} isDraggable={false} isOverlay={true} viewType={activeView} />}
        </DragOverlay>
      </DndContext>
    </Tabs>
  )
}
