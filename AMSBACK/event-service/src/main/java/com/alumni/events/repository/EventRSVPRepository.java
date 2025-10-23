package com.alumni.events.repository;

import com.alumni.events.entity.EventRSVP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRSVPRepository extends JpaRepository<EventRSVP, Long> {
    Optional<EventRSVP> findByEventIdAndUserId(Long eventId, Long userId);
    
    List<EventRSVP> findByEventId(Long eventId);
    
    List<EventRSVP> findByUserId(Long userId);
    
    List<EventRSVP> findByEventIdAndStatus(Long eventId, EventRSVP.RSVPStatus status);
    
    @Query("SELECT COUNT(r) FROM EventRSVP r WHERE r.eventId = :eventId AND r.status = 'ATTENDING'")
    Long countAttendeesByEventId(@Param("eventId") Long eventId);
    
    void deleteByEventIdAndUserId(Long eventId, Long userId);
}
