-- Alumni Management System - Alumni Service Database Schema
-- Database: alumni_management_db

CREATE DATABASE IF NOT EXISTS alumni_management_db;
USE alumni_management_db;

-- Alumni table
CREATE TABLE IF NOT EXISTS alumni (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    degree VARCHAR(100),
    major VARCHAR(100),
    graduation_year INT,
    current_company VARCHAR(100),
    current_position VARCHAR(100),
    industry VARCHAR(50),
    location VARCHAR(100),
    bio TEXT,
    linkedin_url VARCHAR(200),
    github_url VARCHAR(200),
    website_url VARCHAR(200),
    profile_image_url VARCHAR(200),
    is_mentor_available BOOLEAN DEFAULT FALSE,
    is_job_seeker BOOLEAN DEFAULT FALSE,
    is_recruiter BOOLEAN DEFAULT FALSE,
    privacy_level ENUM('PUBLIC', 'ALUMNI_ONLY', 'PRIVATE') DEFAULT 'PUBLIC',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_user_id (user_id),
    INDEX idx_graduation_year (graduation_year),
    INDEX idx_industry (industry),
    INDEX idx_location (location),
    INDEX idx_mentor_available (is_mentor_available),
    INDEX idx_job_seeker (is_job_seeker),
    INDEX idx_recruiter (is_recruiter)
);

-- Alumni skills table
CREATE TABLE IF NOT EXISTS alumni_skills (
    alumni_id BIGINT NOT NULL,
    skill VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (alumni_id, skill),
    FOREIGN KEY (alumni_id) REFERENCES alumni(id) ON DELETE CASCADE
);
