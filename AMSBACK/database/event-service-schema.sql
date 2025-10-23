-- Alumni Management System - Event Service Database Schema
-- Database: alumni_events_db

CREATE DATABASE IF NOT EXISTS alumni_events_db;
USE alumni_events_db;

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATETIME NOT NULL,
    end_date DATETIME,
    location VARCHAR(200),
    venue VARCHAR(200),
    event_type ENUM('NETWORKING', 'WORKSHOP', 'SEMINAR', 'REUNION', 'CAREER_FAIR', 'SOCIAL', 'FUNDRAISING', 'WEBINAR', 'CONFERENCE', 'OTHER'),
    status ENUM('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED') DEFAULT 'UPCOMING',
    max_attendees INT,
    registration_deadline DATETIME,
    is_virtual BOOLEAN DEFAULT FALSE,
    virtual_link VARCHAR(500),
    image_url VARCHAR(200),
    created_by BIGINT NOT NULL,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_event_date (event_date),
    INDEX idx_event_type (event_type),
    INDEX idx_status (status),
    INDEX idx_created_by (created_by),
    INDEX idx_is_public (is_public),
    INDEX idx_is_virtual (is_virtual)
);

-- Event tags table
CREATE TABLE IF NOT EXISTS event_tags (
    event_id BIGINT NOT NULL,
    tag VARCHAR(50) NOT NULL,
    
    PRIMARY KEY (event_id, tag),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Event RSVPs table
CREATE TABLE IF NOT EXISTS event_rsvps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    status ENUM('ATTENDING', 'MAYBE', 'NOT_ATTENDING') NOT NULL,
    notes TEXT,
    attended BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_event_user (event_id, user_id),
    INDEX idx_event_id (event_id),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
);
