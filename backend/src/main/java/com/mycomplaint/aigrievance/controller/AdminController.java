package com.mycomplaint.aigrievance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mycomplaint.aigrievance.dto.AdminDashboardResponse;
import com.mycomplaint.aigrievance.dto.DepartmentStatisticsResponse;
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
}