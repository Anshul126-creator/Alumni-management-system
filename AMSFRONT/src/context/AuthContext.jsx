"use client"
// anshul bhai change karna h api real backend se connect karlio

import { createContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on app load
    const checkAuth = () => {
      const savedUser = localStorage.getItem("alumni_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    try {
      // This will be replaced with actual API call
      const mockUser = {
        id: 1,
        name: credentials.email.split("@")[0],
        email: credentials.email,
        role: "alumni",
        graduationYear: 2020,
        department: "Computer Science",
      }

      setUser(mockUser)
      localStorage.setItem("alumni_user", JSON.stringify(mockUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      // This will be replaced with actual API call
      const newUser = {
        id: Date.now(),
        ...userData,
        role: "alumni",
      }

      setUser(newUser)
      localStorage.setItem("alumni_user", JSON.stringify(newUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("alumni_user")
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }
