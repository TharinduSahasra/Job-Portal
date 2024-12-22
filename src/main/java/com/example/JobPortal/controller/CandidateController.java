package com.example.JobPortal.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.JobPortal.model.Candidate;
import com.example.JobPortal.security.JwtTokenProvider;
import com.example.JobPortal.service.CandidateService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1/candidates")
@CrossOrigin
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        return new ResponseEntity<>(candidateService.allCandidates(), HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Candidate candidate) {
        Optional<Candidate> existingCandidate = candidateService.singleCandidate(candidate.getEmail());
        if (existingCandidate.isPresent()) {
            return new ResponseEntity<>("Email already taken", HttpStatus.BAD_REQUEST);
        }

        // Hash the password before saving
        candidate.setPassword(passwordEncoder.encode(candidate.getPassword()));
        Candidate savedCandidate = candidateService.createCandidate(candidate);

        // Remove password from response
        savedCandidate.setPassword(null);

        return new ResponseEntity<>(savedCandidate, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        try {
            Optional<Candidate> candidate = candidateService.singleCandidate(email);
            if (candidate.isEmpty()) {
                return new ResponseEntity<>(Map.of("error", "Email not found"), HttpStatus.NOT_FOUND);
            }

            String hashedPassword = candidate.get().getPassword();
            if (!passwordEncoder.matches(password, hashedPassword)) {
                return new ResponseEntity<>(Map.of("error", "Wrong password"), HttpStatus.UNAUTHORIZED);
            }

            // Generate JWT token
            String token = jwtTokenProvider.generateToken(email);

            // Remove password from response
            candidate.get().setPassword(null);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("token", token);
            responseBody.put("candidate", candidate.get());

            return new ResponseEntity<>(responseBody, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", "Authentication error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        // For JWT, logout can be handled by token invalidation on the client side
        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }
}