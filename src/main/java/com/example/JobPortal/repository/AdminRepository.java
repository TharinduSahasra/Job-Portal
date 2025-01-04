package com.example.JobPortal.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.JobPortal.model.Admin;

public interface AdminRepository extends MongoRepository<Admin, ObjectId> {
    static Optional<Admin> findByEmail(String email) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByEmail'");
    } // Custom query to find Admin by email
}
