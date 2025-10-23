package com.alumni.management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class AlumniRequest {
    @NotBlank
    @Size(max = 50)
    private String firstName;

    @NotBlank
    @Size(max = 50)
    private String lastName;

    @Email
    @Size(max = 100)
    private String email;

    @Size(max = 20)
    private String phone;

    @Size(max = 100)
    private String degree;

    @Size(max = 100)
    private String major;

    private Integer graduationYear;

    @Size(max = 100)
    private String currentCompany;

    @Size(max = 100)
    private String currentPosition;

    @Size(max = 50)
    private String industry;

    @Size(max = 100)
    private String location;

    @Size(max = 1000)
    private String bio;

    private List<String> skills;

    @Size(max = 200)
    private String linkedinUrl;

    @Size(max = 200)
    private String githubUrl;

    @Size(max = 200)
    private String websiteUrl;

    @Size(max = 200)
    private String profileImageUrl;

    private Boolean isMentorAvailable;
    private Boolean isJobSeeker;
    private Boolean isRecruiter;
    private String privacyLevel;

    // Constructors
    public AlumniRequest() {}

    // Getters and Setters
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
}
