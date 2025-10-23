package com.alumni.communication.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class MentorshipResponseDto {
    @NotNull
    private String status;

    @NotBlank
    private String responseMessage;

    // Constructors
    public MentorshipResponseDto() {}

    // Getters and Setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getResponseMessage() { return responseMessage; }
    public void setResponseMessage(String responseMessage) { this.responseMessage = responseMessage; }
}
