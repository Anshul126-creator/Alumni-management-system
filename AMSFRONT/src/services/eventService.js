import api from "./api"

export const eventService = {
  // Get all events
  getAllEvents: () => api.get("/events"),

  // Get event by ID
  getEventById: (id) => api.get(`/events/${id}`),

  // Create new event
  createEvent: (eventData) => api.post("/events", eventData),

  // Update event
  updateEvent: (id, eventData) => api.put(`/events/${id}`, eventData),

  // Delete event
  deleteEvent: (id) => api.delete(`/events/${id}`),

  // RSVP to event
  rsvpEvent: (eventId, status) => api.post(`/events/${eventId}/rsvp`, { status }),

  // Get user's RSVPs
  getUserRSVPs: () => api.get("/events/my-rsvps"),
}
