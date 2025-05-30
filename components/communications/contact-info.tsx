"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Edit, User, Mail, Phone, Calendar, Tag, MapPin, FileText, Plus, MessageSquare } from "lucide-react"
import type { Contact } from "@/types/communication"
import { formatDate } from "@/lib/date-utils"

interface ContactInfoProps {
  contact: Contact
}

export function ContactInfo({ contact }: ContactInfoProps) {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Información de Contacto</h3>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>

        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Nombre:</span>
              <span>{contact.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Email:</span>
              <span>{contact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Teléfono:</span>
              <span>{contact.phone}</span>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex items-center justify-between">
          <h3 className="font-medium">Detalles del Prospecto</h3>
        </div>

        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Estado:</span>
              <Badge variant="outline" className="capitalize">
                {contact.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Producto:</span>
              <span>{contact.product}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Origen:</span>
              <span>{contact.source}</span>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex items-center justify-between">
          <h3 className="font-medium">Notas</h3>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Añadir Nota
          </Button>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">
              {contact.notes || "No hay notas disponibles para este contacto."}
            </div>
            {contact.notes && (
              <div className="text-xs text-muted-foreground mt-2">Última actualización: {formatDate(new Date())}</div>
            )}
          </CardContent>
        </Card>

        <Separator />

        <div className="flex items-center justify-between">
          <h3 className="font-medium">Preferencias de Contacto</h3>
        </div>

        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Mejor horario:</span>
              <span>Tarde (14:00 - 18:00)</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Canal preferido:</span>
              <span>WhatsApp</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Frecuencia:</span>
              <span>Semanal</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
