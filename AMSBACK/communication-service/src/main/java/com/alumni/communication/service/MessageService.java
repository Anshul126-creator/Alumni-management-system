package com.alumni.communication.service;

import com.alumni.communication.dto.MessageRequest;
import com.alumni.communication.dto.MessageResponse;
import com.alumni.communication.entity.Message;
import com.alumni.communication.repository.MessageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final NotificationService notificationService;

    public MessageService(MessageRepository messageRepository, NotificationService notificationService) {
        this.messageRepository = messageRepository;
        this.notificationService = notificationService;
    }

    public MessageResponse sendMessage(Long senderId, MessageRequest request) {
        Message message = new Message(senderId, request.getReceiverId(), request.getContent());
        
        if (request.getMessageType() != null) {
            message.setMessageType(Message.MessageType.valueOf(request.getMessageType().toUpperCase()));
        }
        
        message.setReplyToMessageId(request.getReplyToMessageId());
        
        Message savedMessage = messageRepository.save(message);
        
        // Send notification to receiver
        notificationService.createMessageNotification(request.getReceiverId(), senderId);
        
        return new MessageResponse(savedMessage);
    }

    public Page<MessageResponse> getUserMessages(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Message> messages = messageRepository.findUserMessages(userId, pageable);
        return messages.map(MessageResponse::new);
    }

    public List<MessageResponse> getConversation(Long userId, Long otherUserId) {
        List<Message> messages = messageRepository.findConversation(userId, otherUserId);
        return messages.stream()
                .map(MessageResponse::new)
                .collect(Collectors.toList());
    }

    public List<Long> getConversationPartners(Long userId) {
        return messageRepository.findConversationPartners(userId);
    }

    public Long getUnreadMessageCount(Long userId) {
        return messageRepository.countUnreadMessages(userId);
    }

    @Transactional
    public void markMessageAsRead(Long messageId, Long userId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        
        if (message.getReceiverId().equals(userId)) {
            message.setIsRead(true);
            messageRepository.save(message);
        }
    }

    @Transactional
    public void markConversationAsRead(Long userId, Long otherUserId) {
        List<Message> messages = messageRepository.findConversation(userId, otherUserId);
        messages.stream()
                .filter(m -> m.getReceiverId().equals(userId) && !m.getIsRead())
                .forEach(m -> {
                    m.setIsRead(true);
                    messageRepository.save(m);
                });
    }

    @Transactional
    public void deleteMessage(Long messageId, Long userId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        
        if (message.getSenderId().equals(userId)) {
            message.setIsDeletedBySender(true);
        } else if (message.getReceiverId().equals(userId)) {
            message.setIsDeletedByReceiver(true);
        } else {
            throw new RuntimeException("Not authorized to delete this message");
        }
        
        // If both users have deleted the message, remove it completely
        if (message.getIsDeletedBySender() && message.getIsDeletedByReceiver()) {
            messageRepository.delete(message);
        } else {
            messageRepository.save(message);
        }
    }
}
