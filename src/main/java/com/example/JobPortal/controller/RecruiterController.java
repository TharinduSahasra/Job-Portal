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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.JobPortal.model.Recruiter;
import com.example.JobPortal.service.RecruiterService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1/recruiters")
@CrossOrigin(origins = "*")
public class RecruiterController {
    @Autowired
    private RecruiterService recruiterService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    
    @GetMapping
    public ResponseEntity<List<Recruiter>> getAllRecruiters() {
        return new ResponseEntity<List<Recruiter>>(recruiterService.allRecruiters(), HttpStatus.OK);
    }

    //    TO BE REMOVED LATER, USING JUST FOR TESTING PURPOSES
    @GetMapping("/{email}")
    public ResponseEntity<Optional<Recruiter>> getSingleRecruiter(@PathVariable String email) {
        return new ResponseEntity<Optional<Recruiter>>(recruiterService.singleRecruiter(email), HttpStatus.OK);
    }
    @PostMapping("/{email}/appendjob")
    public ResponseEntity<?> appendJob(@PathVariable String email, @RequestBody Map<String, String> request) {
        try {
            String jobId = request.get("jobId");
            return new ResponseEntity<>(recruiterService.addJobToRecruiter(email, jobId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/{email}/removejob")
public ResponseEntity<?> removeJob(@PathVariable String email, @RequestBody Map<String, String> request) {
    try {
        String jobId = request.get("jobId");
        return new ResponseEntity<>(recruiterService.removeJobFromRecruiter(email, jobId), HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Recruiter recruiter) {
        Optional<Recruiter> existingRecruiter = recruiterService.singleRecruiter(recruiter.getEmail());
        if (existingRecruiter.isPresent()) {
            return new ResponseEntity<String>("Email already taken", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Recruiter>(recruiterService.createRecruiter(recruiter), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> payload, HttpServletRequest httpServletRequest) {
        String email = payload.get("email");
        String password = payload.get("password");

        try {
            Optional<Recruiter> recruiter = recruiterService.singleRecruiter(email);
            if (recruiter.isEmpty()) {
                return new ResponseEntity<Map<String, Object>>(Map.of("error", "Email not found"), HttpStatus.NOT_FOUND);
            }

            String hashedPassword = recruiter.get().getPassword();

            if (!passwordEncoder.matches(password, hashedPassword)) {
                return new ResponseEntity<Map<String, Object>>(Map.of("error", "Wrong password"), HttpStatus.UNAUTHORIZED);
            }

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password);

            SecurityContextHolder.getContext().setAuthentication(authToken);
            HttpSession session = httpServletRequest.getSession(true);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("token", session.getId());
            responseBody.put("recruiter", recruiter);

            return new ResponseEntity<Map<String, Object>>(responseBody, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<Map<String, Object>>(Map.of("error", "Authentication error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        SecurityContextHolder.clearContext();

        return new ResponseEntity<String>("Logged out successfully", HttpStatus.OK);
    }
    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteRecruiter(@PathVariable String email) {
        Optional<Recruiter> recruiter = recruiterService.singleRecruiter(email);
        if (recruiter.isEmpty()) {
            return new ResponseEntity<String>("Recruiter not found", HttpStatus.NOT_FOUND);
        }

        recruiterService.deleteRecruiter(email);
        return new ResponseEntity<String>("Recruiter deleted successfully", HttpStatus.NO_CONTENT);
    }

    
}