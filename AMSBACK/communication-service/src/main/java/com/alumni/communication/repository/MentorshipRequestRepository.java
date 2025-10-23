package com.alumni.communication.repository;

import com.alumni.communication.entity.MentorshipRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorshipRequestRepository extends JpaRepository<MentorshipRequest, Long> {
    List<MentorshipRequest> findByMenteeId(Long menteeId);
    List<MentorshipRequest> findByMentorId(Long mentorId);
    List<MentorshipRequest> findByMentorIdAndStatus(Long mentorId, MentorshipRequest.RequestStatus status);
    List<MentorshipRequest> findByMenteeIdAndStatus(Long menteeId, MentorshipRequest.RequestStatus status);
}
