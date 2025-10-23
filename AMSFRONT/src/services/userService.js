import api from "./api"

export const userService = {
  // Get current user profile
  getProfile: () => api.get("/users/profile"),

  // Update user profile
  updateProfile: (userData) => api.put("/users/profile", userData),

  // Get user by ID
  getUserById: (id) => api.get(`/users/${id}`),

  // Search users
  searchUsers: (query) => api.get(`/users/search?q=${encodeURIComponent(query)}`),
}
