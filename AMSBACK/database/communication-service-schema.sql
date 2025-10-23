-- Alumni Management System - Communication Service Database Schema
-- Database: alumni_communication_db

CREATE DATABASE IF NOT EXISTS alumni_communication_db;
USE alumni_communication_db;

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    message_type ENUM('TEXT', 'IMAGE', 'FILE', 'LINK') DEFAULT 'TEXT',
    is_read BOOLEAN DEFAULT FALSE,
    is_deleted_by_sender BOOLEAN DEFAULT FALSE,
    is_deleted_by_receiver BOOLEAN DEFAULT FALSE,
    reply_to_message_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_sender_id (sender_id),
    INDEX idx_receiver_id (receiver_id),
    INDEX idx_conversation (sender_id, receiver_id),
    INDEX idx_created_at (created_at),
    INDEX idx_is_read (is_read)
);

-- Mentorship requests table
CREATE TABLE IF NOT EXISTS mentorship_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    mentee_id BIGINT NOT NULL,
    mentor_id BIGINT NOT NULL,
    message TEXT NOT NULL,
    goals TEXT,
    status ENUM('PENDING', 'ACCEPTED', 'DECLINED', 'CANCELLED') DEFAULT 'PENDING',
    response_message TEXT,
    responded_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_mentee_id (mentee_id),
    INDEX idx_mentor_id (mentor_id),
    INDEX idx_status (status)
);

-- Mentorship sessions table
CREATE TABLE IF NOT EXISTS mentorship_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    mentorship_request_id BIGINT NOT NULL,
    mentee_id BIGINT NOT NULL,
    mentor_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    scheduled_date DATETIME NOT NULL,
    duration_minutes INT DEFAULT 60,
    session_type ENUM('VIDEO_CALL', 'PHONE_CALL', 'IN_PERSON', 'CHAT') DEFAULT 'VIDEO_CALL',
    meeting_link VARCHAR(500),
    status ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW') DEFAULT 'SCHEDULED',
    notes TEXT,
    feedback TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_mentorship_request_id (mentorship_request_id),
    INDEX idx_mentee_id (mentee_id),
    INDEX idx_mentor_id (mentor_id),
    INDEX idx_scheduled_date (scheduled_date),
    INDEX idx_status (status)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('MESSAGE', 'MENTORSHIP_REQUEST', 'MENTORSHIP_ACCEPTED', 'MENTORSHIP_DECLINED', 
              'SESSION_SCHEDULED', 'SESSION_REMINDER', 'EVENT_INVITATION', 'EVENT_UPDATE', 
              'SYSTEM_ANNOUNCEMENT', 'PROFILE_UPDATE') NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    related_entity_id BIGINT,
    related_entity_type VARCHAR(50),
    action_url VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
);
