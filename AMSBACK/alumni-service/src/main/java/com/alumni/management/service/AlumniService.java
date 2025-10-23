package com.alumni.management.service;

import com.alumni.management.dto.AlumniRequest;
import com.alumni.management.dto.AlumniResponse;
import com.alumni.management.entity.Alumni;
import com.alumni.management.repository.AlumniRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlumniService {

    private final AlumniRepository alumniRepository;

    public AlumniService(AlumniRepository alumniRepository) {
        this.alumniRepository = alumniRepository;
    }

    public AlumniResponse createAlumniProfile(Long userId, AlumniRequest request) {
        Alumni alumni = new Alumni(userId, request.getFirstName(), request.getLastName(), request.getEmail());
        updateAlumniFromRequest(alumni, request);
        Alumni savedAlumni = alumniRepository.save(alumni);
        return new AlumniResponse(savedAlumni);
    }

    public AlumniResponse updateAlumniProfile(Long userId, AlumniRequest request) {
        Alumni alumni = alumniRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Alumni profile not found"));
        
        updateAlumniFromRequest(alumni, request);
        Alumni updatedAlumni = alumniRepository.save(alumni);
        return new AlumniResponse(updatedAlumni);
    }

    public AlumniResponse getAlumniProfile(Long userId) {
        Alumni alumni = alumniRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Alumni profile not found"));
        return new AlumniResponse(alumni);
    }

    public AlumniResponse getAlumniById(Long id) {
        Alumni alumni = alumniRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumni not found"));
        return new AlumniResponse(alumni);
    }

    public Page<AlumniResponse> searchAlumni(String search, Integer graduationYear, String industry, 
                                           String location, Boolean isMentorAvailable, 
                                           int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                   Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Alumni> alumniPage = alumniRepository.findAlumniWithFilters(
                search, graduationYear, industry, location, isMentorAvailable, pageable);
        
        return alumniPage.map(AlumniResponse::new);
    }

    public List<AlumniResponse> getAllAlumni() {
        return alumniRepository.findAll().stream()
                .map(AlumniResponse::new)
                .collect(Collectors.toList());
    }

    public List<AlumniResponse> getMentors() {
        return alumniRepository.findByIsMentorAvailableTrue().stream()
                .map(AlumniResponse::new)
                .collect(Collectors.toList());
    }

    public List<AlumniResponse> getJobSeekers() {
        return alumniRepository.findByIsJobSeekerTrue().stream()
                .map(AlumniResponse::new)
                .collect(Collectors.toList());
    }

    public List<AlumniResponse> getRecruiters() {
        return alumniRepository.findByIsRecruiterTrue().stream()
                .map(AlumniResponse::new)
                .collect(Collectors.toList());
    }

    public List<String> getIndustries() {
        return alumniRepository.findDistinctIndustries();
    }

    public List<String> getLocations() {
        return alumniRepository.findDistinctLocations();
    }

    public List<Integer> getGraduationYears() {
        return alumniRepository.findDistinctGraduationYears();
    }

    public void deleteAlumniProfile(Long userId) {
        Alumni alumni = alumniRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Alumni profile not found"));
        alumniRepository.delete(alumni);
    }

    private void updateAlumniFromRequest(Alumni alumni, AlumniRequest request) {
        alumni.setFirstName(request.getFirstName());
        alumni.setLastName(request.getLastName());
        alumni.setEmail(request.getEmail());
        alumni.setPhone(request.getPhone());
        alumni.setDegree(request.getDegree());
        alumni.setMajor(request.getMajor());
        alumni.setGraduationYear(request.getGraduationYear());
        alumni.setCurrentCompany(request.getCurrentCompany());
        alumni.setCurrentPosition(request.getCurrentPosition());
        alumni.setIndustry(request.getIndustry());
        alumni.setLocation(request.getLocation());
        alumni.setBio(request.getBio());
        alumni.setSkills(request.getSkills());
        alumni.setLinkedinUrl(request.getLinkedinUrl());
        alumni.setGithubUrl(request.getGithubUrl());
        alumni.setWebsiteUrl(request.getWebsiteUrl());
        alumni.setProfileImageUrl(request.getProfileImageUrl());
        alumni.setIsMentorAvailable(request.getIsMentorAvailable());
        alumni.setIsJobSeeker(request.getIsJobSeeker());
        alumni.setIsRecruiter(request.getIsRecruiter());
        
        if (request.getPrivacyLevel() != null) {
            alumni.setPrivacyLevel(Alumni.PrivacyLevel.valueOf(request.getPrivacyLevel().toUpperCase()));
        }
    }
}
