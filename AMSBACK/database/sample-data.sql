-- Alumni Management System - Sample Data
-- Run this after creating all schemas

-- Sample users for auth service
USE alumni_auth_db;

INSERT INTO users (username, email, password, first_name, last_name, role) VALUES
('admin', 'admin@university.edu', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9b2.1seJ0CPJbRy', 'Admin', 'User', 'ADMIN'),
('john.doe', 'john.doe@email.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9b2.1seJ0CPJbRy', 'John', 'Doe', 'ALUMNI'),
('jane.smith', 'jane.smith@email.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9b2.1seJ0CPJbRy', 'Jane', 'Smith', 'ALUMNI'),
('mike.johnson', 'mike.johnson@email.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9b2.1seJ0CPJbRy', 'Mike', 'Johnson', 'ALUMNI'),
('sarah.wilson', 'sarah.wilson@email.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9b2.1seJ0CPJbRy', 'Sarah', 'Wilson', 'ALUMNI');

-- Sample alumni profiles
USE alumni_management_db;

INSERT INTO alumni (user_id, first_name, last_name, email, phone, degree, major, graduation_year, current_company, current_position, industry, location, bio, linkedin_url, is_mentor_available, is_job_seeker) VALUES
(2, 'John', 'Doe', 'john.doe@email.com', '+1-555-0101', 'Bachelor of Science', 'Computer Science', 2020, 'Tech Corp', 'Software Engineer', 'Technology', 'San Francisco, CA', 'Passionate software engineer with 4 years of experience in full-stack development.', 'https://linkedin.com/in/johndoe', TRUE, FALSE),
(3, 'Jane', 'Smith', 'jane.smith@email.com', '+1-555-0102', 'Master of Business Administration', 'Marketing', 2018, 'Marketing Solutions Inc', 'Marketing Director', 'Marketing', 'New York, NY', 'Experienced marketing professional specializing in digital marketing strategies.', 'https://linkedin.com/in/janesmith', TRUE, FALSE),
(4, 'Mike', 'Johnson', 'mike.johnson@email.com', '+1-555-0103', 'Bachelor of Engineering', 'Mechanical Engineering', 2019, 'Engineering Firm LLC', 'Project Manager', 'Engineering', 'Chicago, IL', 'Mechanical engineer with expertise in project management and team leadership.', 'https://linkedin.com/in/mikejohnson', FALSE, TRUE),
(5, 'Sarah', 'Wilson', 'sarah.wilson@email.com', '+1-555-0104', 'Bachelor of Arts', 'Graphic Design', 2021, 'Creative Agency', 'Senior Designer', 'Design', 'Los Angeles, CA', 'Creative designer passionate about user experience and visual storytelling.', 'https://linkedin.com/in/sarahwilson', TRUE, FALSE);

-- Sample alumni skills
INSERT INTO alumni_skills (alumni_id, skill) VALUES
(1, 'JavaScript'), (1, 'React'), (1, 'Node.js'), (1, 'Python'),
(2, 'Digital Marketing'), (2, 'SEO'), (2, 'Content Strategy'), (2, 'Analytics'),
(3, 'Project Management'), (3, 'AutoCAD'), (3, 'Team Leadership'), (3, 'Quality Assurance'),
(4, 'Adobe Creative Suite'), (4, 'UI/UX Design'), (4, 'Figma'), (4, 'Branding');

-- Sample events
USE alumni_events_db;

INSERT INTO events (title, description, event_date, end_date, location, venue, event_type, max_attendees, registration_deadline, is_virtual, created_by, is_public) VALUES
('Annual Alumni Networking Night', 'Join us for an evening of networking with fellow alumni from all graduation years.', '2024-03-15 18:00:00', '2024-03-15 21:00:00', 'San Francisco, CA', 'Grand Hotel Ballroom', 'NETWORKING', 200, '2024-03-10 23:59:59', FALSE, 1, TRUE),
('Career Development Workshop', 'Learn essential skills for career advancement in the modern workplace.', '2024-03-20 14:00:00', '2024-03-20 17:00:00', 'Virtual', 'Zoom Meeting', 'WORKSHOP', 100, '2024-03-18 23:59:59', TRUE, 1, TRUE),
('Tech Industry Reunion', 'Special reunion for alumni working in the technology sector.', '2024-04-05 19:00:00', '2024-04-05 22:00:00', 'Seattle, WA', 'Tech Hub Conference Center', 'REUNION', 150, '2024-04-01 23:59:59', FALSE, 1, TRUE);

-- Sample event tags
INSERT INTO event_tags (event_id, tag) VALUES
(1, 'networking'), (1, 'professional'), (1, 'social'),
(2, 'career'), (2, 'workshop'), (2, 'skills'),
(3, 'technology'), (3, 'reunion'), (3, 'industry');

-- Sample RSVPs
INSERT INTO event_rsvps (event_id, user_id, status, notes) VALUES
(1, 2, 'ATTENDING', 'Looking forward to meeting everyone!'),
(1, 3, 'ATTENDING', 'Excited to network with fellow alumni.'),
(2, 2, 'ATTENDING', 'Great topic for career growth.'),
(2, 4, 'MAYBE', 'Will try to attend if schedule permits.'),
(3, 2, 'ATTENDING', 'Perfect for tech professionals.');

-- Sample communication data
USE alumni_communication_db;

-- Sample messages
INSERT INTO messages (sender_id, receiver_id, content, message_type, is_read) VALUES
(2, 3, 'Hi Jane! I saw your profile and would love to connect. I\'m also in the tech industry.', 'TEXT', FALSE),
(3, 2, 'Hi John! Thanks for reaching out. I\'d be happy to connect and share experiences.', 'TEXT', TRUE),
(4, 2, 'Hey John, I\'m looking for opportunities in software development. Any advice?', 'TEXT', FALSE);

-- Sample mentorship requests
INSERT INTO mentorship_requests (mentee_id, mentor_id, message, goals, status) VALUES
(4, 2, 'Hi John, I\'m a recent graduate looking to transition into software development. Would you be willing to mentor me?', 'Learn full-stack development and land my first software engineering job.', 'PENDING'),
(5, 3, 'Hi Jane, I\'m interested in learning more about digital marketing strategies. Could you mentor me?', 'Develop skills in digital marketing and grow my design business.', 'ACCEPTED');

-- Sample notifications
INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
(2, 'New Message', 'You have received a new message from Mike Johnson', 'MESSAGE', FALSE),
(2, 'Mentorship Request', 'Mike Johnson has sent you a mentorship request', 'MENTORSHIP_REQUEST', FALSE),
(3, 'New Message', 'You have received a new message from John Doe', 'MESSAGE', TRUE),
(4, 'Mentorship Request Accepted', 'Jane Smith has accepted your mentorship request', 'MENTORSHIP_ACCEPTED', FALSE);
