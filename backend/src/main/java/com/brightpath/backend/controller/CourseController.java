package com.brightpath.backend.controller;

import com.brightpath.backend.model.Course;
import com.brightpath.backend.service.CourseService;
import com.brightpath.backend.service.ImageStorageService;
import com.brightpath.backend.service.ResourceStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*") // Configure as needed for your frontend
public class CourseController {

    private static final Logger logger = LoggerFactory.getLogger(CourseController.class);

    @Autowired
    private CourseService courseService;

    @Autowired
    private ImageStorageService imageStorageService;

    @Autowired
    private ResourceStorageService resourceStorageService;


    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createCourse(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("startDate") String startDateStr,
            @RequestParam("price") Double price,
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam(value = "file", required = false) MultipartFile pdfFile
    ) {
        logger.info("📩 Received course creation request:");
        logger.info("name: {}", name);
        logger.info("description: {}", description);
        logger.info("startDateStr: {}", startDateStr);
        logger.info("price: {}", price);

        Map<String, Object> response = new HashMap<>();

        try {
            String imageUrl = null;

            // Handle image upload to Azure Blob Storage
            if (imageFile != null && !imageFile.isEmpty()) {
                logger.info("image file: {}", imageFile.getOriginalFilename());
                try {
                    imageUrl = imageStorageService.uploadCourseImage(imageFile);
                    logger.info("✅ Image uploaded to Azure Blob Storage: {}", imageUrl);
                } catch (IOException e) {
                    logger.error("Failed to upload image: {}", e.getMessage());
                    response.put("success", false);
                    response.put("message", "Failed to upload image: " + e.getMessage());
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
                }
            } else {
                logger.info("image file: null");
            }

            // Parse date
            Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse(startDateStr);

            String resourceUrl = null;
            if (pdfFile != null && !pdfFile.isEmpty()) {
                resourceUrl = resourceStorageService.uploadResource(pdfFile);
            }


            // Create course object
            Course course = new Course();
            course.setName(name);
            course.setDescription(description);
            course.setStartDate(startDate);
            course.setPrice(price);
            course.setImageUrl(imageUrl);
            course.setResourceUrl(resourceUrl);

            // Save course
            Course savedCourse = courseService.saveCourse(course);
            logger.info("✅ Course saved to DB with ID: {}", savedCourse.getId());

            response.put("success", true);
            response.put("message", "Course created successfully");
            response.put("course", savedCourse);

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            logger.error("Error creating course: {}", e.getMessage(), e);
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCourse(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<Course> courseOptional = courseService.findById(id);
            if (!courseOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "Course not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Course course = courseOptional.get();
            response.put("success", true);
            response.put("course", course);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error retrieving course {}: {}", id, e.getMessage());
            response.put("success", false);
            response.put("message", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(
            @PathVariable Long id,
            @RequestBody Course courseDetails) {

        Map<String, Object> response = new HashMap<>();

        try {
            Course updatedCourse = courseService.updateCourse(id, courseDetails);
            response.put("success", true);
            response.put("message", "Course updated successfully");
            response.put("course", updatedCourse);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            logger.error("Error updating course {}: {}", id, e.getMessage());
            response.put("success", false);
            response.put("message", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}/image")
    public ResponseEntity<?> updateCourseImage(
            @PathVariable Long id,
            @RequestParam("image") MultipartFile imageFile) {

        Map<String, Object> response = new HashMap<>();

        try {
            // Check if course exists
            Optional<Course> courseOptional = courseService.findById(id);
            if (!courseOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "Course not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Course course = courseOptional.get();

            // Delete old course image if exists
            if (course.getImageUrl() != null && !course.getImageUrl().isEmpty()) {
                String oldFilename = imageStorageService.extractFilenameFromUrl(course.getImageUrl());
                if (oldFilename != null) {
                    imageStorageService.deleteCourseImage(oldFilename);
                }
            }

            // Upload new image
            String imageUrl = imageStorageService.uploadCourseImage(imageFile);

            // Update course\'s image URL in database
            course.setImageUrl(imageUrl);
            courseService.saveCourse(course);

            response.put("success", true);
            response.put("message", "Course image updated successfully");
            response.put("imageUrl", imageUrl);

            logger.info("Course image updated successfully for course {}: {}", id, imageUrl);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            logger.error("Failed to update course image for course {}: {}", id, e.getMessage());
            response.put("success", false);
            response.put("message", "Failed to upload image: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            logger.error("Unexpected error updating course image for course {}: {}", id, e.getMessage());
            response.put("success", false);
            response.put("message", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Get course to check if image exists
            Optional<Course> courseOptional = courseService.findById(id);
            if (courseOptional.isPresent()) {
                Course course = courseOptional.get();

                // Delete associated image from Azure Blob Storage
                if (course.getImageUrl() != null && !course.getImageUrl().isEmpty()) {
                    String filename = imageStorageService.extractFilenameFromUrl(course.getImageUrl());
                    if (filename != null) {
                        imageStorageService.deleteCourseImage(filename);
                    }
                }
            }

            // Delete course from database
            courseService.deleteCourse(id);

            response.put("success", true);
            response.put("message", "Course deleted successfully");
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            logger.error("Error deleting course {}: {}", id, e.getMessage());
            response.put("success", false);
            response.put("message", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/{id}/image")
    public ResponseEntity<?> deleteCourseImage(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<Course> courseOptional = courseService.findById(id);
            if (!courseOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "Course not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Course course = courseOptional.get();

            if (course.getImageUrl() != null && !course.getImageUrl().isEmpty()) {
                String filename = imageStorageService.extractFilenameFromUrl(course.getImageUrl());
                if (filename != null) {
                    boolean deleted = imageStorageService.deleteCourseImage(filename);
                    if (deleted) {
                        course.setImageUrl(null);
                        courseService.saveCourse(course);

                        response.put("success", true);
                        response.put("message", "Course image deleted successfully");
                    } else {
                        response.put("success", false);
                        response.put("message", "Failed to delete image from storage");
                    }
                } else {
                    response.put("success", false);
                    response.put("message", "Invalid image URL");
                }
            } else {
                response.put("success", false);
                response.put("message", "No course image to delete");
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error deleting course image for course {}: {}", id, e.getMessage());
            response.put("success", false);
            response.put("message", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @PutMapping("/{id}/resource")
    public ResponseEntity<?> uploadCourseResource(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {

        Map<String, Object> response = new HashMap<>();

        try {
            Optional<Course> courseOptional = courseService.findById(id);
            if (!courseOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "Course not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Course course = courseOptional.get();

            // Delete old PDF if exists
            if (course.getResourceUrl() != null && !course.getResourceUrl().isEmpty()) {
                String oldFilename = resourceStorageService.extractFilenameFromUrl(course.getResourceUrl());
                if (oldFilename != null) {
                    resourceStorageService.deleteResource(oldFilename);
                }
            }

            // Upload new PDF
            String resourceUrl = resourceStorageService.uploadResource(file);

            // Save URL to course
            course.setResourceUrl(resourceUrl);
            courseService.saveCourse(course);

            response.put("success", true);
            response.put("message", "Resource uploaded successfully");
            response.put("resourceUrl", resourceUrl);

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            response.put("success", false);
            response.put("message", "Failed to upload resource: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @GetMapping("/{id}/resource")
    public ResponseEntity<?> getCourseResource(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<Course> courseOptional = courseService.findById(id);

        if (!courseOptional.isPresent()) {
            response.put("success", false);
            response.put("message", "Course not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        Course course = courseOptional.get();
        response.put("success", true);
        response.put("resourceUrl", course.getResourceUrl());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadResource(@PathVariable Long id) throws IOException {
        Optional<Course> courseOptional = courseService.findById(id);
        if (!courseOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Course course = courseOptional.get();
        String resourceUrl = course.getResourceUrl();
        if (resourceUrl == null || resourceUrl.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        byte[] pdfData = resourceStorageService.downloadResource(resourceUrl); // This now works

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + course.getName() + ".pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfData);
    }



}