package com.example.JobPortal.controller;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.JobPortal.model.JobApplication;
import com.example.JobPortal.service.JobApplicationService;

@RestController
@RequestMapping("/api/v1/applications")
public class JobApplicationController {
    @Autowired
    private JobApplicationService jobApplicationService;
    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllJobApplications() {
        return new ResponseEntity<List<JobApplication>>(jobApplicationService.allJobApplications(), HttpStatus.OK);
    }
    @GetMapping("/{jobId}")
    public ResponseEntity<Optional<JobApplication>> getSingleJobApplication(@PathVariable String jobId) {
        ObjectId singleJobId = new ObjectId(jobId);
        return new ResponseEntity<Optional<JobApplication>>(jobApplicationService.singleJobApplication(singleJobId), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<JobApplication> applyForJob(@RequestBody JobApplication jobApplication) {
        return new ResponseEntity<JobApplication>(jobApplicationService.createJobApplication(jobApplication), HttpStatus.CREATED);
    }
}