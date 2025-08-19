package com.brightpath.backend.service;

import com.brightpath.backend.model.Course;
import com.brightpath.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    // Add save method for consistency
    public Course save(Course course) {
        return courseRepository.save(course);
    }

    // Add findById method that returns Optional<Course>
    public Optional<Course> findById(Long id) {
        return courseRepository.findById(id);
    }

    public Course updateCourse(Long id, Course courseDetails) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Update fields
        course.setName(courseDetails.getName());
        course.setDescription(courseDetails.getDescription());
        course.setStartDate(courseDetails.getStartDate());
        course.setPrice(courseDetails.getPrice());
        course.setImageUrl(courseDetails.getImageUrl());
        course.setResourceUrl(courseDetails.getResourceUrl());

        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        courseRepository.delete(course);
    }

    // Update PDF resource URL
    public Course updateCourseResource(Long courseId, String resourceUrl) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setResourceUrl(resourceUrl);
        return courseRepository.save(course);
    }

    // Remove PDF resource URL
    public Course removeCourseResource(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setResourceUrl(null);
        return courseRepository.save(course);
    }


    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }
}

