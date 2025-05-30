"use client"

import { Search, LayoutGrid, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { NotificationTrigger } from "@/components/notification-panel"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface ProspectsHeaderProps {
  view: "table" | "kanban"
  onViewChange: (view: "table" | "kanban") => void
}

export function ProspectsHeader({ view, onViewChange }: ProspectsHeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Prospectos</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(value) => value && onViewChange(value as "table" | "kanban")}
          >
            <ToggleGroupItem value="table" aria-label="Tabla">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="kanban" aria-label="Kanban">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar prospectos..." className="w-64 pl-8 bg-background" />
          </div>
          <NotificationTrigger />
        </div>
      </div>
    </header>
  )
}
