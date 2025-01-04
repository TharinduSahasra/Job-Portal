package com.example.JobPortal.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "admins") // MongoDB collection name
public class Admin {

    @Id
    private ObjectId id;

    private String email;
    private String password;

    // Constructor for easy initialization
    public Admin(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // If you want to use string representation of the ObjectId
    public String getIdString() {
        return id != null ? id.toHexString() : null;
    }
}
