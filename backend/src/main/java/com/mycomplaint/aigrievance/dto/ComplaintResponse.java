package com.mycomplaint.aigrievance.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComplaintResponse {

    private String complaintNumber;

    private String description;

    private String address;

    private String department;

    private String status;

    private String priority;

    private Double aiConfidence;

    private LocalDateTime createdAt;

}