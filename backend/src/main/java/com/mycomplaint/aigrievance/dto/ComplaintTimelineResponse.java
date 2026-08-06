package com.mycomplaint.aigrievance.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComplaintTimelineResponse {

    private String event;

    private String remarks;

    private LocalDateTime createdAt;

}