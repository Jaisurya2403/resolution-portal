package com.mycomplaint.aigrievance.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComplaintSummaryResponse {

    private String complaintNumber;

    private String title;

    private String department;

    private String status;

    private String priority;

    private LocalDateTime createdAt;

}