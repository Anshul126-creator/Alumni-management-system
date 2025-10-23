package com.alumni.communication.controller;

import com.alumni.communication.dto.MentorshipRequestDto;
import com.alumni.communication.dto.MentorshipResponseDto;
import com.alumni.communication.entity.MentorshipRequest;
import com.alumni.communication.service.MentorshipService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentorship")
@CrossOrigin(origins = "http://localhost:3000")
public class MentorshipController {

    private final MentorshipService mentorshipService;

    public MentorshipController(MentorshipService mentorshipService) {
        this.mentorshipService = mentorshipService;
    }

    @PostMapping("/request")
    public ResponseEntity<MentorshipRequest> sendMentorshipRequest(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody MentorshipRequestDto request) {
        try {
            MentorshipRequest response = mentorshipService.sendMentorshipRequest(userId, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/request/{requestId}/respond")
    public ResponseEntity<MentorshipRequest> respondToMentorshipRequest(
            @PathVariable Long requestId,
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody MentorshipResponseDto response) {
        try {
            MentorshipRequest updatedRequest = mentorshipService.respondToMentorshipRequest(requestId, userId, response);
            return ResponseEntity.ok(updatedRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/requests/as-mentor")
    public ResponseEntity<List<MentorshipRequest>> getMentorshipRequestsForMentor(@RequestHeader("X-User-Id") Long userId) {
        List<MentorshipRequest> requests = mentorshipService.getMentorshipRequestsForMentor(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/requests/as-mentee")
    public ResponseEntity<List<MentorshipRequest>> getMentorshipRequestsForMentee(@RequestHeader("X-User-Id") Long userId) {
        List<MentorshipRequest> requests = mentorshipService.getMentorshipRequestsForMentee(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/requests/pending")
    public ResponseEntity<List<MentorshipRequest>> getPendingMentorshipRequests(@RequestHeader("X-User-Id") Long userId) {
        List<MentorshipRequest> requests = mentorshipService.getPendingMentorshipRequests(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/active")
    public ResponseEntity<List<MentorshipRequest>> getAcceptedMentorships(@RequestHeader("X-User-Id") Long userId) {
        List<MentorshipRequest> mentorships = mentorshipService.getAcceptedMentorships(userId);
        return ResponseEntity.ok(mentorships);
    }
}
