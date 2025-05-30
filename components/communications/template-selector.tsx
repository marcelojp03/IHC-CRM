"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { MessageTemplate } from "@/types/communication"
import { mockTemplates } from "@/data/mock-data"

interface TemplateSelectorProps {
  onSelectTemplate: (template: MessageTemplate) => void
}

export function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [templates, setTemplates] = useState<MessageTemplate[]>(mockTemplates)
  const [newTemplate, setNewTemplate] = useState({ name: "", content: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateTemplate = () => {
    if (newTemplate.name.trim() && newTemplate.content.trim()) {
      const template: MessageTemplate = {
        id: `template-${Date.now()}`,
        name: newTemplate.name,
        content: newTemplate.content,
        category: "general",
      }

      setTemplates([...templates, template])
      setNewTemplate({ name: "", content: "" })
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar plantillas..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Nueva plantilla</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear nueva plantilla</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Nombre</Label>
                <Input
                  id="template-name"
                  placeholder="Nombre de la plantilla"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-content">Contenido</Label>
                <Textarea
                  id="template-content"
                  placeholder="Contenido de la plantilla"
                  className="min-h-[150px]"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateTemplate}>Crear plantilla</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <button
                key={template.id}
                className="w-full text-left p-3 rounded-md border hover:bg-muted transition-colors"
                onClick={() => onSelectTemplate(template)}
              >
                <h3 className="font-medium text-sm">{template.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{template.content}</p>
              </button>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">No se encontraron plantillas</div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
