"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import Button from "../components/Button"
import { DEPARTMENTS, GRADUATION_YEARS } from "../utils/constants"
import { MapPin, GraduationCap, Edit, Save, X, Plus, Linkedin, Globe, Camera } from "lucide-react"

function Profile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    currentPosition: "",
    company: "",
    department: "",
    graduationYear: "",
    bio: "",
    skills: [],
    linkedIn: "",
    website: "",
    profileImage: "",
  })
  const [newSkill, setNewSkill] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load user profile data
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "San Francisco, CA",
        currentPosition: user.currentPosition || "Software Engineer",
        company: user.company || "Tech Corp",
        department: user.department || "Computer Science",
        graduationYear: user.graduationYear || "2020",
        bio: user.bio || "Passionate about technology and connecting with fellow alumni.",
        skills: user.skills || ["React", "Node.js", "Python"],
        linkedIn: user.linkedIn || "",
        website: user.website || "",
        profileImage: user.profileImage || "",
      })
    }
  }, [user])

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // Here you would typically make an API call to update the profile
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset to original data
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "San Francisco, CA",
        currentPosition: user.currentPosition || "Software Engineer",
        company: user.company || "Tech Corp",
        department: user.department || "Computer Science",
        graduationYear: user.graduationYear || "2020",
        bio: user.bio || "Passionate about technology and connecting with fellow alumni.",
        skills: user.skills || ["React", "Node.js", "Python"],
        linkedIn: user.linkedIn || "",
        website: user.website || "",
        profileImage: user.profileImage || "",
      })
    }
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your alumni profile and professional information</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edit Profile</span>
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              <Save className="h-4 w-4 mr-1" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <div className="relative inline-block mb-4">
              <img
                src={profileData.profileImage || "/placeholder.svg?height=120&width=120"}
                alt={profileData.name}
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>

            <h2 className="text-xl font-heading font-semibold text-foreground mb-1">{profileData.name}</h2>
            <p className="text-muted-foreground mb-2">{profileData.currentPosition}</p>
            <p className="text-sm text-muted-foreground mb-4">{profileData.company}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center text-muted-foreground">
                <GraduationCap className="h-4 w-4 mr-2" />
                <span>Class of {profileData.graduationYear}</span>
              </div>
              <div className="flex items-center justify-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{profileData.location}</span>
              </div>
            </div>

            {(profileData.linkedIn || profileData.website) && (
              <div className="flex justify-center space-x-2 mt-4">
                {profileData.linkedIn && (
                  <Button variant="ghost" size="sm">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                )}
                {profileData.website && (
                  <Button variant="ghost" size="sm">
                    <Globe className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                ) : (
                  <p className="text-muted-foreground">{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                ) : (
                  <p className="text-muted-foreground">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="text-muted-foreground">{profileData.phone || "Not provided"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                ) : (
                  <p className="text-muted-foreground">{profileData.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Current Position</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.currentPosition}
                    onChange={(e) => handleInputChange("currentPosition", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                ) : (
                  <p className="text-muted-foreground">{profileData.currentPosition}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                ) : (
                  <p className="text-muted-foreground">{profileData.company}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                {isEditing ? (
                  <select
                    value={profileData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-muted-foreground">{profileData.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Graduation Year</label>
                {isEditing ? (
                  <select
                    value={profileData.graduationYear}
                    onChange={(e) => handleInputChange("graduationYear", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    {GRADUATION_YEARS.slice(0, 30).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-muted-foreground">{profileData.graduationYear}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">About Me</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="Tell us about yourself, your interests, and your professional journey..."
              />
            ) : (
              <p className="text-muted-foreground">{profileData.bio}</p>
            )}
          </div>

          {/* Skills */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Skills & Expertise</h3>

            {isEditing && (
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                  placeholder="Add a skill"
                  className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                <Button onClick={handleAddSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-primary/70 hover:text-primary"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">LinkedIn</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.linkedIn}
                    onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                ) : (
                  <p className="text-muted-foreground">{profileData.linkedIn || "Not provided"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                ) : (
                  <p className="text-muted-foreground">{profileData.website || "Not provided"}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
