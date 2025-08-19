package com.brightpath.backend.service;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.models.BlobHttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;


import java.io.IOException;

@Service
public class ResourceStorageService {

    @Autowired
    private BlobContainerClient courseResourcesContainerClient;

    /**
     * Uploads a PDF to Azure Blob Storage and returns the URL
     */
    public String uploadResource(MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new IOException("Invalid file name");
        }

        // Upload file
        courseResourcesContainerClient.getBlobClient(filename).upload(file.getInputStream(), file.getSize(), true);

        // Set content type
        courseResourcesContainerClient.getBlobClient(filename)
                .setHttpHeaders(new BlobHttpHeaders().setContentType(file.getContentType()));

        // Return URL
        return courseResourcesContainerClient.getBlobClient(filename).getBlobUrl();
    }

    /**
     * Deletes a PDF from Azure Blob Storage
     */
    public boolean deleteResource(String filename) {
        if (filename == null || filename.isEmpty()) return false;
        return courseResourcesContainerClient.getBlobClient(filename).deleteIfExists();
    }

    /**
     * Extracts the filename from a full Azure Blob URL
     */
    public String extractFilenameFromUrl(String url) {
        if (url == null || !url.contains("/")) return null;
        return url.substring(url.lastIndexOf("/") + 1);
    }

    public byte[] downloadResource(String resourceUrl) throws IOException {
        URL url = new URL(resourceUrl);
        try (InputStream in = url.openStream()) {
            return in.readAllBytes();
        }
    }

}
