package com.brightpath.backend.controller;

import com.brightpath.backend.model.User;
import com.brightpath.backend.service.ImageStorageService;
import com.brightpath.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Configure as needed for your frontend
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private ImageStorageService imageStorageService;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage
    ) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (userService.findByUsername(username).isPresent()) {
                response.put("success", false);
                response.put("message", "Username already taken");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            User user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(password);

            // Handle profile image upload to Azure Blob Storage
            if (profileImage != null && !profileImage.isEmpty()) {
                try {
                    String imageUrl = imageStorageService.uploadProfileImage(profileImage);
                    user.setProfileImageUrl(imageUrl); // Assuming the field is profileImageUrl
                    logger.info("Profile image uploaded during registration: {}", imageUrl);
                } catch (IOException e) {
                    logger.error("Failed to upload profile image during registration: {}", e.getMessage());
                    response.put("success", false);
                    response.put("message", "Failed to upload profile image: " + e.getMessage());
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
                }
            }

            User saved = userService.save(user);
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("user", saved);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error during user registration: {}", e.getMessage());
            response.put("success", false);
            response.put("message", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        Map<String, Object> response = new HashMap<>();

        try {
            String username = loginData.get("username");
            String password = loginData.get("password");

            Optional<User> optionalUser = userService.findByUsername(username);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                if (user.getPassword().equals(password)) {
                    response.put("success", true);
                    response.put("message", "Login successful");
                    response.put("user", user);
                    response.put("token", UUID.randomUUID().toString());
                    return ResponseEntity.ok(response);
                } else {
                    response.put("success", false);
                    response.put("message", "Invalid password");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
                }
            } else {
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            logger.error("Error during login: {}", e.getMessage());
            response.put("success", false);
            response.put("message", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<User> userOptional = userService.findById(id);
            if (!userOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            User user = userOptional.get();
            response.put("success", true);
            response.put("user", user);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error retrieving user profile {}: {}", id, e.getMessage());
            response.put("success", false);
            response.put("message", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<User> existingUserOpt = userService.findByIdOptional(id);
            if (existingUserOpt.isEmpty()) {
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            User existingUser = existingUserOpt.get();
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());

            // Optional: update password only if provided
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
                existingUser.setPassword(updatedUser.getPassword());
            }

            User savedUser = userService.save(existingUser);
            response.put("success", true);
            response.put("message", "User updated successfully");
            response.put("user", savedUser);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error updating user {}: {}", id, e.getMessage());
            response.put("success", false);
            response.put("message", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/{id}/profile-image")
    public ResponseEntity<?> uploadProfileImage(
            @PathVariable Long id,
            @RequestParam("profileImage") MultipartFile profileImage
    ) {
        Map<String, Object> response = new HashMap<>();

        try {
            logger.info("Uploading profile image for user id: {}", id);

            Optional<User> optionalUser = userService.findById(id);
            if (optionalUser.isEmpty()) {
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            if (profileImage == null || profileImage.isEmpty()) {
                response.put("success", false);
                response.put("message", "No image uploaded");
                return ResponseEntity.badRequest().body(response);
            }

            User user = optionalUser.get();

            // Delete old profile image if exists
            if (user.getProfileImageUrl() != null && !user.getProfileImageUrl().isEmpty()) {
                String oldFilename = imageStorageService.extractFilenameFromUrl(user.getProfileImageUrl());
                if (oldFilename != null) {
                    imageStorageService.deleteProfileImage(oldFilename);
                }
            }

            // Upload new image to Azure Blob Storage
            String imageUrl = imageStorageService.uploadProfileImage(profileImage);

            // Update user\'s profile image URL in database
            user.setProfileImageUrl(imageUrl);
            User saved = userService.save(user);

            response.put("success", true);
            response.put("message", "Profile image uploaded successfully");
            response.put("imageUrl", imageUrl);
            response.put("user", saved);

            logger.info("Profile image uploaded successfully for user {}: {}", id, imageUrl);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            logger.error("Failed to upload profile image for user {}: {}", id, e.getMessage());
            response.put("success", false);
            response.put("message", "Failed to upload image: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            logger.error("Unexpected error uploading profile image for user {}: {}", id, e.getMessage());
            response.put("success", false);
            response.put("message", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}/profile-image")
    public ResponseEntity<?> updateProfileImage(
            @PathVariable Long id,
            @RequestParam("profileImage") MultipartFile profileImage
    ) {
        // This method does the same as POST, so we can delegate to it
        return uploadProfileImage(id, profileImage);
    }

    @DeleteMapping("/{id}/profile-image")
    public ResponseEntity<?> deleteProfileImage(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<User> userOptional = userService.findById(id);
            if (!userOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            User user = userOptional.get();

            if (user.getProfileImageUrl() != null && !user.getProfileImageUrl().isEmpty()) {
                String filename = imageStorageService.extractFilenameFromUrl(user.getProfileImageUrl());
                if (filename != null) {
                    boolean deleted = imageStorageService.deleteProfileImage(filename);
                    if (deleted) {
                        user.setProfileImageUrl(null);
                        userService.save(user);

                        response.put("success", true);
                        response.put("message", "Profile image deleted successfully");
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
                response.put("message", "No profile image to delete");
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error deleting profile image for user {}: {}", id, e.getMessage());
            response.put("success", false);
            response.put("message", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}