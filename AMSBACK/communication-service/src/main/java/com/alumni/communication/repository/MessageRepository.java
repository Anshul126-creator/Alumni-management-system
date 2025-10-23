package com.alumni.communication.repository;

import com.alumni.communication.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    
    @Query("SELECT m FROM Message m WHERE " +
           "(m.senderId = :userId AND m.isDeletedBySender = false) OR " +
           "(m.receiverId = :userId AND m.isDeletedByReceiver = false) " +
           "ORDER BY m.createdAt DESC")
    Page<Message> findUserMessages(@Param("userId") Long userId, Pageable pageable);
    
    @Query("SELECT m FROM Message m WHERE " +
           "((m.senderId = :user1 AND m.receiverId = :user2 AND m.isDeletedBySender = false) OR " +
           "(m.senderId = :user2 AND m.receiverId = :user1 AND m.isDeletedByReceiver = false)) " +
           "ORDER BY m.createdAt ASC")
    List<Message> findConversation(@Param("user1") Long user1, @Param("user2") Long user2);
    
    @Query("SELECT COUNT(m) FROM Message m WHERE m.receiverId = :userId AND m.isRead = false AND m.isDeletedByReceiver = false")
    Long countUnreadMessages(@Param("userId") Long userId);
    
    @Query("SELECT DISTINCT CASE " +
           "WHEN m.senderId = :userId THEN m.receiverId " +
           "ELSE m.senderId END " +
           "FROM Message m WHERE m.senderId = :userId OR m.receiverId = :userId")
    List<Long> findConversationPartners(@Param("userId") Long userId);
}
