package com.brightpath.backend.service;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.specialized.BlockBlobClient;
import com.azure.storage.blob.sas.BlobSasPermission;
import com.azure.storage.blob.sas.BlobServiceSasSignatureValues;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class AzureBlobService {

    private final BlobContainerClient profileImagesContainerClient;
    private final BlobContainerClient courseImagesContainerClient;
    private final BlobContainerClient courseResourcesContainerClient;

    public AzureBlobService(
            @Qualifier("profileImagesContainerClient") BlobContainerClient profileImagesContainerClient,
            @Qualifier("courseImagesContainerClient") BlobContainerClient courseImagesContainerClient,
            @Qualifier("courseResourcesContainerClient") BlobContainerClient courseResourcesContainerClient) {
        this.profileImagesContainerClient = profileImagesContainerClient;
        this.courseImagesContainerClient = courseImagesContainerClient;
        this.courseResourcesContainerClient = courseResourcesContainerClient;
    }

    /**
     * Generate a SAS URL for a blob in the specified container.
     *
     * @param containerClient container to access
     * @param blobName        name of the blob (file name)
     * @param expiryMinutes   minutes from now for the SAS URL to expire
     * @return SAS URL string for the blob
     */
    public String generateSasUrl(BlobContainerClient containerClient, String blobName, int expiryMinutes) {
        BlockBlobClient blobClient = containerClient.getBlobClient(blobName).getBlockBlobClient();

        // Set permissions to read-only for the SAS token
        BlobSasPermission permissions = new BlobSasPermission().setReadPermission(true);

        // Set expiration time
        OffsetDateTime expiryTime = OffsetDateTime.now().plus(expiryMinutes, ChronoUnit.MINUTES);

        // Create SAS signature values
        BlobServiceSasSignatureValues values = new BlobServiceSasSignatureValues(expiryTime, permissions);

        // Generate SAS token
        String sasToken = blobClient.generateSas(values);

        // Return full URL with SAS token appended
        return blobClient.getBlobUrl() + "?" + sasToken;
    }

    /**
     * Helper to generate SAS URL for profile images container.
     */
    public String generateProfileImageSasUrl(String blobName, int expiryMinutes) {
        return generateSasUrl(profileImagesContainerClient, blobName, expiryMinutes);
    }

    /**
     * Helper to generate SAS URL for course images container.
     */
    public String generateCourseImageSasUrl(String blobName, int expiryMinutes) {
        return generateSasUrl(courseImagesContainerClient, blobName, expiryMinutes);
    }
    /**
     * Generate a SAS URL for a PDF in the course-resources container.
     */
    public String generateCourseResourceSasUrl(String blobName, int expiryMinutes) {
        return generateSasUrl(courseResourcesContainerClient, blobName, expiryMinutes);
    }

}
