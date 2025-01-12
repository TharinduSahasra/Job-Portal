package com.example.JobPortal.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.JobPortal.model.Recruiter;

public interface RecruiterRepository extends MongoRepository<Recruiter,ObjectId>{
    
    Optional<Recruiter> findByEmail(String email);

}
