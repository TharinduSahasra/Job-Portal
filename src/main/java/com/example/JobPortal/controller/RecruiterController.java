package com.example.JobPortal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.JobPortal.model.Recruiter;
import com.example.JobPortal.service.RecruiterService;

@RestController
@RequestMapping("/api/v1/recruiters")
@CrossOrigin(origins = "*")
public class RecruiterController {
    @Autowired
    private RecruiterService recruiterService;
    @GetMapping
    public ResponseEntity<List<Recruiter>> getAllRecruiters() {
        return new ResponseEntity<List<Recruiter>>(recruiterService.allRecruiters(), HttpStatus.OK);
    }
//    TO BE REMOVED LATER, USING JUST FOR TESTING PURPOSES
    @GetMapping("/{email}")
    public ResponseEntity<Optional<Recruiter>> getSingleRecruiter(@PathVariable String email) {
        return new ResponseEntity<Optional<Recruiter>>(recruiterService.singleRecruiter(email), HttpStatus.OK);
    }
    @PostMapping("/signup")
    public ResponseEntity<Recruiter> signup(@RequestBody Recruiter recruiter) {
        return new ResponseEntity<Recruiter>(recruiterService.createRecruiter(recruiter), HttpStatus.CREATED);
    }
}