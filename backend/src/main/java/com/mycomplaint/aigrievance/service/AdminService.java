package com.mycomplaint.aigrievance.service;

import java.util.List;

import com.mycomplaint.aigrievance.dto.AdminDashboardResponse;
import com.mycomplaint.aigrievance.dto.DepartmentStatisticsResponse;

public interface AdminService {

    AdminDashboardResponse getDashboard();

    List<DepartmentStatisticsResponse> getDepartmentStatistics();

}