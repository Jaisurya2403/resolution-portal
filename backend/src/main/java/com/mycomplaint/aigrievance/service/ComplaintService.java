package com.mycomplaint.aigrievance.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.mycomplaint.aigrievance.dto.ComplaintResponse;
import com.mycomplaint.aigrievance.dto.ComplaintSummaryResponse;
import com.mycomplaint.aigrievance.dto.CreateComplaintRequest;
import com.mycomplaint.aigrievance.dto.TimelineResponse;

public interface ComplaintService {

    ComplaintResponse createComplaint(
            CreateComplaintRequest request,
            MultipartFile image,
            MultipartFile video,
            String userEmail);

    ComplaintResponse getComplaint(String complaintNumber);

    List<ComplaintSummaryResponse> getMyComplaints(String userEmail);

    List<TimelineResponse> getTimeline(String complaintNumber);

}