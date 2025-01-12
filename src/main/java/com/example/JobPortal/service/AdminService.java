package com.example.JobPortal.service;



import com.example.JobPortal.model.Admin;
import com.example.JobPortal.repository.AdminRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    // Create a new admin user
    public Admin createAdmin(Admin admin) {String hashedPassword = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(hashedPassword);
        return adminRepository.insert(admin);
    }

    // Find an admin by email
    public Optional<Admin> findAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    // Validate if an admin exists with the given email
    public boolean isAdminExist(String email) {
        return adminRepository.findByEmail(email).isPresent();
    }
}

