export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  status: string
  product: string
  source: string
  online: boolean
  unreadCount: number
  lastMessage?: {
    content: string
    timestamp: Date
  }
  messages?: Message[]
  notes?: string
}

export interface Message {
  id: string
  content: string
  sender: "user" | "contact"
  timestamp: Date
  status: "sent" | "delivered" | "read"
  channel: string
}

export interface MessageTemplate {
  id: string
  name: string
  content: string
  category: string
}

export interface CommunicationHistoryItem {
  id: string
  type: "message" | "call" | "email" | "scheduled"
  channel: string
  direction: "incoming" | "outgoing"
  content: string
  timestamp: Date
  status: string
  duration?: string
}
