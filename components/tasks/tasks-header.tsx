"use client"

import { Search, Plus, LayoutGrid, List, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NotificationTrigger } from "@/components/notification-panel"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface TasksHeaderProps {
  view: "table" | "kanban" | "calendar"
  onViewChange: (view: "table" | "kanban" | "calendar") => void
  onNewTask: () => void
}

export function TasksHeader({ view, onViewChange, onNewTask }: TasksHeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Tareas</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(value) => value && onViewChange(value as "table" | "kanban" | "calendar")}
          >
            <ToggleGroupItem value="table" aria-label="Tabla">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="kanban" aria-label="Kanban">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="calendar" aria-label="Calendario">
              <Calendar className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar tareas..." className="w-64 pl-8 bg-background" />
          </div>
          <NotificationTrigger />
          <Button onClick={onNewTask}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Tarea
          </Button>
        </div>
      </div>
    </header>
  )
}
