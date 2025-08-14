package com.brightpath.backend.repository;

import com.brightpath.backend.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    /**
     * Find all enrollments for a specific user
     */
    List<Enrollment> findByUserId(Long userId);

    /**
     * Find all enrollments for a specific course
     */
    List<Enrollment> findByCourseId(Long courseId);

    /**
     * Check if a user is enrolled in a specific course
     */
    boolean existsByUserIdAndCourseId(Long userId, Long courseId);

    /**
     * Find a specific enrollment by user ID and course ID
     */
    Optional<Enrollment> findByUserIdAndCourseId(Long userId, Long courseId);

    /**
     * Count enrollments for a specific user
     */
    long countByUserId(Long userId);

    /**
     * Count enrollments for a specific course
     */
    long countByCourseId(Long courseId);

    /**
     * Delete enrollments by user ID
     */
    void deleteByUserId(Long userId);

    /**
     * Delete enrollments by course ID
     */
    void deleteByCourseId(Long courseId);

    /**
     * Delete a specific enrollment by user ID and course ID
     */
    void deleteByUserIdAndCourseId(Long userId, Long courseId);
}

