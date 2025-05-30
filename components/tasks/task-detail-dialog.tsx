"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Clock, User2, Tag, Edit, Trash2, MessageSquare } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TaskFormDialog } from "@/components/tasks/task-form-dialog"
import { formatDate } from "@/lib/date-utils"
import type { Task } from "@/types/task"

interface TaskDetailDialogProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange?: (taskId: string, status: string) => void
  onEdit?: (task: Partial<Task>) => void
  onDelete?: (taskId: string) => void
}

export function TaskDetailDialog({
  task,
  open,
  onOpenChange,
  onStatusChange,
  onEdit,
  onDelete,
}: TaskDetailDialogProps) {
  const router = useRouter()
  const [showEditDialog, setShowEditDialog] = useState(false)

  if (!task) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendiente":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "en progreso":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "vencida":
        return "bg-red-100 text-red-800 border-red-200"
      case "completada":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800 border-red-200"
      case "media":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "baja":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleStatusChange = (status: string) => {
    if (onStatusChange) {
      onStatusChange(task.id, status)
    }
    onOpenChange(false)
  }

  const handleEdit = (updatedTask: Partial<Task>) => {
    if (onEdit) {
      onEdit({ ...updatedTask, id: task.id })
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task.id)
      onOpenChange(false)
    }
  }

  const handleContactClick = () => {
    if (task.relatedTo?.type === "prospect") {
      router.push(`/comunicaciones?prospectId=${task.relatedTo.id}`)
      onOpenChange(false)
    }
  }

  const isOverdue = new Date() > task.dueDate && task.status !== "completada"

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>Detalles de la Tarea</span>
              <Badge variant="outline" className={getStatusColor(task.status)}>
                {task.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Creada: {formatDate(task.createdAt)}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Descripción</h3>
                <p className="text-sm">{task.description}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Detalles</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Fecha de vencimiento:</span>
                    </div>
                    <span className={`text-sm ${isOverdue ? "text-red-600 font-medium" : ""}`}>
                      {formatDate(task.dueDate)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Asignado a:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{task.assignedTo.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{task.assignedTo}</span>
                    </div>
                  </div>
                </div>
              </div>

              {task.relatedTo && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Relacionado con</h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {task.relatedTo.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{task.relatedTo.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {task.relatedTo.type === "prospect" ? "Prospecto" : "Otro"}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleContactClick}
                            disabled={task.relatedTo.type !== "prospect"}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contactar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Acciones</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setShowEditDialog(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Tarea
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar Tarea
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Cambiar Estado</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleStatusChange("pendiente")}
                    disabled={task.status === "pendiente"}
                  >
                    <Tag className="h-4 w-4 mr-2 text-blue-600" />
                    Pendiente
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleStatusChange("en progreso")}
                    disabled={task.status === "en progreso"}
                  >
                    <Tag className="h-4 w-4 mr-2 text-yellow-600" />
                    En Progreso
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleStatusChange("completada")}
                    disabled={task.status === "completada"}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    Completada
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Actividad Reciente</h3>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    <p>No hay actividad reciente para esta tarea.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <TaskFormDialog open={showEditDialog} onOpenChange={setShowEditDialog} task={task} onSave={handleEdit} />
    </>
  )
}
