"use client"

import { createContext } from "react"

type AuthContextValue = {
  authenticated: boolean

  user?: {
    id: string
  }
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)