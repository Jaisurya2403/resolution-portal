package com.mycomplaint.aigrievance.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComplaintDetailResponse {

    private String complaintNumber;

    private String title;

    private String description;

    private String address;

    private String department;

    private String userName;

    private String email;

    private String status;

    private String priority;

    private Double aiConfidence;

    private Boolean aiProcessed;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}