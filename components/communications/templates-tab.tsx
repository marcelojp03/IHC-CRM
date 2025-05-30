"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Copy, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

interface Template {
  id: string
  name: string
  content: string
  category: string
  channel: string
  createdAt: Date
  usageCount: number
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Bienvenida Netflix",
    content:
      "¡Hola {nombre}! Gracias por tu interés en Netflix Premium. Te ofrecemos acceso completo por solo $15/mes. ¿Te gustaría conocer más detalles?",
    category: "bienvenida",
    channel: "whatsapp",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    usageCount: 45,
  },
  {
    id: "2",
    name: "Seguimiento Disney+",
    content:
      "Hola {nombre}, veo que estuviste interesado en Disney+ Anual. Tenemos una promoción especial que termina pronto. ¿Podemos conversar?",
    category: "seguimiento",
    channel: "whatsapp",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    usageCount: 32,
  },
  {
    id: "3",
    name: "Cierre de venta",
    content:
      "¡Perfecto {nombre}! Para completar tu suscripción necesito que confirmes tu método de pago preferido. ¿Transferencia bancaria o QR?",
    category: "cierre",
    channel: "whatsapp",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    usageCount: 28,
  },
  {
    id: "4",
    name: "Email de bienvenida",
    content:
      "Estimado/a {nombre},\n\nGracias por contactarnos. Hemos recibido tu consulta sobre {producto} y nos pondremos en contacto contigo a la brevedad.\n\nSaludos cordiales,\nEquipo de Ventas",
    category: "bienvenida",
    channel: "email",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    usageCount: 18,
  },
]

export function TemplatesTab() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedChannel, setSelectedChannel] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const { toast } = useToast()

  // Formulario para nueva plantilla
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    content: "",
    category: "",
    channel: "whatsapp",
  })

  // Filtrar plantillas
  const filteredTemplates = templates.filter((template) => {
    const categoryMatch = selectedCategory === "all" || template.category === selectedCategory
    const channelMatch = selectedChannel === "all" || template.channel === selectedChannel
    const searchMatch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase())
    return categoryMatch && channelMatch && searchMatch
  })

  // Obtener categorías únicas
  const categories = Array.from(new Set(templates.map((t) => t.category)))
  const channels = Array.from(new Set(templates.map((t) => t.channel)))

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.content || !newTemplate.category) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    const template: Template = {
      id: Date.now().toString(),
      ...newTemplate,
      createdAt: new Date(),
      usageCount: 0,
    }

    setTemplates([template, ...templates])
    setNewTemplate({ name: "", content: "", category: "", channel: "whatsapp" })
    setShowCreateDialog(false)

    toast({
      title: "Plantilla creada",
      description: "La plantilla se ha creado exitosamente.",
    })
  }

  const handleCopyTemplate = (template: Template) => {
    navigator.clipboard.writeText(template.content)
    toast({
      title: "Copiado",
      description: "El contenido de la plantilla se ha copiado al portapapeles.",
    })
  }

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter((t) => t.id !== templateId))
    toast({
      title: "Plantilla eliminada",
      description: "La plantilla se ha eliminado exitosamente.",
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "bienvenida":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "seguimiento":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cierre":
        return "bg-green-100 text-green-800 border-green-200"
      case "reactivacion":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return "bg-green-100 text-green-800 border-green-200"
      case "email":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "sms":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header con filtros y botón crear */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <Input
            placeholder="Buscar plantillas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedChannel} onValueChange={setSelectedChannel}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Todos los canales" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los canales</SelectItem>
              {channels.map((channel) => (
                <SelectItem key={channel} value={channel}>
                  {channel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Plantilla
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Plantilla</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Nombre *</Label>
                  <Input
                    id="template-name"
                    placeholder="Nombre de la plantilla"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-channel">Canal</Label>
                  <Select
                    value={newTemplate.channel}
                    onValueChange={(value) => setNewTemplate({ ...newTemplate, channel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-category">Categoría *</Label>
                <Select
                  value={newTemplate.category}
                  onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bienvenida">Bienvenida</SelectItem>
                    <SelectItem value="seguimiento">Seguimiento</SelectItem>
                    <SelectItem value="cierre">Cierre</SelectItem>
                    <SelectItem value="reactivacion">Reactivación</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-content">Contenido *</Label>
                <Textarea
                  id="template-content"
                  placeholder="Escribe el contenido de la plantilla... Usa {nombre} para personalizar."
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                  rows={6}
                />
                <div className="text-xs text-muted-foreground">
                  Variables disponibles: {"{nombre}"}, {"{producto}"}, {"{empresa}"}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateTemplate}>Crear Plantilla</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de plantillas */}
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="grid gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getCategoryColor(template.category)}>
                        {template.category}
                      </Badge>
                      <Badge variant="outline" className={getChannelColor(template.channel)}>
                        {template.channel}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Usado {template.usageCount} veces</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopyTemplate(template)}
                      title="Copiar contenido"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingTemplate(template)}
                      title="Editar plantilla"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTemplate(template.id)}
                      title="Eliminar plantilla"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm whitespace-pre-wrap">{template.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No se encontraron plantillas</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== "all" || selectedChannel !== "all"
                  ? "Intenta ajustar los filtros de búsqueda."
                  : "Crea tu primera plantilla para comenzar."}
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Plantilla
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
