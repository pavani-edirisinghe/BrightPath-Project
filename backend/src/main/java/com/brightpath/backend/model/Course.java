
package com.brightpath.backend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 1000)
    private String description;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date startDate;

    @Column(nullable = false)
    private double price;

    @Column(name = "image_url")
    private String imageUrl; // Full Azure Blob Storage URL for course image

    @Column(name = "resourceUrl")
    private String resourceUrl; // Full Azure Blob Storage URL for course PDF


    // Default constructor
    public Course() {}

    // Constructor with basic parameters
    public Course(String name, String description, Date startDate, double price) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.price = price;
    }

    // Constructor with all parameters including imageUrl
    public Course(String name, String description, Date startDate, double price, String imageUrl) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.price = price;
        this.imageUrl = imageUrl;
    }


    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // Helper method to check if course has an image
    public boolean hasImage() {
        return imageUrl != null && !imageUrl.trim().isEmpty();
    }

    // Helper method to get image filename from URL (for deletion purposes)
    public String getImageFilename() {
        if (imageUrl != null && imageUrl.contains("/")) {
            return imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        }
        return null;
    }

    public String getResourceUrl() {
        return resourceUrl;
    }

    public void setResourceUrl(String resourceUrl) {
        this.resourceUrl = resourceUrl;
    }


    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", name=\'" + name + "\'" +
                ", description=\'" + description + "\'" +
                ", startDate=" + startDate +
                ", price=" + price +
                ", imageUrl=\'" + imageUrl + "\'" +
                ", resourceUrl='" + resourceUrl + '\'' +
                "}";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Course course = (Course) o;
        return id != null && id.equals(course.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}