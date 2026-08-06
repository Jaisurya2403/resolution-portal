package com.mycomplaint.aigrievance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentStatisticsResponse {

    private String departmentName;

    private long complaintCount;

}