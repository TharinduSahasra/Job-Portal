package com.example.JobPortal.model;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Document(collection = "jobApplications")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobApplication {
    @Id
    private ObjectId id;
    private String name;
    private String email;
    private String phone;
    private String qualification;
    private String resumeLink;
    private String status;
    private List<String> skills;
    private ObjectId jobId;

   
    public JobApplication(String name, String email, String phone, String qualification, String resumeLink, String status, List<String> skills, ObjectId jobId) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.qualification = qualification;
        this.resumeLink = resumeLink;
        this.status = status;
        this.skills = skills;
        this.jobId = jobId;
    }

    
    public void setStatus(String status) {
        this.status = status;
    }

    @JsonProperty("id")
    public String getIdString() {
        return id != null ? id.toHexString() : null;
    }
    @JsonProperty("jobId")
    public String getJobIdString() {
        return jobId != null ? jobId.toHexString() : null;
    }
    
}