package com.mycomplaint.aigrievance.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mycomplaint.aigrievance.dto.AdminDashboardResponse;
import com.mycomplaint.aigrievance.dto.DepartmentStatisticsResponse;
import com.mycomplaint.aigrievance.entity.ComplaintStatus;
import com.mycomplaint.aigrievance.entity.Department;
import com.mycomplaint.aigrievance.repository.ComplaintRepository;
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
}