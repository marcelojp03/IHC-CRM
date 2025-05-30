"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "@/lib/date-utils"
import { mockProspects } from "@/data/mock-data"

export function RecentProspects() {
  // Mostrar solo los 5 prospectos más recientes
  const recentProspects = [...mockProspects].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Prospectos Recientes</CardTitle>
          <CardDescription>Últimos prospectos añadidos al sistema</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          Ver todos
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProspects.map((prospect) => (
            <div key={prospect.id} className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary">{prospect.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{prospect.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDistanceToNow(prospect.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {prospect.product}
                  </Badge>
                  <Badge
                    className="text-xs"
                    variant="outline"
                    style={{
                      backgroundColor:
                        prospect.status === "nuevo"
                          ? "#FFF9C4"
                          : prospect.status === "contactado"
                            ? "#FFE0B2"
                            : prospect.status === "en conversación"
                              ? "#BBDEFB"
                              : prospect.status === "negociación"
                                ? "#E1BEE7"
                                : prospect.status === "ganado"
                                  ? "#C8E6C9"
                                  : "#FFCDD2",
                    }}
                  >
                    {prospect.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
