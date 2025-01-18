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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.JobPortal.model.Admin;
import com.example.JobPortal.model.Candidate;
import com.example.JobPortal.model.JobApplication;
import com.example.JobPortal.model.Recruiter;
import com.example.JobPortal.service.AdminService;
import com.example.JobPortal.service.RecruiterService;
import com.example.JobPortal.service.CandidateService;
import com.example.JobPortal.service.JobApplicationService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v1/admins")
@CrossOrigin(origins ="*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RecruiterService recruiterService;

    @Autowired
    private CandidateService candidateService;

   
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JobApplicationService jobApplicationService;

    @GetMapping("/{email}")
    public ResponseEntity<Optional<Admin>> getSingleAdmin(@PathVariable String email) {
        return new ResponseEntity<>(adminService.findAdminByEmail(email), HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Admin admin) {
        if (adminService.isAdminExist(admin.getEmail())) {
            return new ResponseEntity<>("Email already taken", HttpStatus.BAD_REQUEST);
        }

        Admin createdAdmin = adminService.createAdmin(admin);
        return new ResponseEntity<>(createdAdmin, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> payload, HttpServletRequest httpServletRequest) {
        String email = payload.get("email");
        String password = payload.get("password");

        try {
            Optional<Admin> admin = adminService.findAdminByEmail(email);
            if (admin.isEmpty()) {
                return new ResponseEntity<>(Map.of("error", "Email not found"), HttpStatus.NOT_FOUND);
            }

            String hashedPassword = admin.get().getPassword();

            if (!passwordEncoder.matches(password, hashedPassword)) {
                return new ResponseEntity<>(Map.of("error", "Wrong password"), HttpStatus.UNAUTHORIZED);
            }

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password);

            SecurityContextHolder.getContext().setAuthentication(authToken);
            HttpSession session = httpServletRequest.getSession(true);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("token", session.getId());
            responseBody.put("admin", admin);

            return new ResponseEntity<>(responseBody, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", "Authentication error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        SecurityContextHolder.clearContext();

        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }

   // Admin: Get all recruiters
   @GetMapping("/recruiters")
   public ResponseEntity<List<Recruiter>> getAllRecruiters() {
       List<Recruiter> recruiters = recruiterService.allRecruiters();
       return new ResponseEntity<>(recruiters, HttpStatus.OK);
   }

   // Admin: Get all candidates
   @GetMapping("/candidates")
   public ResponseEntity<List<Candidate>> getAllCandidates() {
       List<Candidate> candidates = candidateService.allCandidates();
       return new ResponseEntity<>(candidates, HttpStatus.OK);
   }

   
   @CrossOrigin(origins = "*")
   @DeleteMapping("/recruiters/delete/{email}")
   public ResponseEntity<String> deleteRecruiter(@PathVariable String email) {
       Optional<Recruiter> recruiter = recruiterService.singleRecruiter(email);
       if (recruiter.isEmpty()) {
           return new ResponseEntity<>("Recruiter not found", HttpStatus.NOT_FOUND);
       }

       recruiterService.deleteRecruiter(email);
       return new ResponseEntity<>("Recruiter deleted successfully", HttpStatus.OK);
   }

   // Admin: Delete candidate by email
   @DeleteMapping("/candidates/delete/{email}")
   public ResponseEntity<String> deleteCandidate(@PathVariable String email) {
       Optional<Candidate> candidate = candidateService.singleCandidate(email);
       if (candidate.isEmpty()) {
           return new ResponseEntity<>("Candidate not found", HttpStatus.NOT_FOUND);
       }

       candidateService.deleteCandidate(email);
       return new ResponseEntity<>("Candidate deleted successfully", HttpStatus.OK);
   }

   @GetMapping("/candidate-applications/{email}")
   public ResponseEntity<List<JobApplication>> getCandidateApplications(@PathVariable String email) {
       List<JobApplication> applications = jobApplicationService.getApplicationsByEmail(email);

       if (applications.isEmpty()) {
           return new ResponseEntity<>(List.of(), HttpStatus.NOT_FOUND);
       }

       return new ResponseEntity<>(applications, HttpStatus.OK);
   }
}

    

