package com.alumni.events.dto;

import com.alumni.events.entity.Event;

import java.time.LocalDateTime;
import java.util.List;

public class EventResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime eventDate;
    private LocalDateTime endDate;
    private String location;
    private String venue;
    private String eventType;
    private String status;
    private Integer maxAttendees;
    private LocalDateTime registrationDeadline;
    private Boolean isVirtual;
    private String virtualLink;
    private String imageUrl;
    private Long createdBy;
    private Boolean isPublic;
    private List<String> tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long attendeeCount;
    private String userRSVPStatus;

    // Constructor from Event entity
    public EventResponse(Event event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.description = event.getDescription();
        this.eventDate = event.getEventDate();
        this.endDate = event.getEndDate();
        this.location = event.getLocation();
        this.venue = event.getVenue();
        this.eventType = event.getEventType() != null ? event.getEventType().toString() : null;
        this.status = event.getStatus() != null ? event.getStatus().toString() : null;
        this.maxAttendees = event.getMaxAttendees();
        this.registrationDeadline = event.getRegistrationDeadline();
        this.isVirtual = event.getIsVirtual();
        this.virtualLink = event.getVirtualLink();
        this.imageUrl = event.getImageUrl();
        this.createdBy = event.getCreatedBy();
        this.isPublic = event.getIsPublic();
        this.tags = event.getTags();
        this.createdAt = event.getCreatedAt();
        this.updatedAt = event.getUpdatedAt();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getEventDate() { return eventDate; }
    public void setEventDate(LocalDateTime eventDate) { this.eventDate = eventDate; }

    public LocalDateTime getEndDate() { return endDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getMaxAttendees() { return maxAttendees; }
    public void setMaxAttendees(Integer maxAttendees) { this.maxAttendees = maxAttendees; }

    public LocalDateTime getRegistrationDeadline() { return registrationDeadline; }
    public void setRegistrationDeadline(LocalDateTime registrationDeadline) { this.registrationDeadline = registrationDeadline; }

    public Boolean getIsVirtual() { return isVirtual; }
    public void setIsVirtual(Boolean isVirtual) { this.isVirtual = isVirtual; }

    public String getVirtualLink() { return virtualLink; }
    public void setVirtualLink(String virtualLink) { this.virtualLink = virtualLink; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Long getCreatedBy() { return createdBy; }
    public void setCreatedBy(Long createdBy) { this.createdBy = createdBy; }

    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Long getAttendeeCount() { return attendeeCount; }
    public void setAttendeeCount(Long attendeeCount) { this.attendeeCount = attendeeCount; }

    public String getUserRSVPStatus() { return userRSVPStatus; }
    public void setUserRSVPStatus(String userRSVPStatus) { this.userRSVPStatus = userRSVPStatus; }
}
