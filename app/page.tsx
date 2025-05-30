import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { RecentProspects } from "@/components/dashboard/recent-prospects"
import { UrgentTasks } from "@/components/dashboard/urgent-tasks"
import { ProspectOrganization } from "@/components/prospects/prospect-organization"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <DashboardStats />

          <div className="grid gap-6 md:grid-cols-2">
            <RecentProspects />
            <UrgentTasks />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <DashboardCharts />
        </TabsContent>

      </Tabs>
    </div>
  )
}
