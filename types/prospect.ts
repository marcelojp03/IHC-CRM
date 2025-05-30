export interface Prospect {
  id: string
  name: string
  email: string
  phone: string
  status: "nuevo" | "contactado" | "en conversación" | "negociación" | "ganado" | "perdido"
  product: string
  source: string
  createdAt: Date
  lastContactDate?: Date
  notes?: string
}
