import Button from "./Button"
import { Building, GraduationCap, MapPin, Mail, Linkedin } from "lucide-react"

function AlumniCard({ alumni }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <img
          src={alumni.profileImage || "/placeholder.svg"}
          alt={alumni.name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-heading font-semibold text-foreground truncate">{alumni.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{alumni.currentPosition}</p>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Building className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{alumni.company}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>
            {alumni.department} • Class of {alumni.graduationYear}
          </span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">{alumni.location}</span>
        </div>
      </div>

      {alumni.bio && <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{alumni.bio}</p>}

      {alumni.skills && alumni.skills.length > 0 && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {alumni.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                {skill}
              </span>
            ))}
            {alumni.skills.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                +{alumni.skills.length - 3} more
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
          {alumni.linkedIn && (
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
  )
}

export default AlumniCard
