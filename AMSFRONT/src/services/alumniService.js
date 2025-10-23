import api from "./api"

export const alumniService = {
  // Get all alumni with pagination
  getAllAlumni: (page = 1, limit = 20, filters = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    })
    return api.get(`/alumni?${params}`)
  },

  // Get alumni by graduation year
  getAlumniByYear: (year) => api.get(`/alumni/year/${year}`),

  // Get alumni by department
  getAlumniByDepartment: (department) => api.get(`/alumni/department/${encodeURIComponent(department)}`),

  // Get alumni statistics
  getAlumniStats: () => api.get("/alumni/stats"),
}
