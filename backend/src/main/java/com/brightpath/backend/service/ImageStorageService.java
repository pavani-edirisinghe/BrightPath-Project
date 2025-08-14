package com.brightpath.backend.service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.models.BlobHttpHeaders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class ImageStorageService {

    private static final Logger logger = LoggerFactory.getLogger(ImageStorageService.class);

    private final BlobContainerClient profileImagesContainerClient;
    private final BlobContainerClient courseImagesContainerClient;

    // Allowed image file extensions
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(".jpg", ".jpeg", ".png", ".gif", ".bmp");

    // Maximum file size (2MB as configured in application.properties)
    private static final long MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

    public ImageStorageService(@Qualifier("profileImagesContainerClient") BlobContainerClient profileImagesContainerClient,
                               @Qualifier("courseImagesContainerClient") BlobContainerClient courseImagesContainerClient) {
        this.profileImagesContainerClient = profileImagesContainerClient;
        this.courseImagesContainerClient = courseImagesContainerClient;
    }

    /**
     * Upload a profile image to Azure Blob Storage
     */
    public String uploadProfileImage(MultipartFile file) throws IOException {
        logger.info("Uploading profile image: {}", file.getOriginalFilename());
        return uploadImage(file, profileImagesContainerClient, "profile");
    }

    /**
     * Upload a course image to Azure Blob Storage
     */
    public String uploadCourseImage(MultipartFile file) throws IOException {
        logger.info("Uploading course image: {}", file.getOriginalFilename());
        return uploadImage(file, courseImagesContainerClient, "course");
    }

    /**
     * Generic method to upload an image to a specific container
     */
    private String uploadImage(MultipartFile file, BlobContainerClient containerClient, String imageType) throws IOException {
        // Validate file
        validateFile(file);

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = getFileExtension(originalFilename);
        String uniqueFilename = generateUniqueFilename(imageType, extension);

        try {
            // Get blob client
            BlobClient blobClient = containerClient.getBlobClient(uniqueFilename);

            // Set content type based on file extension
            BlobHttpHeaders headers = new BlobHttpHeaders()
                    .setContentType(getContentType(extension));

            // Upload the file - CORRECTED METHOD CALL
            blobClient.upload(file.getInputStream(), file.getSize(), true);

            // Set the HTTP headers after upload
            blobClient.setHttpHeaders(headers);

            String imageUrl = blobClient.getBlobUrl();
            logger.info("Successfully uploaded {} image: {} -> {}", imageType, originalFilename, imageUrl);
            return imageUrl;

        } catch (Exception e) {
            logger.error("Failed to upload {} image: {}", imageType, e.getMessage());
            throw new IOException("Failed to upload image to Azure Blob Storage", e);
        }
    }

    /**
     * Get the URL of a profile image by filename
     */
    public String getProfileImageUrl(String filename) {
        BlobClient blobClient = profileImagesContainerClient.getBlobClient(filename);
        return blobClient.getBlobUrl();
    }

    /**
     * Get the URL of a course image by filename
     */
    public String getCourseImageUrl(String filename) {
        BlobClient blobClient = courseImagesContainerClient.getBlobClient(filename);
        return blobClient.getBlobUrl();
    }

    /**
     * Delete a profile image
     */
    public boolean deleteProfileImage(String filename) {
        return deleteImage(filename, profileImagesContainerClient, "profile");
    }

    /**
     * Delete a course image
     */
    public boolean deleteCourseImage(String filename) {
        return deleteImage(filename, courseImagesContainerClient, "course");
    }

    /**
     * Generic method to delete an image from a specific container
     */
    private boolean deleteImage(String filename, BlobContainerClient containerClient, String imageType) {
        try {
            BlobClient blobClient = containerClient.getBlobClient(filename);
            if (blobClient.exists()) {
                blobClient.delete();
                logger.info("Successfully deleted {} image: {}", imageType, filename);
                return true;
            } else {
                logger.warn("{} image not found: {}", imageType, filename);
                return false;
            }
        } catch (Exception e) {
            logger.error("Failed to delete {} image {}: {}", imageType, filename, e.getMessage());
            return false;
        }
    }

    /**
     * Validate uploaded file
     */
    private void validateFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("File is empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IOException("File size exceeds maximum allowed size of 2MB");
        }

        String filename = file.getOriginalFilename();
        if (filename == null || filename.trim().isEmpty()) {
            throw new IOException("Invalid filename");
        }

        String extension = getFileExtension(filename);
        if (!ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new IOException("File type not allowed. Allowed types: " + ALLOWED_EXTENSIONS);
        }
    }

    /**
     * Extract file extension from filename
     */
    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }
        return filename.substring(filename.lastIndexOf(".")).toLowerCase();
    }

    /**
     * Generate unique filename with prefix
     */
    private String generateUniqueFilename(String prefix, String extension) {
        return prefix + "_" + UUID.randomUUID().toString() + extension;
    }

    /**
     * Get content type based on file extension
     */
    private String getContentType(String extension) {
        switch (extension.toLowerCase()) {
            case ".jpg":
            case ".jpeg":
                return "image/jpeg";
            case ".png":
                return "image/png";
            case ".gif":
                return "image/gif";
            case ".bmp":
                return "image/bmp";
            default:
                return "application/octet-stream";
        }
    }

    /**
     * Extract filename from Azure Blob URL
     */
    public String extractFilenameFromUrl(String url) {
        if (url == null || url.isEmpty()) {
            return null;
        }
        return url.substring(url.lastIndexOf("/") + 1);
    }
}