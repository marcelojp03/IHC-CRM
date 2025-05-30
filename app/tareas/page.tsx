"use client"

import { useState } from "react"
import { TasksHeader } from "@/components/tasks/tasks-header"
import { TasksKanban } from "@/components/tasks/tasks-kanban"
import { TasksTable } from "@/components/tasks/tasks-table"
import { TasksCalendar } from "@/components/tasks/tasks-calendar"
import { TasksFilters, type TaskFilterValue } from "@/components/tasks/tasks-filters"
import { TaskFormDialog } from "@/components/tasks/task-form-dialog"
import { TaskDetailDialog } from "@/components/tasks/task-detail-dialog"
import { TaskOrganization } from "@/components/tasks/task-organization"
import { mockTasks } from "@/data/mock-data"
import type { Task } from "@/types/task"

export default function TasksPage() {
  const [view, setView] = useState<"table" | "kanban" | "calendar">("table") // Tabla primero
  const [filters, setFilters] = useState<TaskFilterValue>({})
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskDetailDialog, setShowTaskDetailDialog] = useState(false)

  const handleFilterChange = (newFilters: TaskFilterValue) => {
    setFilters(newFilters)
  }

  const handleCreateTask = (newTask: Partial<Task>) => {
    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title || "",
      description: newTask.description || "",
      status: newTask.status as "pendiente" | "en progreso" | "vencida" | "completada",
      priority: newTask.priority as "alta" | "media" | "baja",
      dueDate: newTask.dueDate || new Date(),
      createdAt: new Date(),
      assignedTo: newTask.assignedTo || "Juan Pérez",
      relatedTo: newTask.relatedTo,
    }

    setTasks([task, ...tasks])
  }

  const handleEditTask = (updatedTask: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task)))
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const handleStatusChange = (taskId: string, status: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: status as "pendiente" | "en progreso" | "vencida" | "completada" }
          : task,
      ),
    )
  }

  const handleViewTask = (task: Task) => {
    setSelectedTask(task)
    setShowTaskDetailDialog(true)
  }

  const renderView = () => {
    switch (view) {
      case "table":
        return <TasksTable tasks={tasks} onViewTask={handleViewTask} onStatusChange={handleStatusChange} />
      case "kanban":
        return <TasksKanban tasks={tasks} onViewTask={handleViewTask} onStatusChange={handleStatusChange} />
      case "calendar":
        return <TasksCalendar tasks={tasks} onViewTask={handleViewTask} />
      default:
        return <TasksTable tasks={tasks} onViewTask={handleViewTask} onStatusChange={handleStatusChange} />
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TasksHeader
        view={view}
        onViewChange={(newView) => setView(newView)}
        onNewTask={() => setShowNewTaskDialog(true)}
      />
      <div className="p-4 md:p-6 space-y-6">
        {/* Organización de tareas */}
        <TaskOrganization />

        {/* Filtros */}
        <div>
          <TasksFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Vista principal */}
        <div className="flex-1">{renderView()}</div>
      </div>

      <TaskFormDialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog} onSave={handleCreateTask} />

      <TaskDetailDialog
        task={selectedTask}
        open={showTaskDetailDialog}
        onOpenChange={setShowTaskDetailDialog}
        onStatusChange={handleStatusChange}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  )
}
