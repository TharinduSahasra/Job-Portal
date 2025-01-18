package com.example.JobPortal.repository;

import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.JobPortal.model.JobApplication;
@Repository
public interface JobApplicationRepository extends MongoRepository<JobApplication, ObjectId> {
    Optional<JobApplication> findByJobId(ObjectId jobId);
    List<JobApplication> findByEmail(String email);

}