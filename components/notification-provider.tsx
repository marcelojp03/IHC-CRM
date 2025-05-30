"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Notification } from "@/types/notification"
import { mockNotifications } from "@/data/mock-data"

type NotificationContextType = {
  notifications: Notification[]
  unreadCount: number
  showPanel: boolean
  togglePanel: () => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [showPanel, setShowPanel] = useState(false)
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Simular notificaciones entrantes
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldAddNotification = Math.random() > 0.8 // 20% de probabilidad

      if (shouldAddNotification) {
        const types = ["prospect", "task", "message", "system"]
        const randomType = types[Math.floor(Math.random() * types.length)] as "prospect" | "task" | "message" | "system"

        const newNotification: Notification = {
          id: `notification-${Date.now()}`,
          type: randomType,
          title: `Nueva notificación de ${randomType}`,
          description: `Esta es una notificación automática de tipo ${randomType}`,
          timestamp: new Date(),
          read: false,
        }

        setNotifications((prev) => [newNotification, ...prev])
      }
    }, 60000) // Cada minuto

    return () => clearInterval(interval)
  }, [])

  const togglePanel = () => setShowPanel((prev) => !prev)

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        showPanel,
        togglePanel,
        markAsRead,
        markAllAsRead,
        clearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
