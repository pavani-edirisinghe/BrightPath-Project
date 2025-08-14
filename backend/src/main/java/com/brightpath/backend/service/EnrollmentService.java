package com.brightpath.backend.service;

import com.brightpath.backend.model.Enrollment;
import com.brightpath.backend.model.User;
import com.brightpath.backend.model.Course;
import com.brightpath.backend.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {
    @Autowired
    private EnrollmentRepository enrollmentRepository;

    /**
     * Enroll a user in a course
     */
    public Enrollment enrollUser(User user, Course course) {
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        return enrollmentRepository.save(enrollment);
    }

    /**
     * Get all enrollments for a specific user
     */
    public List<Enrollment> getUserEnrollments(Long userId) {
        return enrollmentRepository.findByUserId(userId);
    }

    /**
     * Get all enrollments for a specific course
     */
    public List<Enrollment> getCourseEnrollments(Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }

    /**
     * Check if a user is enrolled in a specific course
     */
    public boolean isUserEnrolled(Long userId, Long courseId) {
        return enrollmentRepository.existsByUserIdAndCourseId(userId, courseId);
    }

    /**
     * Unenroll a user from a course
     */
    public void unenrollUser(Long userId, Long courseId) {
        Optional<Enrollment> enrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
        if (enrollment.isPresent()) {
            enrollmentRepository.delete(enrollment.get());
        } else {
            throw new RuntimeException("Enrollment not found for user " + userId + " and course " + courseId);
        }
    }

    /**
     * Get a specific enrollment by user ID and course ID
     */
    public Optional<Enrollment> getEnrollment(Long userId, Long courseId) {
        return enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
    }

    /**
     * Get all enrollments
     */
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    /**
     * Count total enrollments
     */
    public long countTotalEnrollments() {
        return enrollmentRepository.count();
    }

    /**
     * Count enrollments for a specific user
     */
    public long countUserEnrollments(Long userId) {
        return enrollmentRepository.countByUserId(userId);
    }

    /**
     * Count enrollments for a specific course
     */
    public long countCourseEnrollments(Long courseId) {
        return enrollmentRepository.countByCourseId(courseId);
    }

    /**
     * Delete all enrollments for a specific user (useful when deleting a user)
     */
    public void deleteAllUserEnrollments(Long userId) {
        List<Enrollment> userEnrollments = enrollmentRepository.findByUserId(userId);
        enrollmentRepository.deleteAll(userEnrollments);
    }

    /**
     * Delete all enrollments for a specific course (useful when deleting a course)
     */
    public void deleteAllCourseEnrollments(Long courseId) {
        List<Enrollment> courseEnrollments = enrollmentRepository.findByCourseId(courseId);
        enrollmentRepository.deleteAll(courseEnrollments);
    }
}

