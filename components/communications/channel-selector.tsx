"use client"

import { Mail, MessageSquare, Phone } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChannelSelectorProps {
  activeChannel: string
  onChannelChange: (channel: string) => void
}

export function ChannelSelector({ activeChannel, onChannelChange }: ChannelSelectorProps) {
  return (
    <TooltipProvider>
      <ToggleGroup type="single" value={activeChannel} onValueChange={(value) => value && onChannelChange(value)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem value="whatsapp" aria-label="WhatsApp">
              <MessageSquare className="h-5 w-5" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>WhatsApp</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem value="email" aria-label="Email">
              <Mail className="h-5 w-5" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>Email</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem value="phone" aria-label="Teléfono">
              <Phone className="h-5 w-5" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>Teléfono</TooltipContent>
        </Tooltip>
      </ToggleGroup>
    </TooltipProvider>
  )
}
