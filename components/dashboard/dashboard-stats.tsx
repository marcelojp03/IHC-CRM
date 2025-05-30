"use client"

import { Users, CheckSquare, TrendingUp, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DashboardStats() {
  return (
    <div className="space-y-4">
      <div className="flex-1 items-center justify-between">
        <h2 className="text-2xl font-bold">Estadísticas</h2>
        <Tabs defaultValue="today" className="w-auto">
          <TabsList>
            <TabsTrigger value="today">Hoy</TabsTrigger>
            <TabsTrigger value="week">Esta Semana</TabsTrigger>
            <TabsTrigger value="month">Este Mes</TabsTrigger>
          </TabsList>
          <TabsContent value="today">
            <StatsGrid period="today" />
          </TabsContent>
          <TabsContent value="week">
            <StatsGrid period="week" />
          </TabsContent>
          <TabsContent value="month">
            <StatsGrid period="month" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function StatsGrid({ period }: { period: "today" | "week" | "month" }) {
  const getStats = (period: string) => {
    switch (period) {
      case "today":
        return {
          total: 8,
          ganados: 2,
          tareas: 12,
          sinContacto: 3,
          comparison: "ayer",
        }
      case "week":
        return {
          total: 45,
          ganados: 12,
          tareas: 27,
          sinContacto: 8,
          comparison: "semana anterior",
        }
      case "month":
        return {
          total: 152,
          ganados: 38,
          tareas: 27,
          sinContacto: 15,
          comparison: "mes anterior",
        }
      default:
        return {
          total: 152,
          ganados: 38,
          tareas: 27,
          sinContacto: 15,
          comparison: "mes anterior",
        }
    }
  }

  const stats = getStats(period)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white dark:from-blue-950 dark:to-background">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Prospectos</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">{stats.total}</div>
          <p className="text-xs text-muted-foreground">+12% respecto a {stats.comparison}</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white dark:from-green-950 dark:to-background">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prospectos Ganados</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">{stats.ganados}</div>
          <p className="text-xs text-muted-foreground">+5% respecto a {stats.comparison}</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-950 dark:to-background">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
          <CheckSquare className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-700">{stats.tareas}</div>
          <p className="text-xs text-muted-foreground">8 con vencimiento hoy</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-white dark:from-red-950 dark:to-background">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Requieren Seguimiento</CardTitle>
          <AlertCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-700">{stats.sinContacto}</div>
          <p className="text-xs text-muted-foreground">Sin contacto por más de 7 días</p>
        </CardContent>
      </Card>
    </div>
  )
}
