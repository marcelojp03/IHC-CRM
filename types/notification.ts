export interface Notification {
  id: string
  type: "prospect" | "task" | "message" | "system"
  title: string
  description: string
  timestamp: Date
  read: boolean
  link?: string
}
