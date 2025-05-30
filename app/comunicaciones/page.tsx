"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Users, FileText } from "lucide-react"
import CommunicationsView from "@/components/communications/communications-view"
import { MassMessageTab } from "@/components/communications/mass-message-tab"
import { TemplatesTab } from "@/components/communications/templates-tab"

export default function CommunicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Comunicaciones</h1>
        <p className="text-muted-foreground">Gestiona todas tus comunicaciones con prospectos y clientes</p>
      </div>

      <Tabs defaultValue="individual" className="space-y-4">
        <TabsList>
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Mensajes Individuales
          </TabsTrigger>
          <TabsTrigger value="mass" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Mensajes Masivos
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Plantillas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-4">
          <CommunicationsView />
        </TabsContent>

        <TabsContent value="mass" className="space-y-4">
          <MassMessageTab />
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <TemplatesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
