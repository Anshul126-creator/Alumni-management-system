"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import Button from "../components/Button"
import { mockAlumniData } from "../data/alumniData"
import {
  Users,
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  GraduationCap,
  Building,
  MessageSquare,
  Calendar,
  Award,
  BookOpen,
  ChevronDown,
  X,
} from "lucide-react"

function Mentorship() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("find-mentors")
  const [mentors, setMentors] = useState([])
  const [mentees, setMentees] = useState([])
  const [myMentorships, setMyMentorships] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    department: "",
    experience: "",
    availability: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  // Mock mentorship data
  const mockMentors = mockAlumniData.map((alumni, index) => ({
    ...alumni,
    mentorshipAreas: ["Career Development", "Technical Skills", "Leadership"],
    experience: `${5 + index * 2} years`,
    rating: 4.5 + index * 0.2,
    totalMentees: 12 + index * 3,
    availability: index % 2 === 0 ? "Available" : "Limited",
    hourlyRate: index % 3 === 0 ? "Free" : "$50/hour",
  }))

  const mockMentorships = [
    {
      id: 1,
      type: "mentor",
      participant: mockAlumniData[1],
      startDate: "2024-01-01",
      status: "active",
      nextSession: "2024-01-20T14:00:00Z",
      totalSessions: 8,
    },
    {
      id: 2,
      type: "mentee",
      participant: mockAlumniData[0],
      startDate: "2023-12-01",
      status: "active",
      nextSession: "2024-01-18T16:00:00Z",
      totalSessions: 12,
    },
  ]

  useEffect(() => {
    setMentors(mockMentors)
    setMentees(mockMentors.slice(1))
    setMyMentorships(mockMentorships)
  }, [])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      department: "",
      experience: "",
      availability: "",
    })
    setSearchTerm("")
  }

  const hasActiveFilters = searchTerm || filters.department || filters.experience || filters.availability

  const tabs = [
    { id: "find-mentors", label: "Find Mentors", icon: Users },
    { id: "be-mentor", label: "Be a Mentor", icon: BookOpen },
    { id: "my-mentorships", label: "My Mentorships", icon: Award },
  ]

  const renderMentorCard = (mentor, isMentee = false) => (
    <div key={mentor.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={mentor.profileImage || "/placeholder.svg"}
          alt={mentor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold text-foreground">{mentor.name}</h3>
          <p className="text-sm text-muted-foreground">{mentor.currentPosition}</p>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Building className="h-3 w-3 mr-1" />
            {mentor.company}
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
              <span className="text-sm text-foreground">{mentor.rating}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              {mentor.totalMentees} mentees
            </div>
          </div>
        </div>
        <div className="text-right">
          <span
            className={`inline-block px-2 py-1 text-xs rounded-full ${
              mentor.availability === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {mentor.availability}
          </span>
          <p className="text-sm text-muted-foreground mt-1">{mentor.hourlyRate}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4 mr-2" />
          {mentor.department} • Class of {mentor.graduationYear}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          {mentor.experience} experience
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          {mentor.location}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-foreground mb-2">Mentorship Areas:</p>
        <div className="flex flex-wrap gap-1">
          {mentor.mentorshipAreas.map((area, index) => (
            <span key={index} className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <Button variant="ghost" size="sm">
          <MessageSquare className="h-4 w-4 mr-1" />
          Message
        </Button>
        <Button size="sm">{isMentee ? "Request Mentorship" : "Connect"}</Button>
      </div>
    </div>
  )

  const renderMyMentorships = () => (
    <div className="space-y-6">
      {myMentorships.length === 0 ? (
        <div className="text-center py-12">
          <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-medium text-foreground mb-2">No active mentorships</h3>
          <p className="text-muted-foreground mb-4">
            Start your mentorship journey by finding a mentor or becoming one.
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => setActiveTab("find-mentors")}>Find Mentors</Button>
            <Button variant="outline" onClick={() => setActiveTab("be-mentor")}>
              Be a Mentor
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {myMentorships.map((mentorship) => (
            <div key={mentorship.id} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={mentorship.participant.profileImage || "/placeholder.svg"}
                    alt={mentorship.participant.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-foreground">{mentorship.participant.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {mentorship.type === "mentor" ? "Your Mentee" : "Your Mentor"}
                    </p>
                  </div>
                </div>
                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  {mentorship.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Started: {new Date(mentorship.startDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Next session: {new Date(mentorship.nextSession).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Total sessions: {mentorship.totalSessions}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button size="sm" className="flex-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Mentorship Program</h1>
        <p className="text-muted-foreground mt-1">
          Connect with experienced alumni or share your knowledge with newer graduates
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      {activeTab !== "my-mentorships" && (
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === "find-mentors" ? "mentors" : "mentees"}...`}
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
            <div className="mb-6 pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                  <select
                    value={filters.department}
                    onChange={(e) => handleFilterChange("department", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="">All Departments</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Experience Level</label>
                  <select
                    value={filters.experience}
                    onChange={(e) => handleFilterChange("experience", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="">All Levels</option>
                    <option value="0-2 years">0-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Availability</label>
                  <select
                    value={filters.availability}
                    onChange={(e) => handleFilterChange("availability", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="Available">Available</option>
                    <option value="Limited">Limited</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Content */}
      {activeTab === "find-mentors" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mentors.map((mentor) => renderMentorCard(mentor, true))}
        </div>
      )}

      {activeTab === "be-mentor" && (
        <div className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Become a Mentor</h3>
            <p className="text-muted-foreground mb-4">
              Share your experience and help guide the next generation of alumni in their career journey.
            </p>
            <Button>Apply to be a Mentor</Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mentees.map((mentee) => renderMentorCard(mentee, false))}
          </div>
        </div>
      )}

      {activeTab === "my-mentorships" && renderMyMentorships()}
    </div>
  )
}

export default Mentorship
