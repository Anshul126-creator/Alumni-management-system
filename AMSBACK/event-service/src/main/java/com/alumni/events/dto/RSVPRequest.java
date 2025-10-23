package com.alumni.events.dto;

import jakarta.validation.constraints.NotNull;

public class RSVPRequest {
    @NotNull
    private String status;

    private String notes;

    // Constructors
    public RSVPRequest() {}

    public RSVPRequest(String status, String notes) {
        this.status = status;
        this.notes = notes;
    }

    // Getters and Setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
