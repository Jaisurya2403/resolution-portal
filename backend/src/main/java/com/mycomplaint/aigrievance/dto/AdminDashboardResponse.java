package com.mycomplaint.aigrievance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {

    private long totalUsers;

    private long totalComplaints;

    private long todayComplaints;

    private long pendingComplaints;

    private long completedComplaints;

    private long rejectedComplaints;

    private long aiProcessedComplaints;

}