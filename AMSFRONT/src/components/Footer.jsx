import { GraduationCap, Mail, Phone, MapPin } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-heading font-bold text-xl text-foreground">AlumniConnect</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Connecting alumni worldwide to foster lifelong relationships, mentorship opportunities, and professional
              growth within our educational community.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/alumni" className="text-muted-foreground hover:text-foreground transition-colors">
                  Alumni Directory
                </a>
              </li>
              <li>
                <a href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="/mentorship" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mentorship
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>alumni@university.edu</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 999999999</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>LNCT college</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 AlumniConnect. All rights reserved. Built with care for our educational community.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
