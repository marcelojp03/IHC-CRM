"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Contact } from "@/types/communication"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "@/lib/date-utils"

interface ContactListProps {
  contacts: Contact[]
  selectedContactId?: string
  onSelectContact: (contact: Contact) => void
}

export function ContactList({ contacts, selectedContactId, onSelectContact }: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar contactos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <button
                key={contact.id}
                className={cn(
                  "w-full flex items-start gap-3 p-3 rounded-md text-left transition-colors",
                  selectedContactId === contact.id ? "bg-primary/10 text-primary" : "hover:bg-muted",
                )}
                onClick={() => onSelectContact(contact)}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {contact.name.charAt(0)}
                  </div>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium truncate">{contact.name}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {contact.lastMessage?.timestamp && formatDistanceToNow(contact.lastMessage.timestamp)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.lastMessage?.content || "Sin mensajes"}
                    </p>

                    {contact.unreadCount > 0 && (
                      <Badge variant="default" className="ml-auto bg-primary text-primary-foreground">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-1 mt-1">
                    <Badge variant="outline" className="text-xs px-1 py-0 h-5">
                      {contact.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs px-1 py-0 h-5">
                      {contact.source}
                    </Badge>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">No se encontraron contactos</div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
