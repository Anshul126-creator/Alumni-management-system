package com.alumni.communication.service;

import com.alumni.communication.dto.MentorshipRequestDto;
import com.alumni.communication.dto.MentorshipResponseDto;
import com.alumni.communication.entity.MentorshipRequest;
import com.alumni.communication.repository.MentorshipRequestRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MentorshipService {

    private final MentorshipRequestRepository mentorshipRequestRepository;
    private final NotificationService notificationService;

    public MentorshipService(MentorshipRequestRepository mentorshipRequestRepository, 
                           NotificationService notificationService) {
        this.mentorshipRequestRepository = mentorshipRequestRepository;
        this.notificationService = notificationService;
    }

    public MentorshipRequest sendMentorshipRequest(Long menteeId, MentorshipRequestDto request) {
        MentorshipRequest mentorshipRequest = new MentorshipRequest(
                menteeId, 
                request.getMentorId(), 
                request.getMessage(), 
                request.getGoals()
        );
        
        MentorshipRequest savedRequest = mentorshipRequestRepository.save(mentorshipRequest);
        
        // Send notification to mentor
        notificationService.createMentorshipRequestNotification(request.getMentorId(), menteeId);
        
        return savedRequest;
    }

    public MentorshipRequest respondToMentorshipRequest(Long requestId, Long mentorId, MentorshipResponseDto response) {
        MentorshipRequest request = mentorshipRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Mentorship request not found"));
        
        if (!request.getMentorId().equals(mentorId)) {
            throw new RuntimeException("Not authorized to respond to this request");
        }
        
        request.setStatus(MentorshipRequest.RequestStatus.valueOf(response.getStatus().toUpperCase()));
        request.setResponseMessage(response.getResponseMessage());
        request.setRespondedAt(LocalDateTime.now());
        
        MentorshipRequest updatedRequest = mentorshipRequestRepository.save(request);
        
        // Send notification to mentee
        if (request.getStatus() == MentorshipRequest.RequestStatus.ACCEPTED) {
            notificationService.createMentorshipAcceptedNotification(request.getMenteeId(), mentorId);
        } else if (request.getStatus() == MentorshipRequest.RequestStatus.DECLINED) {
            notificationService.createMentorshipDeclinedNotification(request.getMenteeId(), mentorId);
        }
        
        return updatedRequest;
    }

    public List<MentorshipRequest> getMentorshipRequestsForMentor(Long mentorId) {
        return mentorshipRequestRepository.findByMentorId(mentorId);
    }

    public List<MentorshipRequest> getMentorshipRequestsForMentee(Long menteeId) {
        return mentorshipRequestRepository.findByMenteeId(menteeId);
    }

    public List<MentorshipRequest> getPendingMentorshipRequests(Long mentorId) {
        return mentorshipRequestRepository.findByMentorIdAndStatus(mentorId, MentorshipRequest.RequestStatus.PENDING);
    }

    public List<MentorshipRequest> getAcceptedMentorships(Long userId) {
        List<MentorshipRequest> asMentor = mentorshipRequestRepository.findByMentorIdAndStatus(userId, MentorshipRequest.RequestStatus.ACCEPTED);
        List<MentorshipRequest> asMentee = mentorshipRequestRepository.findByMenteeIdAndStatus(userId, MentorshipRequest.RequestStatus.ACCEPTED);
        asMentor.addAll(asMentee);
        return asMentor;
    }
}
