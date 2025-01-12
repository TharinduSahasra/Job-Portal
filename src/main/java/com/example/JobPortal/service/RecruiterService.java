package com.example.JobPortal.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.JobPortal.model.Recruiter;
import com.example.JobPortal.repository.RecruiterRepository;

@Service
public class RecruiterService {
    @Autowired
    private RecruiterRepository recruiterRepository;

     @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Recruiter> allRecruiters() {
        return recruiterRepository.findAll();
    }
    public Optional<Recruiter> singleRecruiter(String email) {
        return recruiterRepository.findByEmail(email);
    }
    public Recruiter createRecruiter(Recruiter recruiter) {
        String hashedPassword = passwordEncoder.encode(recruiter.getPassword());
        recruiter.setPassword(hashedPassword);
        return recruiterRepository.insert(recruiter);
    }
     public void deleteRecruiter(String email) {
        Recruiter recruiter = recruiterRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Recruiter not found"));
        recruiterRepository.delete(recruiter);
}}