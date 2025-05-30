"use client"

import { useState } from "react"
import { Send, Users, Filter, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { mockContacts } from "@/data/mock-data"
import { useToast } from "@/hooks/use-toast"

export function MassMessageTab() {
  const [message, setMessage] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterProduct, setFilterProduct] = useState<string>("all")
  const { toast } = useToast()

  // Filtrar contactos según los filtros seleccionados
  const filteredContacts = mockContacts.filter((contact) => {
    const statusMatch = filterStatus === "all" || contact.status === filterStatus
    const productMatch = filterProduct === "all" || contact.product === filterProduct
    return statusMatch && productMatch
  })

  // Obtener productos únicos para el filtro
  const uniqueProducts = Array.from(new Set(mockContacts.map((c) => c.product)))

  // Obtener estados únicos para el filtro
  const uniqueStatuses = Array.from(new Set(mockContacts.map((c) => c.status)))

  const handleContactToggle = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId],
    )
  }

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(filteredContacts.map((c) => c.id))
    }
  }

  const handleSendMassMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Por favor, escribe un mensaje antes de enviar.",
        variant: "destructive",
      })
      return
    }

    if (selectedContacts.length === 0) {
      toast({
        title: "Error",
        description: "Por favor, selecciona al menos un contacto.",
        variant: "destructive",
      })
      return
    }

    // Simular envío de mensaje masivo
    console.log("Enviando mensaje masivo:", {
      message,
      recipients: selectedContacts,
      count: selectedContacts.length,
    })

    toast({
      title: "Mensaje enviado",
      description: `Mensaje masivo enviado a ${selectedContacts.length} contacto(s).`,
    })

    // Limpiar formulario
    setMessage("")
    setSelectedContacts([])
  }

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario de mensaje */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Mensaje Masivo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mass-message">Mensaje</Label>
              <Textarea
                id="mass-message"
                placeholder="Escribe tu mensaje aquí..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
              />
              <div className="text-xs text-muted-foreground">{message.length}/500 caracteres</div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Destinatarios seleccionados</Label>
                <Badge variant="outline">
                  {selectedContacts.length} de {filteredContacts.length}
                </Badge>
              </div>
              <Button
                onClick={handleSendMassMessage}
                disabled={!message.trim() || selectedContacts.length === 0}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Mensaje Masivo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Selección de contactos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Seleccionar Contactos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filtros */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    {uniqueStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Producto</Label>
                <Select value={filterProduct} onValueChange={setFilterProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los productos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los productos</SelectItem>
                    {uniqueProducts.map((product) => (
                      <SelectItem key={product} value={product}>
                        {product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                <Filter className="h-4 w-4 mr-2" />
                {selectedContacts.length === filteredContacts.length ? "Deseleccionar todos" : "Seleccionar todos"}
              </Button>
              <span className="text-sm text-muted-foreground">{filteredContacts.length} contacto(s) disponible(s)</span>
            </div>

            {/* Lista de contactos */}
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted">
                    <Checkbox
                      checked={selectedContacts.includes(contact.id)}
                      onCheckedChange={() => handleContactToggle(contact.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{contact.name}</span>
                        <Badge variant="outline" className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {contact.product} • {contact.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
