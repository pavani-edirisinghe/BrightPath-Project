package com.brightpath.backend.service;

import com.brightpath.backend.model.User;
import com.brightpath.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // Modified findById method to return Optional<User> for consistency
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    // Keep the original method for backward compatibility if needed
    public User findByIdOrThrow(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Existing methods
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByIdOptional(Long id) {
        return userRepository.findById(id);
    }
}

