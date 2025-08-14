package com.brightpath.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "profile_image_url")
    private String profileImageUrl; // Full Azure Blob Storage URL for profile image

    // Default constructor
    public User() {}

    // Constructor with basic parameters
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Constructor with all parameters including profileImageUrl
    public User(String username, String email, String password, String profileImageUrl) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.profileImageUrl = profileImageUrl;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    // Legacy getter for backward compatibility (if your existing code uses getProfileImage())
    public String getProfileImage() {
        return profileImageUrl;
    }

    // Legacy setter for backward compatibility (if your existing code uses setProfileImage())
    public void setProfileImage(String profileImage) {
        this.profileImageUrl = profileImage;
    }

    // Helper method to check if user has a profile image
    public boolean hasProfileImage() {
        return profileImageUrl != null && !profileImageUrl.trim().isEmpty();
    }

    // Helper method to get image filename from URL (for deletion purposes)
    public String getProfileImageFilename() {
        if (profileImageUrl != null && profileImageUrl.contains("/")) {
            return profileImageUrl.substring(profileImageUrl.lastIndexOf("/") + 1);
        }
        return null;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username=\'" + username + "\'" +
                ", email=\'" + email + "\'" +
                ", profileImageUrl=\'" + profileImageUrl + "\'" +
                "}";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id != null && id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}