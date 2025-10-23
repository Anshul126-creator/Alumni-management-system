package com.alumni.management.controller;

import com.alumni.management.dto.AlumniRequest;
import com.alumni.management.dto.AlumniResponse;
import com.alumni.management.service.AlumniService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumni")
@CrossOrigin(origins = "http://localhost:3000")
public class AlumniController {

    private final AlumniService alumniService;

    public AlumniController(AlumniService alumniService) {
        this.alumniService = alumniService;
    }

    @PostMapping("/profile")
    public ResponseEntity<AlumniResponse> createProfile(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody AlumniRequest request) {
        try {
            AlumniResponse response = alumniService.createAlumniProfile(userId, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<AlumniResponse> updateProfile(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody AlumniRequest request) {
        try {
            AlumniResponse response = alumniService.updateAlumniProfile(userId, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<AlumniResponse> getProfile(@RequestHeader("X-User-Id") Long userId) {
        try {
            AlumniResponse response = alumniService.getAlumniProfile(userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumniResponse> getAlumniById(@PathVariable Long id) {
        try {
            AlumniResponse response = alumniService.getAlumniById(id);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Page<AlumniResponse>> searchAlumni(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer graduationYear,
            @RequestParam(required = false) String industry,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Boolean isMentorAvailable,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "firstName") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        Page<AlumniResponse> alumni = alumniService.searchAlumni(
                search, graduationYear, industry, location, isMentorAvailable,
                page, size, sortBy, sortDir);
        return ResponseEntity.ok(alumni);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AlumniResponse>> getAllAlumni() {
        List<AlumniResponse> alumni = alumniService.getAllAlumni();
        return ResponseEntity.ok(alumni);
    }

    @GetMapping("/mentors")
    public ResponseEntity<List<AlumniResponse>> getMentors() {
        List<AlumniResponse> mentors = alumniService.getMentors();
        return ResponseEntity.ok(mentors);
    }

    @GetMapping("/job-seekers")
    public ResponseEntity<List<AlumniResponse>> getJobSeekers() {
        List<AlumniResponse> jobSeekers = alumniService.getJobSeekers();
        return ResponseEntity.ok(jobSeekers);
    }

    @GetMapping("/recruiters")
    public ResponseEntity<List<AlumniResponse>> getRecruiters() {
        List<AlumniResponse> recruiters = alumniService.getRecruiters();
        return ResponseEntity.ok(recruiters);
    }

    @GetMapping("/filters/industries")
    public ResponseEntity<List<String>> getIndustries() {
        List<String> industries = alumniService.getIndustries();
        return ResponseEntity.ok(industries);
    }

    @GetMapping("/filters/locations")
    public ResponseEntity<List<String>> getLocations() {
        List<String> locations = alumniService.getLocations();
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/filters/graduation-years")
    public ResponseEntity<List<Integer>> getGraduationYears() {
        List<Integer> years = alumniService.getGraduationYears();
        return ResponseEntity.ok(years);
    }

    @DeleteMapping("/profile")
    public ResponseEntity<Void> deleteProfile(@RequestHeader("X-User-Id") Long userId) {
        try {
            alumniService.deleteAlumniProfile(userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
