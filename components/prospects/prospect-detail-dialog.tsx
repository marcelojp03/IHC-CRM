"use client"

import { useState } from "react"
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Tag,
  FileText,
  MessageSquare,
  CheckSquare,
  Clock,
  Plus,
  Edit,
  Download,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Prospect } from "@/types/prospect"
import { formatDate, formatDistanceToNow } from "@/lib/date-utils"
import { mockTasks } from "@/data/mock-data"

interface ProspectDetailDialogProps {
  prospect: Prospect | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock data para el historial y documentos
const mockTimeline = [
  {
    id: "1",
    type: "contact",
    title: "Primer contacto",
    description: "Prospecto registrado desde Facebook",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    icon: User,
  },
  {
    id: "2",
    type: "message",
    title: "Mensaje enviado",
    description: "Plantilla de bienvenida enviada por WhatsApp",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    icon: MessageSquare,
  },
  {
    id: "3",
    type: "call",
    title: "Llamada realizada",
    description: "Conversación de 15 minutos sobre Netflix Premium",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    icon: Phone,
  },
  {
    id: "4",
    type: "status",
    title: "Estado actualizado",
    description: "Movido a 'En negociación'",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    icon: Tag,
  },
]

const mockDocuments = [
  {
    id: "1",
    name: "Propuesta Netflix Premium.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "2",
    name: "Contrato firmado.pdf",
    type: "PDF",
    size: "1.8 MB",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
]

export function ProspectDetailDialog({ prospect, open, onOpenChange }: ProspectDetailDialogProps) {
  const [newNote, setNewNote] = useState("")

  if (!prospect) return null

  // Filtrar tareas relacionadas con este prospecto
  const relatedTasks = mockTasks.filter(
    (task) => task.relatedTo?.type === "prospect" && task.relatedTo.id === prospect.id,
  )

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

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Aquí agregarías la nota al prospecto
      console.log("Nueva nota:", newNote)
      setNewNote("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary">{prospect.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                {prospect.name}
                <Badge variant="outline" className={getStatusColor(prospect.status)}>
                  {prospect.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground font-normal">
                {prospect.product} • {prospect.source}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="timeline">Historial</TabsTrigger>
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
            <TabsTrigger value="notes">Notas</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{prospect.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{prospect.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Creado: {formatDate(prospect.createdAt)}</span>
                  </div>
                  {prospect.lastContactDate && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Último contacto: {formatDate(prospect.lastContactDate)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Detalles del Prospecto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span>Producto: {prospect.product}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Fuente: {prospect.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    <span>Tareas relacionadas: {relatedTasks.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {prospect.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Notas Principales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{prospect.notes}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="timeline">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {mockTimeline.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-primary/10 p-2">
                        <event.icon className="h-4 w-4 text-primary" />
                      </div>
                      {index < mockTimeline.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{event.title}</h4>
                        <span className="text-xs text-muted-foreground">{formatDistanceToNow(event.timestamp)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="tasks">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Tareas Relacionadas</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Tarea
                </Button>
              </div>
              <ScrollArea className="h-80">
                <div className="space-y-2">
                  {relatedTasks.map((task) => (
                    <Card key={task.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge
                                variant="outline"
                                className={
                                  task.status === "completada"
                                    ? "bg-green-100 text-green-800"
                                    : task.status === "vencida"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-blue-100 text-blue-800"
                                }
                              >
                                {task.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">Vence: {formatDate(task.dueDate)}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {relatedTasks.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No hay tareas relacionadas con este prospecto
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-note">Agregar nueva nota</Label>
                <Textarea
                  id="new-note"
                  placeholder="Escribe una nota sobre este prospecto..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Nota
                </Button>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">Notas Anteriores</h3>
                {prospect.notes ? (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <p className="text-sm">{prospect.notes}</p>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">Creado: {formatDate(prospect.createdAt)}</div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No hay notas para este prospecto</div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Documentos</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Subir Documento
                </Button>
              </div>
              <ScrollArea className="h-80">
                <div className="space-y-2">
                  {mockDocuments.map((doc) => (
                    <Card key={doc.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="rounded-md bg-primary/10 p-2">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{doc.name}</h4>
                              <div className="text-sm text-muted-foreground">
                                {doc.type} • {doc.size} • {formatDistanceToNow(doc.uploadedAt)}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {mockDocuments.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">No hay documentos para este prospecto</div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
