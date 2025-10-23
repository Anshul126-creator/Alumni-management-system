package com.alumni.communication.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class MentorshipRequestDto {
    @NotNull
    private Long mentorId;

    @NotBlank
    private String message;

    private String goals;

    // Constructors
    public MentorshipRequestDto() {}

    // Getters and Setters
    public Long getMentorId() { return mentorId; }
    public void setMentorId(Long mentorId) { this.mentorId = mentorId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getGoals() { return goals; }
    public void setGoals(String goals) { this.goals = goals; }
}
