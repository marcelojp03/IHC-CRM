import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CrmSidebar } from "@/components/crm-sidebar"
import { NotificationProvider } from "@/components/notification-provider"
import { NotificationPanel } from "@/components/notification-panel"
import { AuthProvider } from "@/components/auth/auth-provider"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CRM Prospectos",
  description: "Sistema de gestión de prospectos",
  generator: "next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="crm-ui-theme">
          <AuthProvider>
            <ProtectedRoute>
              <NotificationProvider>
                <div className="flex h-screen overflow-hidden">
                  <CrmSidebar />
                  <main className="flex-1 overflow-auto md:ml-64">{children}</main>
                </div>
                <NotificationPanel />
                <Toaster />
              </NotificationProvider>
            </ProtectedRoute>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
