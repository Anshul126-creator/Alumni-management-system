import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <aside className="w-64 min-h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border">
          <Sidebar />
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
