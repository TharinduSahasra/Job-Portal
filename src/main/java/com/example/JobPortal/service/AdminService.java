package com.example.JobPortal.service;



import com.example.JobPortal.model.Admin;
import com.example.JobPortal.repository.AdminRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Create a new admin user
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Find an admin by email
    public Optional<Admin> findAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    // Validate if an admin exists with the given email
    public boolean isAdminExist(String email) {
        return AdminRepository.findByEmail(email).isPresent();
    }
}

