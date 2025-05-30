"use client"

import { Bell, X, Check, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useNotifications } from "@/components/notification-provider"
import { formatDistanceToNow } from "@/lib/date-utils"
import { cn } from "@/lib/utils"

export function NotificationTrigger() {
  const { unreadCount, togglePanel } = useNotifications()

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={togglePanel}>
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </Badge>
      )}
      <span className="sr-only">Notificaciones</span>
    </Button>
  )
}

export function NotificationPanel() {
  const { notifications, showPanel, togglePanel, markAsRead, markAllAsRead, clearNotification } = useNotifications()

  if (!showPanel) return null

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "prospect":
        return <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">P</div>
      case "task":
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">T</div>
        )
      case "message":
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">M</div>
        )
      case "system":
        return <div className="h-8 w-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">S</div>
      default:
        return <div className="h-8 w-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">N</div>
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/20" onClick={togglePanel}>
      <div
        className="absolute right-4 top-16 w-80 md:w-96 bg-background rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">Notificaciones</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-1" />
              <span>Marcar todo como leído</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={togglePanel}>
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-16rem)] max-h-[32rem]">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 flex gap-3 hover:bg-muted/50 transition-colors",
                    !notification.read && "bg-primary/5",
                  )}
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{notification.title}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Marcar como leído</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => clearNotification(notification.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">No hay notificaciones</div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
