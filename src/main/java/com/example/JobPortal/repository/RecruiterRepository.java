package com.example.JobPortal.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.JobPortal.model.Recruiter;
@Repository
public interface RecruiterRepository extends MongoRepository<Recruiter,ObjectId>{
    
    Optional<Recruiter> findByEmail(String email);

}
