package com.example.JobPortal.repository;

import java.util.Optional;

import com.example.JobPortal.model.Candidate;

public class CandidateRepository extends MongoRepository<Candidate,ObjectId>{
  Optional<Candidate> findByEmail(String email);


}
