"use client"

import type React from "react"

import { MoreHorizontal, Mail, Phone, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Prospect } from "@/types/prospect"
import { formatDistanceToNow } from "@/lib/date-utils"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface ProspectCardProps {
  prospect: Prospect
  onMove?: (id: string, status: string) => void
  isDraggable?: boolean
  isOverlay?: boolean
}

export function ProspectCard({ prospect, onMove, isDraggable = false, isOverlay = false }: ProspectCardProps) {
  const router = useRouter()
  const { toast } = useToast()

  const statusOptions = [
    { value: "nuevo", label: "Nuevo" },
    { value: "contactado", label: "Contactado" },
    { value: "en conversación", label: "En conversación" },
    { value: "negociación", label: "Negociación" },
    { value: "ganado", label: "Ganado" },
    { value: "perdido", label: "Perdido" },
  ]

  // Colores para estados (suaves)
  const getStatusColor = (status: string) => {
    switch (status) {
      case "nuevo":
        return { bg: "#FEF3C7", text: "#92400E", border: "#F59E0B" }
      case "contactado":
        return { bg: "#FED7AA", text: "#9A3412", border: "#EA580C" }
      case "en conversación":
        return { bg: "#DBEAFE", text: "#1E40AF", border: "#3B82F6" }
      case "negociación":
        return { bg: "#E9D5FF", text: "#7C3AED", border: "#8B5CF6" }
      case "ganado":
        return { bg: "#D1FAE5", text: "#059669", border: "#10B981" }
      case "perdido":
        return { bg: "#FEE2E2", text: "#DC2626", border: "#EF4444" }
      default:
        return { bg: "#F3F4F6", text: "#374151", border: "#6B7280" }
    }
  }

  // Colores para productos/plataformas
  const getProductColor = (product: string) => {
    switch (product.toLowerCase()) {
      case "netflix premium":
        return "#E50914"
      case "disney+ anual":
        return "#113CCF"
      case "hbo max":
        return "#8B5CF6"
      case "amazon prime":
        return "#FF9900"
      case "combo streaming":
        return "#10B981"
      case "spotify premium":
        return "#1DB954"
      case "youtube premium":
        return "#FF0000"
      default:
        return "#6B7280"
    }
  }

  // Colores para fuentes/canales
  const getSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case "facebook":
        return "#1877F2"
      case "instagram":
        return "#E4405F"
      case "tiktok":
        return "#000000"
      case "whatsapp":
        return "#25D366"
      case "referidos":
        return "#F59E0B"
      case "google ads":
        return "#4285F4"
      case "linkedin":
        return "#0A66C2"
      case "twitter":
        return "#1DA1F2"
      default:
        return "#6B7280"
    }
  }

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: prospect.id })

  const style = isDraggable
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : 1,
      }
    : {}

  const statusColor = getStatusColor(prospect.status)
  const productColor = getProductColor(prospect.product)
  const sourceColor = getSourceColor(prospect.source)

  // Función para navegar a comunicaciones con el prospecto seleccionado
  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/comunicaciones?prospectId=${prospect.id}`)
  }

  // Función para enviar email interno
  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/comunicaciones?prospectId=${prospect.id}&channel=email`)
  }

  // Función para iniciar llamada interna
  const handleCallClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/comunicaciones?prospectId=${prospect.id}&channel=phone`)
  }

  // Función para cambiar estado manualmente
  const handleStatusChange = (newStatus: string) => {
    if (onMove) {
      onMove(prospect.id, newStatus)
      toast({
        title: "Estado actualizado",
        description: `${prospect.name} movido a "${newStatus}".`,
      })
    }
  }

  return (
    <Card
      ref={setNodeRef}
      style={{
        ...style,
        borderLeftColor: statusColor.border,
        borderLeftWidth: "4px",
      }}
      className={cn(
        "shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing border-l-4",
        isOverlay && "shadow-lg rotate-3",
        isDragging && "opacity-50",
      )}
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback
                className="text-xs font-medium"
                style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
              >
                {prospect.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">{prospect.name}</h3>
              <p className="text-xs text-muted-foreground">{prospect.email}</p>
            </div>
          </div>
          {!isOverlay && (
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
                <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                <DropdownMenuItem>Editar prospecto</DropdownMenuItem>
                <DropdownMenuItem>Crear tarea</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Cambiar estado</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {statusOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    disabled={prospect.status === option.value}
                    onClick={() => handleStatusChange(option.value)}
                  >
                    Mover a {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="space-y-3">
          {/* Indicadores mejorados con etiquetas */}
          <div className="space-y-2">
            {/* Producto de interés */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Producto de interés:</span>
              <div className="flex items-center gap-1">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: productColor }}
                  title={`Producto: ${prospect.product}`}
                />
                <Badge variant="outline" className="text-xs" style={{ borderColor: productColor, color: productColor }}>
                  {prospect.product}
                </Badge>
              </div>
            </div>

            {/* Origen/Canal */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Origen:</span>
              <div className="flex items-center gap-1">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: sourceColor }}
                  title={`Canal: ${prospect.source}`}
                />
                <Badge variant="outline" className="text-xs" style={{ borderColor: sourceColor, color: sourceColor }}>
                  {prospect.source}
                </Badge>
              </div>
            </div>
          </div>

          {/* Estado del prospecto */}
          <div className="flex justify-center">
            <Badge className="text-xs font-medium" style={{ backgroundColor: statusColor.bg, color: statusColor.text }}>
              {prospect.status}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">{prospect.notes || "Sin notas adicionales"}</p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900 dark:hover:text-blue-400"
                onClick={handleEmailClick}
                title="Enviar email"
              >
                <Mail className="h-3.5 w-3.5" />
                <span className="sr-only">Enviar email</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900 dark:hover:text-green-400"
                onClick={handleCallClick}
                title="Llamar"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="sr-only">Llamar</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900 dark:hover:text-purple-400"
                onClick={handleChatClick}
                title="Abrir chat"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="sr-only">Abrir chat</span>
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">{formatDistanceToNow(prospect.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
