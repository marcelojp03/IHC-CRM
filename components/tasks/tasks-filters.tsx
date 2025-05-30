"use client"

import { useState } from "react"
import { X, Filter, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { DatePicker } from "@/components/ui/date-picker"

export type TaskFilterValue = {
  status?: string[]
  priority?: string[]
  assignedTo?: string[]
  dueDate?: {
    from?: Date
    to?: Date
  }
  search?: string
}

interface TasksFiltersProps {
  onFilterChange: (filters: TaskFilterValue) => void
}

export function TasksFilters({ onFilterChange }: TasksFiltersProps) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<TaskFilterValue>({})
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // Opciones para los filtros
  const statusOptions = [
    { value: "pendiente", label: "Pendiente" },
    { value: "en progreso", label: "En Progreso" },
    { value: "vencida", label: "Vencida" },
    { value: "completada", label: "Completada" },
  ]

  const priorityOptions = [
    { value: "alta", label: "Alta" },
    { value: "media", label: "Media" },
    { value: "baja", label: "Baja" },
  ]

  const assignedToOptions = [
    { value: "Juan Pérez", label: "Juan Pérez" },
    { value: "María López", label: "María López" },
    { value: "Carlos Rodríguez", label: "Carlos Rodríguez" },
  ]

  // Función para actualizar los filtros
  const updateFilters = (key: keyof TaskFilterValue, value: any) => {
    const newFilters = { ...filters, [key]: value }

    // Si el valor está vacío, eliminamos la propiedad
    if (
      (Array.isArray(value) && value.length === 0) ||
      (!value && typeof value !== "boolean") ||
      (typeof value === "object" && Object.keys(value).length === 0)
    ) {
      delete newFilters[key]
    }

    setFilters(newFilters)

    // Contar filtros activos
    let count = 0
    if (newFilters.status && newFilters.status.length > 0) count++
    if (newFilters.priority && newFilters.priority.length > 0) count++
    if (newFilters.assignedTo && newFilters.assignedTo.length > 0) count++
    if (newFilters.dueDate && (newFilters.dueDate.from || newFilters.dueDate.to)) count++
    if (newFilters.search && newFilters.search.trim() !== "") count++

    setActiveFiltersCount(count)
  }

  // Función para aplicar los filtros
  const applyFilters = () => {
    onFilterChange(filters)
    setOpen(false)
  }

  // Función para limpiar todos los filtros
  const clearAllFilters = () => {
    setFilters({})
    setActiveFiltersCount(0)
    onFilterChange({})
    setOpen(false)
  }

  // Función para manejar la selección de checkboxes
  const handleCheckboxChange = (key: keyof TaskFilterValue, value: string, checked: boolean) => {
    const currentValues = (filters[key] as string[]) || []

    if (checked) {
      updateFilters(key, [...currentValues, value])
    } else {
      updateFilters(
        key,
        currentValues.filter((v) => v !== value),
      )
    }
  }

  // Función para manejar cambios en el rango de fechas
  const handleDateChange = (type: "from" | "to", date: Date | undefined) => {
    const currentDueDate = filters.dueDate || {}
    updateFilters("dueDate", { ...currentDueDate, [type]: date })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Filtros</h4>
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 px-2">
              <X className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          </div>
          <Separator className="my-4" />
        </div>

        <div className="px-4 pb-2">
          <div className="space-y-2">
            <Label htmlFor="search">Búsqueda</Label>
            <Input
              id="search"
              placeholder="Buscar por título, descripción..."
              value={filters.search || ""}
              onChange={(e) => updateFilters("search", e.target.value)}
            />
          </div>
        </div>

        <Accordion type="multiple" className="px-4 pb-2">
          <AccordionItem value="status">
            <AccordionTrigger className="py-2">Estado</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {statusOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${option.value}`}
                      checked={(filters.status || []).includes(option.value)}
                      onCheckedChange={(checked) => handleCheckboxChange("status", option.value, checked as boolean)}
                    />
                    <label
                      htmlFor={`status-${option.value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="priority">
            <AccordionTrigger className="py-2">Prioridad</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {priorityOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`priority-${option.value}`}
                      checked={(filters.priority || []).includes(option.value)}
                      onCheckedChange={(checked) => handleCheckboxChange("priority", option.value, checked as boolean)}
                    />
                    <label
                      htmlFor={`priority-${option.value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="assignedTo">
            <AccordionTrigger className="py-2">Asignado a</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {assignedToOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`assignedTo-${option.value}`}
                      checked={(filters.assignedTo || []).includes(option.value)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("assignedTo", option.value, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`assignedTo-${option.value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="dueDate">
            <AccordionTrigger className="py-2">Fecha de vencimiento</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Desde</Label>
                  <DatePicker selected={filters.dueDate?.from} onSelect={(date) => handleDateChange("from", date)} />
                </div>
                <div className="space-y-2">
                  <Label>Hasta</Label>
                  <DatePicker selected={filters.dueDate?.to} onSelect={(date) => handleDateChange("to", date)} />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="p-4 pt-0">
          <Separator className="my-4" />
          <Button className="w-full" onClick={applyFilters}>
            <Check className="h-4 w-4 mr-2" />
            Aplicar Filtros
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
