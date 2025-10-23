package com.alumni.management.dto;

import com.alumni.management.entity.Alumni;

import java.time.LocalDateTime;
import java.util.List;

public class AlumniResponse {
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String degree;
    private String major;
    private Integer graduationYear;
    private String currentCompany;
    private String currentPosition;
    private String industry;
    private String location;
    private String bio;
    private List<String> skills;
    private String linkedinUrl;
    private String githubUrl;
    private String websiteUrl;
    private String profileImageUrl;
    private Boolean isMentorAvailable;
    private Boolean isJobSeeker;
    private Boolean isRecruiter;
    private String privacyLevel;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor from Alumni entity
    public AlumniResponse(Alumni alumni) {
        this.id = alumni.getId();
        this.userId = alumni.getUserId();
        this.firstName = alumni.getFirstName();
        this.lastName = alumni.getLastName();
        this.email = alumni.getEmail();
        this.phone = alumni.getPhone();
        this.degree = alumni.getDegree();
        this.major = alumni.getMajor();
        this.graduationYear = alumni.getGraduationYear();
        this.currentCompany = alumni.getCurrentCompany();
        this.currentPosition = alumni.getCurrentPosition();
        this.industry = alumni.getIndustry();
        this.location = alumni.getLocation();
        this.bio = alumni.getBio();
        this.skills = alumni.getSkills();
        this.linkedinUrl = alumni.getLinkedinUrl();
        this.githubUrl = alumni.getGithubUrl();
        this.websiteUrl = alumni.getWebsiteUrl();
        this.profileImageUrl = alumni.getProfileImageUrl();
        this.isMentorAvailable = alumni.getIsMentorAvailable();
        this.isJobSeeker = alumni.getIsJobSeeker();
        this.isRecruiter = alumni.getIsRecruiter();
        this.privacyLevel = alumni.getPrivacyLevel().toString();
        this.createdAt = alumni.getCreatedAt();
        this.updatedAt = alumni.getUpdatedAt();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public String getMajor() { return major; }
    public void setMajor(String major) { this.major = major; }

    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }

    public String getCurrentCompany() { return currentCompany; }
    public void setCurrentCompany(String currentCompany) { this.currentCompany = currentCompany; }

    public String getCurrentPosition() { return currentPosition; }
    public void setCurrentPosition(String currentPosition) { this.currentPosition = currentPosition; }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getWebsiteUrl() { return websiteUrl; }
    public void setWebsiteUrl(String websiteUrl) { this.websiteUrl = websiteUrl; }

    public String getProfileImageUrl() { return profileImageUrl; }
    public void setProfileImageUrl(String profileImageUrl) { this.profileImageUrl = profileImageUrl; }

    public Boolean getIsMentorAvailable() { return isMentorAvailable; }
    public void setIsMentorAvailable(Boolean isMentorAvailable) { this.isMentorAvailable = isMentorAvailable; }

    public Boolean getIsJobSeeker() { return isJobSeeker; }
    public void setIsJobSeeker(Boolean isJobSeeker) { this.isJobSeeker = isJobSeeker; }

    public Boolean getIsRecruiter() { return isRecruiter; }
    public void setIsRecruiter(Boolean isRecruiter) { this.isRecruiter = isRecruiter; }

    public String getPrivacyLevel() { return privacyLevel; }
    public void setPrivacyLevel(String privacyLevel) { this.privacyLevel = privacyLevel; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
