"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export function DashboardCharts() {
  // Datos para los gráficos con colores específicos de plataformas (sin iconos)
  const prospectData = [
    { status: "Nuevo", count: 42, color: "#3B82F6", percentage: 28 },
    { status: "Contactado", count: 35, color: "#F59E0B", percentage: 23 },
    { status: "En conversación", count: 28, color: "#8B5CF6", percentage: 18 },
    { status: "Negociación", count: 22, color: "#EC4899", percentage: 15 },
    { status: "Ganado", count: 38, color: "#10B981", percentage: 25 },
    { status: "Perdido", count: 15, color: "#EF4444", percentage: 10 },
  ]

  const productData = [
    {
      product: "Netflix Premium",
      count: 48,
      color: "#E50914",
      percentage: 32,
    },
    {
      product: "Disney+ Anual",
      count: 35,
      color: "#113CCF",
      percentage: 23,
    },
    {
      product: "HBO Max",
      count: 29,
      color: "#8B5CF6",
      percentage: 19,
    },
    {
      product: "Amazon Prime",
      count: 22,
      color: "#FF9900",
      percentage: 15,
    },
    {
      product: "Combo Streaming",
      count: 18,
      color: "#10B981",
      percentage: 12,
    },
  ]

  const sourceData = [
    {
      source: "Facebook",
      count: 52,
      color: "#1877F2",
      percentage: 34,
    },
    {
      source: "Instagram",
      count: 38,
      color: "#E4405F",
      percentage: 25,
    },
    {
      source: "TikTok",
      count: 25,
      color: "#000000",
      percentage: 16,
    },
    {
      source: "WhatsApp",
      count: 20,
      color: "#25D366",
      percentage: 13,
    },
    {
      source: "Referidos",
      count: 17,
      color: "#F59E0B",
      percentage: 11,
    },
  ]

  const conversionData = [
    { stage: "Nuevo → Contactado", percentage: 83, color: "#10B981" },
    { stage: "Contactado → En conversación", percentage: 68, color: "#3B82F6" },
    { stage: "En conversación → Negociación", percentage: 52, color: "#8B5CF6" },
    { stage: "Negociación → Ganado", percentage: 45, color: "#EF4444" },
  ]

  return (
    <Tabs defaultValue="prospects" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="prospects">Prospectos</TabsTrigger>
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="sources">Fuentes</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="prospects" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Prospectos por Estado</CardTitle>
              <CardDescription>Distribución actual de prospectos en el embudo de ventas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {prospectData.map((item) => (
                  <div key={item.status} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-medium">{item.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.count}</span>
                        <span className="text-xs text-muted-foreground">({item.percentage}%)</span>
                      </div>
                    </div>
                    <Progress
                      value={item.percentage}
                      className="h-2"
                      style={{
                        background: `linear-gradient(to right, ${item.color} 0%, ${item.color} ${item.percentage}%, #f1f5f9 ${item.percentage}%, #f1f5f9 100%)`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Tasas de Conversión</CardTitle>
              <CardDescription>Porcentaje de prospectos que avanzan entre etapas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {conversionData.map((item) => (
                  <div key={item.stage} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.stage}</span>
                      <span className="text-sm font-bold" style={{ color: item.color }}>
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="relative">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="products" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Prospectos por Producto</CardTitle>
            <CardDescription>Distribución de interés por productos de streaming</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                {productData.map((item) => (
                  <div key={item.product} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-medium">{item.product}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.count}</span>
                        <span className="text-xs text-muted-foreground">({item.percentage}%)</span>
                      </div>
                    </div>
                    <Progress
                      value={item.percentage}
                      className="h-2"
                      style={{
                        background: `linear-gradient(to right, ${item.color} 0%, ${item.color} ${item.percentage}%, #f1f5f9 ${item.percentage}%, #f1f5f9 100%)`,
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {productData.map((item, index) => {
                      const total = productData.reduce((sum, p) => sum + p.count, 0)
                      const percentage = (item.count / total) * 100
                      const circumference = 2 * Math.PI * 40
                      const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
                      const strokeDashoffset = -productData
                        .slice(0, index)
                        .reduce((sum, p) => sum + (p.count / total) * circumference, 0)

                      return (
                        <circle
                          key={item.product}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={item.color}
                          strokeWidth="8"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-500"
                        />
                      )
                    })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">152</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="sources" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Prospectos por Fuente</CardTitle>
            <CardDescription>Canales de adquisición más efectivos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sourceData.map((item) => (
                <div key={item.source} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-medium">{item.source}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.count}</span>
                      <span className="text-xs text-muted-foreground">({item.percentage}%)</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
