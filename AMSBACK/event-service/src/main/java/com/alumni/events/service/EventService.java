package com.alumni.events.service;

import com.alumni.events.dto.EventRequest;
import com.alumni.events.dto.EventResponse;
import com.alumni.events.dto.RSVPRequest;
import com.alumni.events.dto.RSVPResponse;
import com.alumni.events.entity.Event;
import com.alumni.events.entity.EventRSVP;
import com.alumni.events.repository.EventRepository;
import com.alumni.events.repository.EventRSVPRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventRSVPRepository rsvpRepository;

    public EventService(EventRepository eventRepository, EventRSVPRepository rsvpRepository) {
        this.eventRepository = eventRepository;
        this.rsvpRepository = rsvpRepository;
    }

    public EventResponse createEvent(Long userId, EventRequest request) {
        Event event = new Event(
                request.getTitle(),
                request.getDescription(),
                request.getEventDate(),
                request.getLocation(),
                request.getEventType() != null ? Event.EventType.valueOf(request.getEventType().toUpperCase()) : null,
                userId
        );
        
        updateEventFromRequest(event, request);
        Event savedEvent = eventRepository.save(event);
        return convertToResponse(savedEvent, userId);
    }

    public EventResponse updateEvent(Long eventId, Long userId, EventRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        
        if (!event.getCreatedBy().equals(userId)) {
            throw new RuntimeException("Not authorized to update this event");
        }
        
        updateEventFromRequest(event, request);
        Event updatedEvent = eventRepository.save(event);
        return convertToResponse(updatedEvent, userId);
    }

    public EventResponse getEventById(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        return convertToResponse(event, userId);
    }

    public Page<EventResponse> searchEvents(String search, String eventType, String status,
                                          LocalDateTime startDate, LocalDateTime endDate,
                                          Boolean isVirtual, int page, int size,
                                          String sortBy, String sortDir, Long userId) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ?
                   Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Event.EventType type = eventType != null ? Event.EventType.valueOf(eventType.toUpperCase()) : null;
        Event.EventStatus eventStatus = status != null ? Event.EventStatus.valueOf(status.toUpperCase()) : null;
        
        Page<Event> eventPage = eventRepository.findEventsWithFilters(
                search, type, eventStatus, startDate, endDate, isVirtual, pageable);
        
        return eventPage.map(event -> convertToResponse(event, userId));
    }

    public List<EventResponse> getAllEvents(Long userId) {
        return eventRepository.findAll().stream()
                .map(event -> convertToResponse(event, userId))
                .collect(Collectors.toList());
    }

    public List<EventResponse> getUpcomingEvents(Long userId) {
        return eventRepository.findUpcomingEvents(LocalDateTime.now()).stream()
                .map(event -> convertToResponse(event, userId))
                .collect(Collectors.toList());
    }

    public List<EventResponse> getMyEvents(Long userId) {
        return eventRepository.findByCreatedBy(userId).stream()
                .map(event -> convertToResponse(event, userId))
                .collect(Collectors.toList());
    }

    public List<String> getEventLocations() {
        return eventRepository.findDistinctLocations();
    }

    @Transactional
    public void deleteEvent(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        
        if (!event.getCreatedBy().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this event");
        }
        
        // Delete all RSVPs for this event
        rsvpRepository.findByEventId(eventId).forEach(rsvpRepository::delete);
        eventRepository.delete(event);
    }

    public RSVPResponse rsvpToEvent(Long eventId, Long userId, RSVPRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        
        Optional<EventRSVP> existingRSVP = rsvpRepository.findByEventIdAndUserId(eventId, userId);
        
        EventRSVP rsvp;
        if (existingRSVP.isPresent()) {
            rsvp = existingRSVP.get();
            rsvp.setStatus(EventRSVP.RSVPStatus.valueOf(request.getStatus().toUpperCase()));
            rsvp.setNotes(request.getNotes());
        } else {
            rsvp = new EventRSVP(eventId, userId, EventRSVP.RSVPStatus.valueOf(request.getStatus().toUpperCase()));
            rsvp.setNotes(request.getNotes());
        }
        
        EventRSVP savedRSVP = rsvpRepository.save(rsvp);
        return new RSVPResponse(savedRSVP);
    }

    public List<RSVPResponse> getEventRSVPs(Long eventId) {
        return rsvpRepository.findByEventId(eventId).stream()
                .map(RSVPResponse::new)
                .collect(Collectors.toList());
    }

    public List<RSVPResponse> getUserRSVPs(Long userId) {
        return rsvpRepository.findByUserId(userId).stream()
                .map(RSVPResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void cancelRSVP(Long eventId, Long userId) {
        rsvpRepository.deleteByEventIdAndUserId(eventId, userId);
    }

    private void updateEventFromRequest(Event event, EventRequest request) {
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setEventDate(request.getEventDate());
        event.setEndDate(request.getEndDate());
        event.setLocation(request.getLocation());
        event.setVenue(request.getVenue());
        
        if (request.getEventType() != null) {
            event.setEventType(Event.EventType.valueOf(request.getEventType().toUpperCase()));
        }
        
        if (request.getStatus() != null) {
            event.setStatus(Event.EventStatus.valueOf(request.getStatus().toUpperCase()));
        }
        
        event.setMaxAttendees(request.getMaxAttendees());
        event.setRegistrationDeadline(request.getRegistrationDeadline());
        event.setIsVirtual(request.getIsVirtual());
        event.setVirtualLink(request.getVirtualLink());
        event.setImageUrl(request.getImageUrl());
        event.setIsPublic(request.getIsPublic());
        event.setTags(request.getTags());
    }

    private EventResponse convertToResponse(Event event, Long userId) {
        EventResponse response = new EventResponse(event);
        
        // Set attendee count
        Long attendeeCount = rsvpRepository.countAttendeesByEventId(event.getId());
        response.setAttendeeCount(attendeeCount);
        
        // Set user RSVP status if userId is provided
        if (userId != null) {
            Optional<EventRSVP> userRSVP = rsvpRepository.findByEventIdAndUserId(event.getId(), userId);
            if (userRSVP.isPresent()) {
                response.setUserRSVPStatus(userRSVP.get().getStatus().toString());
            }
        }
        
        return response;
    }
}
