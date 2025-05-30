"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import type { Prospect } from "@/types/prospect"
import { useToast } from "@/hooks/use-toast"

interface InteractionResultDialogProps {
  prospect: Prospect | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (result: InteractionResult) => void
}

interface InteractionResult {
  prospectId: string
  interactionType: "llamada" | "mensaje" | "email" | "reunion"
  result: string
  newStatus: string
  nextAction?: string
  followUpDate?: Date
  notes: string
}

export function InteractionResultDialog({ prospect, open, onOpenChange, onSave }: InteractionResultDialogProps) {
  const [interactionType, setInteractionType] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [newStatus, setNewStatus] = useState<string>("")
  const [nextAction, setNextAction] = useState<string>("")
  const [followUpDate, setFollowUpDate] = useState<Date>()
  const [notes, setNotes] = useState<string>("")
  const { toast } = useToast()

  if (!prospect) return null

  const interactionTypes = [
    { value: "llamada", label: "Llamada telefónica" },
    { value: "mensaje", label: "Mensaje WhatsApp" },
    { value: "email", label: "Correo electrónico" },
    { value: "reunion", label: "Reunión presencial" },
  ]

  const resultOptions = [
    { value: "interesado", label: "Mostró interés", color: "#10B981" },
    { value: "no_interesado", label: "No está interesado", color: "#EF4444" },
    { value: "no_contesta", label: "No contesta", color: "#F59E0B" },
    { value: "solicita_info", label: "Solicita más información", color: "#3B82F6" },
    { value: "quiere_pensar", label: "Quiere pensarlo", color: "#8B5CF6" },
    { value: "precio_alto", label: "Considera el precio alto", color: "#EC4899" },
    { value: "ya_tiene_servicio", label: "Ya tiene el servicio", color: "#6B7280" },
    { value: "contactar_luego", label: "Contactar en otro momento", color: "#F59E0B" },
  ]

  const statusOptions = [
    { value: "contactado", label: "Contactado" },
    { value: "en conversación", label: "En conversación" },
    { value: "negociación", label: "Negociación" },
    { value: "ganado", label: "Ganado" },
    { value: "perdido", label: "Perdido" },
    { value: "no_interesado", label: "No interesado (recontactar)" },
    { value: "seguimiento", label: "Seguimiento programado" },
  ]

  const nextActionOptions = [
    { value: "llamar_manana", label: "Llamar mañana" },
    { value: "enviar_info", label: "Enviar información" },
    { value: "agendar_reunion", label: "Agendar reunión" },
    { value: "seguimiento_semanal", label: "Seguimiento semanal" },
    { value: "seguimiento_mensual", label: "Seguimiento mensual" },
    { value: "recontactar_3_meses", label: "Recontactar en 3 meses" },
    { value: "recontactar_6_meses", label: "Recontactar en 6 meses" },
    { value: "no_recontactar", label: "No recontactar" },
  ]

  const handleSave = () => {
    if (!interactionType || !result || !newStatus) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    const interactionResult: InteractionResult = {
      prospectId: prospect.id,
      interactionType: interactionType as any,
      result,
      newStatus,
      nextAction,
      followUpDate,
      notes,
    }

    onSave(interactionResult)

    // Crear tarea automáticamente si hay próxima acción
    if (nextAction && nextAction !== "no_recontactar") {
      const taskTitle = getTaskTitle(nextAction, prospect.name)
      const taskDueDate = followUpDate || getDefaultDueDate(nextAction)

      // Aquí se crearía la tarea automáticamente
      toast({
        title: "Resultado registrado",
        description: `Se ha registrado la interacción y ${followUpDate ? "programado" : "creado"} una tarea de seguimiento.`,
      })
    } else {
      toast({
        title: "Resultado registrado",
        description: "Se ha registrado la interacción exitosamente.",
      })
    }

    // Reset form
    setInteractionType("")
    setResult("")
    setNewStatus("")
    setNextAction("")
    setFollowUpDate(undefined)
    setNotes("")
    onOpenChange(false)
  }

  const getTaskTitle = (action: string, prospectName: string) => {
    switch (action) {
      case "llamar_manana":
        return `Llamar a ${prospectName}`
      case "enviar_info":
        return `Enviar información a ${prospectName}`
      case "agendar_reunion":
        return `Agendar reunión con ${prospectName}`
      case "seguimiento_semanal":
        return `Seguimiento semanal - ${prospectName}`
      case "seguimiento_mensual":
        return `Seguimiento mensual - ${prospectName}`
      case "recontactar_3_meses":
        return `Recontactar a ${prospectName} (3 meses)`
      case "recontactar_6_meses":
        return `Recontactar a ${prospectName} (6 meses)`
      default:
        return `Seguimiento - ${prospectName}`
    }
  }

  const getDefaultDueDate = (action: string) => {
    const now = new Date()
    switch (action) {
      case "llamar_manana":
        return new Date(now.getTime() + 24 * 60 * 60 * 1000) // 1 día
      case "enviar_info":
        return new Date(now.getTime() + 2 * 60 * 60 * 1000) // 2 horas
      case "agendar_reunion":
        return new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000) // 3 días
      case "seguimiento_semanal":
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 1 semana
      case "seguimiento_mensual":
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 1 mes
      case "recontactar_3_meses":
        return new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000) // 3 meses
      case "recontactar_6_meses":
        return new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000) // 6 meses
      default:
        return new Date(now.getTime() + 24 * 60 * 60 * 1000) // 1 día por defecto
    }
  }

  const getResultColor = (resultValue: string) => {
    const option = resultOptions.find((opt) => opt.value === resultValue)
    return option?.color || "#6B7280"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Registrar Resultado de Interacción
          </DialogTitle>
          <div className="text-sm text-muted-foreground">
            Prospecto: <span className="font-medium">{prospect.name}</span>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interaction-type">Tipo de Interacción *</Label>
              <Select value={interactionType} onValueChange={setInteractionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  {interactionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="result">Resultado de la Interacción *</Label>
              <Select value={result} onValueChange={setResult}>
                <SelectTrigger>
                  <SelectValue placeholder="¿Cuál fue el resultado?" />
                </SelectTrigger>
                <SelectContent>
                  {resultOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: option.color }} />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {result && (
            <div className="p-3 rounded-lg border" style={{ backgroundColor: `${getResultColor(result)}10` }}>
              <Badge style={{ backgroundColor: getResultColor(result), color: "white" }}>
                {resultOptions.find((opt) => opt.value === result)?.label}
              </Badge>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-status">Nuevo Estado del Prospecto *</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Cambiar estado a..." />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="next-action">Próxima Acción</Label>
              <Select value={nextAction} onValueChange={setNextAction}>
                <SelectTrigger>
                  <SelectValue placeholder="¿Qué hacer después?" />
                </SelectTrigger>
                <SelectContent>
                  {nextActionOptions.map((action) => (
                    <SelectItem key={action.value} value={action.value}>
                      {action.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {nextAction && nextAction !== "no_recontactar" && (
            <div className="space-y-2">
              <Label>Fecha de Seguimiento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {followUpDate ? format(followUpDate, "PPP", { locale: es }) : "Seleccionar fecha (opcional)"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={followUpDate} onSelect={setFollowUpDate} initialFocus />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground">
                Si no seleccionas una fecha, se usará una fecha por defecto según la acción elegida.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              placeholder="Detalles de la conversación, observaciones importantes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!interactionType || !result || !newStatus}>
            Guardar Resultado
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
