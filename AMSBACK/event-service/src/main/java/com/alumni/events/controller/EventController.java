package com.alumni.events.controller;

import com.alumni.events.dto.EventRequest;
import com.alumni.events.dto.EventResponse;
import com.alumni.events.dto.RSVPRequest;
import com.alumni.events.dto.RSVPResponse;
import com.alumni.events.service.EventService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public ResponseEntity<EventResponse> createEvent(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody EventRequest request) {
        try {
            EventResponse response = eventService.createEvent(userId, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable Long eventId,
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody EventRequest request) {
        try {
            EventResponse response = eventService.updateEvent(eventId, userId, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<EventResponse> getEvent(
            @PathVariable Long eventId,
            @RequestHeader(value = "X-User-Id", required = false) Long userId) {
        try {
            EventResponse response = eventService.getEventById(eventId, userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Page<EventResponse>> searchEvents(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(required = false) Boolean isVirtual,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "eventDate") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestHeader(value = "X-User-Id", required = false) Long userId) {
        
        Page<EventResponse> events = eventService.searchEvents(
                search, eventType, status, startDate, endDate, isVirtual,
                page, size, sortBy, sortDir, userId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/all")
    public ResponseEntity<List<EventResponse>> getAllEvents(
            @RequestHeader(value = "X-User-Id", required = false) Long userId) {
        List<EventResponse> events = eventService.getAllEvents(userId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<EventResponse>> getUpcomingEvents(
            @RequestHeader(value = "X-User-Id", required = false) Long userId) {
        List<EventResponse> events = eventService.getUpcomingEvents(userId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/my-events")
    public ResponseEntity<List<EventResponse>> getMyEvents(@RequestHeader("X-User-Id") Long userId) {
        List<EventResponse> events = eventService.getMyEvents(userId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/filters/locations")
    public ResponseEntity<List<String>> getEventLocations() {
        List<String> locations = eventService.getEventLocations();
        return ResponseEntity.ok(locations);
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(
            @PathVariable Long eventId,
            @RequestHeader("X-User-Id") Long userId) {
        try {
            eventService.deleteEvent(eventId, userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{eventId}/rsvp")
    public ResponseEntity<RSVPResponse> rsvpToEvent(
            @PathVariable Long eventId,
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody RSVPRequest request) {
        try {
            RSVPResponse response = eventService.rsvpToEvent(eventId, userId, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{eventId}/rsvps")
    public ResponseEntity<List<RSVPResponse>> getEventRSVPs(@PathVariable Long eventId) {
        List<RSVPResponse> rsvps = eventService.getEventRSVPs(eventId);
        return ResponseEntity.ok(rsvps);
    }

    @GetMapping("/my-rsvps")
    public ResponseEntity<List<RSVPResponse>> getUserRSVPs(@RequestHeader("X-User-Id") Long userId) {
        List<RSVPResponse> rsvps = eventService.getUserRSVPs(userId);
        return ResponseEntity.ok(rsvps);
    }

    @DeleteMapping("/{eventId}/rsvp")
    public ResponseEntity<Void> cancelRSVP(
            @PathVariable Long eventId,
            @RequestHeader("X-User-Id") Long userId) {
        try {
            eventService.cancelRSVP(eventId, userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
