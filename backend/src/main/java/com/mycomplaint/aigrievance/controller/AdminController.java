package com.mycomplaint.aigrievance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mycomplaint.aigrievance.dto.AdminDashboardResponse;
import com.mycomplaint.aigrievance.dto.ComplaintDetailResponse;
import com.mycomplaint.aigrievance.dto.ComplaintSummaryResponse;
import com.mycomplaint.aigrievance.dto.DepartmentStatisticsResponse;
import com.mycomplaint.aigrievance.dto.UpdateComplaintStatusRequest;
import com.mycomplaint.aigrievance.entity.ComplaintStatus;
import com.mycomplaint.aigrievance.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> dashboard() {

        System.out.println("ADMIN DASHBOARD API HIT");

        return ResponseEntity.ok(
                adminService.getDashboard());
    }

    @GetMapping("/dashboard/departments")
    public ResponseEntity<List<DepartmentStatisticsResponse>> departmentStatistics() {

        return ResponseEntity.ok(
                adminService.getDepartmentStatistics());
    }
    
    @GetMapping("/complaints")
    public ResponseEntity<List<ComplaintSummaryResponse>> getAllComplaints() {

        return ResponseEntity.ok(
                adminService.getAllComplaints());
    }

    @GetMapping("/complaints/status/{status}")
    public ResponseEntity<List<ComplaintSummaryResponse>> getComplaintsByStatus(
            @PathVariable ComplaintStatus status) {

        return ResponseEntity.ok(
                adminService.getComplaintsByStatus(status));
    }

    @GetMapping("/complaints/search")
    public ResponseEntity<List<ComplaintSummaryResponse>> searchComplaint(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                adminService.searchComplaint(keyword));
    }
    
    @GetMapping("/complaints/{complaintNumber}")
    public ResponseEntity<ComplaintDetailResponse> getComplaint(
            @PathVariable String complaintNumber) {

        return ResponseEntity.ok(
                adminService.getComplaint(complaintNumber));
    }
    
    @PutMapping("/complaints/{complaintNumber}/status")
    public ResponseEntity<ComplaintDetailResponse> updateComplaintStatus(
            @PathVariable String complaintNumber,
            @RequestBody UpdateComplaintStatusRequest request) {

        return ResponseEntity.ok(
                adminService.updateComplaintStatus(
                        complaintNumber,
                        request));
    }
}