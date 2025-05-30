"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle, CheckCircle, Calendar, TrendingUp, XCircle } from "lucide-react"

export function TaskOrganization() {
  // Datos organizados por tiempo
  const timeOrganization = [
    { period: "Vencidas", count: 5, color: "#EF4444", icon: AlertTriangle, description: "Tareas que ya vencieron" },
    { period: "Hoy", count: 12, color: "#F59E0B", icon: Clock, description: "Vencen en las próximas 24 horas" },
    {
      period: "Esta semana",
      count: 18,
      color: "#3B82F6",
      icon: Calendar,
      description: "Vencen en los próximos 7 días",
    },
    {
      period: "Este mes",
      count: 25,
      color: "#8B5CF6",
      icon: TrendingUp,
      description: "Vencen en los próximos 30 días",
    },
    { period: "Futuro", count: 15, color: "#10B981", icon: CheckCircle, description: "Vencen en más de 30 días" },
    { period: "Sin fecha", count: 8, color: "#6B7280", icon: XCircle, description: "Tareas sin fecha límite" },
  ]

  // Datos organizados por prioridad y estado
  const priorityOrganization = [
    {
      priority: "Alta prioridad",
      count: 22,
      color: "#EF4444",
      description: "Tareas críticas que requieren atención inmediata",
      urgency: "crítica",
    },
    {
      priority: "Media prioridad",
      count: 35,
      color: "#F59E0B",
      description: "Tareas importantes con plazo moderado",
      urgency: "importante",
    },
    {
      priority: "Baja prioridad",
      count: 26,
      color: "#10B981",
      description: "Tareas que pueden realizarse cuando haya tiempo",
      urgency: "normal",
    },
  ]

  const statusOrganization = [
    {
      status: "Pendientes",
      count: 45,
      color: "#3B82F6",
      description: "Tareas que aún no se han iniciado",
    },
    {
      status: "En progreso",
      count: 18,
      color: "#F59E0B",
      description: "Tareas que se están ejecutando actualmente",
    },
    {
      status: "Completadas",
      count: 32,
      color: "#10B981",
      description: "Tareas finalizadas exitosamente",
    },
    {
      status: "Vencidas",
      count: 5,
      color: "#EF4444",
      description: "Tareas que no se completaron a tiempo",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Organización de Tareas</h2>
        <p className="text-muted-foreground">
          Gestiona tus tareas de manera eficiente organizándolas por tiempo, prioridad y estado
        </p>
      </div>

      <Tabs defaultValue="time" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="time">Por Tiempo</TabsTrigger>
          <TabsTrigger value="priority">Por Prioridad</TabsTrigger>
          <TabsTrigger value="status">Por Estado</TabsTrigger>
        </TabsList>

        <TabsContent value="time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organización Temporal</CardTitle>
              <CardDescription>Tareas organizadas por fecha de vencimiento y urgencia temporal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {timeOrganization.map((item) => (
                  <Card key={item.period} className="border-l-4" style={{ borderLeftColor: item.color }}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <item.icon className="h-5 w-5" style={{ color: item.color }} />
                          <span className="font-medium">{item.period}</span>
                        </div>
                        <Badge variant="outline" style={{ borderColor: item.color, color: item.color }}>
                          {item.count}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="priority" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organización por Prioridad</CardTitle>
              <CardDescription>Tareas agrupadas según su nivel de importancia y urgencia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priorityOrganization.map((item) => (
                  <div key={item.priority} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.priority}</span>
                          <Badge
                            variant={
                              item.urgency === "crítica"
                                ? "destructive"
                                : item.urgency === "importante"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {item.urgency}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" style={{ borderColor: item.color, color: item.color }}>
                      {item.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organización por Estado</CardTitle>
              <CardDescription>Tareas agrupadas según su estado actual de ejecución</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statusOrganization.map((item) => (
                  <Card key={item.status} className="border-l-4" style={{ borderLeftColor: item.color }}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.status}</span>
                        <Badge variant="outline" style={{ borderColor: item.color, color: item.color }}>
                          {item.count}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
