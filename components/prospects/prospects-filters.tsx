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

export type FilterValue = {
  status?: string[]
  product?: string[]
  source?: string[]
  dateRange?: {
    from?: Date
    to?: Date
  }
  search?: string
}

interface ProspectsFiltersProps {
  onFilterChange: (filters: FilterValue) => void
}

export function ProspectsFilters({ onFilterChange }: ProspectsFiltersProps) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<FilterValue>({})
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // Opciones para los filtros
  const statusOptions = [
    { value: "nuevo", label: "Nuevo" },
    { value: "contactado", label: "Contactado" },
    { value: "en conversación", label: "En conversación" },
    { value: "negociación", label: "Negociación" },
    { value: "ganado", label: "Ganado" },
    { value: "perdido", label: "Perdido" },
  ]

  const productOptions = [
    { value: "Netflix Premium", label: "Netflix Premium" },
    { value: "Disney+ Anual", label: "Disney+ Anual" },
    { value: "HBO Max", label: "HBO Max" },
    { value: "Amazon Prime", label: "Amazon Prime" },
    { value: "Combo Streaming", label: "Combo Streaming" },
  ]

  const sourceOptions = [
    { value: "Facebook", label: "Facebook" },
    { value: "Instagram", label: "Instagram" },
    { value: "TikTok", label: "TikTok" },
    { value: "WhatsApp", label: "WhatsApp" },
    { value: "Referido", label: "Referido" },
  ]

  // Función para actualizar los filtros
  const updateFilters = (key: keyof FilterValue, value: any) => {
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
    if (newFilters.product && newFilters.product.length > 0) count++
    if (newFilters.source && newFilters.source.length > 0) count++
    if (newFilters.dateRange && (newFilters.dateRange.from || newFilters.dateRange.to)) count++
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
  const handleCheckboxChange = (key: keyof FilterValue, value: string, checked: boolean) => {
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
              placeholder="Buscar por nombre, email..."
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

          <AccordionItem value="product">
            <AccordionTrigger className="py-2">Producto</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {productOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`product-${option.value}`}
                      checked={(filters.product || []).includes(option.value)}
                      onCheckedChange={(checked) => handleCheckboxChange("product", option.value, checked as boolean)}
                    />
                    <label
                      htmlFor={`product-${option.value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="source">
            <AccordionTrigger className="py-2">Fuente</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {sourceOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`source-${option.value}`}
                      checked={(filters.source || []).includes(option.value)}
                      onCheckedChange={(checked) => handleCheckboxChange("source", option.value, checked as boolean)}
                    />
                    <label
                      htmlFor={`source-${option.value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
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
