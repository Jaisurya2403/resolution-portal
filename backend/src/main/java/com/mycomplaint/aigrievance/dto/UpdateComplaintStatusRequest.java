package com.mycomplaint.aigrievance.dto;

import com.mycomplaint.aigrievance.entity.ComplaintStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateComplaintStatusRequest {

    private ComplaintStatus status;

    private String remarks;

}