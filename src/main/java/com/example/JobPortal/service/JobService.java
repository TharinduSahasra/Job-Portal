package com.example.JobPortal.service;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.JobPortal.model.Job;
import com.example.JobPortal.repository.JobRepository;

@Service
public class JobService {
    @Autowired
    private JobRepository jobRepository;

    public List<Job> allJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> singleJob(ObjectId id) {
        return jobRepository.findById(id);
    }

    public Job createJob(Job job) {
        return jobRepository.insert(job);
    }

    public Job deleteJob(ObjectId id) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
        jobRepository.delete(job);
        return job;
    }
}