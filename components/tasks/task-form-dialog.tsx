"use client"

import { useState, useEffect } from "react"
import { CheckSquare, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { mockProspects } from "@/data/mock-data"
import type { Task } from "@/types/task"

interface TaskFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task | null
  onSave: (task: Partial<Task>) => void
}

export function TaskFormDialog({ open, onOpenChange, task, onSave }: TaskFormDialogProps) {
  const isEditing = !!task
  const { toast } = useToast()

  const [formData, setFormData] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: "pendiente",
    priority: "media",
    dueDate: new Date(),
    assignedTo: "Juan Pérez",
    relatedTo: undefined,
  })

  // Cargar datos de la tarea si estamos editando
  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
      })
    } else {
      // Valores por defecto para nueva tarea
      setFormData({
        title: "",
        description: "",
        status: "pendiente",
        priority: "media",
        dueDate: new Date(),
        assignedTo: "Juan Pérez",
        relatedTo: undefined,
      })
    }
  }, [task])

  const handleChange = (field: keyof Task, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    // Validar campos requeridos
    if (!formData.title || !formData.dueDate) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    onSave(formData)

    toast({
      title: isEditing ? "Tarea actualizada" : "Tarea creada",
      description: isEditing ? "La tarea se ha actualizado exitosamente." : "La nueva tarea se ha creado exitosamente.",
    })

    onOpenChange(false)
  }

  const handleRelatedToChange = (prospectId: string) => {
    if (prospectId === "none") {
      handleChange("relatedTo", undefined)
    } else {
      const prospect = mockProspects.find((p) => p.id === prospectId)
      if (prospect) {
        handleChange("relatedTo", {
          type: "prospect",
          id: prospect.id,
          name: prospect.name,
        })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Tarea" : "Nueva Tarea"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los detalles de la tarea existente."
              : "Completa los detalles para crear una nueva tarea."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Título <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Título de la tarea"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Descripción detallada de la tarea"
              className="min-h-[100px]"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="en progreso">En Progreso</SelectItem>
                  <SelectItem value="vencida">Vencida</SelectItem>
                  <SelectItem value="completada">Completada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridad</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
                <SelectTrigger id="priority" className="w-full">
                  <SelectValue placeholder="Seleccionar prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">
              Fecha de vencimiento <span className="text-red-500">*</span>
            </Label>
            <DatePicker
              selected={formData.dueDate}
              onSelect={(date) => handleChange("dueDate", date)}
              placeholder="Seleccionar fecha"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">Asignado a</Label>
            <Select value={formData.assignedTo} onValueChange={(value) => handleChange("assignedTo", value)}>
              <SelectTrigger id="assignedTo" className="w-full">
                <SelectValue placeholder="Seleccionar responsable" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Juan Pérez">Juan Pérez</SelectItem>
                <SelectItem value="María García">María García</SelectItem>
                <SelectItem value="Carlos López">Carlos López</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="relatedTo">Relacionado con</Label>
            <Select value={formData.relatedTo?.id || "none"} onValueChange={handleRelatedToChange}>
              <SelectTrigger id="relatedTo" className="w-full">
                <SelectValue placeholder="Seleccionar prospecto relacionado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sin relación</SelectItem>
                {mockProspects.map((prospect) => (
                  <SelectItem key={prospect.id} value={prospect.id}>
                    {prospect.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <CheckSquare className="h-4 w-4 mr-2" />
            {isEditing ? "Guardar Cambios" : "Crear Tarea"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
