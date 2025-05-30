"use client"

import type React from "react"

import { MoreHorizontal, Eye, Edit, CheckCircle2, Clock, User2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Task } from "@/types/task"
import { formatDate } from "@/lib/date-utils"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  task: Task
  onView?: () => void
  onStatusChange?: (taskId: string, status: string) => void
  viewType?: "status" | "priority"
  isDraggable?: boolean
  isOverlay?: boolean
}

export function TaskCard({
  task,
  onView,
  onStatusChange,
  viewType = "status",
  isDraggable = false,
  isOverlay = false,
}: TaskCardProps) {
  const statusOptions = [
    { value: "pendiente", label: "Pendiente" },
    { value: "en progreso", label: "En Progreso" },
    { value: "vencida", label: "Vencida" },
    { value: "completada", label: "Completada" },
  ]

  const priorityOptions = [
    { value: "alta", label: "Alta" },
    { value: "media", label: "Media" },
    { value: "baja", label: "Baja" },
  ]

  // Configuración para drag and drop
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })

  const style = isDraggable
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : 1,
      }
    : {}

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendiente":
        return { bg: "#3B82F6", text: "white" }
      case "en progreso":
        return { bg: "#F59E0B", text: "white" }
      case "vencida":
        return { bg: "#EF4444", text: "white" }
      case "completada":
        return { bg: "#10B981", text: "white" }
      default:
        return { bg: "#6B7280", text: "white" }
    }
  }

  // Colores actualizados según especificaciones: rojo=alta, amarillo=media, verde=baja
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return { bg: "#EF4444", text: "white" } // Rojo
      case "media":
        return { bg: "#F59E0B", text: "white" } // Amarillo
      case "baja":
        return { bg: "#10B981", text: "white" } // Verde
      default:
        return { bg: "#6B7280", text: "white" }
    }
  }

  const isOverdue = (task: Task) => {
    return new Date() > task.dueDate && task.status !== "completada"
  }

  const markAsCompleted = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onStatusChange) {
      onStatusChange(task.id, "completada")
    }
  }

  const handleStatusChange = (status: string) => {
    if (onStatusChange) {
      onStatusChange(task.id, status)
    }
  }

  const handleCardClick = () => {
    if (onView) {
      onView()
    }
  }

  const statusColor = getStatusColor(task.status)
  const priorityColor = getPriorityColor(task.priority)

  return (
    <Card
      ref={setNodeRef}
      style={{
        ...style,
        borderLeftColor: viewType === "status" ? statusColor.bg : priorityColor.bg,
      }}
      className={cn(
        "shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing border-l-4",
        isOverlay && "shadow-lg rotate-3",
        isDragging && "opacity-50",
        isOverdue(task) && !isOverlay && "border-red-200 bg-red-50/50",
      )}
      onClick={handleCardClick}
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm pr-2">{task.title}</h3>
          {!isOverlay && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Más opciones</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    onView && onView()
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver detalles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar tarea
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    markAsCompleted(e)
                  }}
                  disabled={task.status === "completada"}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Marcar completada
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{viewType === "status" ? "Cambiar estado" : "Cambiar prioridad"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {viewType === "status"
                  ? statusOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        disabled={task.status === option.value}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStatusChange(option.value)
                        }}
                      >
                        Mover a {option.label}
                      </DropdownMenuItem>
                    ))
                  : priorityOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        disabled={task.priority === option.value}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Cambiar a {option.label}
                      </DropdownMenuItem>
                    ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{task.description}</p>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className={isOverdue(task) ? "text-destructive font-medium" : "text-muted-foreground"}>
                {formatDate(task.dueDate)}
              </span>
            </div>
            {viewType === "status" ? (
              <Badge
                className="text-xs font-medium"
                style={{ backgroundColor: priorityColor.bg, color: priorityColor.text }}
              >
                {task.priority}
              </Badge>
            ) : (
              <Badge
                className="text-xs font-medium"
                style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
              >
                {task.status}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User2 className="h-3 w-3" />
              <span>{task.assignedTo}</span>
            </div>

            {!isOverlay && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={(e) => {
                  e.stopPropagation()
                  markAsCompleted(e)
                }}
                disabled={task.status === "completada"}
              >
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Completar</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
