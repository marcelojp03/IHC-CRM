"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock } from "lucide-react"
import { formatDate } from "@/lib/date-utils"
import { mockTasks } from "@/data/mock-data"

export function UrgentTasks() {
  // Filtrar tareas urgentes (vencidas o con vencimiento hoy)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const urgentTasks = mockTasks
    .filter((task) => task.status !== "completada" && (task.dueDate <= today || task.priority === "alta"))
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Tareas Urgentes</CardTitle>
          <CardDescription>Tareas que requieren atención inmediata</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          Ver todas
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {urgentTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-4">
              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full mt-0.5">
                <CheckCircle2 className="h-4 w-4" />
                <span className="sr-only">Marcar como completada</span>
              </Button>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{task.title}</p>
                  <Badge
                    variant={
                      task.priority === "alta" ? "destructive" : task.priority === "media" ? "default" : "outline"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
