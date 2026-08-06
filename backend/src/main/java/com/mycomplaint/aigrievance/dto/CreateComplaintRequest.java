package com.mycomplaint.aigrievance.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateComplaintRequest {

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Address is required")
    private String address;

    /*
     * User can either:
     * 1. Select a department manually
     * 2. Leave it null and AI will predict it
     */
    private Long departmentId;

}