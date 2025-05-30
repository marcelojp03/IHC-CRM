"use client"

import { useState } from "react"
import { Send, Users, MessageSquare } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockProspects, mockTemplates } from "@/data/mock-data"

interface MassMessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MassMessageDialog({ open, onOpenChange }: MassMessageDialogProps) {
  const [selectedProspects, setSelectedProspects] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredProspects = mockProspects.filter(
    (prospect) => filterStatus === "all" || prospect.status === filterStatus,
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProspects(filteredProspects.map((p) => p.id))
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

  const handleTemplateSelect = (templateId: string) => {
    const template = mockTemplates.find((t) => t.id === templateId)
    if (template) {
      setMessage(template.content)
      setSelectedTemplate(templateId)
    }
  }

  const handleSendMessage = () => {
    // Aquí implementarías la lógica para enviar mensajes masivos
    console.log("Enviando mensaje a:", selectedProspects)
    console.log("Mensaje:", message)

    // Simular envío exitoso
    onOpenChange(false)
    setSelectedProspects([])
    setMessage("")
    setSelectedTemplate("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nuevo":
        return "bg-yellow-100 text-yellow-800"
      case "contactado":
        return "bg-orange-100 text-orange-800"
      case "en conversación":
        return "bg-blue-100 text-blue-800"
      case "negociación":
        return "bg-purple-100 text-purple-800"
      case "ganado":
        return "bg-green-100 text-green-800"
      case "perdido":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Mensaje Masivo
          </DialogTitle>
          <DialogDescription>Envía un mensaje a múltiples prospectos al mismo tiempo</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="recipients" className="flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recipients">
              <Users className="h-4 w-4 mr-2" />
              Destinatarios ({selectedProspects.length})
            </TabsTrigger>
            <TabsTrigger value="message">
              <MessageSquare className="h-4 w-4 mr-2" />
              Mensaje
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recipients" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label>Filtrar por estado:</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="nuevo">Nuevo</SelectItem>
                    <SelectItem value="contactado">Contactado</SelectItem>
                    <SelectItem value="en conversación">En conversación</SelectItem>
                    <SelectItem value="negociación">Negociación</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSelectAll(selectedProspects.length !== filteredProspects.length)}
              >
                {selectedProspects.length === filteredProspects.length ? "Deseleccionar todos" : "Seleccionar todos"}
              </Button>
            </div>

            <ScrollArea className="h-64 border rounded-md p-4">
              <div className="space-y-2">
                {filteredProspects.map((prospect) => (
                  <div key={prospect.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted">
                    <Checkbox
                      checked={selectedProspects.includes(prospect.id)}
                      onCheckedChange={(checked) => handleSelectProspect(prospect.id, checked as boolean)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{prospect.name}</span>
                        <Badge variant="outline" className={getStatusColor(prospect.status)}>
                          {prospect.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {prospect.email} • {prospect.product}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="message" className="space-y-4">
            <div className="space-y-2">
              <Label>Plantilla de mensaje (opcional)</Label>
              <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar plantilla..." />
                </SelectTrigger>
                <SelectContent>
                  {mockTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                placeholder="Escribe tu mensaje aquí..."
                className="min-h-32"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="text-sm text-muted-foreground">Puedes usar variables como [Nombre], [Producto], etc.</div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSendMessage} disabled={selectedProspects.length === 0 || !message.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Enviar a {selectedProspects.length} prospectos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
