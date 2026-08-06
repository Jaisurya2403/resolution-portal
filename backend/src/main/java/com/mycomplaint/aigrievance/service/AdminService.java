package com.mycomplaint.aigrievance.service;

import java.util.List;

import com.mycomplaint.aigrievance.dto.AdminDashboardResponse;
import com.mycomplaint.aigrievance.dto.ComplaintDetailResponse;
import com.mycomplaint.aigrievance.dto.ComplaintSummaryResponse;
import com.mycomplaint.aigrievance.dto.DepartmentStatisticsResponse;
import com.mycomplaint.aigrievance.dto.UpdateComplaintStatusRequest;
import com.mycomplaint.aigrievance.entity.ComplaintStatus;

public interface AdminService {

    AdminDashboardResponse getDashboard();

    List<DepartmentStatisticsResponse> getDepartmentStatistics();
    
    List<ComplaintSummaryResponse> getAllComplaints();

    List<ComplaintSummaryResponse> getComplaintsByStatus(
            ComplaintStatus status);

    List<ComplaintSummaryResponse> searchComplaint(
            String keyword);
    
    ComplaintDetailResponse getComplaint(String complaintNumber);
    
    ComplaintDetailResponse updateComplaintStatus(
            String complaintNumber,
            UpdateComplaintStatusRequest request);

}