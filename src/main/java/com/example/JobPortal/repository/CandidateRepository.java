package com.example.JobPortal.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.JobPortal.model.Candidate;
@Repository
public interface CandidateRepository extends MongoRepository<Candidate,ObjectId>{
  Optional<Candidate> findByEmail(String email);


}
