"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import Button from "../components/Button"
import { mockAlumniData, mockEventData } from "../data/alumniData"
import {
  Users,
  Calendar,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  MapPin,
  Building,
  GraduationCap,
  Clock,
} from "lucide-react"

function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalAlumni: 0,
    upcomingEvents: 0,
    newConnections: 0,
    activeDiscussions: 0,
  })
  const [recentAlumni, setRecentAlumni] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])

  useEffect(() => {
    // Simulate loading data
    setStats({
      totalAlumni: mockAlumniData.length,
      upcomingEvents: mockEventData.length,
      newConnections: 12,
      activeDiscussions: 8,
    })
    setRecentAlumni(mockAlumniData.slice(0, 3))
    setUpcomingEvents(mockEventData.slice(0, 2))
  }, [])

  const statCards = [
    {
      title: "Total Alumni",
      value: stats.totalAlumni.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "New Connections",
      value: stats.newConnections,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Active Discussions",
      value: stats.activeDiscussions,
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          Welcome back, {user?.name || "Alumni"}!
        </h1>
        <p className="text-muted-foreground text-lg">Here's what's happening in your alumni network today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} rounded-full p-3`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Alumni */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold text-foreground">Recent Alumni</h2>
            <Link to="/alumni">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentAlumni.map((alumni) => (
              <div
                key={alumni.id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <img
                  src={alumni.profileImage || "/placeholder.svg"}
                  alt={alumni.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{alumni.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{alumni.currentPosition}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Building className="h-3 w-3 mr-1" />
                    {alumni.company}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{alumni.graduationYear}</p>
                  <p className="text-xs text-muted-foreground">{alumni.department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold text-foreground">Upcoming Events</h2>
            <Link to="/events">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <h3 className="font-medium text-foreground mb-2">{event.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees} attending
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  RSVP
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/alumni">
            <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
              <Users className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Browse Alumni</div>
                <div className="text-sm text-muted-foreground">Find and connect with fellow graduates</div>
              </div>
            </Button>
          </Link>
          <Link to="/events">
            <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
              <Calendar className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">View Events</div>
                <div className="text-sm text-muted-foreground">Discover upcoming alumni gatherings</div>
              </div>
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
              <GraduationCap className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Update Profile</div>
                <div className="text-sm text-muted-foreground">Keep your information current</div>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
