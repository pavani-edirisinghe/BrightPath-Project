package com.brightpath.backend.controller;

import com.brightpath.backend.model.Enrollment;
import com.brightpath.backend.model.User;
import com.brightpath.backend.model.Course;
import com.brightpath.backend.service.EnrollmentService;
import com.brightpath.backend.service.UserService;
import com.brightpath.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {
    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private UserService userService;

    @Autowired
    private CourseService courseService;

    @PostMapping("/{userId}/{courseId}")
    public ResponseEntity<?> enrollInCourse(
            @PathVariable Long userId,
            @PathVariable Long courseId) {

        Map<String, Object> response = new HashMap<>();

        try {
            // Handle Optional<User> properly
            Optional<User> userOptional = userService.findById(userId);
            if (!userOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "User not found with id: " + userId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            User user = userOptional.get();

            // Handle Optional<Course> properly - using findById instead of getCourseById
            Optional<Course> courseOptional = courseService.findById(courseId);
            if (!courseOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "Course not found with id: " + courseId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            Course course = courseOptional.get();

            // Check if user is already enrolled
            if (enrollmentService.isUserEnrolled(userId, courseId)) {
                response.put("success", false);
                response.put("message", "User is already enrolled in this course");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            // Enroll the user
            Enrollment enrollment = enrollmentService.enrollUser(user, course);

            response.put("success", true);
            response.put("message", "User enrolled successfully");
            response.put("enrollment", enrollment);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/user/{userId}/courses")
    public ResponseEntity<?> getUserCourses(@PathVariable Long userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "User not found"));
        }

        List<Course> courses = enrollmentService.getUserEnrollments(userId)
                .stream()
                .map(Enrollment::getCourse)
                .filter(course -> course != null)
                .toList();

        return ResponseEntity.ok(Map.of(
                "success", true,
                "courses", courses,
                "count", courses.size()
        ));
    }



    @DeleteMapping("/{userId}/{courseId}")
    public ResponseEntity<?> unenrollFromCourse(
            @PathVariable Long userId,
            @PathVariable Long courseId) {

        Map<String, Object> response = new HashMap<>();

        try {
            // Check if user exists
            Optional<User> userOptional = userService.findById(userId);
            if (!userOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "User not found with id: " + userId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            // Check if course exists
            Optional<Course> courseOptional = courseService.findById(courseId);
            if (!courseOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "Course not found with id: " + courseId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            // Check if user is enrolled
            if (!enrollmentService.isUserEnrolled(userId, courseId)) {
                response.put("success", false);
                response.put("message", "User is not enrolled in this course");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            // Unenroll the user (assuming you have this method in EnrollmentService)
            enrollmentService.unenrollUser(userId, courseId);

            response.put("success", true);
            response.put("message", "User unenrolled successfully");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<?> getCourseEnrollments(@PathVariable Long courseId) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Check if course exists
            Optional<Course> courseOptional = courseService.findById(courseId);
            if (!courseOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "Course not found with id: " + courseId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            List<Enrollment> enrollments = enrollmentService.getCourseEnrollments(courseId);

            response.put("success", true);
            response.put("enrollments", enrollments);
            response.put("count", enrollments.size());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}

