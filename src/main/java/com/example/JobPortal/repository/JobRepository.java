package com.example.JobPortal.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.JobPortal.model.Job;

@Repository
public interface JobRepository extends MongoRepository<Job, ObjectId> {
}