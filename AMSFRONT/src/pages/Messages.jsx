"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import Button from "../components/Button"
import { mockAlumniData } from "../data/alumniData"
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile, Circle, MessageSquare } from "lucide-react"

function Messages() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      participant: mockAlumniData[0],
      lastMessage: "Thanks for connecting! Looking forward to our mentorship session.",
      timestamp: "2024-01-15T10:30:00Z",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      participant: mockAlumniData[1],
      lastMessage: "The alumni event was fantastic! Great to meet you there.",
      timestamp: "2024-01-14T15:45:00Z",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      participant: mockAlumniData[2],
      lastMessage: "I'd love to discuss career opportunities in your field.",
      timestamp: "2024-01-13T09:20:00Z",
      unread: 1,
      online: true,
    },
  ]

  // Mock messages for selected conversation
  const mockMessages = [
    {
      id: 1,
      senderId: mockAlumniData[0].id,
      content: "Hi! I saw your profile and would love to connect.",
      timestamp: "2024-01-15T09:00:00Z",
      type: "text",
    },
    {
      id: 2,
      senderId: user?.id,
      content: "Hello! Thanks for reaching out. I'd be happy to connect.",
      timestamp: "2024-01-15T09:15:00Z",
      type: "text",
    },
    {
      id: 3,
      senderId: mockAlumniData[0].id,
      content: "Thanks for connecting! Looking forward to our mentorship session.",
      timestamp: "2024-01-15T10:30:00Z",
      type: "text",
    },
  ]

  useEffect(() => {
    setConversations(mockConversations)
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      setMessages(mockMessages)
    }
  }, [selectedConversation])

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message = {
        id: messages.length + 1,
        senderId: user?.id,
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        type: "text",
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-background">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-border bg-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No conversations found</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedConversation?.id === conversation.id ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.participant.profileImage || "/placeholder.svg"}
                      alt={conversation.participant.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.online && (
                      <Circle className="absolute -bottom-1 -right-1 h-4 w-4 text-green-500 fill-current" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-foreground truncate">{conversation.participant.name}</h3>
                      <span className="text-xs text-muted-foreground">{formatTime(conversation.timestamp)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <div className="mt-1">
                        <span className="inline-block bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                          {conversation.unread}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={selectedConversation.participant.profileImage || "/placeholder.svg"}
                    alt={selectedConversation.participant.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedConversation.online && (
                    <Circle className="absolute -bottom-1 -right-1 h-3 w-3 text-green-500 fill-current" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{selectedConversation.participant.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.participant.currentPosition} at {selectedConversation.participant.company}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                const isOwnMessage = message.senderId === user?.id
                return (
                  <div key={message.id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        isOwnMessage
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          isOwnMessage ? "text-primary-foreground/70" : "text-muted-foreground/70"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-input rounded-full bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                  <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-heading font-medium text-foreground mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages
