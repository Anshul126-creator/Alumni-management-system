package com.alumni.events.dto;

import com.alumni.events.entity.EventRSVP;

import java.time.LocalDateTime;

public class RSVPResponse {
    private Long id;
    private Long eventId;
    private Long userId;
    private String status;
    private String notes;
    private Boolean attended;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor from EventRSVP entity
    public RSVPResponse(EventRSVP rsvp) {
        this.id = rsvp.getId();
        this.eventId = rsvp.getEventId();
        this.userId = rsvp.getUserId();
        this.status = rsvp.getStatus() != null ? rsvp.getStatus().toString() : null;
        this.notes = rsvp.getNotes();
        this.attended = rsvp.getAttended();
        this.createdAt = rsvp.getCreatedAt();
        this.updatedAt = rsvp.getUpdatedAt();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Boolean getAttended() { return attended; }
    public void setAttended(Boolean attended) { this.attended = attended; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
