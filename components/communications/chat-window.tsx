"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Contact, Message } from "@/types/communication"
import { cn } from "@/lib/utils"
import { formatMessageTime } from "@/lib/date-utils"

interface ChatWindowProps {
  contact: Contact
  messages: Message[]
  onSendMessage: (content: string) => void
  activeChannel: string
}

export function ChatWindow({ contact, messages, onSendMessage, activeChannel }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage)
      setNewMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
          {contact.name.charAt(0)}
        </div>
        <div>
          <h2 className="font-medium">{contact.name}</h2>
          <p className="text-sm text-muted-foreground">
            {activeChannel === "whatsapp" ? contact.phone : contact.email}
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  <div className="flex justify-end items-center gap-1 mt-1">
                    <span className="text-xs opacity-70">{formatMessageTime(message.timestamp)}</span>
                    {message.sender === "user" && (
                      <span className="text-xs opacity-70">{message.status === "sent" ? "✓" : "✓✓"}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No hay mensajes. Envía el primer mensaje a {contact.name}.
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex items-end gap-2">
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 shrink-0">
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Adjuntar archivo</span>
          </Button>

          <div className="relative flex-1">
            <Textarea
              placeholder="Escribe un mensaje..."
              className="min-h-[80px] resize-none pr-10"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button variant="ghost" size="icon" className="absolute right-2 bottom-2 h-8 w-8">
              <Smile className="h-5 w-5" />
              <span className="sr-only">Emojis</span>
            </Button>
          </div>

          <Button
            className="rounded-full h-10 w-10 shrink-0"
            size="icon"
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Enviar mensaje</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
