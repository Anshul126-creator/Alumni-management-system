import { Link, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import { LayoutDashboard, Users, Calendar, User, MessageSquare, Settings, BookOpen, Award } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Alumni Directory",
    href: "/alumni",
    icon: Users,
  },
  {
    title: "Events",
    href: "/events",
    icon: Calendar,
  },
  {
    title: "My Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Mentorship",
    href: "/mentorship",
    icon: BookOpen,
  },
  {
    title: "Achievements",
    href: "/achievements",
    icon: Award,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

function Sidebar() {
  const location = useLocation()

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-heading font-semibold tracking-tight text-foreground">Navigation</h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
