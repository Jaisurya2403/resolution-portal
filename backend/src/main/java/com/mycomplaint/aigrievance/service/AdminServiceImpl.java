package com.mycomplaint.aigrievance.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mycomplaint.aigrievance.dto.AdminDashboardResponse;
import com.mycomplaint.aigrievance.dto.ComplaintDetailResponse;
import com.mycomplaint.aigrievance.dto.ComplaintSummaryResponse;
import com.mycomplaint.aigrievance.dto.DepartmentStatisticsResponse;
import com.mycomplaint.aigrievance.dto.UpdateComplaintStatusRequest;
import com.mycomplaint.aigrievance.entity.Complaint;
import com.mycomplaint.aigrievance.entity.ComplaintStatus;
import com.mycomplaint.aigrievance.entity.ComplaintTimeline;
import com.mycomplaint.aigrievance.entity.Department;
import com.mycomplaint.aigrievance.repository.ComplaintRepository;
import com.mycomplaint.aigrievance.repository.ComplaintTimelineRepository;
import com.mycomplaint.aigrievance.repository.DepartmentRepository;
import com.mycomplaint.aigrievance.repository.UserRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private DepartmentRepository departmentRepository;
    
    @Autowired
    private ComplaintTimelineRepository timelineRepository;

    @Override
    public AdminDashboardResponse getDashboard() {

        LocalDateTime start = LocalDate.now().atStartOfDay();
        LocalDateTime end = start.plusDays(1);

        return new AdminDashboardResponse(
                userRepository.count(),
                complaintRepository.count(),
                complaintRepository.countByCreatedAtBetween(start, end),
                complaintRepository.countByStatus(ComplaintStatus.CREATED),
                complaintRepository.countByStatus(ComplaintStatus.COMPLETED),
                complaintRepository.countByStatus(ComplaintStatus.REJECTED),
                complaintRepository.countByAiProcessed(true)
        );
    }

    @Override
    public List<DepartmentStatisticsResponse> getDepartmentStatistics() {

        List<DepartmentStatisticsResponse> response = new ArrayList<>();

        List<Department> departments = departmentRepository.findAll();

        for (Department department : departments) {

        	DepartmentStatisticsResponse dto = new DepartmentStatisticsResponse();

        	dto.setDepartmentName(department.getName());

        	dto.setComplaintCount(
        	        complaintRepository.findByDepartmentId(department.getId()).size());

        	response.add(dto);
        }

        return response;
    }
    
    @Override
    public List<ComplaintSummaryResponse> getAllComplaints() {

        return complaintRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToComplaintSummary)
                .collect(Collectors.toList());
    }

    @Override
    public List<ComplaintSummaryResponse> getComplaintsByStatus(
            ComplaintStatus status) {

        return complaintRepository.findByStatusOrderByCreatedAtDesc(status)
                .stream()
                .map(this::mapToComplaintSummary)
                .collect(Collectors.toList());
    }

    @Override
    public List<ComplaintSummaryResponse> searchComplaint(
            String keyword) {

        return complaintRepository
                .findByComplaintNumberContainingIgnoreCase(keyword)
                .stream()
                .map(this::mapToComplaintSummary)
                .collect(Collectors.toList());
    }
    
    @Override
    public ComplaintDetailResponse getComplaint(String complaintNumber) {

        Complaint complaint = complaintRepository
                .findByComplaintNumber(complaintNumber)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        ComplaintDetailResponse response = new ComplaintDetailResponse();

        response.setComplaintNumber(complaint.getComplaintNumber());
        response.setTitle(complaint.getTitle());
        response.setDescription(complaint.getDescription());
        response.setAddress(complaint.getAddress());

        response.setDepartment(complaint.getDepartment().getName());

        response.setUserName(complaint.getUser().getName());
        response.setEmail(complaint.getUser().getEmail());

        response.setStatus(complaint.getStatus().name());
        response.setPriority(complaint.getPriority().name());

        response.setAiConfidence(complaint.getAiConfidence());
        response.setAiProcessed(complaint.getAiProcessed());

        response.setCreatedAt(complaint.getCreatedAt());
        response.setUpdatedAt(complaint.getUpdatedAt());

        return response;
    }
    
    private ComplaintSummaryResponse mapToComplaintSummary(
            Complaint complaint) {

        ComplaintSummaryResponse response =
                new ComplaintSummaryResponse();

        response.setComplaintNumber(complaint.getComplaintNumber());
        response.setTitle(complaint.getTitle());
        response.setDepartment(
                complaint.getDepartment().getName());
        response.setStatus(
                complaint.getStatus().name());
        response.setPriority(
                complaint.getPriority().name());
        response.setCreatedAt(
                complaint.getCreatedAt());

        return response;
    }
    
    @Override
    public ComplaintDetailResponse updateComplaintStatus(
            String complaintNumber,
            UpdateComplaintStatusRequest request) {

        Complaint complaint = complaintRepository
                .findByComplaintNumber(complaintNumber)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found"));

        complaint.setStatus(request.getStatus());

        complaintRepository.save(complaint);

        ComplaintTimeline timeline = new ComplaintTimeline();

        timeline.setComplaint(complaint);
        timeline.setEvent("Status Updated");
        timeline.setRemarks(request.getRemarks());

        timelineRepository.save(timeline);

        return getComplaint(complaintNumber);
    }
}