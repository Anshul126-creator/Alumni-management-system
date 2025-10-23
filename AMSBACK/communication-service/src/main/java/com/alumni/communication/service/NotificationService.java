package com.alumni.communication.service;

import com.alumni.communication.entity.Notification;
import com.alumni.communication.repository.NotificationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(Long userId, String title, String message, Notification.NotificationType type) {
        Notification notification = new Notification(userId, title, message, type);
        return notificationRepository.save(notification);
    }

    public void createMessageNotification(Long receiverId, Long senderId) {
        createNotification(
                receiverId,
                "New Message",
                "You have received a new message",
                Notification.NotificationType.MESSAGE
        );
    }

    public void createMentorshipRequestNotification(Long mentorId, Long menteeId) {
        createNotification(
                mentorId,
                "New Mentorship Request",
                "You have received a new mentorship request",
                Notification.NotificationType.MENTORSHIP_REQUEST
        );
    }

    public void createMentorshipAcceptedNotification(Long menteeId, Long mentorId) {
        createNotification(
                menteeId,
                "Mentorship Request Accepted",
                "Your mentorship request has been accepted",
                Notification.NotificationType.MENTORSHIP_ACCEPTED
        );
    }

    public void createMentorshipDeclinedNotification(Long menteeId, Long mentorId) {
        createNotification(
                menteeId,
                "Mentorship Request Declined",
                "Your mentorship request has been declined",
                Notification.NotificationType.MENTORSHIP_DECLINED
        );
    }

    public Page<Notification> getUserNotifications(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
    }

    public Long getUnreadNotificationCount(Long userId) {
        return notificationRepository.countUnreadNotifications(userId);
    }

    public void markNotificationAsRead(Long notificationId, Long userId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        
        if (notification.getUserId().equals(userId)) {
            notification.setIsRead(true);
            notificationRepository.save(notification);
        }
    }

    public void markAllNotificationsAsRead(Long userId) {
        Page<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(
                userId, PageRequest.of(0, Integer.MAX_VALUE));
        
        notifications.getContent().forEach(notification -> {
            if (!notification.getIsRead()) {
                notification.setIsRead(true);
                notificationRepository.save(notification);
            }
        });
    }
}
