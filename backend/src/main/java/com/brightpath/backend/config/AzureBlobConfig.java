package com.brightpath.backend.config;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.storage.blob.models.PublicAccessType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AzureBlobConfig {


    private static final Logger logger = LoggerFactory.getLogger(AzureBlobConfig.class);

    @Value("${azure.storage.account-name}")
    private String accountName;

    @Value("${azure.storage.account-key}")
    private String accountKey;

    @Value("${azure.storage.profile-images-container-name}")
    private String profileImagesContainerName;

    @Value("${azure.storage.course-images-container-name}")
    private String courseImagesContainerName;

    @Value("${azure.storage.course-resources-container-name}")
    private String courseResourcesContainerName;


    @Bean
    public BlobServiceClient blobServiceClient() {
        try {
            String connectionString = String.format(
                    "DefaultEndpointsProtocol=https;AccountName=%s;AccountKey=%s;EndpointSuffix=core.windows.net",
                    accountName, accountKey);

            BlobServiceClient client = new BlobServiceClientBuilder()
                    .connectionString(connectionString)
                    .buildClient();

            logger.info("Successfully created BlobServiceClient for account: {}", accountName);
            return client;
        } catch (Exception e) {
            logger.error("Failed to create BlobServiceClient: {}", e.getMessage());
            throw new RuntimeException("Failed to initialize Azure Blob Storage client", e);
        }
    }

    @Bean(name = "profileImagesContainerClient")
    public BlobContainerClient profileImagesContainerClient(BlobServiceClient blobServiceClient) {
        return createContainerClient(blobServiceClient, profileImagesContainerName, "profile images");
    }

    @Bean(name = "courseImagesContainerClient")
    public BlobContainerClient courseImagesContainerClient(BlobServiceClient blobServiceClient) {
        return createContainerClient(blobServiceClient, courseImagesContainerName, "course images");
    }

    @Bean(name = "courseResourcesContainerClient")
    public BlobContainerClient courseResourcesContainerClient(BlobServiceClient blobServiceClient) {
        return createContainerClient(blobServiceClient, courseResourcesContainerName, "course resources");
    }

    private BlobContainerClient createContainerClient(BlobServiceClient blobServiceClient,
                                                      String containerName, String description) {
        try {
            BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);

            if (!containerClient.exists()) {
                logger.info("Creating new container: {} for {}", containerName, description);
                containerClient.createIfNotExists();
                logger.info("Successfully created container: {}", containerName);
            } else {
                logger.info("Container already exists: {}", containerName);
            }

            return containerClient;
        } catch (Exception e) {
            logger.error("Failed to create container client for {}: {}", containerName, e.getMessage());
            throw new RuntimeException("Failed to initialize container: " + containerName, e);
        }
    }
}