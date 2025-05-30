"use client"

import { useState } from "react"
import { MoreHorizontal, Eye, Edit, CheckCircle2, Clock, User2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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

interface TasksTableProps {
  tasks: Task[]
  onViewTask: (task: Task) => void
  onStatusChange: (taskId: string, status: string) => void
}

export function TasksTable({ tasks, onViewTask, onStatusChange }: TasksTableProps) {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(tasks.map((t) => t.id))
    } else {
      setSelectedTasks([])
    }
  }

  const handleSelectTask = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, taskId])
    } else {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId))
    }
  }

  const markAsCompleted = (taskId: string) => {
    onStatusChange(taskId, "completada")
  }

  const isOverdue = (task: Task) => {
    return new Date() > task.dueDate && task.status !== "completada"
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox checked={selectedTasks.length === tasks.length} onCheckedChange={handleSelectAll} />
            </TableHead>
            <TableHead>Tarea</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Prioridad</TableHead>
            <TableHead>Asignado a</TableHead>
            <TableHead>Vencimiento</TableHead>
            <TableHead>Relacionado con</TableHead>
            <TableHead className="w-12">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className={isOverdue(task) ? "bg-red-50" : ""}>
              <TableCell>
                <Checkbox
                  checked={selectedTasks.includes(task.id)}
                  onCheckedChange={(checked) => handleSelectTask(task.id, checked as boolean)}
                />
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">{task.description}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <User2 className="h-4 w-4 text-muted-foreground" />
                  <span>{task.assignedTo}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className={isOverdue(task) ? "text-red-600 font-medium" : ""}>{formatDate(task.dueDate)}</span>
                </div>
              </TableCell>
              <TableCell>{task.relatedTo && <span className="text-sm">{task.relatedTo.name}</span>}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => markAsCompleted(task.id)}
                    disabled={task.status === "completada"}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="sr-only">Completar</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onViewTask(task)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Ver detalles</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Más opciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onViewTask(task)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => markAsCompleted(task.id)}>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Marcar completada
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
