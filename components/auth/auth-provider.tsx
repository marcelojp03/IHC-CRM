"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "agent"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users para demostración
const mockUsers: User[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "admin@crm.com",
    role: "admin",
  },
  {
    id: "2",
    name: "María García",
    email: "manager@crm.com",
    role: "manager",
  },
  {
    id: "3",
    name: "Carlos López",
    email: "agent@crm.com",
    role: "agent",
  },
  {
    id: "4",
    name: "Miguel Peinado",
    email: "futurodecano@crm.com",
    role: "admin",
    avatar: "/images/miguel-avatar.png",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Verificar si hay una sesión guardada al cargar
  useEffect(() => {
    // Solo se ejecuta en el cliente
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("crm-user")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error("Error parsing saved user:", error)
          localStorage.removeItem("crm-user")
        }
      }
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Verificar credenciales (en producción esto sería una llamada real a la API)
    const foundUser = mockUsers.find((u) => u.email === email)

    if (foundUser && password === "123456") {
      // Password simple para demo
      setUser(foundUser)
      localStorage.setItem("crm-user", JSON.stringify(foundUser))

      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido de vuelta, ${foundUser.name}!`,
      })

      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("crm-user")

    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente.",
    })
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
