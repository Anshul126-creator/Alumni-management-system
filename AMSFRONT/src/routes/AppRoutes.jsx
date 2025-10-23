"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

// Layout imports
import AuthLayout from "../layouts/AuthLayout"
import DashboardLayout from "../layouts/DashboardLayout"

// Page imports
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import AlumniList from "../pages/AlumniList"
import Events from "../pages/Events"
import Profile from "../pages/Profile"
import Messages from "../pages/Messages"
import Mentorship from "../pages/Mentorship"
import Settings from "../pages/Settings"

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      </Route>

      {/* Protected Routes */}
      <Route element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alumni" element={<AlumniList />} />
        <Route path="/events" element={<Events />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
