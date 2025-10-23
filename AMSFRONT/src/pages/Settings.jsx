"use client"

import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import Button from "../components/Button"
import { Bell, Shield, User, Globe, Smartphone, Mail, Eye, EyeOff } from "lucide-react"

function Settings() {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState("notifications")
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      eventReminders: true,
      messageNotifications: true,
      mentorshipUpdates: true,
      weeklyDigest: false,
    },
    privacy: {
      profileVisibility: "alumni",
      showEmail: false,
      showPhone: false,
      showLocation: true,
      allowMessages: true,
      showOnlineStatus: true,
    },
    account: {
      twoFactorAuth: false,
      loginAlerts: true,
      sessionTimeout: "30",
    },
  })
  const [showPassword, setShowPassword] = useState(false)

  const sections = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "account", label: "Account Security", icon: User },
    { id: "preferences", label: "Preferences", icon: Globe },
  ]

  const handleSettingChange = (section, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: value,
      },
    }))
  }

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { key: "emailNotifications", label: "Email notifications", description: "Receive notifications via email" },
            {
              key: "eventReminders",
              label: "Event reminders",
              description: "Get reminded about upcoming events you're attending",
            },
            {
              key: "messageNotifications",
              label: "New messages",
              description: "Receive notifications for new messages",
            },
            {
              key: "mentorshipUpdates",
              label: "Mentorship updates",
              description: "Updates about your mentorship activities",
            },
            {
              key: "weeklyDigest",
              label: "Weekly digest",
              description: "Weekly summary of alumni network activity",
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications[item.key]}
                  onChange={(e) => handleSettingChange("notifications", item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ring/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Push Notifications</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Push notifications</p>
            <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.pushNotifications}
              onChange={(e) => handleSettingChange("notifications", "pushNotifications", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ring/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Profile Visibility</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Who can see your profile?</label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handleSettingChange("privacy", "profileVisibility", e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="public">Everyone</option>
              <option value="alumni">Alumni only</option>
              <option value="connections">My connections only</option>
              <option value="private">Private</option>
            </select>
          </div>

          {[
            { key: "showEmail", label: "Show email address", icon: Mail },
            { key: "showPhone", label: "Show phone number", icon: Smartphone },
            { key: "showLocation", label: "Show location", icon: Globe },
            { key: "allowMessages", label: "Allow messages from other alumni", icon: Bell },
            { key: "showOnlineStatus", label: "Show online status", icon: Eye },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.privacy[item.key]}
                    onChange={(e) => handleSettingChange("privacy", item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ring/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline" size="sm">
              {settings.account.twoFactorAuth ? "Disable" : "Enable"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Login alerts</p>
              <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.account.loginAlerts}
                onChange={(e) => handleSettingChange("account", "loginAlerts", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ring/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 pr-10 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>
          <Button>Update Password</Button>
        </div>
      </div>
    </div>
  )

  const renderPreferences = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">General Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Language</label>
            <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Time Zone</label>
            <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent">
              <option value="PST">Pacific Standard Time (PST)</option>
              <option value="EST">Eastern Standard Time (EST)</option>
              <option value="CST">Central Standard Time (CST)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Date Format</label>
            <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-lg border border-border p-6">
            {activeSection === "notifications" && renderNotificationSettings()}
            {activeSection === "privacy" && renderPrivacySettings()}
            {activeSection === "account" && renderAccountSettings()}
            {activeSection === "preferences" && renderPreferences()}

            <div className="mt-8 pt-6 border-t border-border">
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
