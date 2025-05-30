"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactList } from "@/components/communications/contact-list"
import { ChatWindow } from "@/components/communications/chat-window"
import { TemplateSelector } from "@/components/communications/template-selector"
import { ChannelSelector } from "@/components/communications/channel-selector"
import { ContactInfo } from "@/components/communications/contact-info"
import { InteractionResultDialog } from "@/components/prospects/interaction-result-dialog"
import { mockContacts } from "@/data/mock-data"
import type { Contact, Message } from "@/types/communication"
import { MessageSquare, Info, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CommunicationsView() {
  const searchParams = useSearchParams()
  const prospectId = searchParams.get("prospectId")
  const initialChannel = searchParams.get("channel") || "whatsapp"

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [activeChannel, setActiveChannel] = useState<string>(initialChannel)
  const [messages, setMessages] = useState<Message[]>([])
  const [showInteractionDialog, setShowInteractionDialog] = useState(false)

  // Efecto para seleccionar automáticamente el prospecto si viene de la URL
  useEffect(() => {
    if (prospectId) {
      // Convertir el ID del prospecto al ID del contacto correspondiente
      const contactId = `contact-${prospectId.split("-")[1]}`
      const contact = mockContacts.find((c) => c.id === contactId)
      if (contact) {
        handleContactSelect(contact)
      }
    }
  }, [prospectId])

  // Efecto para cambiar el canal si viene en la URL
  useEffect(() => {
    if (initialChannel) {
      setActiveChannel(initialChannel)
    }
  }, [initialChannel])

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    // Cargar mensajes del contacto seleccionado
    const contactMessages = mockContacts.find((c) => c.id === contact.id)?.messages || []
    setMessages(contactMessages)
  }

  const handleSendMessage = (content: string) => {
    if (!selectedContact || !content.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
      channel: activeChannel,
    }

    setMessages([...messages, newMessage])

    // Simular respuesta automática después de 1 segundo
    setTimeout(() => {
      const autoReply: Message = {
        id: `msg-${Date.now() + 1}`,
        content: "Gracias por tu mensaje. Te responderemos a la brevedad.",
        sender: "contact",
        timestamp: new Date(),
        status: "read",
        channel: activeChannel,
      }

      setMessages((prev) => [...prev, autoReply])
    }, 1000)
  }

  const handleInteractionResult = (result: any) => {
    console.log("Resultado de interacción:", result)
    // Aquí actualizarías el estado del prospecto en la base de datos
    // y crearías una tarea de seguimiento si es necesario
  }

  // Colores para estados
  const getStatusColor = (status: string) => {
    switch (status) {
      case "nuevo":
        return { bg: "#3B82F6", text: "white" }
      case "contactado":
        return { bg: "#F59E0B", text: "white" }
      case "en conversación":
        return { bg: "#8B5CF6", text: "white" }
      case "negociación":
        return { bg: "#EC4899", text: "white" }
      case "ganado":
        return { bg: "#10B981", text: "white" }
      case "perdido":
        return { bg: "#EF4444", text: "white" }
      default:
        return { bg: "#6B7280", text: "white" }
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-primary">Comunicaciones</h1>
          {selectedContact && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Estado:</span>
              <Badge
                className="text-xs font-medium"
                style={{
                  backgroundColor: getStatusColor(selectedContact.status).bg,
                  color: getStatusColor(selectedContact.status).text,
                }}
              >
                {selectedContact.status}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {selectedContact && (
            <Button variant="outline" size="sm" onClick={() => setShowInteractionDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Registrar Resultado
            </Button>
          )}
          <ChannelSelector activeChannel={activeChannel} onChannelChange={setActiveChannel} />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 border-r bg-background">
          <ContactList
            contacts={mockContacts}
            selectedContactId={selectedContact?.id}
            onSelectContact={handleContactSelect}
          />
        </div>

        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <ChatWindow
              contact={selectedContact}
              messages={messages}
              onSendMessage={handleSendMessage}
              activeChannel={activeChannel}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Selecciona un contacto para iniciar una conversación</p>
                {prospectId && (
                  <p className="text-sm mt-2">
                    No se encontró el contacto solicitado. Verifica que el prospecto tenga un contacto asociado.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {selectedContact && (
          <div className="w-80 border-l bg-background overflow-y-auto">
            <Tabs defaultValue="templates">
              <TabsList className="w-full">
                <TabsTrigger value="templates" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Plantillas
                </TabsTrigger>
                <TabsTrigger value="info" className="flex-1">
                  <Info className="h-4 w-4 mr-2" />
                  Información
                </TabsTrigger>
              </TabsList>
              <TabsContent value="templates">
                <TemplateSelector onSelectTemplate={(template) => handleSendMessage(template.content)} />
              </TabsContent>
              <TabsContent value="info">
                <ContactInfo contact={selectedContact} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {selectedContact && (
        <InteractionResultDialog
          prospect={selectedContact as any} // Convertir contact a prospect para el diálogo
          open={showInteractionDialog}
          onOpenChange={setShowInteractionDialog}
          onSave={handleInteractionResult}
        />
      )}
    </div>
  )
}
