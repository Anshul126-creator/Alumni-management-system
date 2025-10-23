package com.alumni.management.repository;

import com.alumni.management.entity.Alumni;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumniRepository extends JpaRepository<Alumni, Long> {
    Optional<Alumni> findByUserId(Long userId);
    
    @Query("SELECT a FROM Alumni a WHERE " +
           "(:search IS NULL OR " +
           "LOWER(a.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(a.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(a.currentCompany) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(a.currentPosition) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(a.industry) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(a.location) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:graduationYear IS NULL OR a.graduationYear = :graduationYear) AND " +
           "(:industry IS NULL OR LOWER(a.industry) = LOWER(:industry)) AND " +
           "(:location IS NULL OR LOWER(a.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:isMentorAvailable IS NULL OR a.isMentorAvailable = :isMentorAvailable)")
    Page<Alumni> findAlumniWithFilters(
            @Param("search") String search,
            @Param("graduationYear") Integer graduationYear,
            @Param("industry") String industry,
            @Param("location") String location,
            @Param("isMentorAvailable") Boolean isMentorAvailable,
            Pageable pageable
    );

    List<Alumni> findByIsMentorAvailableTrue();
    
    List<Alumni> findByIsJobSeekerTrue();
    
    List<Alumni> findByIsRecruiterTrue();
    
    @Query("SELECT DISTINCT a.industry FROM Alumni a WHERE a.industry IS NOT NULL ORDER BY a.industry")
    List<String> findDistinctIndustries();
    
    @Query("SELECT DISTINCT a.location FROM Alumni a WHERE a.location IS NOT NULL ORDER BY a.location")
    List<String> findDistinctLocations();
    
    @Query("SELECT DISTINCT a.graduationYear FROM Alumni a WHERE a.graduationYear IS NOT NULL ORDER BY a.graduationYear DESC")
    List<Integer> findDistinctGraduationYears();
}
