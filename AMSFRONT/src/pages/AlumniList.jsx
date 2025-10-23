"use client"

import { useState, useEffect } from "react"
import { mockAlumniData } from "../data/alumniData"
import { DEPARTMENTS, GRADUATION_YEARS } from "../utils/constants"
import Button from "../components/Button"
import { Search, Filter, MapPin, Building, GraduationCap, Mail, Linkedin, Users, ChevronDown, X } from "lucide-react"

function AlumniList() {
  const [alumni, setAlumni] = useState([])
  const [filteredAlumni, setFilteredAlumni] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    department: "",
    graduationYear: "",
    location: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setAlumni(mockAlumniData)
      setFilteredAlumni(mockAlumniData)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = alumni

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.department.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply department filter
    if (filters.department) {
      filtered = filtered.filter((person) => person.department === filters.department)
    }

    // Apply graduation year filter
    if (filters.graduationYear) {
      filtered = filtered.filter((person) => person.graduationYear.toString() === filters.graduationYear)
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter((person) => person.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    setFilteredAlumni(filtered)
  }, [searchTerm, filters, alumni])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      department: "",
      graduationYear: "",
      location: "",
    })
    setSearchTerm("")
  }

  const hasActiveFilters = searchTerm || filters.department || filters.graduationYear || filters.location

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
          <h1 className="text-3xl font-heading font-bold text-foreground">Alumni Directory</h1>
          <p className="text-muted-foreground mt-1">
            Connect with {alumni.length.toLocaleString()} fellow graduates from our community
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{filteredAlumni.length} results</span>
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
                placeholder="Search by name, position, company, or department..."
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
                <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                <select
                  value={filters.department}
                  onChange={(e) => handleFilterChange("department", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="">All Departments</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Graduation Year</label>
                <select
                  value={filters.graduationYear}
                  onChange={(e) => handleFilterChange("graduationYear", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="">All Years</option>
                  {GRADUATION_YEARS.slice(0, 20).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter city or state"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Alumni Grid */}
      {filteredAlumni.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-medium text-foreground mb-2">No alumni found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((person) => (
            <div
              key={person.id}
              className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={person.profileImage || "/placeholder.svg"}
                  alt={person.name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-heading font-semibold text-foreground truncate">{person.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{person.currentPosition}</p>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Building className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{person.company}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>
                    {person.department} • Class of {person.graduationYear}
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{person.location}</span>
                </div>
              </div>

              {person.bio && <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{person.bio}</p>}

              {person.skills && person.skills.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {person.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {person.skills.length > 3 && (
                      <span className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                        +{person.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Mail className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  {person.linkedIn && (
                    <Button variant="ghost" size="sm">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button (for pagination) */}
      {filteredAlumni.length > 0 && filteredAlumni.length >= 9 && (
        <div className="text-center">
          <Button variant="outline">Load More Alumni</Button>
        </div>
      )}
    </div>
  )
}

export default AlumniList
