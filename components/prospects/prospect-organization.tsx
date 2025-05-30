"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle, CheckCircle, Users, TrendingUp, XCircle } from "lucide-react"

export function ProspectOrganization() {
  // Datos organizados por tiempo
  const timeOrganization = [
    { period: "Hoy", count: 8, color: "#EF4444", icon: AlertTriangle, description: "Requieren atención inmediata" },
    { period: "Esta semana", count: 23, color: "#F59E0B", icon: Clock, description: "Seguimiento programado" },
    { period: "Este mes", count: 45, color: "#3B82F6", icon: Users, description: "En proceso activo" },
    { period: "3 meses", count: 32, color: "#8B5CF6", icon: TrendingUp, description: "Seguimiento a mediano plazo" },
    { period: "6 meses", count: 28, color: "#10B981", icon: CheckCircle, description: "Recontacto programado" },
    { period: "+6 meses", count: 16, color: "#6B7280", icon: XCircle, description: "Archivo temporal" },
  ]

  // Datos organizados por acción requerida
  const actionOrganization = [
    {
      action: "Contacto inicial",
      count: 15,
      color: "#3B82F6",
      description: "Prospectos nuevos sin contactar",
      priority: "alta",
    },
    {
      action: "Seguimiento activo",
      count: 28,
      color: "#F59E0B",
      description: "En conversación, requieren seguimiento",
      priority: "alta",
    },
    {
      action: "Negociación",
      count: 12,
      color: "#EC4899",
      description: "En proceso de cierre",
      priority: "alta",
    },
    {
      action: "Recontacto programado",
      count: 22,
      color: "#8B5CF6",
      description: "No interesados, recontactar en fecha específica",
      priority: "media",
    },
    {
      action: "Seguimiento post-venta",
      count: 18,
      color: "#10B981",
      description: "Clientes ganados, mantener relación",
      priority: "baja",
    },
    {
      action: "Análisis de pérdida",
      count: 9,
      color: "#EF4444",
      description: "Clientes perdidos, analizar motivos",
      priority: "baja",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Organización de Prospectos</h2>
        <p className="text-muted-foreground">
          Gestiona tus prospectos de manera eficiente organizándolos por tiempo y acción requerida
        </p>
      </div>

      <Tabs defaultValue="time" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="time">Por Tiempo</TabsTrigger>
          <TabsTrigger value="action">Por Acción Requerida</TabsTrigger>
        </TabsList>

        <TabsContent value="time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organización Temporal</CardTitle>
              <CardDescription>Prospectos organizados por antigüedad y tiempo de última interacción</CardDescription>
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

        <TabsContent value="action" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organización por Acción</CardTitle>
              <CardDescription>
                Prospectos agrupados según la acción que requieren para avanzar en el embudo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actionOrganization.map((item) => (
                  <div key={item.action} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.action}</span>
                          <Badge
                            variant={
                              item.priority === "alta"
                                ? "destructive"
                                : item.priority === "media"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {item.priority}
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
      </Tabs>
    </div>
  )
}
