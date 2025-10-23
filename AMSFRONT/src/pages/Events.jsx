"use client"

import { useState, useEffect } from "react"
import { mockEventData } from "../data/alumniData"
import Button from "../components/Button"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Filter,
  Search,
  ChevronDown,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

function Events() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    date: "",
    status: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [rsvpStatus, setRsvpStatus] = useState({})

  const categories = ["All", "Social", "Professional", "Mentorship", "Networking", "Academic"]
  const statusOptions = ["All", "Upcoming", "Ongoing", "Completed"]

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setEvents(mockEventData)
      setFilteredEvents(mockEventData)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = events

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.organizer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter((event) => event.category === filters.category)
    }

    // Apply date filter
    if (filters.date) {
      const filterDate = new Date(filters.date)
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate.toDateString() === filterDate.toDateString()
      })
    }

    setFilteredEvents(filtered)
  }, [searchTerm, filters, events])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: "",
      date: "",
      status: "",
    })
    setSearchTerm("")
  }

  const handleRSVP = (eventId, status) => {
    setRsvpStatus((prev) => ({
      ...prev,
      [eventId]: status,
    }))
    // Here you would typically make an API call to update RSVP status
  }

  const getRSVPButton = (eventId) => {
    const status = rsvpStatus[eventId]

    if (status === "attending") {
      return (
        <Button variant="outline" size="sm" className="text-green-600 border-green-600 bg-transparent">
          <CheckCircle className="h-4 w-4 mr-1" />
          Attending
        </Button>
      )
    } else if (status === "not_attending") {
      return (
        <Button variant="outline" size="sm" className="text-red-600 border-red-600 bg-transparent">
          <XCircle className="h-4 w-4 mr-1" />
          Not Attending
        </Button>
      )
    } else if (status === "maybe") {
      return (
        <Button variant="outline" size="sm" className="text-yellow-600 border-yellow-600 bg-transparent">
          <AlertCircle className="h-4 w-4 mr-1" />
          Maybe
        </Button>
      )
    }

    return (
      <div className="flex space-x-1">
        <Button variant="outline" size="sm" onClick={() => handleRSVP(eventId, "attending")}>
          <CheckCircle className="h-4 w-4 mr-1" />
          Yes
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleRSVP(eventId, "maybe")}>
          <AlertCircle className="h-4 w-4 mr-1" />
          Maybe
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleRSVP(eventId, "not_attending")}>
          <XCircle className="h-4 w-4 mr-1" />
          No
        </Button>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const hasActiveFilters = searchTerm || filters.category || filters.date || filters.status

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Alumni Events</h1>
          <p className="text-muted-foreground mt-1">
            Discover and join {events.length} upcoming events in our alumni community
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{filteredEvents.length} events</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events by title, description, location, or organizer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="flex items-center space-x-2">
              <X className="h-4 w-4" />
              <span>Clear</span>
            </Button>
          )}
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category === "All" ? "" : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange("date", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status === "All" ? "" : status.toLowerCase()}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-medium text-foreground mb-2">No events found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              {event.image && (
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                        {event.category}
                      </span>
                      <span className="text-xs text-muted-foreground">by {event.organizer}</span>
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{event.title}</h3>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>
                      {event.attendees} attending
                      {event.maxAttendees && ` • ${event.maxAttendees - event.attendees} spots left`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {getRSVPButton(event.id)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Events
