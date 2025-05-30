export interface Task {
  id: string
  title: string
  description: string
  status: "pendiente" | "en progreso" | "vencida" | "completada"
  priority: "alta" | "media" | "baja"
  dueDate: Date
  createdAt: Date
  assignedTo: string
  relatedTo?: {
    type: "prospect" | "other"
    id: string
    name: string
  }
}
