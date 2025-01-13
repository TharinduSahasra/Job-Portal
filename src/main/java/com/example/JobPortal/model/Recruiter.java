package com.example.JobPortal.model;

import java.util.List;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "recruiters")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Recruiter {
    @Id
    private ObjectId id;
    private String name;
    private String email;
    private String password;
    private String company;
    private String location;
    private List<ObjectId> jobIds;

    public Recruiter(String name, String email, String password, String company, String location, List<ObjectId> jobIds) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.company = company;
        this.location = location;
        this.jobIds = jobIds;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @JsonProperty("id")
    public String getIdString() {
        return id != null ? id.toHexString() : null;
    }

    @JsonProperty("jobIds")
    public List<String> getJobIdsString() {
        if (jobIds != null) {
            return jobIds.stream().map(ObjectId::toHexString).collect(Collectors.toList());
        } else {
            return null;
        }
    }

    public void addJobId(ObjectId jobId) {
        this.jobIds.add(jobId);
    }
    public void removeJobId(ObjectId jobId) {
        this.jobIds.remove(jobId);
    }
}