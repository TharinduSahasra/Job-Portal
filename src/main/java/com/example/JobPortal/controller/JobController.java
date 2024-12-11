package com.example.JobPortal.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.JobPortal.model.Job;
import com.example.JobPortal.model.JobApplication;
import com.example.JobPortal.service.JobService;

@RestController
@RequestMapping("/api/v1/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    final List<String> VALID_STATUS_OPTIONS = Arrays.asList("Pending", "Accepted", "Rejected");

    @Autowired
    private JobService jobService;

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return new ResponseEntity<List<Job>>(jobService.allJobs(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Job>> getSingleJob(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<Job>>(jobService.singleJob(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        return new ResponseEntity<Job>(jobService.createJob(job), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Job> deleteJob(@PathVariable String id) {
        ObjectId jobId = new ObjectId(id);
        return new ResponseEntity<Job>(jobService.deleteJob(jobId), HttpStatus.NO_CONTENT);
    }

        @PostMapping("/{applicationId}")
    public ResponseEntity<?> updateJobApplicationStatus(@PathVariable String applicationId, @RequestBody String newStatus) {
        ObjectId applicationObjectId = new ObjectId(applicationId);

        if (VALID_STATUS_OPTIONS.contains(newStatus)) {
            return new ResponseEntity<JobApplication>(jobApplicationService.updateStatus(applicationObjectId, newStatus), HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Invalid option", HttpStatus.BAD_REQUEST);
        }
    }
}