export const USER_ROLES = {
  ADMIN: "admin",
  ALUMNI: "alumni",
  STUDENT: "student",
}

export const EVENT_STATUS = {
  UPCOMING: "upcoming",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
}

export const RSVP_STATUS = {
  ATTENDING: "attending",
  NOT_ATTENDING: "not_attending",
  MAYBE: "maybe",
}

export const DEPARTMENTS = [
  "Computer Science",
  "Engineering",
  "Business Administration",
  "Medicine",
  "Law",
  "Arts & Sciences",
  "Education",
  "Architecture",
]

export const GRADUATION_YEARS = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i)
