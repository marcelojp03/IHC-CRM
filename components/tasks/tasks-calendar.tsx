"use client"

import { useState } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from "date-fns"
import { es } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Plus, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Task } from "@/types/task"
import { cn } from "@/lib/utils"

interface TasksCalendarProps {
  tasks: Task[]
  onViewTask: (task: Task) => void
  onNewTask?: () => void
}

export function TasksCalendar({ tasks, onViewTask, onNewTask }: TasksCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  // Obtener días del mes actual
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Obtener tareas para la fecha seleccionada
  const tasksForSelectedDate = selectedDate ? tasks.filter((task) => isSameDay(task.dueDate, selectedDate)) : []

  // Función para navegar al mes anterior
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Función para navegar al mes siguiente
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Función para obtener el color de prioridad
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

  // Función para obtener el color de estado
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

  // Función para verificar si un día tiene tareas
  const hasTasks = (day: Date) => {
    return tasks.some((task) => isSameDay(task.dueDate, day))
  }

  // Función para obtener el número de tareas para un día
  const getTaskCount = (day: Date) => {
    return tasks.filter((task) => isSameDay(task.dueDate, day)).length
  }

  // Función para verificar si un día tiene tareas vencidas
  const hasOverdueTasks = (day: Date) => {
    return tasks.some(
      (task) => isSameDay(task.dueDate, day) && task.status !== "completada" && new Date() > task.dueDate,
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">{format(currentMonth, "MMMM yyyy", { locale: es })}</h2>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onNewTask}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
          <div key={day} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 flex-1">
        {Array.from({ length: new Date(monthStart).getDay() === 0 ? 6 : new Date(monthStart).getDay() - 1 }).map(
          (_, i) => (
            <div key={`empty-${i}`} className="bg-muted/20 rounded-md"></div>
          ),
        )}

        {monthDays.map((day) => (
          <Button
            key={day.toString()}
            variant="outline"
            className={cn(
              "h-full min-h-24 p-1 flex flex-col items-start justify-start",
              selectedDate && isSameDay(day, selectedDate) && "ring-2 ring-primary",
              isToday(day) && "bg-muted/50",
              hasOverdueTasks(day) && "border-red-200",
            )}
            onClick={() => setSelectedDate(day)}
          >
            <div className="w-full flex justify-between items-start">
              <span
                className={cn(
                  "text-sm font-medium",
                  isToday(day) &&
                    "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center",
                )}
              >
                {format(day, "d")}
              </span>
              {hasTasks(day) && (
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    hasOverdueTasks(day) ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800",
                  )}
                >
                  {getTaskCount(day)}
                </Badge>
              )}
            </div>
          </Button>
        ))}
      </div>

      {selectedDate && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Tareas para {format(selectedDate, "d 'de' MMMM, yyyy", { locale: es })}</h3>
              <Button size="sm" onClick={onNewTask}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Tarea
              </Button>
            </div>

            <ScrollArea className="h-64">
              <div className="space-y-2">
                {tasksForSelectedDate.length > 0 ? (
                  tasksForSelectedDate.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => onViewTask(task)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant="outline" className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                        <span>Asignado a: {task.assignedTo}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            onViewTask(task)
                          }}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">Ver detalles</span>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No hay tareas para esta fecha</div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
