package com.example.JobPortal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.JobPortal.model.Candidate;
import com.example.JobPortal.model.JobApplication;
import com.example.JobPortal.repository.CandidateRepository;
import com.example.JobPortal.repository.JobApplicationRepository;

@Service
public class CandidateService {
    @Autowired
    CandidateRepository candidateRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JobApplicationRepository jobApplicationRepository;

    public List<Candidate> allCandidates() {
        return candidateRepository.findAll();
    }

    public Optional<Candidate>singleCandidate(String email) {
        return candidateRepository.findByEmail(email);
    }

    public Candidate createCandidate(Candidate candidate) {
        String hashedPassword = passwordEncoder.encode(candidate.getPassword());
        candidate.setPassword(hashedPassword);
        return candidateRepository.insert(candidate);
    }
public void deleteCandidate(String email) {
        Candidate candidate = candidateRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Candidate not found"));
        candidateRepository.delete(candidate);
    }
   




}