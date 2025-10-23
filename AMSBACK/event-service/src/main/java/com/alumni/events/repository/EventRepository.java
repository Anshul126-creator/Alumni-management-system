package com.alumni.events.repository;

import com.alumni.events.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    @Query("SELECT e FROM Event e WHERE " +
           "(:search IS NULL OR " +
           "LOWER(e.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.location) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:eventType IS NULL OR e.eventType = :eventType) AND " +
           "(:status IS NULL OR e.status = :status) AND " +
           "(:startDate IS NULL OR e.eventDate >= :startDate) AND " +
           "(:endDate IS NULL OR e.eventDate <= :endDate) AND " +
           "(:isVirtual IS NULL OR e.isVirtual = :isVirtual) AND " +
           "e.isPublic = true")
    Page<Event> findEventsWithFilters(
            @Param("search") String search,
            @Param("eventType") Event.EventType eventType,
            @Param("status") Event.EventStatus status,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("isVirtual") Boolean isVirtual,
            Pageable pageable
    );

    List<Event> findByCreatedBy(Long createdBy);
    
    List<Event> findByEventDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    List<Event> findByEventTypeAndStatus(Event.EventType eventType, Event.EventStatus status);
    
    @Query("SELECT e FROM Event e WHERE e.eventDate > :now AND e.status = 'UPCOMING' ORDER BY e.eventDate ASC")
    List<Event> findUpcomingEvents(@Param("now") LocalDateTime now);
    
    @Query("SELECT DISTINCT e.location FROM Event e WHERE e.location IS NOT NULL ORDER BY e.location")
    List<String> findDistinctLocations();
}
