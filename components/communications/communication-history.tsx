"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MessageSquare, Phone, Mail, Calendar } from "lucide-react"
import { formatDate, formatDistanceToNow } from "@/lib/date-utils"

interface CommunicationHistoryProps {
  contactId: string
}

// Datos de ejemplo para el historial de comunicaciones
const mockCommunicationHistory = [
  {
    id: "comm-1",
    type: "message",
    channel: "whatsapp",
    direction: "outgoing",
    content: "Hola, te escribo respecto a tu interés en Netflix Premium.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 días atrás
    status: "delivered",
  },
  {
    id: "comm-2",
    type: "message",
    channel: "whatsapp",
    direction: "incoming",
    content: "Hola, sí me interesa. ¿Cuál es el precio?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30), // 2 días atrás + 30 min
    status: "read",
  },
  {
    id: "comm-3",
    type: "call",
    channel: "phone",
    direction: "outgoing",
    content: "Llamada de seguimiento sobre Netflix Premium",
    duration: "8:45",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    status: "completed",
  },
  {
    id: "comm-4",
    type: "email",
    channel: "email",
    direction: "outgoing",
    content: "Información detallada sobre Netflix Premium",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 horas atrás
    status: "sent",
  },
  {
    id: "comm-5",
    type: "message",
    channel: "whatsapp",
    direction: "incoming",
    content: "Gracias por la información. Lo pensaré y te aviso.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 horas atrás
    status: "read",
  },
  {
    id: "comm-6",
    type: "scheduled",
    channel: "call",
    direction: "outgoing",
    content: "Llamada de seguimiento programada",
    timestamp: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 día en el futuro
    status: "pending",
  },
]

export function CommunicationHistory({ contactId }: CommunicationHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<string | null>(null)

  // Filtrar el historial según la búsqueda y filtros
  const filteredHistory = mockCommunicationHistory.filter((item) => {
    const matchesSearch = !searchQuery || item.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = !filter || item.channel === filter || item.type === filter
    return matchesSearch && matchesFilter
  })

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return <MessageSquare className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "phone":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "email":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "message":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "call":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "email":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getDirectionIcon = (direction: string) => {
    return direction === "outgoing" ? "→" : "←"
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative mb-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar en el historial..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto py-2">
          <Button
            variant={filter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(null)}
            className="whitespace-nowrap"
          >
            Todos
          </Button>
          <Button
            variant={filter === "whatsapp" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("whatsapp")}
            className="whitespace-nowrap"
          >
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            WhatsApp
          </Button>
          <Button
            variant={filter === "phone" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("phone")}
            className="whitespace-nowrap"
          >
            <Phone className="h-3.5 w-3.5 mr-1" />
            Llamadas
          </Button>
          <Button
            variant={filter === "email" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("email")}
            className="whitespace-nowrap"
          >
            <Mail className="h-3.5 w-3.5 mr-1" />
            Emails
          </Button>
          <Button
            variant={filter === "scheduled" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("scheduled")}
            className="whitespace-nowrap"
          >
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Programados
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <div key={item.id} className="p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1.5 ${getChannelColor(item.channel)}`}>
                      {getChannelIcon(item.channel)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className={getTypeColor(item.type)}>
                          {item.type === "message"
                            ? "Mensaje"
                            : item.type === "call"
                              ? "Llamada"
                              : item.type === "email"
                                ? "Email"
                                : "Programado"}
                        </Badge>
                        <span className="text-sm font-medium">{getDirectionIcon(item.direction)}</span>
                      </div>
                      <p className="text-sm mt-1 line-clamp-2">{item.content}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {item.type === "scheduled" ? (
                      <span className="text-yellow-600 dark:text-yellow-400">
                        En {formatDistanceToNow(item.timestamp)}
                      </span>
                    ) : (
                      <span>{formatDistanceToNow(item.timestamp)}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>
                    {item.type === "scheduled"
                      ? formatDate(item.timestamp)
                      : `${formatDate(item.timestamp)} ${item.type === "call" ? `• Duración: ${item.duration}` : ""}`}
                  </span>
                  <span className="capitalize">{item.status}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No se encontraron comunicaciones que coincidan con los filtros.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
