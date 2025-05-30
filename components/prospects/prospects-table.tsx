"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Eye, Edit, MessageSquare, Phone, Mail } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProspectDetailDialog } from "@/components/prospects/prospect-detail-dialog"
import { mockProspects } from "@/data/mock-data"
import type { Prospect } from "@/types/prospect"
import { formatDate } from "@/lib/date-utils"

export function ProspectsTable() {
  const router = useRouter()
  const [prospects, setProspects] = useState<Prospect[]>(mockProspects)
  const [selectedProspects, setSelectedProspects] = useState<string[]>([])
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nuevo":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "contactado":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "en conversación":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "negociación":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "ganado":
        return "bg-green-100 text-green-800 border-green-200"
      case "perdido":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProspects(prospects.map((p) => p.id))
    } else {
      setSelectedProspects([])
    }
  }

  const handleSelectProspect = (prospectId: string, checked: boolean) => {
    if (checked) {
      setSelectedProspects([...selectedProspects, prospectId])
    } else {
      setSelectedProspects(selectedProspects.filter((id) => id !== prospectId))
    }
  }

  // Función para navegar a comunicaciones con el prospecto seleccionado
  const handleChatClick = (prospectId: string, channel: "whatsapp" | "email" | "phone" = "whatsapp") => {
    router.push(`/comunicaciones?prospectId=${prospectId}&channel=${channel}`)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedProspects.length === prospects.length} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Prospecto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Fuente</TableHead>
              <TableHead>Creado</TableHead>
              <TableHead>Último Contacto</TableHead>
              <TableHead className="w-12">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prospects.map((prospect) => (
              <TableRow key={prospect.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProspects.includes(prospect.id)}
                    onCheckedChange={(checked) => handleSelectProspect(prospect.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {prospect.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{prospect.name}</div>
                      <div className="text-sm text-muted-foreground">{prospect.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(prospect.status)}>
                    {prospect.status}
                  </Badge>
                </TableCell>
                <TableCell>{prospect.product}</TableCell>
                <TableCell>{prospect.source}</TableCell>
                <TableCell>{formatDate(prospect.createdAt)}</TableCell>
                <TableCell>
                  {prospect.lastContactDate ? formatDate(prospect.lastContactDate) : "Sin contacto"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedProspect(prospect)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver detalles</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleChatClick(prospect.id)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="sr-only">Mensaje</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Más opciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSelectedProspect(prospect)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChatClick(prospect.id, "phone")}>
                          <Phone className="h-4 w-4 mr-2" />
                          Llamar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChatClick(prospect.id, "email")}>
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ProspectDetailDialog
        prospect={selectedProspect}
        open={!!selectedProspect}
        onOpenChange={(open) => !open && setSelectedProspect(null)}
      />
    </>
  )
}
