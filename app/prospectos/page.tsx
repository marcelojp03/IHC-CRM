"use client"

import { useState } from "react"
import { ProspectsHeader } from "@/components/prospects/prospects-header"
import { ProspectsKanbanTabs } from "@/components/prospects/prospects-kanban-tabs"
import { ProspectsTable } from "@/components/prospects/prospects-table"
import { ProspectOrganization } from "@/components/prospects/prospect-organization"
import { ProspectsFilters, type FilterValue } from "@/components/prospects/prospects-filters"
import { mockProspects } from "@/data/mock-data"
import type { Prospect } from "@/types/prospect"

export default function ProspectsPage() {
  const [view, setView] = useState<"table" | "kanban">("table") // Tabla primero
  const [filters, setFilters] = useState<FilterValue>({})
  const [prospects, setProspects] = useState<Prospect[]>(mockProspects)

  const handleFilterChange = (newFilters: FilterValue) => {
    setFilters(newFilters)
    console.log("Filtros aplicados:", newFilters)
  }

  const handleStatusChange = (prospectId: string, newStatus: string) => {
    setProspects(
      prospects.map((prospect) =>
        prospect.id === prospectId ? { ...prospect, status: newStatus as Prospect["status"] } : prospect,
      ),
    )
  }

  const handleViewProspect = (prospect: Prospect) => {
    console.log("Ver prospecto:", prospect)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ProspectsHeader view={view} onViewChange={setView} />
      <div className="p-4 md:p-6 space-y-6">
        {/* Organización de prospectos */}
        <ProspectOrganization />

        {/* Filtros */}
        <div>
          <ProspectsFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Vista principal */}
        <div className="flex-1">
          {view === "table" ? (
            <ProspectsTable />
          ) : (
            <ProspectsKanbanTabs
              prospects={prospects}
              onStatusChange={handleStatusChange}
              onViewProspect={handleViewProspect}
            />
          )}
        </div>
      </div>
    </div>
  )
}
