package com.alumni.communication.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "sender_id")
    private Long senderId;

    @NotNull
    @Column(name = "receiver_id")
    private Long receiverId;

    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "message_type")
    @Enumerated(EnumType.STRING)
    private MessageType messageType = MessageType.TEXT;

    @Column(name = "is_read")
    private Boolean isRead = false;

    @Column(name = "is_deleted_by_sender")
    private Boolean isDeletedBySender = false;

    @Column(name = "is_deleted_by_receiver")
    private Boolean isDeletedByReceiver = false;

    @Column(name = "reply_to_message_id")
    private Long replyToMessageId;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Message() {}

    public Message(Long senderId, Long receiverId, String content) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
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

    public MessageType getMessageType() { return messageType; }
    public void setMessageType(MessageType messageType) { this.messageType = messageType; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

    public Boolean getIsDeletedBySender() { return isDeletedBySender; }
    public void setIsDeletedBySender(Boolean isDeletedBySender) { this.isDeletedBySender = isDeletedBySender; }

    public Boolean getIsDeletedByReceiver() { return isDeletedByReceiver; }
    public void setIsDeletedByReceiver(Boolean isDeletedByReceiver) { this.isDeletedByReceiver = isDeletedByReceiver; }

    public Long getReplyToMessageId() { return replyToMessageId; }
    public void setReplyToMessageId(Long replyToMessageId) { this.replyToMessageId = replyToMessageId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public enum MessageType {
        TEXT, IMAGE, FILE, LINK
    }
}
