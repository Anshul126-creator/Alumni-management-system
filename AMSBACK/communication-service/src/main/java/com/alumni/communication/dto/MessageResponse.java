package com.alumni.communication.dto;

import com.alumni.communication.entity.Message;

import java.time.LocalDateTime;

public class MessageResponse {
    private Long id;
    private Long senderId;
    private Long receiverId;
    private String content;
    private String messageType;
    private Boolean isRead;
    private Long replyToMessageId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor from Message entity
    public MessageResponse(Message message) {
        this.id = message.getId();
        this.senderId = message.getSenderId();
        this.receiverId = message.getReceiverId();
        this.content = message.getContent();
        this.messageType = message.getMessageType() != null ? message.getMessageType().toString() : null;
        this.isRead = message.getIsRead();
        this.replyToMessageId = message.getReplyToMessageId();
        this.createdAt = message.getCreatedAt();
        this.updatedAt = message.getUpdatedAt();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSenderId() { return senderId; }
    public void setSenderId(Long senderId) { this.senderId = senderId; }

    public Long getReceiverId() { return receiverId; }
    public void setReceiverId(Long receiverId) { this.receiverId = receiverId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getMessageType() { return messageType; }
    public void setMessageType(String messageType) { this.messageType = messageType; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

    public Long getReplyToMessageId() { return replyToMessageId; }
    public void setReplyToMessageId(Long replyToMessageId) { this.replyToMessageId = replyToMessageId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
