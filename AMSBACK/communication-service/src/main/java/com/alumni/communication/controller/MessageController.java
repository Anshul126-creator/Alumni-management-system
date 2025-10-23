package com.alumni.communication.controller;

import com.alumni.communication.dto.MessageRequest;
import com.alumni.communication.dto.MessageResponse;
import com.alumni.communication.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<MessageResponse> sendMessage(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody MessageRequest request) {
        try {
            MessageResponse response = messageService.sendMessage(userId, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<MessageResponse>> getUserMessages(
            @RequestHeader("X-User-Id") Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<MessageResponse> messages = messageService.getUserMessages(userId, page, size);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/conversation/{otherUserId}")
    public ResponseEntity<List<MessageResponse>> getConversation(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long otherUserId) {
        List<MessageResponse> messages = messageService.getConversation(userId, otherUserId);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/partners")
    public ResponseEntity<List<Long>> getConversationPartners(@RequestHeader("X-User-Id") Long userId) {
        List<Long> partners = messageService.getConversationPartners(userId);
        return ResponseEntity.ok(partners);
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadMessageCount(@RequestHeader("X-User-Id") Long userId) {
        Long count = messageService.getUnreadMessageCount(userId);
        return ResponseEntity.ok(count);
    }

    @PutMapping("/{messageId}/read")
    public ResponseEntity<Void> markMessageAsRead(
            @PathVariable Long messageId,
            @RequestHeader("X-User-Id") Long userId) {
        try {
            messageService.markMessageAsRead(messageId, userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/conversation/{otherUserId}/read")
    public ResponseEntity<Void> markConversationAsRead(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long otherUserId) {
        messageService.markConversationAsRead(userId, otherUserId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<Void> deleteMessage(
            @PathVariable Long messageId,
            @RequestHeader("X-User-Id") Long userId) {
        try {
            messageService.deleteMessage(messageId, userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
