"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Button from "../components/Button"
import { GraduationCap, Users, Calendar, MessageSquare, Award, ArrowRight } from "lucide-react"

function Home() {
  const { user } = useAuth()

  const features = [
    {
      icon: Users,
      title: "Alumni Directory",
      description: "Connect with fellow graduates from your department and graduation year.",
    },
    {
      icon: Calendar,
      title: "Events & Reunions",
      description: "Stay updated on alumni events, reunions, and networking opportunities.",
    },
    {
      icon: MessageSquare,
      title: "Networking Hub",
      description: "Build professional relationships and find mentorship opportunities.",
    },
    {
      icon: Award,
      title: "Career Growth",
      description: "Access job opportunities and career development resources.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <GraduationCap className="h-20 w-20 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 text-balance">
              Connect with Your
              <span className="text-primary"> Alumni Network</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Join thousands of alumni in building lasting professional relationships, finding mentorship opportunities,
              and staying connected with your educational community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="text-lg px-8">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="text-lg px-8">
                      Join the Network
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Everything You Need to Stay Connected
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides comprehensive tools to help you maintain and grow your professional network within
              the alumni community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-heading font-bold text-primary mb-2">10,000+</div>
              <div className="text-lg text-muted-foreground">Active Alumni</div>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-primary mb-2">500+</div>
              <div className="text-lg text-muted-foreground">Events Hosted</div>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-primary mb-2">95%</div>
              <div className="text-lg text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Ready to Reconnect?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our growing community of alumni and unlock new opportunities for professional growth and meaningful
            connections.
          </p>
          {!user && (
            <Link to="/register">
              <Button variant="secondary" size="lg" className="text-lg px-8">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
