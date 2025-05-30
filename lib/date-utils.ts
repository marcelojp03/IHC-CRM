import { formatDistanceToNow as formatDistance, format } from "date-fns"
import { es } from "date-fns/locale"

export function formatDistanceToNow(date: Date): string {
  return formatDistance(date, { addSuffix: true, locale: es })
}

export function formatMessageTime(date: Date): string {
  return format(date, "HH:mm")
}

export function formatDate(date: Date): string {
  return format(date, "dd/MM/yyyy")
}
